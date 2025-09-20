// src/pages/PhotoResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { resultData } = location.state || {};

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">{t("photoResult.noResult")}</p>
        <button
          onClick={() => navigate("/photo-upload")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          {t("photoResult.goBack")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">

          {/* Header */}
          <div className="text-center border-b pb-6">
            <h1 className="text-3xl font-extrabold text-green-700">
              🌾 {t("photoResult.header")}
            </h1>
            <p className="text-gray-600 mt-2">{t("photoResult.subHeader")}</p>
          </div>

          {/* Health Score */}
          <div className="p-5 bg-green-50 rounded-xl shadow-sm text-center">
            <h2 className="text-xl font-semibold text-green-800">
              🌱 {t("photoResult.healthScore")}
            </h2>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {resultData.health_score_percent}% {t("photoResult.healthy")}
            </p>
          </div>

          {/* Leaf Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-green-100 rounded-xl shadow-sm text-center">
              <h2 className="text-lg font-semibold text-green-900">
                ✅ {t("photoResult.healthyLeaves")}
              </h2>
              <p className="text-gray-700 mt-1">
                {resultData.leaf_conditions.healthy_green_percent}%
              </p>
            </div>
            <div className="p-5 bg-yellow-100 rounded-xl shadow-sm text-center">
              <h2 className="text-lg font-semibold text-yellow-900">
                🍂 {t("photoResult.yellowLeaves")}
              </h2>
              <p className="text-gray-700 mt-1">
                {resultData.leaf_conditions.yellow_leaves_percent}%
              </p>
            </div>
            <div className="p-5 bg-red-100 rounded-xl shadow-sm text-center">
              <h2 className="text-lg font-semibold text-red-900">
                🟤 {t("photoResult.brownSpots")}
              </h2>
              <p className="text-gray-700 mt-1">
                {resultData.leaf_conditions.brown_spots_percent}%
              </p>
            </div>
          </div>

          {/* Diagnosis */}
          {resultData.diagnosis && resultData.diagnosis.length > 0 && (
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                🩺 {t("photoResult.diagnosis")}
              </h2>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {resultData.diagnosis.map((diag, idx) => (
                  <li key={idx}>{diag}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {resultData.recommendations && resultData.recommendations.length > 0 && (
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                📋 {t("photoResult.recommendations")}
              </h2>
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
              onClick={() => navigate("/upload")}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
            >
              🔙 {t("photoResult.uploadAnother")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoResult;
