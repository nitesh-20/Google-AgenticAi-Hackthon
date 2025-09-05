// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Bell, User } from "lucide-react";
import "./navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "AgroAI" },
    { to: "/charts", label: "Market" },
    { to: "/mandi", label: "Mandi" },
    { to: "/order", label: "Agri Socio" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
  ];

  return (
    <header className="nav-wrap">
      <div className="nav-left">
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div className="brand">
          <img src="/src/assets/logo.jpeg" alt="Trivana" className="brand-logo" />
          <span className="brand-text">AgriAI</span>
        </div>
        {user && (
          <button className="logout-btn" onClick={onLogout} title="Logout">Logout</button>
        )}
      </div>

      <nav className={`nav-center ${open ? "open" : ""}`} aria-label="Primary">
        {navItems.map((n) => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-right">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <div className="user-menu">
          <img src={user?.photoURL || user?.avatar || "/placeholder.svg"} alt={user?.displayName || user?.name} className="user-avatar" />
          <div className="user-dropdown">
            <div className="user-name">{user?.displayName || user?.name}</div>
            <NavLink to="/profile" className="user-action">Profile</NavLink>
            <button className="user-action logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
