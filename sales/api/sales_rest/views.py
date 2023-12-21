from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import SalesPerson, Customer, AutomobileVO, Sale
from django.http import JsonResponse
import json
from django.db import IntegrityError


# Create your views here.

# DONE: salesperson econder
class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["first_name", "last_name", "employee_id", "id"]

# DONE: customer encoder
class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ['first_name', 'last_name', 'phone_number', 'address', 'id']

# DONE: automobile encoder
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold']

# DONE: sale encoder
class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ['customer','salesperson','automobile', 'price', 'id']
    encoders={'customer': CustomerEncoder(), 'salesperson': SalesPersonEncoder(), 'automobile': AutomobileVOEncoder()}

# TODO: List salespeople / Create salesperson
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = SalesPerson.objects.all()
            print(salespeople)
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalesPersonEncoder
            )
        except:
            return JsonResponse(
                {'message': "Error"},
                status=400
            )
    else: # POST
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                {'salesperson': salesperson},
                encoder=SalesPersonEncoder
            )
        except json.JSONDecodeError:
            return JsonResponse({'message': "Invalid JSON"}, status=400)
        except IntegrityError as e:
            return JsonResponse({'message': str(e)}, status=400)
        except Exception as e:
            # Log the exception for debugging
            print(f"Unexpected error: {e}")
            return JsonResponse({'message': "Error creating salesperson"}, status=500)


# TODO: Delete a sales person
@require_http_methods(['GET', 'DELETE'])
def api_sales_person_detail(request, id):
    if request.method == 'GET':
        try:
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(
                {'salesperson': salesperson},
                encoder=SalesPersonEncoder
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {'message': 'Error'},
                status = 400
            )
    else:
        try:
            count,_ = SalesPerson.objects.filter(id=id).delete()
            return JsonResponse(
                {"delete": count > 0}
            )
        except:
            return JsonResponse(
                {'message': 'Error'},
                status = 400
            )
    

# TODO: list customers / create customer
@require_http_methods(['GET', 'POST'])
def api_list_customers(request):
    if request.method == 'GET':
        try:
            customers = Customer.objects.all()
            print(customers)
            return JsonResponse(
                {'customers': customers},
                encoder=CustomerEncoder
            )
        except:
            return JsonResponse(
                {'message': 'Error'},
                status=400
            )
    else: # POST
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                {'customer': customer},
                encoder=CustomerEncoder
            )
        except:
            return JsonResponse(
                {'message': 'Error'},
                status=400
            )

# TODO: delete specific customer
@require_http_methods(['GET', 'DELETE'])
def api_customer_details(request, id):
    if request.method == 'GET':
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                {'customer': customer},
                encoder=CustomerEncoder
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {'message': 'Error'},
                status=400
            )
    else: # DELETE
        try:
            count,_ = Customer.objects.filter(id=id).delete()
            return JsonResponse(
                {'delete': count > 0}
            )
        except:
            return JsonResponse(
                {'message': 'Error'},
                status=400
            )
# TODO: list sales / create sales
@require_http_methods(['GET', 'POST'])
def api_list_sales(request):
    if request.method == 'GET':
        try:
            sales = Sale.objects.all()
            print(sales)
            return JsonResponse(
                {"sales": sales},
                encoder=SaleEncoder
            )
        except:
            return JsonResponse(
                {'message': 'Error'}
            )
    else: # POST
        content = json.loads(request.body)
        try:
            content_vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=content_vin)
            if automobile.sold:
                return JsonResponse(
                    {'message': 'Sold'},
                    status=400
                )
            content['automobile'] = automobile
            automobile.sold = True
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Error'}
            )

        try:
            content_id = content['salesperson']
            salesperson = SalesPerson.objects.get(employee_id=content_id)
            content['salesperson'] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {'message': 'Error'},
                status=400
            )
        
        try:
            content_name = content['customer']
            customer = Customer.objects.get(first_name=content_name)
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {'message': 'Error'},
                status=400
            )
        
        sale = Sale.objects.create(**content)
        return JsonResponse(
            {'sale': sale},
            encoder=SaleEncoder
        )

# TODO: deleta a specific sale
@require_http_methods(['GET', 'DELETE'])
def api_customer_detail(request, id):
    if request.method == 'GET':
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                {'sale': sale},
                encoder=SaleEncoder
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {'message': 'Error'}
            )
    else: # DELETE
        try:
            count,_ = Sale.objects.filter(id=id).delete()
            return JsonResponse(
                {'delete': count > 0}
            )
        except:
            return JsonResponse(
                {'message': 'Error'}
            )
