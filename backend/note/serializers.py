from rest_framework import serializers
from .models import Note
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'email')


class MinimalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", 'username', 'email']  # only these two fields
        
class NoteSerializer(serializers.ModelSerializer):
    user = MinimalUserSerializer(read_only=True)  # 👈 nested user info

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class NoteUpdateSerializer(serializers.ModelSerializer):
    user = MinimalUserSerializer(read_only=True)
    title = serializers.CharField(required=False)
    content = serializers.CharField(required=False)
    color = serializers.CharField(required=False)
    is_pinned = serializers.BooleanField(required=False)

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'color', 'is_pinned', 'user', 'created_at', 'updated_at']
        read_only_fields = ('id', 'created_at', 'updated_at')
