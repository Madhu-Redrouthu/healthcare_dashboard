from rest_framework import viewsets
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if email == 'admin@example.com' and password == 'admin123':
        return Response({'success': True, 'name': 'Naga Madhu'})
    return Response({'success': False}, status=401)