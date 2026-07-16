import React, { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Coins, 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  Award 
} from "lucide-react";
import { toast } from "react-toastify";

const chartData = [
  { month: "Jan", wheat: 2100, soyabean: 4200, mustard: 5100 },
  { month: "Feb", wheat: 2150, soyabean: 4300, mustard: 5050 },
  { month: "Mar", wheat: 2240, soyabean: 4250, mustard: 5200 },
  { month: "Apr", wheat: 2300, soyabean: 4400, mustard: 5350 },
  { month: "May", wheat: 2280, soyabean: 4500, mustard: 5400 },
  { month: "Jun", wheat: 2350, soyabean: 4550, mustard: 5300 },
  { month: "Jul", wheat: 2380, soyabean: 4620, mustard: 5480 }
];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("chart");
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  
  // Local state for interactive auctions bidding
  const [auctions, setAuctions] = useState([
    { id: 1, seller: "Vijay Singh", crop: "Soyabean (Grade A)", qty: "12 Tons", currentBid: 4550, minIncr: 50, timeLeft: "02h 15m", bidsCount: 8 },
    { id: 2, seller: "Rajesh Patil", crop: "Mustard Seeds", qty: "8 Tons", currentBid: 5300, minIncr: 100, timeLeft: "04h 45m", bidsCount: 4 },
    { id: 3, seller: "Suresh Meena", crop: "Premium Wheat (Sharbati)", qty: "20 Tons", currentBid: 2400, minIncr: 25, timeLeft: "06h 10m", bidsCount: 12 }
  ]);

  const [newBidValue, setNewBidValue] = useState("");
  const [biddingAuctionId, setBiddingAuctionId] = useState(null);

  const handlePlaceBid = (id) => {
    const auction = auctions.find(a => a.id === id);
    const bidAmount = parseFloat(newBidValue);
    
    if (isNaN(bidAmount) || bidAmount <= auction.currentBid) {
      toast.error(`Bid must be greater than current bid ₹${auction.currentBid}`);
      return;
    }

    setAuctions(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          currentBid: bidAmount,
          bidsCount: a.bidsCount + 1
        };
      }
      return a;
    }));

    toast.success(`Successfully placed bid of ₹${bidAmount}/Qtl!`);
    setNewBidValue("");
    setBiddingAuctionId(null);
  };

  const getCropColor = () => {
    switch (selectedCrop) {
      case "wheat": return "var(--google-yellow)";
      case "soyabean": return "var(--google-blue)";
      case "mustard": return "var(--google-green)";
      default: return "var(--google-green)";
    }
  };

  const offers = [
    { type: "buy", partner: "Indore Flour Mills Ltd", crop: "Wheat", qty: "50 Tons", price: 2360, distance: "12 km" },
    { type: "sell", partner: "Amit Sharma", crop: "Soyabean", qty: "5 Tons", price: 4500, distance: "8 km" },
    { type: "buy", partner: "Narmada Agro Corp", crop: "Mustard Seeds", qty: "100 Tons", price: 5450, distance: "24 km" },
    { type: "sell", partner: "Sohan Lal", crop: "Wheat", qty: "15 Tons", price: 2320, distance: "15 km" }
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, padding: 24, height: "100%", width: "100%", boxSizing: "border-box", overflowY: "auto" }}>
      
      {/* Left Pane: Charts & Auctions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Navigation Selector Tabs */}
        <div className="glass-panel" style={{ padding: 12, display: "flex", gap: 12 }}>
          <button 
            className={`btn-secondary ${activeTab === "chart" ? "active" : ""}`}
            style={{ 
              background: activeTab === "chart" ? "rgba(52, 168, 83, 0.1)" : "none", 
              borderColor: activeTab === "chart" ? "var(--google-green)" : "var(--border-color)",
              color: activeTab === "chart" ? "var(--google-green)" : "white" 
            }}
            onClick={() => setActiveTab("chart")}
          >
            <TrendingUp size={16} />
            <span>Mandi Price Trends</span>
          </button>
          <button 
            className={`btn-secondary ${activeTab === "auction" ? "active" : ""}`}
            style={{ 
              background: activeTab === "auction" ? "rgba(52, 168, 83, 0.1)" : "none", 
              borderColor: activeTab === "auction" ? "var(--google-green)" : "var(--border-color)",
              color: activeTab === "auction" ? "var(--google-green)" : "white" 
            }}
            onClick={() => setActiveTab("auction")}
          >
            <Clock size={16} />
            <span>Live Auctions</span>
          </button>
        </div>

        {/* Tab View: Mandi Charts */}
        {activeTab === "chart" && (
          <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Market Value Forecast</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  Historical and predictive pricing indices per Quintal (₹).
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["wheat", "soyabean", "mustard"].map(crop => (
                  <button 
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    style={{ 
                      padding: "6px 12px", 
                      borderRadius: "10px", 
                      background: selectedCrop === crop ? "rgba(255,255,255,0.06)" : "none",
                      border: "1px solid",
                      borderColor: selectedCrop === crop ? "rgba(255,255,255,0.2)" : "transparent",
                      color: "white", 
                      textTransform: "capitalize",
                      fontSize: "0.85rem",
                      cursor: "pointer" 
                    }}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart View */}
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCrop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={getCropColor()} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={getCropColor()} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
                  <YAxis stroke="var(--text-secondary)" fontSize={11} domain={["auto", "auto"]} />
                  <Tooltip 
                    contentStyle={{ 
                      background: "rgba(16,22,34,0.95)", 
                      border: "1px solid var(--border-color)", 
                      borderRadius: "12px",
                      color: "white"
                    }} 
                  />
                  <Area type="monotone" dataKey={selectedCrop} stroke={getCropColor()} strokeWidth={2.5} fillOpacity={1} fill="url(#colorCrop)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Advisor Panel */}
            <div style={{ display: "flex", gap: 16, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)", padding: 16, borderRadius: "16px", alignItems: "flex-start" }}>
              <Award style={{ color: "var(--google-green)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--google-green)", marginBottom: 4 }}>AgriSahayak AI Advice</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  Based on late monsoon patterns and current warehouse inventory drops, Wheat prices are forecasted to increase by 5-7% next month. We advise holding your crop for another 3 weeks to maximize profit yields.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab View: Live Auctions */}
        {activeTab === "auction" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {auctions.map(auc => (
              <div key={auc.id} className="glass-panel" style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 180px", gap: 20, alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "0.8rem", background: "rgba(255,255,255,0.03)", padding: "2px 8px", borderRadius: "6px", color: "var(--text-secondary)" }}>
                      Seller: {auc.seller}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--google-yellow)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={12} />
                      {auc.timeLeft}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 6 }}>{auc.crop}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Total Quantity: <strong style={{ color: "white" }}>{auc.qty}</strong></p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Current Bid</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--google-green)" }}>
                      ₹{auc.currentBid}<span style={{ fontSize: "0.8rem", fontWeight: "normal", color: "var(--text-secondary)" }}>/Qtl</span>
                    </h3>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{auc.bidsCount} bids placed</span>
                  </div>

                  {biddingAuctionId === auc.id ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <input 
                        type="number" 
                        placeholder={`Min: ₹${auc.currentBid + auc.minIncr}`}
                        value={newBidValue}
                        onChange={(e) => setNewBidValue(e.target.value)}
                        style={{ width: 100, background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", color: "white", padding: 6, borderRadius: "8px", outline: "none", fontSize: "0.85rem" }}
                      />
                      <button className="btn-primary" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => handlePlaceBid(auc.id)}>Bid</button>
                    </div>
                  ) : (
                    <button 
                      className="btn-secondary" 
                      style={{ padding: "8px 16px", fontSize: "0.8rem" }}
                      onClick={() => {
                        setBiddingAuctionId(auc.id);
                        setNewBidValue(String(auc.currentBid + auc.minIncr));
                      }}
                    >
                      Place Bid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Local Buying / Selling Listings */}
      <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: 12 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Nearby Direct Offers</h4>
          <button style={{ background: "none", border: "none", color: "var(--google-green)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", fontWeight: "600" }}>
            <Plus size={16} />
            <span>Post Listing</span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {offers.map((off, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: 12, borderRadius: "12px" }}>
              <div>
                <span style={{ fontSize: "0.7rem", background: off.type === "buy" ? "rgba(66, 133, 244, 0.1)" : "rgba(52, 168, 83, 0.1)", color: off.type === "buy" ? "var(--google-blue)" : "var(--google-green)", padding: "2px 6px", borderRadius: "4px", fontWeight: "700", textTransform: "uppercase" }}>
                  {off.type}
                </span>
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, marginTop: 4, marginBottom: 2 }}>{off.partner}</h5>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {off.crop} • {off.qty} • {off.distance}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <strong style={{ fontSize: "0.95rem", color: "white" }}>₹{off.price}</strong>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>/Qtl</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
