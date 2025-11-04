from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer

# Doctor ViewSet
class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]  

# Appointment ViewSet
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]  

# Simple login view (mock)
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if email == 'redrouthu7@gmail.com' and password == 'Nagam@dhu19':
        return Response({'success': True, 'name': 'MadhuRedrouthu'})
    else:
        return Response({'success': False, 'message': 'Invalid credentials'}, status=401)
