from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),  # GET + POST
    path('refreshLogin', views.get_user, name='get_user'),  # GET + POST
    path('register', views.register, name='register'),  # GET + POST
    path('notes', views.notes_list_create, name='notes_list_create'),  # GET + POST
    path('notes/<int:id>', views.notes_detail, name='notes_detail'),   # GET + PUT + DELETE
]
