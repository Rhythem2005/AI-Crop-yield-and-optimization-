import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/input"); // start flow
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />

     
     
    </div>
  );
};

export default Home;
