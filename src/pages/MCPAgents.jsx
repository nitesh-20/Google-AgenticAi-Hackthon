import React, { useState } from "react";
import { BrainCircuit, Play, CheckCircle, HelpCircle, Activity } from "lucide-react";
import { toast } from "react-toastify";

const nodes = [
  { id: "root", name: "Root Router Agent", desc: "Coordinates incoming queries, parses syntax, extracts coordinate intents.", type: "core", status: "idle", x: 400, y: 50 },
  
  // Sowing & Soil
  { id: "soil", name: "Soil Agent", desc: "Analyzes NPK, moisture and ground soil salinity levels.", type: "agronomy", status: "idle", x: 150, y: 180 },
  { id: "disease", name: "Disease Agent", desc: "Recognizes crop fungal, bacterial, and pest infestations.", type: "agronomy", status: "idle", x: 280, y: 180 },
  
  // Market & Finance
  { id: "market", name: "Market Agent", desc: "Monitors daily grain prices and mandi volumes.", type: "finance", status: "idle", x: 410, y: 180 },
  { id: "insurance", name: "Insurance Agent", desc: "Audits crop failure policies and government subsidies.", type: "finance", status: "idle", x: 540, y: 180 },
  
  // Utilities
  { id: "weather", name: "Weather Agent", desc: "Interfaces with Doppler radars and microclimate sensors.", type: "utility", status: "idle", x: 670, y: 180 },
  
  // Leaf child nodes under Agronomy
  { id: "pest", name: "Pest Classifier", desc: "Sub-specialist diagnosing insect damage profiles.", type: "leaf", status: "idle", x: 215, y: 310 },
  
  // Leaf child nodes under Market
  { id: "transport", name: "Logistics Router", desc: "Calculates truck routes and matches local carriers.", type: "leaf", status: "idle", x: 410, y: 310 },
  { id: "finance_sub", name: "Subsidies Matcher", desc: "Checks farmer land registries against active schemes.", type: "leaf", status: "idle", x: 540, y: 310 }
];

const connections = [
  { from: "root", to: "soil" },
  { from: "root", to: "disease" },
  { from: "root", to: "market" },
  { from: "root", to: "insurance" },
  { from: "root", to: "weather" },
  { from: "disease", to: "pest" },
  { from: "market", to: "transport" },
  { from: "insurance", to: "finance_sub" }
];

