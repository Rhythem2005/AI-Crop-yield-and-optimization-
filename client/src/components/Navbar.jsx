import { useTranslation } from "react-i18next";
import { FaSeedling } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      <div className="flex items-center gap-2">
        <div className="bg-green-100 p-2 rounded-xl flex items-center justify-center">
          <FaSeedling className="text-green-700 text-lg" />
        </div>
        <button onClick={() => navigate("/")} className="font-semibold text-gray-800 text-lg">
          {t("appName")}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => i18n.changeLanguage("en")} className="bg-green-600 text-white px-3 py-2 rounded-full">
          EN
        </button>
        <button onClick={() => i18n.changeLanguage("hi")} className="bg-green-600 text-white px-3 py-2 rounded-full">
          HI
        </button>
        <button onClick={() => navigate("/login")} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition">
          {t("getStarted")}
        </button>
      </div>
    </nav>
  );
}
