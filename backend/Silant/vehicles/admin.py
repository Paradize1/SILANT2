from django.contrib import admin
from .models import *

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .forms import CustomUserChangeForm
from import_export.admin import ImportExportModelAdmin



admin.site.register(UserProfile)
admin.site.register(Technic)
admin.site.register(Engine)
admin.site.register(Transmission)
admin.site.register(DrivingBridge)
admin.site.register(ControlledBridge)
admin.site.register(Car)

admin.site.register(TypeMaintenance)
admin.site.register(Failure)
admin.site.register(RecoveryMethod)
admin.site.register(ServiceCompanyUser)
admin.site.register(Maintenance)
admin.site.register(Complaint)


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False

class CustomUserAdmin(BaseUserAdmin):
    form = CustomUserChangeForm
    inlines = (UserProfileInline,)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

