// src/components/DataTips.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const DataTips = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t("dataTips.title")}
      </h2>

      {/* Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* pH Levels */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">{t("dataTips.ph.title")}</h3>
            <div className="mt-1 flex flex-col gap-1 text-sm">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                {t("dataTips.ph.optimal")}
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                {t("dataTips.ph.caution")}
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                {t("dataTips.ph.critical")}
              </span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">{t("dataTips.humidity.title")}</h3>
            <div className="mt-1 flex flex-col gap-1 text-sm">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                {t("dataTips.humidity.good")}
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                {t("dataTips.humidity.bad")}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{t("dataTips.humidity.note")}</p>
          </div>
        </div>

        {/* Temperature */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">{t("dataTips.temperature.title")}</h3>
            <div className="mt-1 flex flex-col gap-1 text-sm">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
                {t("dataTips.temperature.good")}
              </span>
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                {t("dataTips.temperature.bad")}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{t("dataTips.temperature.note")}</p>
          </div>
        </div>

        {/* NPK Format */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5 mr-3"></div>
          <div>
            <h3 className="font-semibold text-gray-800">{t("dataTips.npk.title")}</h3>
            <p className="text-gray-700 text-sm">{t("dataTips.npk.desc")}</p>
            <p className="text-gray-700 text-sm">{t("dataTips.npk.example")}</p>
            <p className="text-xs text-gray-600 mt-1">{t("dataTips.npk.note")}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataTips;
