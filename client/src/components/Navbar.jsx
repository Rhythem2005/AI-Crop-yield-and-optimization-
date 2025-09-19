import { useTranslation } from "react-i18next";
import { FaSeedling, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the auth context

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Use auth context

  const handleLogout = () => {
    logout(); // Use context logout function
    navigate("/"); // Redirect to home instead of login
  };

  const handleMarketplaceClick = () => {
    if (isAuthenticated) {
      navigate("/mdashboard");
    } else {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2">
        <div className="bg-green-100 p-2 rounded-xl flex items-center justify-center">
          <FaSeedling className="text-green-700 text-lg" />
        </div>
        <button
          onClick={() => navigate("/")}
          className="font-semibold text-gray-800 text-lg"
        >
          {t("appName")}
        </button>
      </div>

      {/* Right: Languages + Marketplace + Auth */}
      <div className="flex items-center gap-3">
        {/* Language buttons */}
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={`px-3 py-2 rounded-full font-medium transition ${
            i18n.language === "en"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => i18n.changeLanguage("hi")}
          className={`px-3 py-2 rounded-full font-medium transition ${
            i18n.language === "hi"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          HI
        </button>

        {/* Marketplace */}
        <button
          onClick={handleMarketplaceClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition"
        >
          Marketplace
        </button>

        {/* Auth buttons */}
        {isAuthenticated ? (
          <>
            <button
              onClick={handleProfileClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-full flex items-center gap-1 transition"
              title={`Welcome, ${user?.name || "User"}`}
            >
              <FaUserCircle /> 
              <span className="hidden sm:inline">
                {user?.name || t("profile")}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-1 transition"
            >
              <FaSignOutAlt /> 
              <span className="hidden sm:inline">{t("logout")}</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition"
          >
            {t("getStarted")}
          </button>
        )}
      </div>
    </nav>
  );
}