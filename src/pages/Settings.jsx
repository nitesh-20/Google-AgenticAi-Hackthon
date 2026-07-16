import React, { useState } from "react";
import { Settings, Eye, Globe, Shield, HelpCircle, HardDrive } from "lucide-react";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const [offlineSync, setOfflineSync] = useState(true);
  const [accessibility, setAccessibility] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState("1.0x");

  const handleSave = () => {
    toast.success("Settings updated successfully.");
  };

  return (
    <div className="glass-panel" style={{ padding: 24, maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--border-color)", paddingBottom: 10 }}>
        <Settings style={{ color: "var(--google-green)" }} />
        <span>System Configuration</span>
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        
        {/* Offline cache settings */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <HardDrive size={16} />
              <span>Offline Database Sync</span>
            </h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Pre-fetch mandi lists and satellite imagery local cache.</span>
          </div>
          <input 
            type="checkbox" 
            checked={offlineSync} 
            onChange={(e) => setOfflineSync(e.target.checked)}
            style={{ width: 40, height: 20, cursor: "pointer" }}
          />
        </div>

        {/* Accessibility modes */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Eye size={16} />
              <span>Accessibility Font Mode</span>
            </h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Increase UI text size and amplify contrast ratios.</span>
          </div>
          <input 
            type="checkbox" 
            checked={accessibility} 
            onChange={(e) => setAccessibility(e.target.checked)}
            style={{ width: 40, height: 20, cursor: "pointer" }}
          />
        </div>

        {/* Voice dialect settings */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Globe size={16} />
              <span>Text-To-Speech Speed</span>
            </h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Configure sound output playback rate.</span>
          </div>
          <select 
            value={voiceSpeed}
            onChange={(e) => setVoiceSpeed(e.target.value)}
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", color: "white", padding: 6, borderRadius: "8px", outline: "none" }}
          >
            <option value="0.8x">0.8x (Slower)</option>
            <option value="1.0x">1.0x (Normal)</option>
            <option value="1.2x">1.2x (Faster)</option>
          </select>
        </div>

      </div>

      <button className="btn-primary" style={{ marginTop: 12, justifyContent: "center" }} onClick={handleSave}>
        Save Configuration
      </button>
    </div>
  );
}
