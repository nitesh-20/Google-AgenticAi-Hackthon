import React from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Sprout, TrendingUp, Landmark, ShieldCheck } from "lucide-react";

const yieldHistory = [
  { year: "2022", yield: 18, target: 20 },
  { year: "2023", yield: 22, target: 21 },
  { year: "2024", yield: 25, target: 24 },
  { year: "2025", yield: 29, target: 27 }
];

const financialData = [
  { month: "May", expenses: 12000, revenue: 0 },
  { month: "Jun", expenses: 18000, revenue: 0 },
  { month: "Jul", expenses: 8000, revenue: 5000 },
  { month: "Aug", expenses: 5000, revenue: 12000 },
  { month: "Sep", expenses: 6000, revenue: 48000 }
];

const carbonCreditHistory = [
  { month: "Jan", credits: 12 },
  { month: "Mar", credits: 18 },
  { month: "May", credits: 26 },
  { month: "Jul", credits: 35 },
  { month: "Sep", credits: 48 }
];

export default function AnalyticsDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      
      {/* Top row: Summary Widgets */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        
        <div className="glass-panel" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "12px", background: "rgba(52, 168, 83, 0.1)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--google-green)", paddingLeft: 12 }}><Sprout /></div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Season Harvest</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", marginTop: 2 }}>29 Tons</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "12px", background: "rgba(66, 133, 244, 0.1)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--google-blue)", paddingLeft: 12 }}><TrendingUp /></div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Revenue</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", marginTop: 2 }}>₹65,000</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "12px", background: "rgba(251, 188, 5, 0.1)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--google-yellow)", paddingLeft: 12 }}><Landmark /></div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Carbon Credits</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", marginTop: 2 }}>48 credits</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "12px", background: "rgba(234, 67, 53, 0.1)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--google-red)", paddingLeft: 12 }}><ShieldCheck /></div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Farm Health</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", marginTop: 2 }}>94% Optimum</h3>
          </div>
        </div>

      </div>

      {/* Grid of detailed charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        
        {/* Yield History Bar Chart */}
        <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Seasonal Crop Yield Output</h4>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Comparing realized tonnage vs seasonal targets (Tons).</span>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={yieldHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={11} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} />
                <Tooltip contentStyle={{ background: "rgba(16,22,34,0.95)", border: "1px solid var(--border-color)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="yield" name="Realized Yield" fill="var(--google-green)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target Target" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses vs Sales Revenue Area Chart */}
        <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Income vs Expenses Timeline</h4>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Track seed/input investments against harvest sales (₹).</span>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} />
                <Tooltip contentStyle={{ background: "rgba(16,22,34,0.95)", border: "1px solid var(--border-color)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="expenses" name="Expenses" fill="var(--google-red)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Sales Revenue" fill="var(--google-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Carbon credits Accumulation Line Chart */}
      <div className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Carbon Credits Accrued</h4>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Credits accumulated through organic fertilizer and natural farming methods.</span>
        </div>
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={carbonCreditHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} />
              <YAxis stroke="var(--text-secondary)" fontSize={11} />
              <Tooltip contentStyle={{ background: "rgba(16,22,34,0.95)", border: "1px solid var(--border-color)" }} />
              <Line type="monotone" dataKey="credits" name="Accrued Credits" stroke="var(--google-yellow)" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
