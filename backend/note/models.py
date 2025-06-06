from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Note(models.Model):
    class NoteColor(models.TextChoices):
        DEFAULT = 'default', 'Default'
        RED = 'red', 'Red'
        ORANGE = 'orange', 'Orange'
        YELLOW = 'yellow', 'Yellow'
        GREEN = 'green', 'Green'
        TEAL = 'teal', 'Teal'
        BLUE = 'blue', 'Blue'
        PURPLE = 'purple', 'Purple'
        PINK = 'pink', 'Pink'

    title = models.CharField(max_length=255, default="")
    content = models.TextField(default="")
    is_pinned = models.BooleanField(default=False)
    color = models.CharField(
        max_length=10,
        choices=NoteColor.choices,
        default=NoteColor.DEFAULT
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)