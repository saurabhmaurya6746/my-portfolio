from django.urls import path
from .views import home, contact_api

urlpatterns = [
    path("", home),
    path("contact/", contact_api),
]
