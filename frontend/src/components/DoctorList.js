// src/components/DoctorList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorList.css'; 

// 🚨 CONFIRMED BASE URL 🚨
const BASE_URL = 'http://127.0.0.1:8000/api/'; 

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Fetch all doctor records
                const response = await axios.get(`${BASE_URL}doctors/`);
                setDoctors(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load doctor data:", err);
                setError("Failed to load doctors. Check API connection and CORS settings.");
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) return <div className="list-container">Loading Doctors...</div>;
    if (error) return <div className="list-container list-error">{error}</div>;

    return (
        <div className="list-container">
            <h3>Doctor Directory</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialization || 'N/A'}</td>
                            <td>{doctor.phone || 'N/A'}</td>
                            <td>{doctor.email || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {doctors.length === 0 && (
                <div className="no-data">No doctor records found.</div>
            )}
        </div>
    );
}

export default DoctorList;