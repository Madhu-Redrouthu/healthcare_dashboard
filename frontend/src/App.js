import React, { useEffect, useState } from "react";
import {
  FaHospital,
  FaSearch,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    const doctors = [
      { name: "Dr. Naga Reddy", designation: "Cardiologist" },
      { name: "Dr. Madhu Priya", designation: "Neurologist" },
      { name: "Dr. Rahul Sharma", designation: "Orthopedic Surgeon" },
      { name: "Dr. Sneha Gupta", designation: "Dermatologist" },
      { name: "Dr. Arjun Mehta", designation: "Pediatrician" },
    ];

    const diseases = [
      "Heart Disease", "Migraine", "Knee Pain", "Skin Allergy", "Asthma",
      "Diabetes", "Depression", "Fever", "Back Pain", "Cold and Cough",
    ];

    const names = [
      "Aarav Sharma","Isha Patel","Kabir Verma","Diya Reddy","Rohan Mehta",
      "Ananya Singh","Karan Das","Sneha Rao","Vikram Joshi","Aditi Iyer",
      "Raj Malhotra","Meera Nair","Nikhil Sharma","Pooja Patel","Arnav Reddy",
      "Kavya Das","Sahil Gupta","Tanya Verma","Reyansh Rao","Ira Sharma",
      "Ritika Singh","Vivek Mehta","Simran Nair","Dhruv Joshi","Lavanya Patel",
      "Ayan Reddy","Priya Sharma","Rakesh Iyer","Nisha Gupta","Manish Verma",
      "Aditya Das","Ritu Nair","Varun Mehta","Snehal Joshi","Kiran Sharma",
      "Neha Patel","Om Reddy","Diya Iyer","Arjun Verma","Reema Das",
      "Ishaan Singh","Avni Nair","Krishna Mehta","Mira Sharma","Vihan Patel",
      "Tanvi Joshi","Aryan Reddy","Asha Gupta","Naveen Verma","Tara Iyer",
    ];

    const statuses = ["Approved", "Pending", "Rejected"];
    const generated = [];

    for (let i = 0; i < 200; i++) {
      const doctor = doctors[Math.floor(Math.random() * doctors.length)];
      const patient = names[i % names.length];
      const disease = diseases[Math.floor(Math.random() * diseases.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const date = new Date(2025, 10, Math.floor(Math.random() * 30) + 1);
      const time = `${Math.floor(Math.random() * 12) + 1}:${
        Math.random() > 0.5 ? "30" : "00"
      } ${Math.random() > 0.5 ? "AM" : "PM"}`;

      generated.push({
        id: i + 1,
        patient_name: patient,
        disease,
        doctor_name: doctor.name,
        designation: doctor.designation,
        date: date.toLocaleDateString(),
        time,
        status,
      });
    }
    setAppointments(generated);
  }, []);

  const filtered = appointments.filter(
    (a) =>
      (a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
        a.doctor_name.toLowerCase().includes(search.toLowerCase())) &&
      (filter ? a.status === filter : true)
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // Pie Chart Data (Total Status)
  const statusData = [
    { name: "Approved", value: appointments.filter((a) => a.status === "Approved").length },
    { name: "Pending", value: appointments.filter((a) => a.status === "Pending").length },
    { name: "Rejected", value: appointments.filter((a) => a.status === "Rejected").length },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#ef4444ff"];

  // Doctor-wise counts per status
  const doctorDataMap = {};
  appointments.forEach((a) => {
    if (!doctorDataMap[a.doctor_name]) {
      doctorDataMap[a.doctor_name] = { doctor: a.doctor_name, Approved: 0, Pending: 0, Rejected: 0 };
    }
    doctorDataMap[a.doctor_name][a.status]++;
  });

  const doctorStatusData = Object.values(doctorDataMap);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700 flex justify-center items-center gap-2">
          <FaHospital className="text-green-600" /> 
          <span className="text-indigo-700">Naga Madhu’s Hospital</span>
        </h1>
        <p className="text-gray-500">Appointment Dashboard</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by Patient or Doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-64"
          />
        </div>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-blue"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-blue-100 text-gray-700 text-base">
            <tr>
              <th className="py-3 px-4 border">S.No</th>
              <th className="py-3 px-4 border">Patient Name</th>
              <th className="py-3 px-4 border">Disease</th>
              <th className="py-3 px-4 border">Date</th>
              <th className="py-3 px-4 border">Time</th>
              <th className="py-3 px-4 border">Doctor Name</th>
              <th className="py-3 px-4 border">Designation</th>
              <th className="py-3 px-4 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((a) => (
              <tr key={a.id} className="hover:bg-blue-50 transition border-b last:border-none">
                <td className="py-2 px-4 border text-gray-600">{a.id}</td>
                <td className="py-2 px-4 border font-medium">{a.patient_name}</td>
                <td className="py-2 px-4 border">{a.disease}</td>
                <td className="py-2 px-4 border">{a.date}</td>
                <td className="py-2 px-4 border">{a.time}</td>
                <td className="py-2 px-4 border">{a.doctor_name}</td>
                <td className="py-2 px-4 border">{a.designation}</td>
                <td className="py-2 px-4 border text-center">
                  {a.status === "Approved" && (
                    <span className="flex justify-center items-center gap-1 text-green-600 font-semibold">
                      <FaCheckCircle /> Approved
                    </span>
                  )}
                  {a.status === "Pending" && (
                    <span className="flex justify-center items-center gap-1 text-yellow-500 font-semibold">
                      <FaHourglassHalf /> Pending
                    </span>
                  )}
                  {a.status === "Rejected" && (
                    <span className="flex justify-center items-center gap-1 text-red-500 font-semibold">
                      <FaTimesCircle /> Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Charts Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
            Overall Appointment Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Doctor Status Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
            Doctor-wise Appointment Status
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={doctorStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doctor" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Approved" stackId="a" fill="#4CAF50" />
              <Bar dataKey="Pending" stackId="a" fill="#FFC107" />
              <Bar dataKey="Rejected" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-8">
        © 2025 Naga Madhu’s Hospital. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
