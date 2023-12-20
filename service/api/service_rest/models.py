from django.db import models

# Create your models here.

class Technician(models.Model):
  first_name = models.CharField(max_length=100)
  last_name =  models.CharField(max_length=100)
  employee_id = models.CharField(max_length=100, unique=True)

  def __str__(self):
    return self.name


class Appointment(models.Model):
  vin = models.CharField(max_length = 17)
  customer = models.CharField(max_length=100, unique=True)
  date_time = models.CharField(max_length=20)
  reason = models.CharField(max_length=100)
  dealership_purchase = models.BooleanField(default=False)
  status = models.CharField(max_length=10 )

  technician = models.ForeignKey(
    Technician,
    related_name="ServiceAppointment",
    on_delete=models.CASCADE

    )

  def __str__(self):
    return self.customer_name

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
      return "Auto Vin" + self.vin
