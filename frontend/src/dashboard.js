import React, { useState } from "react";
import DoctorCard from "./components/DoctorCard";
import AppointmentTable from "./components/AppointmentTable";
import PatientModal from "./components/PatientModal";

export default function Dashboard({ onLogout, username }) {
  const [filter, setFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const doctors = [
    { id: 1, name: "Dr. Ramesh Kumar", designation: "Cardiologist", timing: "9AM - 2PM", days: "Mon - Sat" },
    { id: 2, name: "Dr. Priya Menon", designation: "Dermatologist", timing: "10AM - 4PM", days: "Tue - Sun" },
    { id: 3, name: "Dr. Aditya Verma", designation: "Orthopedic", timing: "11AM - 3PM", days: "Mon - Fri" },
  ];

  const appointments = [
    { id: 1, patient: "Suresh R", disease: "Chest Pain", time: "10:30 AM", status: "Approved" },
    { id: 2, patient: "Meena L", disease: "Back Pain", time: "11:00 AM", status: "Pending" },
    { id: 3, patient: "Ravi Kumar", disease: "Skin Allergy", time: "12:30 PM", status: "Approved" },
    { id: 4, patient: "Lalitha Devi", disease: "Cold & Fever", time: "2:00 PM", status: "Pending" },
  ];

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Naga Madhu’s Hospital
        </h1>
        <p className="text-center mb-4">Welcome, {username}</p>
        <button
          onClick={onLogout}
          className="mt-auto bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

        {/* Doctor Cards */}
        <h3 className="text-xl font-semibold mb-3">Doctors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Appointments */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Appointments</h3>
          <div className="flex gap-2">
            {["All", "Approved", "Pending"].map((status) => (
              <button
                key={status}
                className={`px-4 py-1 rounded-lg ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <AppointmentTable
          appointments={filteredAppointments}
          onSelect={setSelectedPatient}
        />

        {/* Patient Modal */}
        {selectedPatient && (
          <PatientModal
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )}
      </main>
    </div>
  );
}
