from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import UserProfile, ServiceCompanyUser


class CustomUserChangeForm(UserChangeForm):
    username_display = forms.CharField(max_length=150, required=True, help_text='Отображаемое имя')

    class Meta:
        model = UserProfile
        fields = ('username_display',)


class ServiceCompanyUserCreationForm(UserCreationForm):
    class Meta:
        model = ServiceCompanyUser
        fields = ('username', 'name', 'description')