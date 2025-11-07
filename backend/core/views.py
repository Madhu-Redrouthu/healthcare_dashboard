# core/views.py

from django.http import HttpResponse

# The function MUST be defined here with the correct name: home_view
def home_view(request):
    return HttpResponse("<h1>Naga Madhu Multi-Speciality Hospital</h1><p>API is available at /api/</p>")

# Add any other viewset imports you might have for DRF here, e.g.:
# from rest_framework import viewsets
# from .models import Hospital, Doctor, Patient, Appointment
# class DoctorViewSet(viewsets.ModelViewSet):

from django.shortcuts import render

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hospital, Doctor, Patient, Appointment
from .serializers import HospitalSerializer, DoctorSerializer, PatientSerializer, AppointmentSerializer

class HospitalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    permission_classes = [permissions.IsAuthenticated]

class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.select_related('hospital').all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related('doctor','patient','hospital').all().order_by('-appointment_time')
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # optionally filter by hospital or doctor
        qs = super().get_queryset()
        hospital = self.request.query_params.get('hospital')
        doctor = self.request.query_params.get('doctor')
        if hospital:
            qs = qs.filter(hospital_id=hospital)
        if doctor:
            qs = qs.filter(doctor_id=doctor)
        return qs

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        appt = self.get_object()
        appt.status = 'APPROVED'
        appt.save()
        return Response(self.get_serializer(appt).data)

    @action(detail=True, methods=['post'])
    def set_pending(self, request, pk=None):
        appt = self.get_object()
        appt.status = 'PENDING'
        appt.save()
        return Response(self.get_serializer(appt).data)

