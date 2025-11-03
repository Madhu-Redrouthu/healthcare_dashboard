// src/components/AppointmentList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';

// 🚨 CONFIRMED BASE URL 🚨
const BASE_URL = 'http://127.0.0.1:8000/api/'; 

// Helper function (same as before)
const getStatusBadge = (status) => {
    let className = 'badge ';
    let statusText = 'Pending';

    if (status) {
        const lowerStatus = status.toLowerCase();
        statusText = status.charAt(0).toUpperCase() + status.slice(1);

        if (lowerStatus === 'approved') {
            className += 'badge-approved';
        } else if (lowerStatus === 'rejected') {
            className += 'badge-rejected';
        } else {
            className += 'badge-pending';
            statusText = 'Pending';
        }
    } else {
        className += 'badge-pending';
    }
    
    return <span className={className}>{statusText}</span>;
};


function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Fetch all appointments
                const response = await axios.get(`${BASE_URL}appointments/`);
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load appointment data:", err);
                setError("Failed to load appointments. Check API connection and CORS settings.");
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <div className="list-container">Loading Appointments...</div>;
    if (error) return <div className="list-container list-error">{error}</div>;

    return (
        <div className="list-container">
            <h3>Appointment Schedule</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            
                            {/* NOTE: Adjust these fields based on your exact Django serializer output */}
                            <td>{appointment.patient_name || appointment.patient.name || 'N/A'}</td>
                            <td>{appointment.doctor_name || appointment.doctor.name || 'N/A'}</td>
                            
                            <td>{appointment.date || 'N/A'}</td>
                            <td>{appointment.time || 'N/A'}</td>
                            
                            <td>{getStatusBadge(appointment.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {appointments.length === 0 && (
                <div className="no-data">No appointments found.</div>
            )}
        </div>
    );
}

export default AppointmentList;