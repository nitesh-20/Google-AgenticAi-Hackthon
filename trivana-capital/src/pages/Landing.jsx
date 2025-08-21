import React from "react";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-card container-wide">
        <h2 className="landing-title">Welcome to Trivana</h2>
        <p className="landing-subtitle">Smart farming tools and marketplace</p>

        <div className="landing-iframe-wrapper card">
          <iframe
            src="https://landingtrivanaa.framer.ai/"
            title="Trivana Landing"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
