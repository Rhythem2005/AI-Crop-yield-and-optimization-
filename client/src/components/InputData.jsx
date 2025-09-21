// src/components/InputData.jsx
import { useState } from "react";
import { FaLeaf, FaSun, FaSeedling, FaFlask } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getWeatherByCity } from "../utils/weatherAPi";
import { useTranslation } from "react-i18next";

export default function InputData() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // <- i18n hook

  // ===================== States =====================
  const [ph, setPh] = useState(7);
  const [n, setN] = useState(20);
  const [p, setP] = useState(10);
  const [k, setK] = useState(10);
  const [fertilizerAmount, setFertilizerAmount] = useState(50);
  const [pesticideAmount, setPesticideAmount] = useState(5);
  const [soilType, setSoilType] = useState("Sandy");
  const [state, setState] = useState("Punjab");
  const [cropName, setCropName] = useState("Rice");
  const [fertilizerType, setFertilizerType] = useState("Organic");
  const [area, setArea] = useState(0.1); // <-- Added Farm Area
  const [loading, setLoading] = useState(false);

  const validStates = [
    "Punjab", "Uttar Pradesh", "Maharashtra", "Andhra Pradesh", "Karnataka",
    "Bihar", "Madhya Pradesh", "Rajasthan", "Tamil Nadu", "Gujarat"
  ];
  const validSoilTypes = ["Sandy", "Loamy", "Clay", "Red", "Alluvial"];
  const validFertilizerTypes = ["Organic", "Inorganic"];
  const validCrops = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Barley", "Jowar", "Bajra"];

  // ===================== Color Helpers =====================
  const getPhColor = (value) =>
    value < 6 ? "bg-red-100 text-red-700" : value <= 8 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";

  const getFertilizerColor = (value) =>
    value < 50 ? "bg-blue-100 text-blue-700" : value <= 120 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

  const getPesticideColor = (value) =>
    value < 3 ? "bg-green-100 text-green-700" : value <= 8 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";

  // ===================== Submit Handler =====================
  const handleSubmit = async () => {
    setLoading(true);

    let weatherData = { Temp: 25, Humidity: 60, Rainfall: 500 }; // fallback
    if (state) {
      const fetchedWeather = await getWeatherByCity(state);
      if (fetchedWeather) weatherData = fetchedWeather;
    }

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
      area: Number(area), // <-- Use the state value
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict_yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      navigate("/result", { state: { resultData: data } });
    } catch (err) {
      alert(t("alert.backendError")); // translated alert
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
          <span className="bg-green-100 text-green-700 p-2 rounded-lg">📊</span> {t("dashboardTitle")}
        </h2>
        <p className="mt-2 text-gray-600 text-lg">
          {t("dashboardDescription")}
        </p>

        <h3 className="mt-10 mb-6 text-2xl font-semibold text-gray-800">{t("inputDataTitle")}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Soil Data */}
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaLeaf className="text-green-600" /> {t("soilDataTitle")}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">{t("soilType")}</label>
                <select className="w-full border rounded-lg p-2 mt-1" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                  {validSoilTypes.map((type) => (
                    <option key={type} value={type}>{t(`soilTypes.${type}`)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t("phLevel")}</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="14" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} className="w-full accent-green-600" />
                  <span className={`${getPhColor(ph)} px-3 py-1 rounded-lg text-sm font-medium`}>{ph}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{t("phOptimalRange")}</p>
              </div>
            </div>
          </div>

          {/* Nutrients NPK */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaSeedling className="text-purple-600" /> {t("nutrientsTitle")}
            </h4>
            <div className="space-y-4">
              {["N", "P", "K"].map((nutrient) => (
                <div key={nutrient}>
                  <label className="text-sm text-gray-600">{t(nutrient)}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max={nutrient === "N" ? 300 : nutrient === "P" ? 150 : 200}
                      value={nutrient === "N" ? n : nutrient === "P" ? p : k}
                      onChange={(e) => nutrient === "N" ? setN(e.target.value) : nutrient === "P" ? setP(e.target.value) : setK(e.target.value)}
                      className="w-full accent-purple-600"
                    />
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                      {nutrient === "N" ? n : nutrient === "P" ? p : k}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaSun className="text-yellow-500" /> {t("locationWeatherTitle")}
            </h4>
            <div>
              <label className="text-sm text-gray-600">{t("state")}</label>
              <select className="w-full border rounded-lg p-2 mt-1" value={state} onChange={(e) => setState(e.target.value)}>
                {validStates.map((stateName) => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">{t("weatherNote")}</p>
            </div>
          </div>

          {/* Crop Info */}
          <div className="bg-white rounded-2xl shadow-md border border-yellow-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaSeedling className="text-yellow-600" /> {t("cropInfo")}
            </h4>
            <div>
              <label className="text-sm text-gray-600">{t("cropName")}</label>
              <select className="w-full border rounded-lg p-2 mt-1" value={cropName} onChange={(e) => setCropName(e.target.value)}>
                {validCrops.map((crop) => <option key={crop} value={crop}>{t(`crops.${crop}`)}</option>)}
              </select>
            </div>

            {/* ========== Added Area Input ========== */}
            <div className="mt-4">
              <label className="text-sm text-gray-600">{t("farmArea")}</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  min="0.01"
                  max="1000"
                  step="0.01"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="0.1"
                />
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-medium">
                  {area} ha
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{t("farmAreaNote")}</p>
            </div>
          </div>

          {/* Fertilizer & Pesticide */}
          <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaFlask className="text-orange-600" /> {t("fertilizerPesticide")}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">{t("fertilizerType")}</label>
                <select className="w-full border rounded-lg p-2 mt-1" value={fertilizerType} onChange={(e) => setFertilizerType(e.target.value)}>
                  {validFertilizerTypes.map((type) => <option key={type} value={type}>{t(`fertilizerTypes.${type}`)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t("fertilizerAmount")}</label>
                <input type="range" min="0" max="200" value={fertilizerAmount} onChange={(e) => setFertilizerAmount(e.target.value)} className="w-full accent-green-600" />
                <span className={`${getFertilizerColor(fertilizerAmount)} px-3 py-1 rounded-lg text-sm font-medium`}>{fertilizerAmount}</span>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t("pesticideAmount")}</label>
                <input type="range" min="0" max="15" step="0.5" value={pesticideAmount} onChange={(e) => setPesticideAmount(e.target.value)} className="w-full accent-red-600" />
                <span className={`${getPesticideColor(pesticideAmount)} px-3 py-1 rounded-lg text-sm font-medium`}>{pesticideAmount}L</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            {loading ? t("loadingWeather") : t("analyzeData")}
          </button>
        </div>
      </div>
    </section>
  );
}
