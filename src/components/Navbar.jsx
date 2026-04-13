import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import trivana from "../assets/trivana.jpeg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar notch-style">
      <div className="notch-box">
        {/* Left: Logo and Title */}
        <div className="logo-container">
          <Link to="/">
            <img
              src={trivana}
              alt="Logo"
              className="logo-img"
            />
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="brand-text">AgroAi</span>
          </Link>
        </div>

        {/* Right: Desktop Menu */}
        <div className="desktop-menu">
          <Link to="/ai-tools" className="menu-link">AI Tools</Link>
          <Link to="/exchange" className="menu-link">Exchange</Link>
          <Link to="/login" className="menu-link">Login</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hamburger-btn"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/ai-tools" className="menu-link" onClick={() => setIsOpen(false)}>AI Tools</Link>
          <Link to="/exchange" className="menu-link" onClick={() => setIsOpen(false)}>Exchange</Link>
          <Link to="/login" className="menu-link" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;