import React from "react";
import "./MedicineInfo.css";

const medicines = [
  { name: "Fungicide", brand: "Bayer Nativo", price: "₹650/100g", info: "Controls fungal diseases in wheat, rice." },
  { name: "Insecticide", brand: "Syngenta Karate", price: "₹320/250ml", info: "Effective against caterpillars, aphids." },
  { name: "Herbicide", brand: "Monsanto Roundup", price: "₹950/litre", info: "Kills weeds, safe for crops." },
];

export default function MedicineInfo() {
  return (
    <div className="medicine-root">
      <h2 className="medicine-title">Medicine Info</h2>
      <div className="medicine-infobox">
        <h3>किसानों के लिए दवाई जानकारी</h3>
        <ul>
          <li><b>दवाई की प्रकार:</b> कौन सी दवाई किस फसल या समस्या के लिए है – जैसे कीड़े, रोग, fungus के लिए अलग-अलग।</li>
          <li><b>इस्तेमाल का तरीका:</b> कितनी मात्रा में, कैसे और किस समय दवाई का प्रयोग करें।</li>
          <li><b>Safety Tips:</b> दवाई इस्तेमाल करते वक्त किन बातों का ध्यान रखें, health और environment friendly tips।</li>
          <li><b>नए Product Updates:</b> Market में जो नए medicines आ रहे हैं, उनकी brief details।</li>
        </ul>
      </div>
      <div className="medicine-list">
        {medicines.map((med, i) => (
          <div className="medicine-card" key={i}>
            <div className="medicine-name">{med.name}</div>
            <div className="medicine-brand">Brand: {med.brand}</div>
            <div className="medicine-price">Price: {med.price}</div>
            <div className="medicine-info">{med.info}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
