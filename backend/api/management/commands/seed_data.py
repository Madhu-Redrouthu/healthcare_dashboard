# Assuming this file is located in your management/commands directory

from django.core.management.base import BaseCommand
from api.models import Doctor, Patient, Appointment
from datetime import datetime, timedelta
import random
from faker import Faker 

# Initialize Faker (still useful for generating doctor names and other random data)
fake = Faker('en_IN') 

class Command(BaseCommand):
    help = 'Seed initial data for Naga Madhu Multi-Speciality Hospital'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding data...")

        # Clear old data
        Appointment.objects.all().delete()
        Patient.objects.all().delete()
        Doctor.objects.all().delete()

        # --- 1. Generate 10 Doctors --- (No change needed here)
        self.stdout.write("Generating 10 Doctors...")
        
        specializations = [
            "Cardiologist", "Orthopedic Surgeon", "Pediatrician", "Neurologist",
            "Dermatologist", "Ophthalmologist", "General Physician", "Oncologist",
            "Gastroenterologist", "Endocrinologist"
        ]
        
        base_doctors_names = [
            "Dr. Naga Madhu", "Dr. Ravi Kumar", "Dr. Meena Sharma", "Dr. pawan kalyan",
        ]
        
        doctors = []
        for i, name in enumerate(base_doctors_names):
             doctor_data = {
                 "name": name,
                 "designation": specializations[i % len(specializations)],
                 "days_available": random.choice(["Mon-Fri", "Tue-Sat", "Mon-Wed-Fri"]),
                 "timings": "10AM - 4PM",
             }
             doctors.append(Doctor(**doctor_data))
             
        remaining_count = 10 - len(base_doctors_names)
        for i in range(remaining_count):
            doctors.append(
                Doctor(
                    name="Dr. " + fake.first_name() + " " + fake.last_name(),
                    designation=specializations[(i + len(base_doctors_names)) % len(specializations)],
                    days_available=random.choice(["Mon-Fri", "Tue-Sat", "Mon-Wed-Fri"]),
                    timings=random.choice(["9AM - 3PM", "11AM - 5PM", "1PM - 7PM"]),
                )
            )
            
        Doctor.objects.bulk_create(doctors)
        self.stdout.write(self.style.SUCCESS(f"Generated {len(doctors)} Doctors."))
        all_doctors = Doctor.objects.all()

        # -----------------------------------------------------------------
        # --- 2. CORRECTED: Generate 50 Patients with Dedicated Names ---
        # -----------------------------------------------------------------
        self.stdout.write("Generating 50 Patients...")
        
        patient_names = [
            "Rajeshwari Devi", "Priya Sharma", "Kiran Verma", "Gopi Reddy", "Lakshmi Singh",
            "Manoj Kumar", "Sita Rao", "Arun Varma", "Deepa Nambiar", "Vikas Gupta",
            "Neha Joshi", "Rahul Hegde", "Anjali Iyer", "Sandeep Nair", "Bhavna Patel",
            "Gautam Menon", "Ritu Kulkarni", "Amit Khanna", "Sarita Pillai", "Vijay Bansal",
            "Isha Kapoor", "Premnath Jha", "Divya Menon", "Harishankar Prasad", "Jaya Dubey",
            "Kamaljeet Kaur", "Lalit Mohan", "Madhu Shah", "Nandini Rajan", "Om Prakash",
            "Pallavi Srivastav", "Qasim Ali", "Rachana Hegde", "Samar Bose", "Tarun Saxena",
            "Usha Devi", "Vimal Ganesan", "Waseem Khan", "Xavier D'Souza", "Yogita Yadav",
            "Zoya Hussain", "Aditya Soni", "Bela Das", "Chandan Roy", "Esha Tandon",
            "Firoz Merchant", "Geeta Chopra", "Hema Malini", "Inderjeet Singh", "Jatin Agarwal"
        ]
        
        common_diseases = [
            "Fever and Flu", "Dengue", "Hypertension", "Diabetes", 
            "Migraine", "Chronic Back Pain", "Seasonal Allergy", 
            "Gastroenteritis", "Minor Fracture", "Thyroid Disorder"
        ]
        
        patients = []
        # Iterate through the patient names list to ensure all 50 names are used
        for name in patient_names:
            patients.append(
                Patient(
                    name=name,  # Use the specific name
                    disease=random.choice(common_diseases),
                    age=random.randint(18, 75),
                    gender=random.choice(['Male', 'Female', 'Other']),
                    phone_number=fake.phone_number()
                ) 
            )
        
        Patient.objects.bulk_create(patients)
        self.stdout.write(self.style.SUCCESS(f"Generated {len(patients)} Patients."))
        all_patients = Patient.objects.all()
        
        # -----------------------------------------------------------------
        # --- 3. Generate 30 Appointments with Status Rotation --- (No change needed here)
        # -----------------------------------------------------------------
        self.stdout.write("Generating 30 Sample Appointments with diverse statuses...")
        
        appointment_statuses = ["Approved", "Pending", "Rejected"]
        appointments = []
        
        # Start date for appointments (e.g., today)
        start_date = datetime.now().replace(hour=9, minute=0, second=0, microsecond=0)
        
        for i in range(30):
            patient_index = i % len(all_patients) 
            doctor = random.choice(all_doctors)
            time_offset = timedelta(days=i // 10, hours=i % 10 + 9, minutes=random.choice([0, 15, 30, 45]))
            appointment_time = start_date + time_offset
            
            appointments.append(
                Appointment(
                    doctor=doctor,
                    patient=all_patients[patient_index],
                    appointment_time=appointment_time,
                    status=appointment_statuses[i % 3], 
                )
            )
            
        Appointment.objects.bulk_create(appointments)
        self.stdout.write(self.style.SUCCESS(f"Generated {len(appointments)} Appointments (10 of each status)."))

        self.stdout.write(self.style.SUCCESS("✅ Successfully seeded rich data for Naga Madhu Multi-Speciality Hospital"))
