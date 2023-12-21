from django.contrib import admin
from .models import SalesPerson, Customer, Sale, AutomobileVO

# Register your models here.
@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "employee_id"]

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "phone_number", "address"]

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ["automobile", "customer", "salesperson", "price"]

@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    list_display = ["vin", "sold"]
