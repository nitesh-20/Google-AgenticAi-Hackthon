import React from "react";
import "./AgriSeed.css";

const seeds = [
  { name: "Wheat Seed", variety: "HD 2967", price: "₹1800/quintal", info: "High yield, rust resistant." },
  { name: "Rice Seed", variety: "IR 64", price: "₹1600/quintal", info: "Popular for North India." },
  { name: "Soybean Seed", variety: "JS 335", price: "₹2200/quintal", info: "Early maturity, good oil content." },
];

export default function AgriSeed() {
  return (
    <div className="agriseed-root">
      <h2 className="agriseed-title">Agri Seed Info</h2>
      <div className="agriseed-infobox">
        <h3>किसानों के लिए बीज जानकारी</h3>
        <ul>
          <li><b>बीज की किसम:</b> अलग-अलग फसल के लिए कौन सी variety best है, उनकी खासियत जैसे ज्यादा उत्पादन, रोग-प्रतिरोधक या मौसम के अनुकूल।</li>
          <li><b>बीज चयन टिप्स:</b> बेहतरीन बीज कैसे पहचानें, certified और high quality बीज लेने का तरीका।</li>
          <li><b>बीज बोने का समय:</b> हर फसल के हिसाब से बीज बोने का सही समय।</li>
          <li><b>बीज उपचार:</b> बीज को बीमारी और कीड़े से बचाने के तरीके।</li>
          <li><b>बीज की मात्रा और बोने का तरीका:</b> प्रति हेक्टेयर कितना बीज लगेगा और बोने की best technique क्या है।</li>
          <li><b>नई technique:</b> जैसे hybrid, GM या organic बीज की बातें भी यहाँ explain होंगी।</li>
        </ul>
      </div>
      <div className="agriseed-list">
        {seeds.map((seed, i) => (
          <div className="agriseed-card" key={i}>
            <div className="agriseed-name">{seed.name}</div>
            <div className="agriseed-variety">Variety: {seed.variety}</div>
            <div className="agriseed-price">Price: {seed.price}</div>
            <div className="agriseed-info">{seed.info}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
