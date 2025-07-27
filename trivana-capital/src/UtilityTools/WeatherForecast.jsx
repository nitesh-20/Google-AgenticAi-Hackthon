import React, { useState, useEffect } from "react";
import "./UtilityTools.css";

const API_KEY = "55f29025abbc49d59da93611252107";

const STATES = [
  "Madhya Pradesh", "Rajasthan", "Uttar Pradesh", "Maharashtra", "Gujarat",
  "Delhi", "Karnataka", "Tamil Nadu", "Bihar", "West Bengal", "Punjab", "Odisha",
  "Haryana", "Kerala", "Chhattisgarh", "Assam", "Jharkhand", "Telangana", "Uttarakhand"
];

const DISTRICTS = {
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Ujjain"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Haryana": ["Gurgaon", "Faridabad", "Karnal"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Durg"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"]
};

function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export default function WeatherForecast() {
  const [stateSel, setStateSel] = useState("Madhya Pradesh");
  const [distSel, setDistSel] = useState("Bhopal");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather(location) {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes&alerts=no`
      );
      if (!resp.ok) throw new Error("WeatherAPI Error");
      const data = await resp.json();
      setWeather(data);
    } catch {
      setError("Failed to retrieve weather data. Please try again.");
      setWeather(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchWeather(distSel);
    // eslint-disable-next-line
  }, []);

  function handleStateChange(e) {
    const state = e.target.value;
    setStateSel(state);
    const first = DISTRICTS[state][0];
    setDistSel(first);
    fetchWeather(first);
  }

  function handleDistrictChange(e) {
    const city = e.target.value;
    setDistSel(city);
    fetchWeather(city);
  }

  function handleGeo() {
    if (!navigator.geolocation) {
      setError("Geolocation not available!");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      }
    );
  }

  return (
    <div className="weather-ui-root">
      <div className="weather-ui-header">
        <span className="weather-ui-title">Weather Forecast</span>
        <span className="weather-ui-icon">🌤️</span>
      </div>
      <div className="weather-ui-controls">
        <select value={stateSel} onChange={handleStateChange}>
          {STATES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={distSel} onChange={handleDistrictChange}>
          {(DISTRICTS[stateSel] || []).map(d => <option key={d}>{d}</option>)}
        </select>
        <button className="weather-ui-btn" onClick={() => fetchWeather(distSel)} disabled={loading}>
          Search
        </button>
        <button className="weather-ui-btn" onClick={handleGeo} disabled={loading}>
          📍 My Location
        </button>
      </div>
      {loading && <div className="weather-ui-loading">Loading weather...</div>}
      {error && <div className="weather-ui-error">{error}</div>}
      {weather && (
        <div className="weather-ui-maincard">
          <div className="weather-ui-mainrow">
            <span className="weather-ui-temp">{weather.current.temp_c}°C</span>
            <img className="weather-ui-mainicon" src={weather.current.condition.icon} alt="" />
          </div>
          <div className="weather-ui-mainrow weather-ui-details">
            <span>{distSel}, {stateSel}</span>
            <span>{weather.current.condition.text}</span>
          </div>
          <div className="weather-ui-detailgrid">
            <div><b>Wind</b>: {weather.current.wind_kph}km/h</div>
            <div><b>Humidity</b>: {weather.current.humidity}%</div>
            <div><b>Air PM2.5</b>: {weather.current?.air_quality?.pm2_5 ? Math.round(weather.current.air_quality.pm2_5) : "N/A"}</div>
          </div>
          <div className="weather-ui-forecaststrip">
            {weather.forecast.forecastday.map(day => (
              <div key={day.date_epoch} className="weather-ui-forecastcard">
                <img src={day.day.condition.icon} alt="" />
                <div className="weather-ui-fday">{formatDay(day.date)}</div>
                <div className="weather-ui-fdesc">{day.day.condition.text}</div>
                <div className="weather-ui-ftemp">{Math.round(day.day.maxtemp_c)}°/{Math.round(day.day.mintemp_c)}°</div>
                <div className="weather-ui-frain">{day.day.daily_chance_of_rain}% rain</div>
              </div>
            ))}
          </div>
          <div className="weather-ui-advisory">
            <span>Advisory:</span>
            <span className="advice-text">
              {weather.current.condition.text.toLowerCase().includes("rain")
                ? "Rain expected, avoid field pesticide spray until dry."
                : weather.current.temp_c >= 36
                  ? "High temperature, ensure irrigation for crops."
                  : "Normal weather for agricultural work."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
