// src/UtilityTools/index.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./UtilityTools.css";

import WeatherForecast from "./WeatherForecast";
import LandMap from "./LandRecordMap";
import Compass from "./Compass";
import LandMeasuringTool from "./LandMeasureTool";
import AgriSeed from "./AgriSeed";
import MachineEquipment from "./MachineEquipment";
import MedicineInfo from "./MedicineInfo";

const tools = [
  {
    key: "weather",
    name: "Weather",
    desc: "Current weather & 5-day forecast. Search by city, state, or auto-location.",
    icon: "🌦️",
    component: WeatherForecast,
  },
  {
    key: "landmap",
    name: "Land Map",
    desc: "MP Kisaan–style land view: select state, district, khasra and see plot details.",
    icon: "🗺️",
    component: LandMap,
  },
  {
    key: "compass",
    name: "Compass",
    desc: "Live compass showing your device's direction. Stylish and accurate.",
    icon: "🧭",
    component: Compass,
  },
  {
    key: "landmeasure",
    name: "Land Measuring Tool",
    desc: "Track your walk on land, measure distance, and get alerts if you go out of boundary.",
    icon: "📏",
    component: LandMeasuringTool,
  },
  {
    key: "agriseed",
    name: "Agri Seed Info",
    desc: "Find details and prices for popular agricultural seeds.",
    icon: "🌱",
    component: AgriSeed,
  },
  {
    key: "machineeq",
    name: "Machine/Equipment Info",
    desc: "Browse farm machines and equipment with prices.",
    icon: "🚜",
    component: MachineEquipment,
  },
  {
    key: "medicine",
    name: "Medicine Info",
    desc: "See crop medicines, brands, and prices.",
    icon: "💊",
    component: MedicineInfo,
  },
];

export default function UtilityTools() {
  const navigate = useNavigate();

  return (
    <div className="ut-main">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="ut-grid-title">Utility Tools</h1>
              <div className="ut-tool-grid">
                {tools.map(tool => (
                  <div
                    className="ut-tool-card"
                    key={tool.key}
                    tabIndex={0}
                    role="button"
                    aria-label={tool.name}
                    onClick={() => navigate(tool.key)}
                    onKeyDown={e =>
                      (e.key === "Enter" || e.key === " ") && navigate(tool.key)
                    }
                  >
                    <span className="ut-tool-icon">{tool.icon}</span>
                    <span className="ut-tool-name">{tool.name}</span>
                    <span className="ut-tool-desc">{tool.desc}</span>
                  </div>
                ))}
              </div>
            </>
          }
        />
        {tools.map(({ key, component: Comp, name }) => (
          <Route
            path={key}
            key={key}
            element={
              <div className="ut-tool-detail">
                <button className="ut-back-btn" onClick={() => navigate("/tools")}>
                  ← Back to Tools
                </button>
                <h2 className="ut-feature-head">{name}</h2>
                <Comp />
              </div>
            }
          />
        ))}
      </Routes>
    </div>
  );
}
