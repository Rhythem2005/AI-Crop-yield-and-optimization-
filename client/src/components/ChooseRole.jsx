import React, { useState } from "react";
import { Users, Wheat, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChooseRole = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = (role) => {
    console.log(`Continuing as ${role}`);
    if (role === "farmer") navigate("/farmerdashboard");
    else if (role === "buyer") navigate("/buyerdashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t("chooseRole.title")}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t("chooseRole.subtitle")}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Farmer Card */}
          <div
            className={`bg-white rounded-3xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              selectedRole === "farmer" ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => handleRoleSelect("farmer")}
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Wheat className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("chooseRole.farmer.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("chooseRole.farmer.description")}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {t("chooseRole.farmer.features", { returnObjects: true }).map(
                (feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                )
              )}
            </div>

            {/* Continue Button */}
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
              onClick={() => handleContinue("farmer")}
            >
              <Wheat className="w-5 h-5" />
              {t("chooseRole.farmer.continue")}
            </button>
          </div>

          {/* Buyer Card */}
          <div
            className={`bg-white rounded-3xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              selectedRole === "buyer" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleRoleSelect("buyer")}
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("chooseRole.buyer.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("chooseRole.buyer.description")}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {t("chooseRole.buyer.features", { returnObjects: true }).map(
                (feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                )
              )}
            </div>

            {/* Continue Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
              onClick={() => handleContinue("buyer")}
            >
              <ShoppingBag className="w-5 h-5" />
              {t("chooseRole.buyer.continue")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