export default function MCPAgents() {
  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const [activeRoute, setActiveRoute] = useState([]);
  const [consoleLogs, setConsoleLogs] = useState([
    "AgriSahayak Multi-Agent Command Protocol Node [v2.5.0-Bharat] initialized.",
    "System status: ONLINE. 9 core agents running. Ready for routing."
  ]);
  const [simulating, setSimulating] = useState(false);

  const simulateRouting = async (targetId) => {
    if (simulating) return;
    setSimulating(true);
    setConsoleLogs([]);

    // Find the routing path from root to target
    const path = ["root"];
    if (targetId !== "root") {
      // Direct path finding for our simple tree layout
      if (targetId === "pest") {
        path.push("disease", "pest");
      } else if (targetId === "transport") {
        path.push("market", "transport");
      } else if (targetId === "finance_sub") {
        path.push("insurance", "finance_sub");
      } else {
        path.push(targetId);
      }
    }

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    
    // Cycle through path nodes
    for (let i = 0; i < path.length; i++) {
      const nodeId = path[i];
      const node = nodes.find(n => n.id === nodeId);
      
      setActiveRoute(path.slice(0, i + 1));
      
      setConsoleLogs(prev => [
        ...prev,
        `[MCP Info] Activating node [${node.name}]...`
      ]);
      
      if (nodeId === "root") {
        setConsoleLogs(prev => [...prev, `[MCP Root] Analyzing intent and matching routing tags...`]);
      } else {
        setConsoleLogs(prev => [...prev, `[MCP Router] Context memory mapped to ${node.name}.`]);
      }
      
      await sleep(1000);
    }

    setConsoleLogs(prev => [
      ...prev,
      `✨ Query successfully answered by [${nodes.find(n => n.id === targetId).name}].`,
      `[MCP Output] Session complete. Routing channels cleared.`
    ]);
    setSimulating(false);
  };

  const getStatusColor = (nodeId) => {
    if (activeRoute.includes(nodeId)) {
      return "var(--google-green)";
    }
    return "var(--text-muted)";
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, height: "100%", width: "100%", padding: 24, boxSizing: "border-box", overflow: "hidden" }}>
      {/* Dynamic SVG Drawing Panel */}
      <div className="glass-panel" style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)" }}>
              <BrainCircuit style={{ color: "var(--google-green)" }} />
              <span>MCP Active Routing Web</span>
            </h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Click any sub-agent node to simulate the Multi-Agent Command Protocol routing.
            </span>
          </div>
          
          <div style={{ display: "flex", gap: 12 }}>
            <button 
              className="btn-primary" 
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              disabled={simulating}
              onClick={() => simulateRouting("pest")}
            >
              <Play size={14} />
              <span>Simulate Pest Query</span>
            </button>
            <button 
              className="btn-secondary" 
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              disabled={simulating}
              onClick={() => simulateRouting("transport")}
            >
              <Play size={14} />
              <span>Simulate Mandi Freight</span>
            </button>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div style={{ flex: 1, position: "relative", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: "16px", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyItems: "center" }}>
          <svg style={{ width: "100%", height: "100%", minHeight: 400 }} viewBox="0 0 800 400">
            {/* Draw Connecting Lines */}
            {connections.map((c, idx) => {
              const fromNode = nodes.find(n => n.id === c.from);
              const toNode = nodes.find(n => n.id === c.to);
              const isLineActive = activeRoute.includes(c.from) && activeRoute.includes(c.to);
              return (
                <line 
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isLineActive ? "var(--google-green)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={isLineActive ? 3 : 1.5}
                  strokeDasharray={isLineActive ? "5,5" : "none"}
                  style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                />
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isActive = activeRoute.includes(node.id);
              const isSelected = selectedNode.id === node.id;
              
              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedNode(node);
                    simulateRouting(node.id);
                  }}
                >
                  {/* Dynamic pulse rings */}
                  {isActive && (
                    <circle 
                      r={24} 
                      fill="none" 
                      stroke="var(--google-green)" 
                      strokeWidth={1.5} 
                      style={{ animation: "pulse 1.5s infinite" }} 
                    />
                  )}
                  
                  {/* Node Outer Circle */}
                  <circle 
                    r={18} 
                    fill={isSelected ? "var(--google-green)" : "rgba(16,22,34,0.9)"} 
                    stroke={isSelected ? "white" : isActive ? "var(--google-green)" : "rgba(255,255,255,0.15)"} 
                    strokeWidth={isSelected ? 3 : 1.5}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  
                  {/* Symbol character inside node */}
                  <text 
                    textAnchor="middle" 
                    dy=".3em" 
                    fill={isSelected ? "black" : "white"} 
                    fontSize={10} 
                    fontWeight="bold"
                  >
                    {node.id === "root" ? "🤖" : node.name[0]}
                  </text>
                  
                  {/* Node Title text below circle */}
                  <text 
                    textAnchor="middle" 
                    y={32} 
                    fill={isActive ? "var(--google-green)" : "var(--text-secondary)"} 
                    fontSize={10} 
                    fontWeight="600"
                  >
                    {node.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Live Terminal Output Panel */}
        <div style={{ height: 120, background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px 16px", marginTop: 16, fontFamily: "monospace", overflowY: "auto", fontSize: "0.8rem", color: "#34a853" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", marginBottom: 6, fontSize: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 4 }}>
            <Activity size={12} />
            <span>MCP Routing Debug Output</span>
          </div>
          {consoleLogs.map((log, idx) => (
            <div key={idx} style={{ marginBottom: 4 }}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Details Pane */}
      <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: 10 }}>
          Agent Details
        </h4>
        
        <div>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700" }}>Active Model Config</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "800", marginTop: 4 }}>
            {selectedNode.name}
          </h3>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700" }}>Role Scope</span>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 4 }}>
            {selectedNode.desc}
          </p>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700" }}>Metadata Tools</span>
          <ul style={{ fontSize: "0.85rem", color: "var(--text-secondary)", listStyle: "none", marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={14} style={{ color: "var(--google-green)" }} />
              <span>Context Fetch Node</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={14} style={{ color: "var(--google-green)" }} />
              <span>Semantic Similarity Tool</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={14} style={{ color: "var(--google-green)" }} />
              <span>Sub-Routing Memory Pipe</span>
            </li>
          </ul>
        </div>

        <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <HelpCircle size={14} />
            <span>Click nodes inside the network web to toggle focus metrics.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
