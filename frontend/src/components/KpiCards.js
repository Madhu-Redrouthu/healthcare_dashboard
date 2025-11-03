// src/components/KpiCards.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KpiCards.css';

// 🚨 CONFIRMED BASE URL 🚨
const BASE_URL = 'http://127.0.0.1:8000/api/'; 

function KpiCards() {
    const [kpiData, setKpiData] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        totalPendingAppointments: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKpiData = async () => {
            try {
                // Fetch Total Patients
                const patientsRes = await axios.get(`${BASE_URL}patients/`);
                const totalPatients = patientsRes.data.length;

                // Fetch Total Doctors
                const doctorsRes = await axios.get(`${BASE_URL}doctors/`);
                const totalDoctors = doctorsRes.data.length;

                // Fetch Total Appointments
                const appointmentsRes = await axios.get(`${BASE_URL}appointments/`);
                const allAppointments = appointmentsRes.data;
                const totalAppointments = allAppointments.length;

                // Calculate Total Pending Appointments
                const totalPendingAppointments = allAppointments.filter(
                    appt => appt.status && appt.status.toLowerCase() === 'pending'
                ).length;

                setKpiData({
                    totalPatients,
                    totalDoctors,
                    totalAppointments,
                    totalPendingAppointments,
                });

                setLoading(false);
            } catch (err) {
                console.error("Failed to load KPI data:", err);
                setError("Failed to load KPI data. Ensure Django API is accessible.");
                setLoading(false);
            }
        };

        fetchKpiData();
    }, []);

    // ... (rest of the component logic) ...

    return (
        // ... JSX for KPI cards ...
        <div className="kpi-container">
            {/* ... map through KPIs ... */}
        </div>
    );
}

export default KpiCards;