import React from "react";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-card container-wide">
        <h2 className="landing-title">Welcome to Trivana</h2>
        <p className="landing-subtitle">Smart farming tools and marketplace</p>

        <div className="landing-iframe-wrapper card">
          <div
            className="landing-placeholder"
            style={{ padding: "36px", textAlign: "center" }}
          >
            <h3 style={{ margin: 0, color: "#0b6b8a" }}>Prototype removed</h3>
            <p style={{ marginTop: 8, color: "#556b6a" }}>
              The Framer prototype has been removed from this build. Explore the
              app using the navigation above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
