import React from "react";

export default function PatientModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
        <p><strong>Name:</strong> {patient.patient}</p>
        <p><strong>Disease:</strong> {patient.disease}</p>
        <p><strong>Time:</strong> {patient.time}</p>
        <p><strong>Status:</strong> {patient.status}</p>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
