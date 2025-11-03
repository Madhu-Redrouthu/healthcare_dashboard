// src/components/AppointmentPieChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AppointmentPieChart.css'; 

// 🚨 CONFIRMED BASE URL 🚨
const BASE_URL = 'http://127.0.0.1:8000/api/';

function AppointmentPieChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const COLORS = {
        approved: '#28a745',
        pending: '#ffc107',
        rejected: '#dc3545',
    };

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Fetch all appointments
                const appointmentsRes = await axios.get(`${BASE_URL}appointments/`);
                const allAppointments = appointmentsRes.data;

                // 1. Aggregate counts by status
                const counts = allAppointments.reduce((acc, appt) => {
                    const status = appt.status ? appt.status.toLowerCase() : 'pending';
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, {});

                // 2. Format data for Recharts
                const formattedData = Object.keys(counts).map(key => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    value: counts[key],
                    color: COLORS[key] 
                }));

                setChartData(formattedData);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching chart data:", error);
                setError("Failed to load chart data. Check Django API access.");
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    // ... (rest of the component logic) ...

    return (
        // ... JSX for PieChart ...
        <div className="chart-wrapper">
            {/* ... PieChart component ... */}
        </div>
    );
}

export default AppointmentPieChart;