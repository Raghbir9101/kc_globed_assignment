from django.urls import path, include, re_path
from django.views.static import serve
from django.views.generic import TemplateView
from django.conf import settings
from .views import serve_react

urlpatterns = [
    path('api/', include("note.urls")),
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]
