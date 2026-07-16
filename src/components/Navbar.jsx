import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, logoutUser } from "../firebase/auth";
import { auth } from "../firebase/config";
import "../styles/Navbar.css";
import trivana from "../assets/trivana.jpeg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className="navbar notch-style">
      <div className="notch-box">
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

        <div className="desktop-menu">
          <Link to="/ai-tools" className="menu-link">AI Tools</Link>
          <Link to="/exchange" className="menu-link">Exchange</Link>
          {user ? (
            <>
              <span className="menu-link" style={{color: '#999', cursor: 'default'}}>{user.email}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}
                className="menu-link"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="menu-link">Login</Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hamburger-btn"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <Link to="/ai-tools" className="menu-link" onClick={() => setIsOpen(false)}>AI Tools</Link>
          <Link to="/exchange" className="menu-link" onClick={() => setIsOpen(false)}>Exchange</Link>
          {user ? (
             <button 
               onClick={() => { handleLogout(); setIsOpen(false); }} 
               className="menu-link" 
               style={{ background: 'none', border: 'none', color: 'red', textAlign: 'left', padding: '1rem', width: '100%' }}
             >
               Logout
             </button>
          ) : (
            <Link to="/login" className="menu-link" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;