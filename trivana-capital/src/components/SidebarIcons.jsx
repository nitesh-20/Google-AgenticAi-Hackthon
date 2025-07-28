// src/components/SidebarIcons.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Bot,
  LineChart,
  Landmark,
  ShoppingBasket,
  BarChart,
} from "lucide-react";
import ProfileButton from "./ProfileButton";
import "../styles/sidebar.css";

const SidebarIcons = ({ user, onLogout }) => {
  const navItems = [
    { icon: <Bot size={20} />, text: "AgroAI", to: "/" },
    { icon: <LineChart size={20} />, text: "Vaayda Bazaar", to: "/charts" },
    { icon: <Landmark size={20} />, text: "Mandi Data", to: "/mandi" },
    { icon: <ShoppingBasket size={20} />, text: "Agri Socio", to: "/order" },
    { icon: <Home size={20} />, text: "Dashboard", to: "/dashboard" },
    { icon: <BarChart size={20} />, text: "Utility Tools", to: "/tools" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-placeholder">AgriAI</div>

      <nav className="nav-links">
        {navItems.map((item, index) => (
          <NavLink
            to={item.to}
            key={index}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            {item.icon}
            <span className="nav-text">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {/* Profile avatar + name */}
        <ProfileButton user={user} />

        {/* Logout button */}
        <button className="nav-item" onClick={onLogout}>
        
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarIcons;
