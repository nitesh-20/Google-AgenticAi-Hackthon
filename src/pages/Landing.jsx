import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Landing.css";

import img01 from "../assets/img01.png";
import img02 from "../assets/img02.png";
import img03 from "../assets/img03.png";
import img04 from "../assets/img04.png";
import img05 from "../assets/img05.png";
import img06 from "../assets/img06.png";
// import img07 from "../assets/img07.jpeg";

const imageData = [
  { image: img01 },
  { image: img02 },
  { image: img03 },
  { image: img04 },
  { image: img05 },
  { image: img06 },
  // { image: img7 }
];

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="landing-gallery">
      {imageData.map((item, index) => (
        <div
          key={index}
          className="background-slide"
          style={{ backgroundImage: `url(${item.image})` }}
          data-aos="fade-up"
        >
          <div className="overlay-text">
            {index === 0 && (
              <>
                <h1>AGRO-AI & <br /> TRADING <br /> PLATFORM</h1>
                <h3>Manage your crops, monitor <br /> market prices, and get AI- <br /> powered insights- <br /> all in one place.</h3>
                <button className="custom-btn" onClick={() => navigate('/login')}>Get Started</button>
              </>
            )}
            {index === 1 && (
              <>
                <h1></h1>
                <h3>Click a picture, get instant disease detection & treatment advice using AI.</h3>
              </>
            )}
            {index === 2 && (
              <>
                <h1>Live Market Rates</h1>
                <h3>Check mandi prices in real-time. Know when and where to sell.</h3>
              </>
            )}
            {index === 3 && (
              <>
                <h1>Government Schemes</h1>
                <h3>Find all active subsidies, eligibility, and direct links to apply.</h3>
              </>
            )}
            {index === 4 && (
              <>
                <h1>Voice-First Assistant</h1>
                <h3>Talk to the app in your local language. No typing, no stress.</h3>
              </>
            )}
            {index === 5 && (
              <>
                <h1>Local Agro Trading</h1>
                <h3>Post your crops or connect with buyers in your area — all without a broker.</h3>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


