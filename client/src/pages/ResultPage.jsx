import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReportGenerator from "../components/ReportGenerator";
import EconomicAnalysis from "../components/EconomicAnalysis";

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

  // Safe number handling
  const predictedYieldKg = Number(resultData?.predicted_yield_kgha || 0);
  const totalProductionKg = Number(resultData?.total_production_tonnes || 0) * 1000;
  const weather = resultData?.weather || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">

        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            {t("resultPage.title")}
          </h1>
          <p className="text-gray-600 mt-2">{t("resultPage.subtitle")}</p>
        </div>

        {/* Crop & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title={t("resultPage.cropChosen")}
            value={t(`crops.${resultData?.crop_name}`) || resultData?.crop_name || "N/A"}
            color="bg-green-50"
            text="text-green-800"
          />
          <InfoCard
            title={`📍 ${t("state")}`}
            value={resultData?.location || t("notProvided")}
            color="bg-blue-50"
            text="text-blue-800"
          />
        </div>

        {/* Weather Section */}
        {Object.keys(weather).length > 0 && (
          <div className="p-6 bg-sky-50 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-sky-800 mb-4">
              🌤️ {t("resultPage.weatherConditions")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <WeatherCard label={t("temperature")} value={`${weather.temperature ?? "N/A"} °C`} />
              <WeatherCard label={t("humidity")} value={`${weather.humidity ?? "N/A"} %`} />
              <WeatherCard label={t("conditions")} value={weather.description || "N/A"} />
            </div>
          </div>
        )}

        {/* Farm & Yield */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            title={t("resultPage.sowingDate")}
            value={resultData?.sowing_date || t("notProvided")}
            color="bg-yellow-50"
            text="text-yellow-800"
          />
          <InfoCard
            title="📐 Farm Area"
            value={`${Number(resultData?.area || 0)} hectares`}
            color="bg-teal-50"
            text="text-teal-800"
          />
          <InfoCard
            title={t("resultPage.predictedYield")}
            value={`${predictedYieldKg.toFixed(2)} kg/ha`}
            color="bg-orange-50"
            text="text-orange-800"
          />
          <InfoCard
            title={t("resultPage.totalProduction")}
            value={`${(totalProductionKg / 1000).toFixed(2)} tonnes`}
            color="bg-red-50"
            text="text-red-800"
          />
        </div>

        {/* Recommendations - Redesigned */}
        {resultData?.recommendations && resultData.recommendations.length > 0 && (
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              🌱 {t("resultPage.recommendations")}
            </h2>
            <div className="space-y-4">
              {resultData.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pest Risk */}
        {resultData?.pest_risk && (
          <div className="p-6 bg-red-100 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-red-700 mb-2">{t("resultPage.pestRisk")}</h2>
            <p className="text-gray-800">{resultData.pest_risk}</p>
          </div>
        )}

        {/* Fertilizer Recommendations */}
        {resultData?.fertilizer_recommendations && (
          <div className="p-6 bg-green-100 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-green-700 mb-2">{t("resultPage.fertilizerRecommendations")}</h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-800">
              {resultData.fertilizer_recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Economic Analysis */}
        <EconomicAnalysis resultData={resultData} />

        {/* Report Generator */}
        <ReportGenerator resultData={resultData} />

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

/* 🔹 Reusable small components */
const InfoCard = ({ title, value, color, text }) => (
  <div className={`p-5 ${color} rounded-xl shadow-sm`}>
    <h2 className={`text-lg font-semibold ${text}`}>{title}</h2>
    <p className="text-gray-700 mt-1">{value}</p>
  </div>
);

const WeatherCard = ({ label, value }) => (
  <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
    <h2 className="text-md font-semibold text-gray-800">{label}</h2>
    <p className="text-gray-700 mt-1">{value}</p>
  </div>
);

export default ResultPage;
