from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import TechnicianEncoder, AppointmentEncoder, AutomobileVOEncoder
from .models import Technician, Appointment, AutomobileVO

@require_http_methods(["GET", "POST"])
def api_Technician_list(request):
  if request.method == "GET":
    technician = Technician.objects.all()
    return JsonResponse(
      {"technician": technician},
      encoder=TechnicianEncoder,
      safe=False,
    )
  else:
    try:
      content = json.loads(request.body)
      technician = Technician.objects.create(**content)
      return JsonResponse(
        technician,
        encoder=TechnicianEncoder,
        safe=False,
      )
    except:
      response = JsonResponse(
        {"Message": "could not create technician"}
      )
      response.status_code = 400
      return response


@require_http_methods(["GET","PUT","DELETE"])
def api_Technician_detail(request, pk):
  if request.method == "GET":
    try:
      technician = Technician.objects.get(id=pk)
      return JsonResponse(
        technician,
        encoder = TechnicianEncoder,
        safe=False,
      )
    except Technician.DoesNotExist:
      response = JsonResponse({
        "message": "Technician does not exist"
      })
      response.status_code = 404
      return response
  elif request.method == "DELETE":
    try:
      technician = Technician.objects.get(id=pk)
      technician.delete()
      return JsonResponse(
          technician, encoder=TechnicianEncoder,
          safe=False,
      )
    except Technician.DoesNotExist:
      return JsonResponse({
        "message": "Technician has been deleted"
      })
  elif request.method == "PUT":
        try:
            technician = Technician.objects.get(id=pk)
            content = json.loads(request.body)
            properties = [
                "first_name",
                "last_name",
                "employee_id"
            ]
            for property_name in properties:
                if property_name in content:
                    setattr(technician, property_name, content[property_name])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({
                "message": "Technician does not exist"
            }, status=404)
            return response


@require_http_methods(["GET", "POST"])
def api_Appointments_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"Appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = {"technician": Technician.objects.get(id=content["technician"])}
            content.update(technician)

           
            existing_appointment = Appointment.objects.filter(
                customer=content.get("customer"),
                date_time=content.get("date_time"),
                technician=content.get("technician"),
            ).exists()

            if existing_appointment:
                return JsonResponse(
                    {"message": "Appointment already exists for this customer with the same date and time."},
                    status=400
                )
            else:
                appointments = Appointment.objects.create(**content)
                return JsonResponse(
                    appointments,
                    encoder=AppointmentEncoder,
                    safe=False
                )
        except (Technician.DoesNotExist, KeyError) as e:
            return JsonResponse(
                {"message": f"Error: {e}"},
                status=400
            )


@require_http_methods(["GET","PUT","DELETE"])
def api_Appointment_detail(request, pk):
   if request.method == "GET":
      try:
         appointment = Appointment.objects.get(id=pk)
         return JsonResponse(
            appointment,
            encoder = AppointmentEncoder,
            safe=False,
         )
      except Appointment.DoesNotExist:
         response=JsonResponse({
            "message": "Appointment does not exist"
         })
         response.status_code = 404
         return response
   elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment has been deleted"},
                status=200
            )
        except Appointment.DoesNotExist:
            return JsonResponse({
                "message": "Appointment does not exist"
            }, status=404)
   elif request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            content = json.loads(request.body)
            properties = [
                "vin",
                "customer",
                "date_time",
                "reason",
                "status"
            ]
            for property_name in properties:
                if property_name in content:
                    setattr(appointment, property_name, content[property_name])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse({
                "message": "Appointment does not exist"
            }, status=404)

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse(
            {"message": "Appointment canceled successfully"},
            status=200
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=404
        )

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            {"message": "Appointment finished successfully"},
            status=200
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=404
        )


@require_http_methods(["GET"])
def api_AutomobileVO_list(request):
   if request.method == "GET":
      autos = AutomobileVO.objects.all()
      return JsonResponse(
         {"autos": autos},
         AutomobileVOEncoder,
         safe=False
      )
