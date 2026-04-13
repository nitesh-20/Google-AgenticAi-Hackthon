import React from "react";

export default function MarketPrices() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", padding: "2rem" }}>
      <h2>Exchange (Live Market Prices)</h2>
      <p>Check mandi prices in real-time. Know when and where to sell.</p>
      
      <div style={{ marginTop: "2rem" }}>
        <table style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#28a745", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Commodity</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price (₹)</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Trend</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Market</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Wheat</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>2,300</td>
              <td style={{ padding: "10px", border: "1px solid #ddd", color: "green" }}>+1.2%</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Indore Mandi</td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Chana</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>6,188</td>
              <td style={{ padding: "10px", border: "1px solid #ddd", color: "green" }}>+2.0%</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Delhi Market</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Soyabean</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>4,500</td>
              <td style={{ padding: "10px", border: "1px solid #ddd", color: "red" }}>-0.5%</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Ujjain Mandi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}