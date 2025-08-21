// src/pages/MainApp.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FarmerDashboard from "./FarmerDashboard";
import TradingExchange from "./TradingExchange";
import MarketCharts from "./MarketCharts";
import MandiData from "./MandiData";
import AgroAI from "./AgroAI";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AgriSocio from "./AgriSocio";
import LandMap from "../UtilityTools/LandMap";
import UtilityTools from "../UtilityTools";
import ProfilePage from "./ProfilePage";

export default function MainApp({ user: authUser }) {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const user =
    authUser ?? {
      name: "Profile",
      avatar:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main content area adjusted for top navbar */}
      <main className="main-area">
        <div className="container-wide">
          {/* Page-specific headers moved into each page (e.g. AgroAI shows welcome) */}

          <Routes>
            <Route path="/" element={<AgroAI />} />
            <Route path="/exchange" element={<TradingExchange />} />
            <Route path="/charts" element={<MarketCharts />} />
            <Route path="/mandi" element={<MandiData />} />
            <Route path="/order" element={<AgriSocio />} />
            <Route path="/dashboard" element={<FarmerDashboard />} />
            <Route path="/landmap" element={<LandMap />} />
            <Route path="/tools/*" element={<UtilityTools />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
