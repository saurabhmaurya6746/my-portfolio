from django.contrib import admin
from .models import Contact  # Here, dot (.) implies current directory

# Register your models here.
admin.site.register(Contact)