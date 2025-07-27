// src/components/LogoutButton.jsx
import React from "react";
import { LogOut } from "lucide-react";
import "../styles/sidebar.css";

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={onLogout}>
      <LogOut size={20} />
      <span className="nav-text">Logout</span>
    </button>
  );
};

export default LogoutButton;
