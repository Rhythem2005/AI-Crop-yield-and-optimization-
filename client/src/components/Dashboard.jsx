// src/components/Dashboard.jsx
import { FaPen, FaCamera } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const Navigate = useNavigate();
  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-700 p-2 rounded-lg">
            📊
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Farm Dashboard
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Choose how you want to provide your farm data for AI-powered yield prediction and insights.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Data Entry */}
          <div className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80"
                alt="Manual Data Entry"
                className="h-48 w-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white shadow p-2 rounded-full text-green-600">
                <FaPen />
              </button>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-green-600 text-2xl">📄</span> Manual Data Entry
              </h3>
              <p className="mt-3 text-gray-600">
                Enter soil conditions, crop types, weather data, and farming practices manually. Perfect for detailed analysis and when you have specific data points to input.
              </p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li className="flex items-center gap-2 text-green-600">
                  <span>•</span> Soil pH, moisture, and nutrient levels
                </li>
                <li className="flex items-center gap-2 text-green-600">
                  <span>•</span> Crop varieties and planting dates
                </li>
                <li className="flex items-center gap-2 text-green-600">
                  <span>•</span> Weather patterns and irrigation data
                </li>
              </ul>
              <button onClick={()=>Navigate('/input')} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
                Add Data →
              </button>
            </div>
          </div>

          {/* Photo Upload for Analysis */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
                alt="Photo Upload"
                className="h-48 w-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white shadow p-2 rounded-full text-blue-600">
                <FaCamera />
              </button>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-blue-600 text-2xl">📷</span> Photo Upload for Analysis
              </h3>
              <p className="mt-3 text-gray-600">
                Upload crop or soil images for instant AI-powered analysis. Our computer vision technology will assess plant health, growth stages, and potential issues.
              </p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li className="flex items-center gap-2 text-blue-600">
                  <span>•</span> Crop health and disease detection
                </li>
                <li className="flex items-center gap-2 text-blue-600">
                  <span>•</span> Growth stage identification
                </li>
                <li className="flex items-center gap-2 text-blue-600">
                  <span>•</span> Soil condition assessment
                </li>
              </ul>
              <button onClick={()=>Navigate('/upload')}
 className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                Upload Photo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
