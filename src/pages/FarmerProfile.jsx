import React, { useState } from "react";
import { User, Wallet, Award, ShieldCheck, FileCheck, Landmark, Plus, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

export default function FarmerProfile() {
  const [walletBalance, setWalletBalance] = useState(12450);
  const [refreshing, setRefreshing] = useState(false);

  // Khasra records list
  const [khasraRecords, setKhasraRecords] = useState([
    { id: "KH-420-A", location: "Indore Tehsil, Plot 14", area: "4.2 Hectares", soilType: "Black Clay", verified: true },
    { id: "KH-420-B", location: "Indore Tehsil, Plot 15", area: "2.8 Hectares", soilType: "Alluvial Silty", verified: true },
    { id: "KH-312-C", location: "Ujjain Boundary, Plot 09", area: "3.5 Hectares", soilType: "Red Clay", verified: false }
  ]);

  const handleWithdraw = () => {
    toast.success(`Successfully initiated withdrawal of ₹${walletBalance} to your KCC linked Bank Account.`);
    setWalletBalance(0);
  };

  const handleSyncRecords = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1200));
    setRefreshing(false);
    toast.success("Land registries successfully synchronized with Bhu-Abhilekh API nodes.");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, padding: 24, height: "100%", width: "100%", boxSizing: "border-box", overflowY: "auto" }}>
      
      {/* Left Pane: Farmer Info, Land Records and Badges */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Profile Info Summary Card */}
        <div className="glass-panel" style={{ padding: 24, display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, var(--google-green), #0f9d58)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "white" }}>
            👨‍🌾
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>Nitesh Sahu</h2>
              <span style={{ fontSize: "0.75rem", background: "rgba(52, 168, 83, 0.15)", color: "var(--google-green)", padding: "2px 8px", borderRadius: "20px", fontWeight: "600" }}>Verified Owner</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 4 }}>
              Location: Indore District, Madhya Pradesh • Active since 2018
            </p>
            <span style={{ fontSize: "0.8rem", color: "var(--google-blue)", display: "block", marginTop: 6, fontWeight: "500" }}>
              Primary Crops: Sharbati Wheat, Yellow Soyabean
            </span>
          </div>
        </div>

        {/* Khasra Land Records List */}
        <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Government Khasra Registries</h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Verify digitized land boundary shapes linked to your profile.</span>
            </div>
            <button 
              className="btn-secondary" 
              style={{ padding: "8px 12px", gap: 6 }} 
              disabled={refreshing}
              onClick={handleSyncRecords}
            >
              <RefreshCw size={14} className={refreshing ? "spin" : ""} />
              <span>Sync Records</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {khasraRecords.map(rec => (
              <div 
                key={rec.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  background: "rgba(255,255,255,0.01)", 
                  border: "1px solid var(--border-color)", 
                  padding: 16, 
                  borderRadius: "16px" 
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h4 style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 700 }}>{rec.id}</h4>
                    {rec.verified ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "var(--google-green)", background: "rgba(52,168,83,0.1)", padding: "2px 6px", borderRadius: "10px", fontWeight: "600" }}>
                        <ShieldCheck size={10} />
                        Verified
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.03)", padding: "2px 6px", borderRadius: "10px" }}>
                        Pending Sync
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginTop: 4 }}>
                    {rec.location} • Area: {rec.area} • Soil: {rec.soilType}
                  </span>
                </div>
                
                <button 
                  className="btn-secondary" 
                  style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                  onClick={() => toast.info(`Viewing interactive map plot for land record ${rec.id}`)}
                >
                  View Plot
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Side: Wallet & Achievement Badges */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Credit Wallet Widget */}
        <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Wallet size={16} style={{ color: "var(--google-green)" }} />
            <span>Kisan Credit Wallet</span>
          </h4>

          <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: 20, textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Available Seeds Balance</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", color: "var(--google-green)", marginTop: 6, marginBottom: 12 }}>
              ₹{walletBalance.toLocaleString()}
            </h2>
            <button 
              className="btn-primary" 
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleWithdraw}
              disabled={walletBalance === 0}
            >
              <Landmark size={16} />
              <span>Withdraw to Bank</span>
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button className="btn-secondary" style={{ flex: 1, padding: "8px 12px", fontSize: "0.8rem", gap: 4 }} onClick={() => toast.info("Seeds line credit requested.")}>
              <Plus size={14} />
              <span>Request Credit</span>
            </button>
          </div>
        </div>

        {/* Achievement Badges Card */}
        <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={16} style={{ color: "var(--google-yellow)" }} />
            <span>Achievements</span>
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { badge: "Soil Master", desc: "NPK minerals composition updated.", icon: "🏜️", color: "rgba(251,188,5,0.15)" },
              { badge: "Organic Cultivator", desc: "No biological chemical farming.", icon: "🍃", color: "rgba(52,168,83,0.15)" },
              { badge: "High Yield '24", desc: "Beat seasonal average target yield.", icon: "🌾", color: "rgba(66,133,244,0.15)" }
            ].map((a, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "8px", background: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                  {a.icon}
                </div>
                <div>
                  <h5 style={{ fontSize: "0.85rem", fontWeight: 600 }}>{a.badge}</h5>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{a.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
