from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.permissions import IsAuthenticated


from rest_framework import generics

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Car, Maintenance, Complaint, UserProfile
from .serializers import CarSerializer, MaintenanceSerializer, ComplaintSerializer, UserProfileSerializer


class UserProfileList(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileDetail(APIView):
    def get(self, request, id): 
        try:
            profile = UserProfile.objects.get(id=id)
            serializer = UserProfileSerializer(profile)
            data = serializer.data
            data['user_id'] = profile.user.id 
            return Response(data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer




@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        profile = UserProfile.objects.get(user=user)
        
        # Получаем объект Car из профиля пользователя
        car_instance = profile.car
        
        # Сериализуем объект Car в JSON-совместимый формат с использованием CarSerializer
        car_serializer = CarSerializer(car_instance)
        
        return Response({
            'id': profile.id,
            'accessToken': str(refresh.access_token),
            'status': profile.status,
            'car': car_serializer.data,  # Возвращаем данные машины в формате JSON
            'username_display': profile.username_display,
            'user_id': profile.user.id,
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    




