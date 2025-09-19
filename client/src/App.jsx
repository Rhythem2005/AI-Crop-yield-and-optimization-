import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Input from "./pages/Input";
import Upload from "./pages/Upload";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar"; // ✅ keep language switcher accessible
import "./i18n"; // ✅ import i18n so translations load

const App = () => {
  return (
    <div>
      {/* Global Navbar with language switcher */}
      <Navbar />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
};

export default App;
