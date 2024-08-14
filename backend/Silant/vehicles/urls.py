from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, MaintenanceViewSet, ComplaintViewSet, login_view, UserProfileList, UserProfileDetail

router = DefaultRouter()
router.register(r'cars', CarViewSet)
router.register(r'maintenances', MaintenanceViewSet)
router.register(r'reclamations', ComplaintViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='api_login'),  # Добавлен маршрут для входа
    path('profiles/', UserProfileList.as_view(), name='user-profiles'),
    path('api/profiles/<int:id>/', UserProfileDetail.as_view(), name='user-profile-detail'),

]