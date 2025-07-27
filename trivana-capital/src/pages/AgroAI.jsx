// src/pages/AgroAI.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/chatbot.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { sendAgroAIText, sendAgroAIImage, sendAgroAIVoice } from "../UtilityTools/agroaiApi";


const AgroAI = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]); // {from: 'user'|'bot', type: 'text'|'image'|'voice', content: string}
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const voiceInputRef = useRef(null);
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

  // Send text message
  const handleSend = async () => {
    if (input.trim() === "") return;
    const userMsg = { from: "user", type: "text", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput("");
    try {
      const res = await sendAgroAIText(userMsg.content);
      setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: res.response || JSON.stringify(res) }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: "Error: " + e.message }]);
    }
    setLoading(false);
  };

  // Send image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMessages((msgs) => [...msgs, { from: "user", type: "image", content: URL.createObjectURL(file) }]);
    setLoading(true);
    try {
      const res = await sendAgroAIImage(file);
      setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: res.response || JSON.stringify(res) }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: "Error: " + e.message }]);
    }
    setLoading(false);
  };

  // Send voice
  const handleVoiceChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMessages((msgs) => [...msgs, { from: "user", type: "voice", content: URL.createObjectURL(file) }]);
    setLoading(true);
    try {
      const res = await sendAgroAIVoice(file);
      setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: res.response || JSON.stringify(res) }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: "Error: " + e.message }]);
    }
    setLoading(false);
  };

  // Open file dialog for image
  const handleImageBtn = () => fileInputRef.current && fileInputRef.current.click();
  // Open file dialog for voice
  const handleMicBtn = () => voiceInputRef.current && voiceInputRef.current.click();


  return (
    <div className="chat-wrapper">
      <div className="center-logo">Agri Sahayak</div>

      {username && (
        <div className="welcome-message">
          <h2>Hello, <span className="username">{username}</span> 👋</h2>
          <p>How can I help you today?</p>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.from}`}> 
            {msg.type === "text" && <span>{msg.content}</span>}
            {msg.type === "image" && <img src={msg.content} alt="user upload" style={{maxWidth:200}} />}
            {msg.type === "voice" && <audio src={msg.content} controls />}
          </div>
        ))}
        {loading && <div className="chat-msg bot"><span>Thinking...</span></div>}
      </div>

      <div className="chat-input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <div className="input-icons">
          <button className="search-btn" onClick={handleSend}>🔍</button>
          <button className="settings-btn">⚙️</button>
          <button className="mic-btn" onClick={handleMicBtn}>🎤</button>
          <button className="image-btn" onClick={handleImageBtn}>🖼️</button>
          <button className="send-btn" onClick={handleSend}>Send</button>
        </div>
        <input type="file" accept="image/*" style={{display:'none'}} ref={fileInputRef} onChange={handleImageChange} />
        <input type="file" accept="audio/*" style={{display:'none'}} ref={voiceInputRef} onChange={handleVoiceChange} />
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
