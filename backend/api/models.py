# models.py

from django.contrib.auth.models import AbstractUser
from django.db import models


# =======================
# Custom User Model
# =======================
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username


# =======================
# Doctor Model
# =======================
class Doctor(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'doctor'}
    )
    designation = models.CharField(max_length=100)
    days_available = models.CharField(max_length=50)
    timings = models.CharField(max_length=50)

    def __str__(self):
        return self.user.username


# =======================
# Patient Model
# =======================
class Patient(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'patient'}
    )
    disease = models.CharField(max_length=200)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.user.username


# =======================
# Appointment Model
# =======================
class Appointment(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.patient.user.username} - {self.doctor.user.username}"
