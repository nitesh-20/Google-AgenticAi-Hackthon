import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { 
  Brain, 
  ShoppingBag, 
  Map, 
  BarChart3, 
  User, 
  Settings, 
  Menu, 
  LogOut, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Radio, 
  ShieldCheck 
} from "lucide-react";
import { onAuthStateChanged, logoutUser } from "../firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";

export default function AppContainer() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lang, setLang] = useState("Hindi");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.info("Please log in to access the AgriSahayak AI Workspace.");
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Successfully logged out.");
    navigate("/");
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/app/workspace": return "AI Command Center";
      case "/app/mcp": return "MCP Agent Tree Routing";
      case "/app/marketplace": return "AgriExchange Marketplace";
      case "/app/maps": return "Satellite & Farm Boundary Maps";
      case "/app/analytics": return "Farm Analytics Dashboard";
      case "/app/profile": return "Farmer Profile & Khasra Records";
      case "/app/settings": return "System Settings";
      default: return "AgriSahayak AI Dashboard";
    }
  };

  const menuItems = [
    { name: "AI Command Center", path: "/app/workspace", icon: Brain },
    { name: "MCP Agent Tree", path: "/app/mcp", icon: Radio },
    { name: "AgriExchange", path: "/app/marketplace", icon: ShoppingBag },
    { name: "Satellite Maps", path: "/app/maps", icon: Map },
    { name: "Farm Analytics", path: "/app/analytics", icon: BarChart3 },
    { name: "Farmer Profile", path: "/app/profile", icon: User },
    { name: "Settings", path: "/app/settings", icon: Settings },
  ];

  const notifications = [
    { id: 1, type: "weather", message: "Heavy rainfall predicted in Indore Mandi area over the next 48 hours." },
    { id: 2, type: "scheme", message: "PM-KISAN 17th installment scheme registration closing date extended." },
    { id: 3, type: "price", message: "Wheat prices surged by +2.4% today in Delhi Mandi." }
  ];

  return (
    <div className="app-shell">
      <div className="gradient-mesh">
        <div className="mesh-glow glow-blue"></div>
        <div className="mesh-glow glow-green"></div>
        <div className="mesh-glow glow-yellow"></div>
      </div>

      {/* Collapsible Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">🌾</div>
          {!collapsed && <span className="sidebar-brand">AgriSahayak AI</span>}
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`menu-item ${isActive ? "active" : ""}`}
                title={item.name}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="user-profile-button" title="Sign Out">
            <div className="user-avatar">
              {user?.email ? user.email[0].toUpperCase() : "U"}
            </div>
            {!collapsed && (
              <div className="user-info">
                <span className="user-name">{user?.email ? user.email.split("@")[0] : "Farmer"}</span>
                <span className="user-role">Premium Farmer</span>
              </div>
            )}
            {!collapsed && <LogOut size={16} style={{ marginLeft: "auto", color: "var(--google-red)" }} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-layout">
        {/* Notch Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="toggle-sidebar-btn"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>

          <div className="top-bar-right">
            {/* Connection/Offline status badge */}
            <div 
              className="status-badge" 
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsOfflineMode(!isOfflineMode);
                toast.info(`Switched to ${!isOfflineMode ? "Offline-first Local AI Sync" : "Online Mode"}`);
              }}
            >
              <div className="status-dot" style={{ backgroundColor: isOfflineMode ? "var(--google-yellow)" : "var(--google-green)", boxShadow: isOfflineMode ? "0 0 8px var(--google-yellow)" : "0 0 8px var(--google-green)" }}></div>
              <span>{isOfflineMode ? "Offline GSM Sync" : "Active Core Node"}</span>
            </div>

            {/* Language Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "12px", fontSize: "0.85rem", cursor: "pointer" }}>
              <Globe size={14} />
              <select 
                value={lang} 
                onChange={(e) => {
                  setLang(e.target.value);
                  toast.success(`Language set to ${e.target.value}`);
                }}
                style={{ background: "none", border: "none", color: "white", outline: "none", cursor: "pointer", fontWeight: "600" }}
              >
                <option value="Hindi" style={{ background: "var(--bg-primary)" }}>हिन्दी</option>
                <option value="English" style={{ background: "var(--bg-primary)" }}>English</option>
                <option value="Tamil" style={{ background: "var(--bg-primary)" }}>தமிழ்</option>
                <option value="Telugu" style={{ background: "var(--bg-primary)" }}>తెలుగు</option>
                <option value="Kannada" style={{ background: "var(--bg-primary)" }}>ಕನ್ನಡ</option>
                <option value="Marathi" style={{ background: "var(--bg-primary)" }}>मराठी</option>
              </select>
            </div>

            {/* Notification Bell */}
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 6, position: "relative" }}
              >
                <Bell size={20} />
                <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, background: "var(--google-red)", borderRadius: "50%" }}></span>
              </button>
              
              {showNotifications && (
                <div style={{ position: "absolute", top: "100%", right: 0, width: 320, background: "rgba(16,22,34,0.95)", backdropFilter: "blur(20px)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: 16, marginTop: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 100 }}>
                  <h4 style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, borderBottom: "1px solid var(--border-color)", paddingBottom: 8 }}>
                    <span>Alerts & Notifications</span>
                    <span style={{ color: "var(--google-red)", fontSize: "0.8rem" }}>3 new</span>
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ fontSize: "0.85rem", color: "var(--text-secondary)", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: 8 }}>
                        {n.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic page container view */}
        <section className="content-pane">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
