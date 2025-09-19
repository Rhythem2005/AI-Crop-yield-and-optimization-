// src/components/Dashboard.jsx
import { FaPen, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-700 p-2 rounded-lg">📊</div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {t("dashboardTitle")}
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          {t("dashboardDescription")}
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Data Entry */}
          <div className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80"
                alt={t("manualTitle")}
                className="h-48 w-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white shadow p-2 rounded-full text-green-600">
                <FaPen />
              </button>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-green-600 text-2xl">📄</span>{" "}
                {t("manualTitle")}
              </h3>
              <p className="mt-3 text-gray-600">{t("manualDescription")}</p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li className="flex items-center gap-2 text-green-600">
                  <span>•</span> {t("manualPoints.soil")}
                </li>
                <li className="flex items-center gap-2 text-green-600">
                  <span>•</span> {t("manualPoints.crops")}
                </li>
                <li className="flex items-center gap-2 text-green-600">
                  <span>•</span> {t("manualPoints.weather")}
                </li>
              </ul>
              <button
                onClick={() => navigate("/input")}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
              >
                {t("manualButton")}
              </button>
            </div>
          </div>

          {/* Photo Upload for Analysis */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
                alt={t("uploadTitle")}
                className="h-48 w-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white shadow p-2 rounded-full text-blue-600">
                <FaCamera />
              </button>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-blue-600 text-2xl">📷</span>{" "}
                {t("uploadTitle")}
              </h3>
              <p className="mt-3 text-gray-600">{t("uploadDescription")}</p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li className="flex items-center gap-2 text-blue-600">
                  <span>•</span> {t("uploadPoints.health")}
                </li>
                <li className="flex items-center gap-2 text-blue-600">
                  <span>•</span> {t("uploadPoints.growth")}
                </li>
                <li className="flex items-center gap-2 text-blue-600">
                  <span>•</span> {t("uploadPoints.soil")}
                </li>
              </ul>
              <button
                onClick={() => navigate("/upload")}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                {t("uploadButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
