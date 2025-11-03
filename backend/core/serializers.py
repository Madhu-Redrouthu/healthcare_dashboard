from rest_framework import serializers
from .models import Hospital, Doctor, Patient, Appointment

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), source='doctor', write_only=True)

    class Meta:
        model = Appointment
        fields = ['id','hospital','doctor','doctor_id','patient','disease','appointment_time','status','created_at']

    def create(self, validated_data):
        patient_data = validated_data.pop('patient')
        patient, _ = Patient.objects.get_or_create(name=patient_data.get('name'), defaults=patient_data)
        appointment = Appointment.objects.create(patient=patient, **validated_data)
        return appointment

    def update(self, instance, validated_data):
        # allow updating status only (and optionally appointment_time)
        instance.status = validated_data.get('status', instance.status)
        instance.appointment_time = validated_data.get('appointment_time', instance.appointment_time)
        instance.save()
        return instance
