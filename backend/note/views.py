from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Note
from .models import User
import jwt
from .serializers import NoteSerializer, UserSerializer, NoteUpdateSerializer, MinimalUserSerializer
from config.middleware.jwt_auth import jwt_required
from config import settings
from django.contrib.auth.hashers import make_password, check_password
# Login API views

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(f"Logging in user with email: {email} and password: {password}")
    if not email or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            payload = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': token, 'user': payload}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not username or not password or not email:
        return Response({'error': 'Username, email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        print(f"Email {email} already exists")
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    hashed_password = make_password(password)
    user = User.objects.create(username=username, password=hashed_password, email=email)
    user.save()

    return Response({'message': 'User registered successfully', 'user' : { "username": username, "email" : email }}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@jwt_required
def get_user(request):
    if not request.user.id:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user = request.user
    serializer = MinimalUserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
# Notes API views

@api_view(['GET', 'POST'])
@jwt_required
def notes_list_create(request):
    print(f"Request method: {request.method}")
    print(f"Request data: {request.data}")
    print(f"User: {request.user.username} with email: {request.user.email}")
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NoteSerializer(data={**request.data, 'user': request.user.id})
        print(f"Serializer data: {serializer.initial_data}")
        if serializer.is_valid():
            try:
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(f"Error while saving note: {e}")
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@jwt_required
def notes_detail(request, id):
    try:
        note = Note.objects.get(id=id)
    except Note.DoesNotExist:
        return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteUpdateSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return Response({'message': "Note Deleted Successfully!"},status=status.HTTP_200_OK)
