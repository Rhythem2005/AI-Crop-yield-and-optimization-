// src/components/Hero.jsx
import { FaPen, FaCamera, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
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

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20 gap-10 h-full">
          
          {/* Left Content */}
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {t("heroTitle")} <br />
              <span className="text-green-400">{t("heroHighlight")}</span>
            </h1>

            <p className="mt-6 text-gray-200 text-lg leading-relaxed max-w-lg">
              {t("heroDescription")}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate('/input')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium shadow transition"
              >
                <FaPen />
                {t("manualButton")}
              </button>
              <button
                onClick={() => navigate('/upload')}
                className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-lg font-medium shadow transition"
              >
                <FaCamera />
                {t("uploadButton")}
              </button>
              <button
                onClick={() => navigate('/mdashboard')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium shadow transition"
              >
                <FaStore />
                Marketplace
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
                  <span className="text-green-700 text-2xl">🌱</span>
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

      {/* Transform Your Farming with AI Intelligence Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Transform Your Farming with AI Intelligence
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Our platform combines cutting-edge AI technology with agricultural expertise to give you 
              actionable insights for better crop yields.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Manual Data Entry */}
            <div className="bg-green-50 rounded-3xl p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FaPen className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manual Data Entry</h3>
              <p className="text-gray-600 leading-relaxed">
                Input your soil conditions, weather data, and crop information for precise AI analysis.
              </p>
            </div>

            {/* Photo Analysis */}
            <div className="bg-blue-50 rounded-3xl p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FaCamera className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Photo Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply upload photos of your crops or soil for instant AI-powered insights and recommendations.
              </p>
            </div>

            {/* Yield Predictions */}
            <div className="bg-yellow-50 rounded-3xl p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">🌾</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Yield Predictions</h3>
              <p className="text-gray-600 leading-relaxed">
                Get accurate yield forecasts to optimize your farming strategies and maximize productivity.
              </p>
            </div>

            {/* Marketplace */}
            <div
              className="bg-purple-50 rounded-3xl p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FaStore className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Marketplace</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect farmers and buyers directly through our secure marketplace for fair trade and better opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
