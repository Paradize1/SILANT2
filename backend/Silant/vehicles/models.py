from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model

from datetime import datetime
from django.contrib.auth.models import User




# ------------------------------------------------------
class UserProfile(models.Model):
    STATUS_CHOICES = [
        ('client', 'Клиент'),
        ('service', 'Сервисная компания'),
        ('manager', 'Менеджер'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username_display = models.CharField(max_length=150, blank=True, verbose_name='Отображаемое имя')
    car = models.OneToOneField('Car', on_delete=models.SET_NULL, null=True, blank=True, verbose_name='Машина', related_name='client_profile')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} - {self.username_display}'

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    
# ------------------------------------------------------
class ServiceCompanyUser(AbstractUser):
    name = models.CharField(max_length=200, verbose_name='Название компании', unique=True)
    description = models.TextField(verbose_name='Описание', blank=True, null=True)
    cars = models.ManyToManyField('Car', verbose_name='Машины', blank=True)

    # Добавляем related_name для обратных связей groups и user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='servicecompany_users',
        related_query_name='servicecompany_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='servicecompany_users',
        related_query_name='servicecompany_user',
    )

    USERNAME_FIELD = 'username'  # Поле, используемое для входа
    REQUIRED_FIELDS = ['name']  # Обязательные поля при создании пользователя

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Пользователь сервисной компании'
        verbose_name_plural = 'Пользователи сервисных компаний'
# ------------------------------------------------------
# class Manager
# ------------------------------------------------------








class Technic(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'


class Engine(models.Model):
    name = models.CharField(max_length=30, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'


class Transmission(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссий'


class DrivingBridge(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'


class ControlledBridge(models.Model):
    name = models.CharField(max_length=20, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'


class Car(models.Model):
    car_number = models.CharField(unique=True, max_length=12, verbose_name='Зав. № машины')
    technic = models.ForeignKey(Technic, on_delete=models.CASCADE, verbose_name='Модель техники')
    engine = models.ForeignKey(Engine, on_delete=models.CASCADE, verbose_name='Модель двигателя')
    engine_number = models.CharField(max_length=12, verbose_name='Зав. № двигателя')
    transmission = models.ForeignKey(Transmission, on_delete=models.CASCADE, verbose_name='Модель трансмиссии')
    transmission_number = models.CharField(max_length=12, verbose_name='Зав. № трансмиссии')
    driving_bridge = models.ForeignKey(DrivingBridge, on_delete=models.CASCADE, verbose_name='Модель ведущего моста')
    driving_bridge_number = models.CharField(max_length=12, verbose_name='Зав. № ведущего моста')
    controlled_bridge = models.ForeignKey(ControlledBridge, on_delete=models.CASCADE,
                                          verbose_name='Модель управляемого моста')
    controlled_bridge_number = models.CharField(max_length=12, verbose_name='Зав. № управляемого моста')
    date_shipment = models.DateField(default=datetime.now, verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(max_length=200, verbose_name='Грузополучатель (конечный потребитель)')
    delivery_address = models.CharField(max_length=200, verbose_name='Адрес поставки (эксплуатации)')
    equipment = models.TextField(blank=False, verbose_name='Комплектация (доп. опции)', default="Стандарт")
    client = models.ForeignKey(UserProfile, on_delete=models.CASCADE, verbose_name='Клиент', null=True, blank=True, related_name='cars')
    service_company = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,
                                        verbose_name='Организация, проводившая ТО', null=True, blank=True)

    def __str__(self):
        return f'{self.car_number}'

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'


        # --------------------SERVICES-----------------

class TypeMaintenance(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Вид технического обслуживания'
        verbose_name_plural = 'Виды технических обслуживаний'

class Failure(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Характер отказа'
        verbose_name_plural = 'Характеры отказа'

class RecoveryMethod(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'



class Maintenance(models.Model):
    type = models.ForeignKey(TypeMaintenance, on_delete=models.CASCADE, verbose_name='Вид ТО')
    date = models.DateField(default=datetime.now, verbose_name='Дата проведения ТО')
    operating_time = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час')
    order_number = models.CharField(max_length=20, verbose_name='№ заказ-наряда')
    order_date = models.DateField(default=datetime.now, verbose_name='Дата заказ-наряда')
    service_company = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,
                                        verbose_name='Организация, проводившая ТО', null=True, blank=True)    
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')

    def __str__(self):
        return f'{self.date} {self.car}'

    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Технические обслуживания'

class Complaint(models.Model):
    date_failure = models.DateField(default=datetime.now, verbose_name='Дата отказа')
    operating_time = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час')
    node_failure = models.ForeignKey(Failure, on_delete=models.CASCADE, verbose_name='Узел отказа')
    description_failure = models.TextField(blank=True, null=True, verbose_name='Описание отказа')
    method_recovery = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE, verbose_name='Способ восстановления')
    repair_parts = models.TextField(blank=True, null=True, verbose_name='Используемые запасные части')
    date_recovery = models.DateField(default=datetime.now, verbose_name='Дата восстановления')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')
    time = models.PositiveIntegerField(default=0, verbose_name='Время')
    service_company = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,
                                        verbose_name='Организация, проводившая ТО', null=True, blank=True)
    def __str__(self):
        return f'{self.date_failure} {self.car}'

    def downtime(self):
        deltatime = self.date_recovery - self.date_failure
        return deltatime.days

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'
