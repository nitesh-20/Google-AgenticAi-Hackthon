import React from "react";
import "./MachineEquipment.css";

const machines = [
  { name: "Tractor", model: "Mahindra 575 DI", price: "₹6.5 lakh", info: "Best for medium farms." },
  { name: "Rotavator", model: "Fieldking FKRT", price: "₹85,000", info: "Efficient soil preparation." },
  { name: "Sprayer", model: "KisanKraft KK-PS-767", price: "₹4,500", info: "Portable, easy to use." },
];

export default function MachineEquipment() {
  return (
    <div className="machineeq-root">
      <h2 className="machineeq-title">Machine/Equipment Info</h2>
      <div className="machineeq-infobox">
        <h3>किसानों के लिए मशीन/इक्विपमेंट जानकारी</h3>
        <ul>
          <li><b>Important Machines/Equipment:</b> Tractor, हल, seed drill, thresher, reaper, pump set, spray machine वगैरह की details।</li>
          <li><b>Usage Tips:</b> मशीन का सही इस्तेमाल कैसे करें, maintenance और safety के tips।</li>
          <li><b>नए Machinery Trends:</b> Farming में आने वाली latest या advanced technology का brief।</li>
        </ul>
      </div>
      <div className="machineeq-list">
        {machines.map((m, i) => (
          <div className="machineeq-card" key={i}>
            <div className="machineeq-name">{m.name}</div>
            <div className="machineeq-model">Model: {m.model}</div>
            <div className="machineeq-price">Price: {m.price}</div>
            <div className="machineeq-info">{m.info}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
