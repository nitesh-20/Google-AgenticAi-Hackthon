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
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const fileInputRef = useRef(null);
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


  // Mic recording logic
  const handleMicBtn = async () => {
    if (recording) {
      // Stop recording
      if (mediaRecorder) mediaRecorder.stop();
      setRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new window.MediaRecorder(stream);
        setMediaRecorder(recorder);
        setAudioChunks([]);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) setAudioChunks((prev) => [...prev, e.data]);
        };
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          setMessages((msgs) => [...msgs, { from: "user", type: "voice", content: URL.createObjectURL(audioBlob) }]);
          setLoading(true);
          try {
            const res = await sendAgroAIVoice(audioBlob);
            setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: res.response || JSON.stringify(res) }]);
          } catch (e) {
            setMessages((msgs) => [...msgs, { from: "bot", type: "text", content: "Error: " + e.message }]);
          }
          setLoading(false);
        };
        recorder.start();
        setRecording(true);
      } catch (err) {
        alert("Mic access denied or not available.");
      }
    }
  };

  // Open file dialog for image
  const handleImageBtn = () => fileInputRef.current && fileInputRef.current.click();


  return (
    <div className="chat-wrapper">
      <div className="chat-card">
        <div className="chat-card-header">
          <div className="chat-avatar">AS</div>
          <div className="chat-title-wrap">
            <div className="chat-title">Agri Sahayak</div>
            {username && <div className="chat-subtitle">Hello, <span className="username">{username}</span> 👋</div>}
            <div className="chat-subtext">How can I help you today?</div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-msg ${msg.from}`}>
              <div className={`bubble ${msg.from === 'bot' ? 'bot-bubble' : 'user-bubble'}`}>
                {msg.type === "text" && <div className="bubble-text">{msg.content}</div>}
                {msg.type === "image" && <img src={msg.content} alt="user upload" className="bubble-image" />}
                {msg.type === "voice" && <audio src={msg.content} controls className="bubble-audio" />}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg bot">
              <div className="bubble bot-bubble"><div className="bubble-text">Thinking...</div></div>
            </div>
          )}
        </div>

        <div className="chat-input-box">
          <input
            className="text-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <div className="input-icons">
            <button
              className={`icon-btn mic-btn ${recording ? 'recording' : ''}`}
              onClick={handleMicBtn}
              title={recording ? 'Stop Recording' : 'Start Recording'}
              aria-label={recording ? 'Stop recording' : 'Start recording'}
            >
              {recording ? (
                /* stop square SVG */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="#b91c1c" />
                </svg>
              ) : (
                /* mic SVG */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" fill="#0b6b58" />
                  <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V21a1 1 0 0 0 2 0v-3.08A7 7 0 0 0 19 11z" fill="#0b6b58" />
                </svg>
              )}
            </button>

            <button
              className="icon-btn image-btn"
              onClick={handleImageBtn}
              title="Upload image"
              aria-label="Upload image"
            >
              <span className="camera-frame" aria-hidden />
            </button>

            <button className="send-btn" onClick={handleSend} title="Send message" aria-label="Send">
              <span className="send-icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="#fff" />
                </svg>
              </span>
              Send
            </button>
          </div>

          <input type="file" accept="image/*" style={{display:'none'}} ref={fileInputRef} onChange={handleImageChange} />
        </div>

      </div>
    </div>
  );
};

export default AgroAI;
