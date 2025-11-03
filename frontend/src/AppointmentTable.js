// src/components/AppointmentList.js (or .jsx)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.js'; 

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to get a color class based on the status
    const getStatusClass = (status) => {
        if (!status) return 'status-default';
        switch (status.toLowerCase()) {
            case 'approved':
                return 'status-approved';
            case 'pending':
                return 'status-pending';
            case 'rejected':
                return 'status-rejected';
            default:
                return 'status-default';
        }
    };

    useEffect(() => {
        // Ensure your Django server is running at this URL:
        const API_URL = 'http://127.0.0.1:8000/api/appointments/'; 

        axios.get(API_URL)
            .then(response => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching appointments:", err);
                setError("Failed to load appointments data. Check console for details.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading Appointments...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="appointment-container">
            <h2>🗓️ Appointment Status Dashboard ({appointments.length} Records)</h2>
            
            {/*  */}
            
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt) => (
                        // We use the ID as the key for React, though we aren't displaying it
                        <tr key={appt.id}> 
                            <td>**{appt.patient_name}**</td>
                            <td>{appt.doctor_name}</td>
                            <td>
                                <span className={`status-badge ${getStatusClass(appt.status)}`}>
                                    {appt.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentList;