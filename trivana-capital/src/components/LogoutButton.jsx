// src/components/LogoutButton.jsx
import React from "react";
import { LogOut } from "lucide-react";
import "../index.css";

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="nav-item" onClick={onLogout} aria-label="Logout" title="Logout">
      <LogOut size={18} />
      <span className="nav-text">Logout</span>
    </button>
  );
};

export default LogoutButton;
