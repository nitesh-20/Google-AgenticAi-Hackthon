import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  Search, 
  HeartHandshake, 
  Truck, 
  Dna, 
  Satellite, 
  BarChart, 
  Calculator, 
  PieChart, 
  Mic, 
  WifiOff, 
  FileText, 
  BookOpen 
} from "lucide-react";
import "../styles/Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  useEffect(() => {
    // Parallax floating particle canvas effect
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: Math.random() * 0.4 - 0.2,
        vy: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const features = [
    { name: "Disease Detection", desc: "Scan crop pictures to identify plant infections, pests, and get instant remedies in Hindi.", icon: Sprout, color: "var(--google-green)", agent: "Disease Agent" },
    { name: "Weather Intelligence", desc: "Hyper-local micro-climate forecasts, alerts, and tailored agricultural activity timetables.", icon: CloudSun, color: "var(--google-blue)", agent: "Weather Agent" },
    { name: "Market Intelligence", desc: "Live Mandi comparisons, real-time demand insights, and crop price predictions.", icon: TrendingUp, color: "var(--google-yellow)", agent: "Market Price Agent" },
    { name: "Government Schemes", desc: "Find government direct subsidies, eligibility checklists, and start direct apply links.", icon: Search, color: "var(--google-red)", agent: "Subsidy Agent" },
    { name: "Cattle Health Vet", desc: "AI diagnosis tool matching livestock symptoms to verified remedies.", icon: HeartHandshake, color: "var(--google-green)", agent: "Livestock Agent" },
    { name: "Satellite Monitoring", desc: "Track field boundaries, crop health indexes (NDVI), and soil water availability maps.", icon: Satellite, color: "var(--google-blue)", agent: "Satellite Analysis" },
    { name: "Smart Farming Diary", desc: "Register planting inputs, fertilizing routines, and harvest records automatically.", icon: BookOpen, color: "var(--google-yellow)", agent: "Farm Diary" },
    { name: "Offline Sync", desc: "Local device sync, GSM fallback, and offline local AI operation mode.", icon: WifiOff, color: "var(--text-secondary)", agent: "Offline Sync" },
    { name: "Khasra Land Records", desc: "Digitally link land registries (Khasra) for quick bank verification.", icon: FileText, color: "var(--google-red)", agent: "Government Compliance" },
    { name: "Organic Advisor", desc: "Manage bio-fertilizers, soil chemistry, and fast organic certification routes.", icon: Dna, color: "var(--google-green)", agent: "Organic Certification" },
    { name: "Transport Optimizer", desc: "Find nearest cold storage, logistics warehouses, and book transport trucks.", icon: Truck, color: "var(--google-blue)", agent: "Transport Optimizer" },
    { name: "Yield Prediction", desc: "Simulate yields based on historical planting cycles and weather trends.", icon: BarChart, color: "var(--google-yellow)", agent: "Yield Prediction" },
    { name: "Expense Tracker", desc: "Keep track of fertilizer bills, wages, and calculate expected farm profits.", icon: Calculator, color: "var(--google-red)", agent: "Expense Tracker" },
    { name: "Water & Soil Planner", desc: "Plan localized irrigation grids based on current ground soil humidity metrics.", icon: PieChart, color: "var(--google-green)", agent: "Soil Analyzer" },
    { name: "Voice-First AI", desc: "Operate the entire platform hands-free using auto-detect language recognition.", icon: Mic, color: "var(--google-blue)", agent: "Voice Translator" }
  ];

  const handleCardClick = (agentName) => {
    navigate("/app/workspace", { state: { initialAgent: agentName } });
  };

  return (
    <div className="landing-container">
      {/* Background canvas for particles */}
      <canvas id="hero-canvas" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />
      
      {/* Cinematic Hero */}
      <section className="hero-section">
        <div className="satellite-grid"></div>
        <div className="hero-glow"></div>
        
        <div className="badge-premium">
          <div className="badge-dot"></div>
          <span>AgriSahayak AI v2.5</span>
        </div>
        
        <h1 className="hero-title">
          Powering Bharat's <br /> Agricultural Intelligence
        </h1>
        
        <p className="hero-subtext">
          An AI Copilot designed for 100 Million Farmers. Manage crop health, analyze live Mandis, track satellite diagnostics, and predict yields.
        </p>
        
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => navigate("/app/workspace")}>
            Start Farming Smarter
          </button>
          <button className="btn-secondary" onClick={() => handleCardClick("Learning Assistant")}>
            Explore Agent Workspace
          </button>
        </div>
      </section>

      {/* Grid Features */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Platform Agent Core</h2>
          <p className="section-subtitle">Select an agricultural intelligence sub-agent node below to launch directly in the AI workspace.</p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                ref={el => cardRefs.current[idx] = el}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onClick={() => handleCardClick(feat.agent)}
                className="feature-card glass-card"
              >
                <div className="card-glow-layer"></div>
                <div className="card-icon-container" style={{ color: feat.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{feat.name}</h3>
                <p className="card-description">{feat.desc}</p>
                <div className="card-preview" style={{ color: feat.color }}>
                  <span>Deploy {feat.agent} &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
