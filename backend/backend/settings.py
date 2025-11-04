# Allow frontend domain
CORS_ALLOWED_ORIGINS = [
    "https://naga-madhu-hospital-dashboard.netlify.app",
]

# Allow CSRF from frontend
CSRF_TRUSTED_ORIGINS = [
    "https://naga-madhu-hospital-dashboard.netlify.app",
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
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    DEBUG = True
}
