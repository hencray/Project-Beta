from django.db import models

# Create your models here.

class Technician(models.Model):
  first_name = models.CharField(max_length=100)
  last_name =  models.CharField(max_length=100)
  employee_id = models.CharField(max_length=100, unique=True)

  def __str__(self):
    return f"{self.first_name} {self.last_name}"


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)  
    date_time = models.CharField(max_length=20)
    reason = models.CharField(max_length=100)
    dealership_purchase = models.BooleanField(default=False)
    status = models.CharField(max_length=10)

    technician = models.ForeignKey(
        Technician,
        related_name="ServiceAppointment",
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (('customer', 'date_time'),)

    def __str__(self):
        return self.customer

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
      return "Auto Vin" + self.vin
