import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation(); // hook for translations

  useEffect(() => {
    // Check token every time component mounts
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // convert to boolean
  }, []);

  return (
    <div>
      <Header />

      {/* Only show Get Started if NOT logged in */}
      {!isLoggedIn && (
        <div className="text-center mt-8">
          <a
            href="/auth"
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition"
          >
            {t("getStarted")} {/* Translated text */}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
