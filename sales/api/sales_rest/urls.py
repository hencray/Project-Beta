from django.urls import path
from .views import api_list_salespeople, api_sales_person_detail, api_list_customers, api_customer_details, api_list_sales, api_sales_detail

urlpatterns = [
    path(
        'salespeople/', 
        api_list_salespeople, 
        name="api_list_salespeople"),
    path(
        'salespeople/<int:id>', 
        api_sales_person_detail, 
        name="api_sales_person_detail"),
    path(
        'customers/', 
        api_list_customers, 
        name='api_list_customers'),
    path(
        'customers/<int:id>/', 
        api_customer_details, 
        name="api_customer_details"),
    path(
        'sales/', 
        api_list_sales, 
        name="api_list_sales"),
    path('sales/<int:id>/', api_sales_detail, name="api_sales_detail")
]
