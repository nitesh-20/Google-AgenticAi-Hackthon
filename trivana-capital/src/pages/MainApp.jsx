// src/pages/MainApp.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarIcons";
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

export default function MainApp() {
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

  // Dummy user for sidebar (replace with real auth user if available)
  const user = {
    name: "Profile",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar always visible */}
      <Sidebar user={user} onLogout={handleLogout} />

      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
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
    </div>
  );
}
