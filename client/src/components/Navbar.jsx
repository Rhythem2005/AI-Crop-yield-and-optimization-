// components/Navbar.jsx
import { useTranslation } from "react-i18next";
import {
  FaSeedling,
  FaUserCircle,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMarketplaceClick = () => {
    if (isAuthenticated) {
      navigate("/mdashboard");
    } else {
      navigate("/login");
    }
  };

  const handleInsuranceClick = () => {
    navigate("/selectinsurance");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Left: Logo + App Name */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-green-100 p-2 rounded-xl flex items-center justify-center">
          <FaSeedling className="text-green-700 text-lg" />
        </div>
        <span className="font-bold text-gray-800 text-xl">{t("appName")}</span>
      </div>

      {/* Right: Languages + Insurance + Marketplace + Auth */}
      <div className="flex items-center gap-4">
        {/* Animated Language Switch */}
        <div className="relative flex items-center bg-gray-200 rounded-full p-1">
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`px-4 py-1 rounded-full font-medium transition-all duration-300 ${
              i18n.language === "en"
                ? "bg-green-600 text-white shadow-md scale-105"
                : "text-gray-700 hover:text-green-700"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => i18n.changeLanguage("hi")}
            className={`px-4 py-1 rounded-full font-medium transition-all duration-300 ${
              i18n.language === "hi"
                ? "bg-green-600 text-white shadow-md scale-105"
                : "text-gray-700 hover:text-green-700"
            }`}
          >
            HI
          </button>
        </div>

        {/* Insurance */}
        <button
          onClick={handleInsuranceClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition flex items-center gap-2 shadow-sm"
        >
          <FaShieldAlt className="text-sm" />
          <span>{t("insurance") || "Insurance"}</span>
        </button>

        {/* Marketplace */}
        <button
          onClick={handleMarketplaceClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition shadow-sm"
        >
          {t("marketplace") || "Marketplace"}
        </button>

        {/* Auth buttons */}
        {isAuthenticated ? (
          <>
            <button
              onClick={handleProfileClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-full flex items-center gap-2 transition shadow-sm"
              title={`Welcome, ${user?.name || "User"}`}
            >
              <FaUserCircle className="text-lg" />
              <span className="hidden sm:inline">
                {user?.name || t("profile")}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition shadow-sm"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="hidden sm:inline">{t("logout")}</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition shadow-sm"
          >
            {t("getStarted")}
          </button>
        )}
      </div>
    </nav>
  );
}
