// src/components/PatientList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientList.css'; // Assuming you have a CSS file for patients

// 🚨 CONFIRMED BASE URL 🚨
const BASE_URL = 'http://127.0.0.1:8000/api/'; 

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                // Fetch all patient records
                const response = await axios.get(`${BASE_URL}patients/`);
                setPatients(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load patient data:", err);
                setError("Failed to load patients. Check API connection and CORS settings.");
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) return <div className="list-container">Loading Patients...</div>;
    if (error) return <div className="list-container list-error">{error}</div>;

    return (
        <div className="list-container">
            <h3>Patient Directory</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.phone || 'N/A'}</td>
                            <td>{patient.email || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {patients.length === 0 && (
                <div className="no-data">No patient records found.</div>
            )}
        </div>
    );
}

export default PatientList;