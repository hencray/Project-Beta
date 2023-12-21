from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
  model = Technician
  properties = [
    'id',
    'first_name',
    'last_name',
    'employee_id',
  ]


class AppointmentEncoder(ModelEncoder):
  model = Appointment
  properties = [
    'id',
    'vin',
    'customer',
    'date_time',
    'reason',
    'technician',
    "status",
    'dealership_purchase'
  ]
  encoders = {
    "technician": TechnicianEncoder()
  }

class AutomobileVOEncoder(ModelEncoder):
  model = AutomobileVO
  properties = [
    "import_href",
    "color",
    "year",
    "vin",

  ]
