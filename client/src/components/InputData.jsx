// src/components/InputData.jsx
import { useState } from "react";
import { FaLeaf, FaSun, FaSeedling, FaFlask, FaBug } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getWeatherByCity } from "../utils/weatherAPi"; // Import the helper

export default function InputData() {
  const navigate = useNavigate();

  // State for dynamic sliders and inputs
  const [ph, setPh] = useState(7);
  const [n, setN] = useState(20);
  const [p, setP] = useState(10);
  const [k, setK] = useState(10);
  const [fertilizerAmount, setFertilizerAmount] = useState(50);
  const [pesticideAmount, setPesticideAmount] = useState(5);
  const [soilType, setSoilType] = useState("Sandy");
  const [state, setState] = useState("Punjab");
  const [cropName, setCropName] = useState("Rice");
  const [variety, setVariety] = useState("");
  const [previousCrop, setPreviousCrop] = useState("");
  const [fertilizerType, setFertilizerType] = useState("Organic");
  const [loading, setLoading] = useState(false);

  // Valid options based on your backend data
  const validStates = ['Punjab', 'Uttar Pradesh', 'Maharashtra', 'Andhra Pradesh', 'Karnataka',
                      'Bihar', 'Madhya Pradesh', 'Rajasthan', 'Tamil Nadu', 'Gujarat'];
  const validSoilTypes = ['Sandy', 'Loamy', 'Clay', 'Red', 'Alluvial'];
  const validFertilizerTypes = ['Organic', 'Inorganic'];
  const validCrops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Barley', 'Jowar', 'Bajra'];

  const getPhColor = (value) => {
    if (value < 6) return "bg-red-100 text-red-700";
    if (value <= 8) return "bg-green-100 text-green-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getFertilizerColor = (value) => {
    if (value < 50) return "bg-blue-100 text-blue-700";
    if (value <= 120) return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  const getPesticideColor = (value) => {
    if (value < 3) return "bg-green-100 text-green-700";
    if (value <= 8) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Fetch weather data for the entered state
    let weatherData = { Temp: 25, Humidity: 60, Rainfall: 500 }; // fallback
    if (state) {
      const fetchedWeather = await getWeatherByCity(state);
      if (fetchedWeather) weatherData = fetchedWeather;
    }

    // Build JSON payload for backend
    const formData = {
      Crop: cropName,
      State: state,
      Year: new Date().getFullYear(),
      N: Number(n),
      P: Number(p),
      K: Number(k),
      pH: Number(ph),
      soil_type: soilType,
      Rainfall: weatherData.Rainfall,
      Temp: weatherData.Temp,
      Humidity: weatherData.Humidity,
      Fertilizer_Type: fertilizerType,
      Fertilizer_Amount: Number(fertilizerAmount),
      Pesticide_Amount: Number(pesticideAmount),
      sowing_date: new Date().toISOString().split("T")[0],
      area: 1000, // placeholder
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict_yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      // Navigate to Result page with backend response
      navigate("/result", { state: { resultData: data } });
    } catch (err) {
      alert("Failed to connect to backend. Make sure FastAPI is running.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <a
            href="/"
            className="text-gray-600 flex items-center gap-2 hover:text-green-700"
          >
            ← Back to Home
          </a>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
          <span className="bg-green-100 text-green-700 p-2 rounded-lg">📊</span>
          Farm Dashboard
        </h2>
        <p className="mt-2 text-gray-600 text-lg">
          Monitor your crop health and get AI-powered recommendations
        </p>

        <h3 className="mt-10 mb-6 text-2xl font-semibold text-gray-800">
          Input Data
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Soil Data */}
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaLeaf className="text-green-600" /> Soil Data
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Soil Type</label>
                <select
                  className="w-full border rounded-lg p-2 mt-1"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                >
                  {validSoilTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">pH Level</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="0.1"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    className="w-full accent-green-600"
                  />
                  <span
                    className={`${getPhColor(ph)} px-3 py-1 rounded-lg text-sm font-medium`}
                  >
                    {ph}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Optimal range: 6.0–8.0 for most crops
                </p>
              </div>
            </div>
          </div>

          {/* Nutrients (NPK) */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaSeedling className="text-purple-600" /> Nutrients (NPK)
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Nitrogen (N)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={n}
                    onChange={(e) => setN(e.target.value)}
                    className="w-full accent-purple-600"
                  />
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {n}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Phosphorus (P)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={p}
                    onChange={(e) => setP(e.target.value)}
                    className="w-full accent-purple-600"
                  />
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {p}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Potassium (K)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={k}
                    onChange={(e) => setK(e.target.value)}
                    className="w-full accent-purple-600"
                  />
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {k}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaSun className="text-yellow-500" /> Location & Weather
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">State</label>
                <select
                  className="w-full border rounded-lg p-2 mt-1"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {validStates.map(stateName => (
                    <option key={stateName} value={stateName}>{stateName}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Weather data will be auto-fetched via API
                </p>
              </div>
            </div>
          </div>

          {/* Crop Info */}
          <div className="bg-white rounded-2xl shadow-md border border-yellow-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaSeedling className="text-yellow-600" /> Crop Info
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Crop Name</label>
                <select
                  className="w-full border rounded-lg p-2 mt-1"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                >
                  {validCrops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Variety</label>
                <input
                  type="text"
                  placeholder="Basmati 385"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Previous Crop</label>
                <input
                  type="text"
                  placeholder="Wheat"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={previousCrop}
                  onChange={(e) => setPreviousCrop(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Fertilizer & Pesticide */}
          <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaFlask className="text-orange-600" /> Fertilizer & Pesticide
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Fertilizer Type</label>
                <select
                  className="w-full border rounded-lg p-2 mt-1"
                  value={fertilizerType}
                  onChange={(e) => setFertilizerType(e.target.value)}
                >
                  {validFertilizerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Fertilizer Amount (kg/acre)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={fertilizerAmount}
                    onChange={(e) => setFertilizerAmount(e.target.value)}
                    className="w-full accent-green-600"
                  />
                  <span
                    className={`${getFertilizerColor(fertilizerAmount)} px-3 py-1 rounded-lg text-sm font-medium`}
                  >
                    {fertilizerAmount}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Pesticide Amount (L/acre)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={pesticideAmount}
                    onChange={(e) => setPesticideAmount(e.target.value)}
                    className="w-full accent-red-600"
                  />
                  <span
                    className={`${getPesticideColor(pesticideAmount)} px-3 py-1 rounded-lg text-sm font-medium`}
                  >
                    {pesticideAmount}L
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 2-5L per acre
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Fetching Weather..." : "Analyze Data →"}
          </button>
        </div>
      </div>
    </section>
  );
}