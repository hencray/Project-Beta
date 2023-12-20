from common.json import ModelEncoder
from .models import Technician, ServiceAppointment, AutomobileVO


class AutoTechnicianEncoder(ModelEncoder):
  model = Technician
  properties = [
    'id',
    'name',
    'employee_id',
  ]


class ServiceAppointmentEncoder(ModelEncoder):
  model = ServiceAppointment
  properties = [
    'id',
    'vin',
    'customer_name',
    'date',
    'time',
    'service_needed',
    'technician',
    'dealership_purchase'
  ]
  encoders = {
    "technician": AutoTechnicianEncoder()
  }

class AutomobileVOEncoder(ModelEncoder):
  model = AutomobileVO
  properties = [
    "import_href",
    "color",
    "year",
    "vin",

  ]
