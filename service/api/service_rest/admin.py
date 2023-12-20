from django.contrib import admin
from .models import Technician, Appointment

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display = ('first_name','last_name', 'employee_id')  # Display these fields in the admin list

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('vin', 'customer', 'date_time', 'reason', 'dealership_purchase', 'status',"technician")   # Display these fields in the admin list
    list_filter = ('dealership_purchase',)  # Add filters for dealership_purchase field
