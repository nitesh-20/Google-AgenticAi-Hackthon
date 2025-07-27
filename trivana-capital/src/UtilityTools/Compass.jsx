
import React, { useState, useEffect } from "react";

export default function Compass() {
  const [direction, setDirection] = useState(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    function handleOrientation(event) {
      // Try to use 'webkitCompassHeading' for iOS, fallback to 'alpha' for others
      let heading = event.webkitCompassHeading;
      if (typeof heading === "number") {
        setDirection(360 - heading); // iOS: 0=N, 90=E, 180=S, 270=W
      } else if (typeof event.alpha === "number") {
        setDirection(event.alpha); // Android: 0=N, 90=E, 180=S, 270=W
      }
    }
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    } else {
      setSupported(false);
    }
  }, []);

  const directions = [
    { label: "N", deg: 0 },
    { label: "NE", deg: 45 },
    { label: "E", deg: 90 },
    { label: "SE", deg: 135 },
    { label: "S", deg: 180 },
    { label: "SW", deg: 225 },
    { label: "W", deg: 270 },
    { label: "NW", deg: 315 },
  ];

  const getCardinal = deg => {
    if (deg >= 337.5 || deg < 22.5) return "N";
    if (deg >= 22.5 && deg < 67.5) return "NE";
    if (deg >= 67.5 && deg < 112.5) return "E";
    if (deg >= 112.5 && deg < 157.5) return "SE";
    if (deg >= 157.5 && deg < 202.5) return "S";
    if (deg >= 202.5 && deg < 247.5) return "SW";
    if (deg >= 247.5 && deg < 292.5) return "W";
    if (deg >= 292.5 && deg < 337.5) return "NW";
    return "N";
  };

  return (
    <div className="compass-root">
      <h2 className="compass-title">Compass</h2>
      <div className="compass-box">
        <div className="compass-circle">
          {/* Compass Rose Directions */}
          {directions.map(dir => (
            <div
              key={dir.label}
              className={`compass-dir compass-dir-${dir.label}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${dir.deg}deg) translate(0, -90px) rotate(${-dir.deg}deg)`,
                fontWeight: dir.label.length === 1 ? "bold" : "normal",
                fontSize: dir.label.length === 1 ? "1.5em" : "1em",
                color: dir.label.length === 1 ? "#ffd82a" : "#fff"
              }}
            >
              {dir.label}
            </div>
          ))}
          {/* Compass Needle (SVG Arrow) or fallback */}
          {supported ? (
            <svg
              className="compass-needle"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -100%) rotate(${direction}deg)`,
                transition: "transform 0.2s cubic-bezier(.4,2,.3,1)",
                zIndex: 2
              }}
              width="24" height="120" viewBox="0 0 24 120"
            >
              <polygon points="12,10 20,110 12,90 4,110" fill="#38bdf8" />
              <circle cx="12" cy="115" r="8" fill="#ffd82a" stroke="#23243a" strokeWidth="2" />
            </svg>
          ) : (
            <svg
              className="compass-needle"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -100%)",
                zIndex: 2
              }}
              width="24" height="120" viewBox="0 0 24 120"
            >
              <polygon points="12,10 20,110 12,90 4,110" fill="#f87171" />
              <circle cx="12" cy="115" r="8" fill="#ffd82a" stroke="#23243a" strokeWidth="2" />
            </svg>
          )}
          {/* Center Dot */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 22,
              height: 22,
              background: "#ffd82a",
              borderRadius: "50%",
              border: "2px solid #23243a",
              transform: "translate(-50%, -50%)",
              zIndex: 3
            }}
          />
          {/* Cardinal Label */}
          <div className="compass-label">{getCardinal(direction)}</div>
          {!supported && (
            <div className="compass-error" style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',color:'#f87171',fontWeight:600}}>Compass not supported on this device/browser.</div>
          )}
        </div>
        <div className="compass-degree">{Math.round(direction)}°</div>
      </div>
    </div>
  );
}
