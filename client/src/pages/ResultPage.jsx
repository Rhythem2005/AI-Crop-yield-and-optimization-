// src/pages/ResultPage.jsx
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

        {/* Crop Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-green-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-green-800">
              {t("resultPage.cropChosen")}
            </h2>
            <p className="text-gray-700 mt-1">
              {resultData.crop_name || "N/A"}
            </p>
          </div>

          <div className="p-5 bg-blue-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-blue-800">
              {t("resultPage.sowingDate")}
            </h2>
            <p className="text-gray-700 mt-1">
              {resultData.sowing_date || "Not Provided"}
            </p>
          </div>
        </div>

        {/* Yield & Production */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-yellow-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-800">
              {t("resultPage.predictedYield")}
            </h2>
            <p className="text-gray-700 mt-1">
              {resultData.predicted_yield_kgha?.toFixed(2)} kg/ha
            </p>
          </div>

          <div className="p-5 bg-orange-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-orange-800">
              {t("resultPage.totalProduction")}
            </h2>
            <p className="text-gray-700 mt-1">
              {resultData.total_production_tonnes?.toFixed(2)} tonnes
            </p>
          </div>
        </div>

        {/* Recommendations */}
        {resultData.recommendations && (
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {t("resultPage.recommendations")}
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
