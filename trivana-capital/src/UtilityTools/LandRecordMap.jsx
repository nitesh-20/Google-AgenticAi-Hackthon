import React, { useState } from "react";
import "./LandRecordMap.css";
// For Google Maps, you need to add your API key in the script tag in index.html or use @react-google-maps/api
// This is a demo UI for land record search and map display

const STATES = [
  "मध्य प्रदेश", "उत्तर प्रदेश", "राजस्थान", "महाराष्ट्र", "गुजरात", "बिहार", "झारखंड", "पश्चिम बंगाल", "हरियाणा", "पंजाब"
];
const DISTRICTS = {
  "मध्य प्रदेश": ["इंदौर", "भोपाल", "ग्वालियर", "उज्जैन", "जबलपुर"],
  "उत्तर प्रदेश": ["कानपुर", "लखनऊ", "आगरा", "वाराणसी", "मेरठ"],
  "राजस्थान": ["जयपुर", "कोटा", "उदयपुर", "अजमेर", "जोधपुर"],
  "महाराष्ट्र": ["पुणे", "नासिक", "मुंबई", "नागपुर", "औरंगाबाद"],
  "गुजरात": ["अहमदाबाद", "सूरत", "राजकोट", "वडोदरा"],
  "बिहार": ["पटना", "गया", "भागलपुर", "मुजफ्फरपुर"],
  "झारखंड": ["रांची", "धनबाद", "जमशेदपुर", "बोकारो"],
  "पश्चिम बंगाल": ["कोलकाता", "सिलीगुड़ी", "दार्जिलिंग", "हावड़ा"],
  "हरियाणा": ["गुड़गांव", "फरीदाबाद", "पानीपत", "अंबाला"],
  "पंजाब": ["लुधियाना", "अमृतसर", "जालंधर", "पटियाला"]
};
const VILLAGES = {
  "इंदौर": ["रामपुरा", "सांवेर", "मालवा"],
  "भोपाल": ["बरखेड़ा", "कोलार", "अयोध्या नगर"],
  "ग्वालियर": ["मुरार", "डबरा", "भितरवार"],
  "उज्जैन": ["महिदपुर", "घटिया"],
  "जबलपुर": ["पाटन", "सिहोरा"],
  "कानपुर": ["बिठूर", "बिल्हौर", "सरसौल"],
  "लखनऊ": ["मलिहाबाद", "मोहनलालगंज", "गोसाईगंज"],
  "आगरा": ["फतेहाबाद", "किरावली", "एत्मादपुर"],
  "वाराणसी": ["रोहनिया", "पिंडरा"],
  "मेरठ": ["दौराला", "सरधना"],
  "जयपुर": ["चोमू", "फागी", "जामवारामगढ़"],
  "कोटा": ["सांगोद", "इटावा", "रामगंजमंडी"],
  "उदयपुर": ["गोगुंदा", "झाड़ोल", "सलूम्बर"],
  "अजमेर": ["केकड़ी", "नसीराबाद"],
  "जोधपुर": ["लूणी", "बावड़ी"],
  "पुणे": ["हवेली", "जुन्नर", "शिरूर"],
  "नासिक": ["येवला", "निफाड़", "सिन्नर"],
  "मुंबई": ["अंधेरी", "दहिसर", "बोरीवली"],
  "नागपुर": ["कम्पटी", "हिंगना"],
  "औरंगाबाद": ["फुलंब्री", "सिल्लोड"],
  "अहमदाबाद": ["दांता", "साणंद"],
  "सूरत": ["कडोदरा", "पलसाणा"],
  "राजकोट": ["गोंडल", "जेतपुर"],
  "वडोदरा": ["करजन", "सावली"],
  "पटना": ["फुलवारीशरीफ", "दानापुर"],
  "गया": ["बोधगया", "मानपुर"],
  "भागलपुर": ["नाथनगर", "सबौर"],
  "मुजफ्फरपुर": ["सकरा", "कांटी"],
  "रांची": ["नामकुम", "इटकी"],
  "धनबाद": ["झरिया", "बलियापुर"],
  "जमशेदपुर": ["गम्हरिया", "चाकुलिया"],
  "बोकारो": ["चंद्रपुरा", "पेटरवार"],
  "कोलकाता": ["बरानगर", "बालीगंज"],
  "सिलीगुड़ी": ["फूलबाड़ी", "माटीगाड़ा"],
  "दार्जिलिंग": ["कर्सियांग", "मिरिक"],
  "हावड़ा": ["शिवपुर", "डोमजूर"],
  "गुड़गांव": ["पटौदी", "फर्रुखनगर"],
  "फरीदाबाद": ["बल्लभगढ़", "तिगांव"],
  "पानीपत": ["इसराना", "मधुबन"],
  "अंबाला": ["बरारा", "नरायणगढ़"],
  "लुधियाना": ["पायल", "माछीवाड़ा"],
  "अमृतसर": ["अजनाला", "राजासांसी"],
  "जालंधर": ["नकोदर", "फिल्लौर"],
  "पटियाला": ["समाना", "राजपुरा"]
};

