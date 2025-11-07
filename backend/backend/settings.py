# Allow frontend domain
CORS_ALLOWED_ORIGINS = [
    "https://Naga Madhu Multi-Speciality Hospital.netlify.app",          
]

# Allow CSRF from frontend
CSRF_TRUSTED_ORIGINS = [
    "https://Naga Madhu Multi-Speciality Hospital.netlify.app",
]

# Your backend host
ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    "healthcare-dashboard-1hym.onrender.com",
]

# Django REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
