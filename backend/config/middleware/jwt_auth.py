# utils/decorators.py
from functools import wraps
import jwt
from django.http import JsonResponse
from django.conf import settings
from note.models import User

def jwt_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                print(payload['id'])
                user = User.objects.get(id=int(payload['id']))
                print(f"Authenticated user: {user.username} with email: {user.email}")
                request.user = user
                return view_func(request, *args, **kwargs)
            except Exception as e:
                print(f"JWT decode error: {e}")
                return JsonResponse({'error': 'Unauthorized'}, status=401)
        return JsonResponse({'error': 'Missing token'}, status=401)
    return _wrapped_view
