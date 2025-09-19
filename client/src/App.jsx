// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Input from "./pages/Input";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";
import "./i18n";
import PhotoUpload from "./pages/PhotoUpload";
import PhotoResult from "./pages/PhotoResult";
import Footer from "./components/Footer";
import MarketDashboard from "./pages/MarketDashboard";
import Fdashboard from "./pages/Fdashboard";
import Bdashboard from "./pages/Bdashboard";
import Fproduct from "./pages/Fproduct";
import Bproduct from "./pages/Bproduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ChatBot from "./components/ChatBot"; 

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />

        {/* Define routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/input"
            element={
              <ProtectedRoute>
                <Input />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo-result"
            element={
              <ProtectedRoute>
                <PhotoResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <PhotoUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mdashboard"
            element={
              <ProtectedRoute>
                <MarketDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmerdashboard"
            element={
              <ProtectedRoute>
                <Fdashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyerdashboard"
            element={
              <ProtectedRoute>
                <Bdashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Fproduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bproduct"
            element={
              <ProtectedRoute>
                <Bproduct />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ChatBot />

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
