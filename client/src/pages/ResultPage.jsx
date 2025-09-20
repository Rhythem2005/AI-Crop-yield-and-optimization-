import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { resultData } = location.state || {};

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">{t("resultPage.noData")}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          {t("resultPage.goBack")}
        </button>
      </div>
    );
  }

  const predictedYieldKg = resultData.predicted_yield_kgha || 0;
  const totalProductionKg = (resultData.total_production_tonnes || 0) * 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">

        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            {t("resultPage.title")}
          </h1>
          <p className="text-gray-600 mt-2">{t("resultPage.subtitle")}</p>
        </div>

        {/* Crop & Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-green-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-green-800">{t("resultPage.cropChosen")}</h2>
            <p className="text-gray-700 mt-1">{t(`crops.${resultData.crop_name}`) || resultData.crop_name || "N/A"}</p>
          </div>

          <div className="p-5 bg-blue-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-blue-800">📍 {t("state")}</h2>
            <p className="text-gray-700 mt-1">{resultData.location || t("notProvided")}</p>
          </div>
        </div>

        {/* Weather Details */}
        {resultData.weather && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-indigo-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-indigo-800">🌡️ {t("temperature")}</h2>
              <p className="text-gray-700 mt-1">{resultData.weather.temperature} °C</p>
            </div>

            <div className="p-5 bg-purple-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-purple-800">💧 {t("humidity")}</h2>
              <p className="text-gray-700 mt-1">{resultData.weather.humidity} %</p>
            </div>

            <div className="p-5 bg-pink-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-pink-800">☀️ {t("conditions")}</h2>
              <p className="text-gray-700 mt-1">{resultData.weather.description}</p>
            </div>
          </div>
        )}

        {/* Sowing, Yield & Production */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-yellow-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-800">{t("resultPage.sowingDate")}</h2>
            <p className="text-gray-700 mt-1">{resultData.sowing_date || t("notProvided")}</p>
          </div>

          <div className="p-5 bg-orange-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-orange-800">{t("resultPage.predictedYield")}</h2>
            <p className="text-gray-700 mt-1">{predictedYieldKg.toFixed(2)} kg/ha</p>
          </div>

          <div className="p-5 bg-red-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-red-800">{t("resultPage.totalProduction")}</h2>
            <p className="text-gray-700 mt-1">{(totalProductionKg / 1000).toFixed(2)} tonnes</p>
          </div>
        </div>

        {/* Recommendations */}
        {resultData.recommendations && (
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{t("resultPage.recommendations")}</h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              {resultData.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
          >
            {t("resultPage.backHome")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
