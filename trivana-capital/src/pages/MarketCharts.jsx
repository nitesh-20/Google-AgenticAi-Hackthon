import "../styles/MarketCharts.css";
import React, { useState } from "react";
import { FiBarChart2, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

// List of supported symbols for TradingView (MCX)
const commodityConfig = {
  apple: { name: "Apple Inc.", symbol: "NASDAQ:AAPL" },
  silver: { name: "Silver", symbol: "MCX:SILVER1!" },
  crudeoil: { name: "Crude Oil", symbol: "MCX:CRUDEOIL1!" },
  naturalgas: { name: "Natural Gas", symbol: "MCX:NATURALGAS1!" },
  cotton: { name: "Cotton", symbol: "MCX:COTTON1!" },
  aluminium: { name: "Aluminium", symbol: "MCX:ALUMINIUM1!" },
  copper: { name: "Copper", symbol: "MCX:COPPER1!" },
  zinc: { name: "Zinc", symbol: "MCX:ZINC1!" },
  lead: { name: "Lead", symbol: "MCX:LEAD1!" },
  nickel: { name: "Nickel", symbol: "MCX:NICKEL1!" },
  wheat: { name: "Wheat", symbol: "MCX:WHEAT1!" },
  rice: { name: "Rice", symbol: "MCX:RICE1!" },
};

class MarketChartsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo here if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{color:'#fff',background:'#1e293b',padding:32,borderRadius:12,margin:32}}>
          <h2>Something went wrong in MarketCharts.</h2>
          <pre style={{color:'#f87171'}}>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const MarketCharts = () => {
  const [selectedCommodity, setSelectedCommodity] = useState("apple");
  const [searchTerm, setSearchTerm] = useState("");
  const [lotSize, setLotSize] = useState("");
  // Chart.js refs removed

  const filteredCommodities = Object.keys(commodityConfig).filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chart.js effect removed

  const handleBuy = () => {
    if (!lotSize || isNaN(lotSize)) {
      toast.error("Please enter a valid lot size");
      return;
    }
    toast.success(
      `Buy order placed for ${lotSize} lot(s) of ${commodityConfig[selectedCommodity].name}`
    );
    setLotSize("");
  };

  const handleSell = () => {
    if (!lotSize || isNaN(lotSize)) {
      toast.error("Please enter a valid lot size");
      return;
    }
    toast.info(
      `Sell order placed for ${lotSize} lot(s) of ${commodityConfig[selectedCommodity].name}`
    );
    setLotSize("");
  };

  return (
    <MarketChartsErrorBoundary>
      <div className="market-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="market-header">
          <div className="search-select">
            <input
              type="text"
              placeholder="Search commodity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              {filteredCommodities.map((item) => (
                <option key={item} value={item}>
                  {commodityConfig[item].name}
                </option>
              ))}
            </select>
          </div>
          <div className="header-right" style={{display:'flex',alignItems:'center',gap:8}}>
            <FiBarChart2 size={22} style={{color:'#22c55e'}} />
            <span className="price-label">
              {commodityConfig[selectedCommodity]?.name} Chart
            </span>
          </div>
        </div>

        <div className="chartbot-row">
          <div className="chart-container">
            <iframe
              src={`https://s.tradingview.com/widgetembed/?symbol=${commodityConfig[selectedCommodity].symbol}&interval=1&theme=light`}
              width="100%"
              height="500"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
              title="TradingView Chart"
              style={{ borderRadius: 18, width: "100%", minHeight: 420, background: 'transparent' }}
            ></iframe>
          </div>
          <div className="market-chatbot">
            <div className="market-chatbot-header">
              <span role="img" aria-label="chatbot">🤖</span> AgroAI Chatbot
            </div>
            <div className="market-chatbot-body">
              <div className="market-chatbot-msg user">Hi! How can I help you with commodity trading?</div>
              <div className="market-chatbot-msg bot">Show me the latest price of Apple stock.</div>
              <div className="market-chatbot-msg user highlight">Apple is trading at $200 per share on NASDAQ.</div>
              <form className="market-chatbot-form" onSubmit={e=>{e.preventDefault();}}>
                <input type="text" placeholder="Type your message..." />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>

        <div className="order-controls" style={{marginTop: 24}}>
          <input
            type="number"
            placeholder="Enter Lot Size"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
          />
          <button
            className="buy-btn trading-btn"
            onClick={handleBuy}
            title="Buy"
          >
            <FiArrowUp size={22} style={{marginRight:8}} /> Buy
          </button>
          <button
            className="sell-btn trading-btn"
            onClick={handleSell}
            title="Sell"
          >
            <FiArrowDown size={22} style={{marginRight:8}} /> Sell
          </button>
        </div>
      </div>
    </MarketChartsErrorBoundary>
  );
};

export default MarketCharts;