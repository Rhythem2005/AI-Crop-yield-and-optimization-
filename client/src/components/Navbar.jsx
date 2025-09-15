// src/components/Navbar.jsx
import { useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
    const Navigate = useNavigate();  

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      {/* Left Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-green-100 p-2 rounded-xl flex items-center justify-center">
          <FaSeedling className="text-green-700 text-lg" />
        </div>
        <button onClick={()=>Navigate('/')} className="font-semibold text-gray-800 text-lg">CropYield</button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
       
        <button onClick={()=>Navigate('/login')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition">
          Get Started →
        </button>
      </div>
    </nav>
  );
}
