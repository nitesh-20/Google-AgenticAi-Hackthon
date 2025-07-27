// src/pages/AgroAI.jsx
import React, { useState, useEffect } from "react";
import "../styles/chatbot.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AgroAI = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const nameFromEmail = user.email?.split("@")[0];
        setUsername(nameFromEmail || "User");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log("Sending:", input);
      setInput("");
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="center-logo">Agri Sahayak</div>

      {username && (
        <div className="welcome-message">
          <h2>Hello, <span className="username">{username}</span> 👋</h2>
          <p>How can I help you today?</p>
        </div>
      )}

      <div className="chat-input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <div className="input-icons">
          <button className="search-btn">🔍</button>
          <button className="settings-btn">⚙️</button>
          <button className="mic-btn">🎤</button>
          <button className="send-btn" onClick={handleSend}>Send</button>
        </div>
      </div>

      <div className="quick-options">
        <button>📊 Compare</button>
        <button>🔧 Troubleshoot</button>
        <button>📘 AgroAI 101</button>
        <button>✔️ Fact Check</button>
      </div>
    </div>
  );
};

export default AgroAI;