export default function LandRecordMap() {
  const [state, setState] = useState("मध्य प्रदेश");
  const [district, setDistrict] = useState("इंदौर");
  const [village, setVillage] = useState("रामपुरा");
  const [khasra, setKhasra] = useState("");
  const [plotInfo, setPlotInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use Google Maps Geocoding API to get lat/lng for the selected place
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setPlotInfo(null);
    if (khasra === "101") {
      // Always show BIEC Bangalore, Karnataka for khasra 101
      setPlotInfo({
        owner: "BIEC Land Owner",
        area: "10 एकड़",
        crop: "Demo",
        khasra,
        lat: 13.0702,
        lng: 77.4842
      });
      setLoading(false);
      return;
    }
    // Compose address string
    const address = `${village}, ${district}, ${state}`;
    try {
      // Use your Google Maps Geocoding API key here
      const apiKey = "AIzaSyAI0lssgqRXPWMccWH_KnDPdmh8xMCdaZg";
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );
      const data = await resp.json();
      if (data.status === "OK" && data.results.length > 0) {
        const loc = data.results[0].geometry.location;
        setPlotInfo({
          owner: "राम कुमार",
          area: "2.5 हेक्टेयर",
          crop: "गेहूँ",
          khasra,
          lat: loc.lat,
          lng: loc.lng
        });
      } else {
        setError("स्थान नहीं मिला, कृपया सही जानकारी डालें।");
      }
    } catch (err) {
      setError("नेटवर्क या API त्रुटि।");
    }
    setLoading(false);
  };

  return (
    <div className="landrecord-root">
      <h2 className="landrecord-title">भू-अभिलेख खोजें (Land Record Search)</h2>
      <form className="landrecord-form" onSubmit={handleSearch}>
        <div className="landrecord-row">
          <label className="landrecord-label">राज्य:</label>
          <select className="landrecord-select" value={state} onChange={e => { setState(e.target.value); setDistrict(DISTRICTS[e.target.value][0]); setVillage(VILLAGES[DISTRICTS[e.target.value][0]][0]); }}>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
          <label className="landrecord-label">जिला:</label>
          <select className="landrecord-select" value={district} onChange={e => { setDistrict(e.target.value); setVillage(VILLAGES[e.target.value][0]); }}>
            {(DISTRICTS[state] || []).map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="landrecord-row">
          <label className="landrecord-label">गाँव:</label>
          <select className="landrecord-select" value={village} onChange={e => setVillage(e.target.value)}>
            {(VILLAGES[district] || []).map(v => <option key={v}>{v}</option>)}
          </select>
          <label className="landrecord-label">खसरा नंबर:</label>
          <input className="landrecord-input" value={khasra} onChange={e => setKhasra(e.target.value)} placeholder="जैसे 101" required />
        </div>
        <button type="submit" className="landrecord-btn">Search</button>
      </form>
      {loading && <div className="landrecord-loading">लोकेशन खोजा जा रहा है...</div>}
      {error && <div className="landrecord-error">{error}</div>}
      {plotInfo && (
        <div className="landrecord-card">
          <h3 style={{ color: "#ffd82a" }}>खसरा: {plotInfo.khasra}</h3>
          <p><b>Owner:</b> {plotInfo.owner}</p>
          <p><b>Area:</b> {plotInfo.area}</p>
          <p><b>Crop:</b> {plotInfo.crop}</p>
          <div className="landrecord-map">
            <iframe
              title="Land Map"
              width="100%"
              height="220"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${plotInfo.lat},${plotInfo.lng}&z=16&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
