import React, { useState } from "react";
import { MapPin, Navigation, Eye, Compass, Layers, Info, Check } from "lucide-react";
import { toast } from "react-toastify";

const locationMarkers = {
  mandi: [
    { name: "Indore Central Mandi", dist: "4.2 km", lat: 180, lng: 220, color: "var(--google-blue)" },
    { name: "Rajwada Grain Exchange", dist: "7.8 km", lat: 310, lng: 180, color: "var(--google-blue)" }
  ],
  storage: [
    { name: "Sheetal Cold Storage", dist: "5.5 km", lat: 120, lng: 340, color: "var(--google-yellow)" },
    { name: "Narmada Warehouse", dist: "9.2 km", lat: 250, lng: 410, color: "var(--google-yellow)" }
  ],
  vet: [
    { name: "Government Cattle Clinic", dist: "3.1 km", lat: 220, lng: 150, color: "var(--google-red)" }
  ],
  shop: [
    { name: "Kisan Beej Bhandar", dist: "1.8 km", lat: 140, lng: 210, color: "var(--google-green)" }
  ]
};

export default function MapsExperience() {
  const [layers, setLayers] = useState({
    mandi: true,
    storage: false,
    vet: true,
    shop: false,
  });

  const [satelliteView, setSatelliteView] = useState(true);
  const [farmPolygon, setFarmPolygon] = useState([
    { x: 190, y: 120 },
    { x: 260, y: 130 },
    { x: 275, y: 220 },
    { x: 180, y: 240 }
  ]);

  const [hoveredPoint, setHoveredPoint] = useState(null);

  const toggleLayer = (key) => {
    setLayers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.info(`${key.toUpperCase()} layer toggled.`);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, height: "100%", width: "100%", padding: 24, boxSizing: "border-box", overflow: "hidden" }}>
      
      {/* Left Pane: Interactive SVG Satellite Map Canvas */}
      <div className="glass-panel" style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", padding: 20 }}>
        
        {/* Header Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)" }}>
              <Compass style={{ color: "var(--google-green)" }} />
              <span>AgriMap Satellite Workspace</span>
            </h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Inspect farm boundary plots, NDVI indexes, and locate community logistics.
            </span>
          </div>
          
          <button 
            className="btn-secondary" 
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            onClick={() => {
              setSatelliteView(!satelliteView);
              toast.info(`Switched to ${!satelliteView ? "Satellite Hybrid Layer" : "Vector Street Layer"}`);
            }}
          >
            <Layers size={14} />
            <span>{satelliteView ? "Show Street Map" : "Show Satellite Map"}</span>
          </button>
        </div>

        {/* Dynamic Vector/Satellite Canvas View */}
        <div style={{ flex: 1, position: "relative", borderRadius: "16px", overflow: "hidden", background: satelliteView ? "radial-gradient(circle, #0e1b12 0%, #030805 100%)" : "radial-gradient(circle, #090e18 0%, #030406 100%)", border: "1px solid var(--border-color)" }}>
          
          {/* Mock Grid Lines */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <svg style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
            {/* Draw Farm Boundary Polygon */}
            <polygon 
              points={farmPolygon.map(p => `${p.x},${p.y}`).join(" ")}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="var(--google-green)"
              strokeWidth={2.5}
              style={{ filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))" }}
            />
            
            {/* Draw Boundary vertex markers */}
            {farmPolygon.map((p, idx) => (
              <circle 
                key={idx} 
                cx={p.x} 
                cy={p.y} 
                r={5} 
                fill="white" 
                stroke="var(--google-green)" 
                strokeWidth={2} 
                style={{ cursor: "pointer" }}
              />
            ))}

            {/* Interactive Location Beacons */}
            {Object.keys(layers).map(layerKey => {
              if (!layers[layerKey]) return null;
              return locationMarkers[layerKey].map((m, idx) => (
                <g 
                  key={`${layerKey}-${idx}`}
                  transform={`translate(${m.lat}, ${m.lng})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredPoint(m)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => toast.info(`Navigating to ${m.name} (${m.dist})`)}
                >
                  <circle r={12} fill="none" stroke={m.color} strokeWidth={1.5} style={{ animation: "pulse 1.5s infinite" }} />
                  <circle r={6} fill={m.color} />
                  <text y={-14} textAnchor="middle" fill="white" fontSize={9} fontWeight="600" style={{ pointerEvents: "none" }}>{m.name.split(" ")[0]}</text>
                </g>
              ));
            })}
          </svg>

          {/* Hover popup detail info bar */}
          {hoveredPoint && (
            <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(16,22,34,0.95)", border: "1px solid var(--border-color)", padding: 12, borderRadius: "12px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
              <MapPin size={16} style={{ color: hoveredPoint.color }} />
              <div style={{ fontSize: "0.8rem" }}>
                <strong style={{ display: "block" }}>{hoveredPoint.name}</strong>
                <span style={{ color: "var(--text-secondary)" }}>Distance: {hoveredPoint.dist}</span>
              </div>
            </div>
          )}

          {/* Satellite Coordinate watermark */}
          <div style={{ position: "absolute", bottom: 12, right: 12, fontSize: "0.7rem", fontFamily: "monospace", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
            <Navigation size={10} />
            <span>ALT: 450km • Lat: 22.7196° N • Lng: 75.8577° E</span>
          </div>
        </div>
      </div>

      {/* Right Side: Map Filters & NDVI Indices */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Layer checkboxes */}
        <div className="glass-panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", borderBottom: "1px solid var(--border-color)", paddingBottom: 10 }}>
            Nearby Logistics Layers
          </h4>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { id: "mandi", label: "Mandi Grain Markets", color: "var(--google-blue)" },
              { id: "storage", label: "Cold Storage & Silos", color: "var(--google-yellow)" },
              { id: "vet", label: "Veterinary Clinics", color: "var(--google-red)" },
              { id: "shop", label: "Fertilizer & Seed Shops", color: "var(--google-green)" }
            ].map(layer => (
              <div 
                key={layer.id} 
                onClick={() => toggleLayer(layer.id)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "10px 12px", 
                  borderRadius: "10px", 
                  background: layers[layer.id] ? "rgba(255,255,255,0.03)" : "none", 
                  border: "1px solid", 
                  borderColor: layers[layer.id] ? "rgba(255,255,255,0.08)" : "transparent",
                  cursor: "pointer" 
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: layer.color }} />
                  <span style={{ fontSize: "0.85rem", color: layers[layer.id] ? "white" : "var(--text-secondary)" }}>{layer.label}</span>
                </div>
                {layers[layer.id] && <Check size={14} style={{ color: "var(--google-green)" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* NDVI Satellite Indexes Card */}
        <div className="glass-panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>
            NDVI Vegetation Indexes
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 4 }}>
                <span style={{ color: "var(--text-secondary)" }}>Crop Canopy density (NDVI)</span>
                <strong style={{ color: "var(--google-green)" }}>0.78 (Healthy)</strong>
              </div>
              <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "78%", height: "100%", background: "var(--google-green)" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 4 }}>
                <span style={{ color: "var(--text-secondary)" }}>Ground soil moisture index</span>
                <strong style={{ color: "var(--google-blue)" }}>62% (Moderate)</strong>
              </div>
              <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "62%", height: "100%", background: "var(--google-blue)" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", padding: 12, borderRadius: "12px", marginTop: 8 }}>
              <Info size={14} style={{ color: "var(--google-blue)", flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.3 }}>
                Satellite readings updated 2 hours ago. Next overpass in 14 hours.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
