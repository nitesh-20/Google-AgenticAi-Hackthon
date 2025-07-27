// src/UtilityTools/LandMap.jsx
import React, { useState } from "react";
import "./UtilityTools.css";

const DEMO_PLOTS = [
  { id: "101", owner: "राम कुमार", crop: "गेहूँ", x: 40, y: 60 },
  { id: "102", owner: "सीता देवी", crop: "सोयाबीन", x: 140, y: 60 },
  { id: "103", owner: "विवेक सिंह", crop: "मक्का", x: 90, y: 120 },
];

export default function LandMap() {
  const [khasra, setKhasra] = useState("101");

  const selPlot = DEMO_PLOTS.find(p => p.id === khasra);

  return (
    <div className="ut-page">
      <h2>भू-नक्शा (डेमो)</h2>

      <div className="ut-form-row">
        <label>State:</label>
        <select><option>मध्य प्रदेश</option></select>

        <label>District:</label>
        <select><option>इंदौर</option></select>

        <label>Village:</label>
        <select><option>रामपुरा</option></select>

        <label>खसरा नंबर:</label>
        <select value={khasra} onChange={e => setKhasra(e.target.value)}>
          {DEMO_PLOTS.map(p => <option key={p.id}>{p.id}</option>)}
        </select>
      </div>

      <svg className="land-svg" width="260" height="180">
        {DEMO_PLOTS.map(p => (
          <rect
            key={p.id}
            x={p.x}
            y={p.y}
            width="80"
            height="50"
            fill={p.id === khasra ? "#00c853" : "#37474f"}
            stroke="#fafafa"
            strokeWidth="2"
          />
        ))}
        {DEMO_PLOTS.map(p => (
          <text
            key={p.id + "-t"}
            x={p.x + 40}
            y={p.y + 28}
            fill="#fff"
            fontSize="14"
            textAnchor="middle"
          >
            {p.id}
          </text>
        ))}
      </svg>

      <div className="map-info">
        <p><b>Owner:</b> {selPlot.owner}</p>
        <p><b>Crop:</b> {selPlot.crop}</p>
        <p className="note">यह केवल डेमो दृश्य है, आधिकारिक रिकॉर्ड नहीं।</p>
      </div>
    </div>
  );
}
