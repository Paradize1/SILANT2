# Generated by Django 5.0.7 on 2024-07-17 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0004_servicecompanyuser_cars_userprofile_car_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='status',
            field=models.CharField(blank=True, choices=[('client', 'Клиент'), ('service', 'Сервисная компания'), ('manager', 'Менеджер')], max_length=20, null=True),
        ),
    ]
