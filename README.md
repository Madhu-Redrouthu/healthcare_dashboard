# 🏥 Healthcare Dashboard — Full Stack (React + Django)

This is a **full-stack healthcare management dashboard** for hospitals like **Naga Madhu’s Hospital** — built with **React (frontend)** and **Django (backend)**.

---

## 🚀 Features
- Doctor and patient management
- Appointment scheduling (Approved, Pending, Rejected)
- Interactive charts (Pie & Bar)
- Role-based access with Django admin

---

## 🛠️ Tech Stack
**Frontend:** React, TailwindCSS, Recharts  
**Backend:** Django, Django REST Framework  
**Database:** SQLite3 (default)

---


## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm start


---

Folder Structure

healthcare_dashboard/
│
├── backend/               # Django Backend
│   ├── api/               # App containing models, views, urls
│   ├── db.sqlite3
│   └── manage.py
│
├── frontend/              # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── requirements.txt

----


## 🧩 Step 3 — Add and push again

Now run:

```bash
git add .
git commit -m "Added README.md and .gitignore to root"
git push origin main

