# api/models.py

from django.db import models

class Doctor(models.Model):
    # Ensure these names match the list_display in admin.py
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    days_available = models.CharField(max_length=50)
    timings = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name 

class Patient(models.Model):
    # Ensure these names match the list_display in admin.py
    name = models.CharField(max_length=100)
    disease = models.CharField(max_length=200)
    # These were the fields causing the previous TypeError, keep them here:
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    
    def __str__(self):
        return self.name

class Appointment(models.Model):
    # Use string references for safety, as discussed previously
    doctor = models.ForeignKey('api.Doctor', on_delete=models.CASCADE)
    patient = models.ForeignKey('api.Patient', on_delete=models.CASCADE)
    appointment_time = models.DateTimeField()
    status = models.CharField(max_length=50) 
    
    def __str__(self):
        return f"{self.patient.name} - {self.doctor.name}"