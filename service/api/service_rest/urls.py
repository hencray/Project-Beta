from django.urls import path
from .views import api_Technician_list, api_Technician_detail, api_Appointments_list, api_Appointment_detail, api_finish_appointment, api_cancel_appointment

urlpatterns = [
    path("technicians/", api_Technician_list, name="api_technicians"),
    path("technicians/<int:pk>/", api_Technician_detail, name="api_technician_detail"),
    path("appointments/", api_Appointments_list, name ="api_appointment"),
    path("appointments/<int:pk>/", api_Appointment_detail, name="api_appointment_detail"),
    path("appointments/<int:pk>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<int:pk>/finish/", api_finish_appointment, name="api_finish_appointment")

]
