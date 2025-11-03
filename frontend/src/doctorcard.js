import React from "react";
import { FaUserMd } from "react-icons/fa";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
      <FaUserMd className="text-blue-600 text-4xl mb-3" />
      <h4 className="text-lg font-semibold">{doctor.name}</h4>
      <p className="text-sm text-gray-600">{doctor.designation}</p>
      <p className="text-sm text-gray-500 mt-1">{doctor.timing}</p>
      <p className="text-xs text-gray-400">{doctor.days}</p>
    </div>
  );
}
