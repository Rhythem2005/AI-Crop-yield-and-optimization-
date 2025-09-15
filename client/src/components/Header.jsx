// src/components/Hero.jsx
import { FaPen, FaCamera } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export default function Hero() {
  const Navigate = useNavigate();
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/farm.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20 gap-10 h-full">
        
        {/* Left Content */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Smarter Farming with <br />
            <span className="text-green-400">AI-Powered</span> Yield Prediction
          </h1>

          <p className="mt-6 text-gray-200 text-lg leading-relaxed max-w-lg">
            Monitor your crops, analyze soil, and boost productivity with AI
            insights. Make data-driven decisions for a more sustainable and
            profitable harvest.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button onClick={()=>Navigate('/input')} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium shadow transition">
              <FaPen />
              Enter Data Manually →
            </button>
            <button onClick={()=>Navigate('/upload')} className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-lg font-medium shadow transition">
              <FaCamera />
              Upload Photo →
            </button>
          </div>
        </div>

        {/* Right Side Graphic Box */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white/90 rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-100 p-3 rounded-xl flex justify-center items-center">
                <span className="text-green-700 text-2xl">🌾</span>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl flex justify-center items-center">
                <span className="text-yellow-600 text-2xl">☀️</span>
              </div>
              <div className="bg-green-100 p-3 rounded-xl flex justify-center items-center">
                <span className="text-green-700 text-2xl">🌾</span>
              </div>
              <div className="bg-orange-200 p-3 rounded-xl flex justify-center items-center">
                <span className="text-orange-700 text-2xl">⬤</span>
              </div>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl flex justify-center items-center">
              <span className="text-blue-700 text-4xl">🚜</span>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="h-2 w-10 rounded-full bg-green-400"></div>
              <div className="h-2 w-10 rounded-full bg-yellow-400"></div>
              <div className="h-2 w-10 rounded-full bg-blue-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
