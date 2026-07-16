import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { 
  Paperclip, 
  Mic, 
  Send, 
  Volume2, 
  BrainCircuit, 
  ChevronRight, 
  Sparkles, 
  PlusCircle, 
  History, 
  Smile, 
  Image as ImageIcon,
  Play
} from "lucide-react";
import { toast } from "react-toastify";
import "../styles/AIWorkspace.css";

const agents = [
  // Agronomy Doctors
  { name: "Disease Agent", desc: "Identifies plant diseases and symptoms.", category: "Agronomy Doctor", avatar: "🦠" },
  { name: "Soil Analyzer", desc: "Examines mineral makeup and soil pH.", category: "Agronomy Doctor", avatar: "🏜️" },
  { name: "Fertilizer Recommendation", desc: "Calculates optimal NPK ratios.", category: "Agronomy Doctor", avatar: "🧪" },
  { name: "Yield Prediction", desc: "Forecasts crop tonnage based on history.", category: "Agronomy Doctor", avatar: "🌾" },
  { name: "Water Planner", desc: "Optimizes watering times & grid lines.", category: "Agronomy Doctor", avatar: "💧" },
  { name: "Pest Detection", desc: "Identifies insect infestations.", category: "Agronomy Doctor", avatar: "🐛" },
  { name: "Organic Certification", desc: "Guidance on natural chemical organic standards.", category: "Agronomy Doctor", avatar: "🍃" },

  // Finance & Credit
  { name: "Subsidy Agent", desc: "Matches farmers to government funding.", category: "Finance & Credit", avatar: "💸" },
  { name: "Insurance Agent", desc: "Helps select crop insurance claims.", category: "Finance & Credit", avatar: "🛡️" },
  { name: "Expense Tracker", desc: "Manages seeds and pesticide invoices.", category: "Finance & Credit", avatar: "📊" },
  { name: "Income Forecast", desc: "Projects revenue based on current trends.", category: "Finance & Credit", avatar: "📈" },
  { name: "Loan Advisor", desc: "Calculates Kisan Credit Card interest rates.", category: "Finance & Credit", avatar: "🏦" },
  { name: "Carbon Credit Advisor", desc: "Calculates credits for natural farming.", category: "Finance & Credit", avatar: "🌱" },

  // Market & Logistics
  { name: "Market Price Agent", desc: "Compares current Mandi pricing indices.", category: "Market & Logistics", avatar: "🏪" },
  { name: "Mandi Comparison", desc: "Finds the highest paying local Mandis.", category: "Market & Logistics", avatar: "🗺️" },
  { name: "Warehouse Finder", desc: "Locates storage for grain inventories.", category: "Market & Logistics", avatar: "📦" },
  { name: "Cold Storage Finder", desc: "Finds preservation facilities for perishables.", category: "Market & Logistics", avatar: "❄️" },
  { name: "Transport Optimizer", desc: "Coordinates truck drivers and routes.", category: "Market & Logistics", avatar: "🚛" },

  // Satellite & Fields
  { name: "Satellite Analysis", desc: "Monitors vegetation health (NDVI).", category: "Satellite & Fields", avatar: "🛰️" },
  { name: "Drone Planning", desc: "Creates fly-paths for pesticide sprays.", category: "Satellite & Fields", avatar: "🛸" },
  { name: "Crop Calendar", desc: "Sets seasonal crop sowing dates.", category: "Satellite & Fields", avatar: "📅" },
  { name: "Livestock Planner", desc: "Monitors cow/buffalo breeding schedules.", category: "Satellite & Fields", avatar: "🐄" },

  // Utility
  { name: "Voice Translator", desc: "Translates speech into local dialects.", category: "Utility & Core", avatar: "🗣️" },
  { name: "Offline Sync", desc: "Maintains local memory storage caches.", category: "Utility & Core", avatar: "📶" },
  { name: "Emergency Hotline", desc: "Direct route to agronomy scientists.", category: "Utility & Core", avatar: "☎️" },
  { name: "Learning Assistant", desc: "Educational tutorials on farming tech.", category: "Utility & Core", avatar: "🎓" }
];

export default function AIWorkspace() {
  const location = useLocation();
  
  // Set default active agent to the one passed in routing state if available
  const [activeAgent, setActiveAgent] = useState(
    (location.state && location.state.initialAgent) ? 
    agents.find(a => a.name === location.state.initialAgent) || agents[0] : 
    agents[0]
  );

  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  
  const chatEndRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice recording simulation
  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setRecordingSeconds(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const triggerVoiceInput = () => {
    if (isRecording) {
      // Stop recording and insert mock speech query
      setIsRecording(false);
      let speechQuery = "";
      switch (activeAgent.name) {
        case "Disease Agent": speechQuery = "मेरी कपास की फसल के पत्ते पीले पड़ रहे हैं, इसका क्या इलाज है?"; break;
        case "Market Price Agent": speechQuery = "इंदौर मंडी में आज सोयाबीन का भाव क्या चल रहा है?"; break;
        case "Subsidy Agent": speechQuery = "सोलर वाटर पंप के लिए सरकारी सब्सिडी पर कैसे अप्लाई करूँ?"; break;
        default: speechQuery = `Can you provide information related to ${activeAgent.name}?`;
      }
      setQuery(speechQuery);
      toast.success("Speech recognized successfully!");
    } else {
      setIsRecording(true);
      toast.info("Microphone listening... Speak now.");
    }
  };

  const handleSend = async (textToSend) => {
    const input = textToSend || query;
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");

    // Simulate Agent Logs / MCP routing process
    setLogs([]);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    
    setLogs(prev => [...prev, { text: "📥 Root Agent received command query...", active: true }]);
    await sleep(600);
    setLogs(prev => [
      ...prev.map(l => ({ ...l, active: false })), 
      { text: "🧠 Intent Router analyzing syntactic structure...", active: true }
    ]);
    await sleep(700);
    setLogs(prev => [
      ...prev.map(l => ({ ...l, active: false })), 
      { text: `🔀 Intent match found. Routing parameters to [${activeAgent.name}]...`, active: true }
    ]);
    await sleep(800);
    setLogs(prev => [
      ...prev.map(l => ({ ...l, active: false })), 
      { text: `📡 Fetching real-time records from agricultural database node...`, active: true }
    ]);
    await sleep(900);
    setLogs(prev => [
      ...prev.map(l => ({ ...l, active: false })), 
      { text: "✅ Compiling localized response in target Hindi dialect...", active: true }
    ]);
    await sleep(600);
    setLogs(prev => prev.map(l => ({ ...l, active: false })));

    // Generate mock agent response
    let responseText = "";
    switch (activeAgent.name) {
      case "Disease Agent":
        responseText = "यह लक्षण लीफ ब्लाइट (Leaf Blight) कवक संक्रमण के हो सकते हैं। इलाज के लिए:\n1. 2 ग्राम कॉपर ऑक्सीक्लोराइड प्रति लीटर पानी में मिलाकर छिडकाव करें।\n2. खेत में जलभराव न होने दें। ये दवाएं आपके नजदीकी कृषि सेवा केंद्र पर उपलब्ध हैं।";
        break;
      case "Market Price Agent":
        responseText = "इंदौर मंडी में आज सोयाबीन का न्यूनतम भाव ₹4,200 और अधिकतम भाव ₹4,650 प्रति क्विंटल दर्ज किया गया है। वर्तमान में बाजार में स्थिरता देखी जा रही है।";
        break;
      case "Subsidy Agent":
        responseText = "PM-KUSUM योजना के तहत सोलर वाटर पंप पर किसानों को 60% तक की सब्सिडी दी जा रही है। ऑनलाइन आवेदन करने के लिए आपका भूमि स्वामित्व रिकॉर्ड (Khasra) और आधार कार्ड आवश्यक है।";
        break;
      default:
        responseText = `[AgriSahayak AI Copilot - ${activeAgent.name}]\nBased on current records, soil indicators are positive. We recommend regular watering schedules and monitoring of local weather alerts for optimal yield output.`;
    }

    setMessages(prev => [...prev, { sender: "assistant", text: responseText }]);
  };

  const getSuggestedPrompts = () => {
    switch (activeAgent.name) {
      case "Disease Agent": return [
        "मेरी धान की पत्तियों पर भूरे धब्बे हैं, क्या करें?",
        "टमाटर में फल छेदक कीट (Fruit Borer) से फसल कैसे बचाएं?"
      ];
      case "Market Price Agent": return [
        "आज के गेहूं के बाजार मंडी भाव की सूची दिखाएं",
        "आने वाले महीनों में सरसों का भाव बढ़ेगा या घटेगा?"
      ];
      case "Subsidy Agent": return [
        "ट्रैक्टर सब्सिडी योजना के लिए पात्रता नियम क्या हैं?",
        "कपास की खेती के लिए फसल बीमा का दावा कैसे करें?"
      ];
      default: return [
        `Show active guidelines for ${activeAgent.name}`,
        `What are the typical queries for ${activeAgent.name}?`
      ];
    }
  };

  const handleFileUpload = (type) => {
    toast.info(`Simulated ${type} file upload successfully detected. Analyzing media...`);
    handleSend(`[Uploaded ${type} File - Analyzing local parameters]`);
  };

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group agents by category
  const categories = [...new Set(agents.map(a => a.category))];

  return (
    <div className="workspace-shell">
      {/* Left Pane: Agent Selection */}
      <div className="agents-pane">
        <div className="pane-header">
          <span className="pane-title">Sub-Agent Nodes</span>
        </div>
        <div className="agent-search">
          <input 
            type="text" 
            className="search-box" 
            placeholder="Search agents..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="agents-list">
          {categories.map(cat => {
            const catAgents = filteredAgents.filter(a => a.category === cat);
            if (catAgents.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: 12 }}>
                <div className="agent-group-title">{cat}</div>
                {catAgents.map(agent => (
                  <div 
                    key={agent.name}
                    className={`agent-item ${activeAgent.name === agent.name ? "active" : ""}`}
                    onClick={() => {
                      setActiveAgent(agent);
                      setMessages([]);
                      setLogs([]);
                    }}
                  >
                    <div className="agent-avatar">{agent.avatar}</div>
                    <div className="agent-info">
                      <span className="agent-name">{agent.name}</span>
                      <span className="agent-desc">{agent.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Pane: Active Workspace Chat */}
      <div className="chat-pane">
        <div className="chat-history">
          {messages.length === 0 ? (
            <div className="suggest-container">
              <div style={{ color: "var(--google-green)", marginBottom: 16 }}>
                <Sparkles size={48} className="sparkle-anim" />
              </div>
              <h2 className="suggest-title">{activeAgent.name} Context Workspace</h2>
              <p className="suggest-subtitle">
                Talk to {activeAgent.name} directly. You can use text, upload files, or use voice commands.
              </p>
              
              <div className="suggestions-grid">
                {getSuggestedPrompts().map((p, idx) => (
                  <div key={idx} className="suggest-card glass-card" onClick={() => handleSend(p)}>
                    <h4>Suggested Prompt</h4>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.sender}`}>
                <div className="msg-avatar">
                  {msg.sender === "user" ? "👨‍🌾" : activeAgent.avatar}
                </div>
                <div className="msg-content">
                  {msg.text.split("\n").map((line, lidx) => (
                    <p key={lidx} style={{ marginBottom: 6 }}>{line}</p>
                  ))}
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Panel */}
        <div className="input-panel">
          <div className="input-container">
            {isRecording ? (
              <div className="voice-wave-container" style={{ flex: 1, padding: 8 }}>
                <div className="wave-bar" style={{ animation: "pulse 1s infinite", height: 24 }}></div>
                <div className="wave-bar" style={{ animation: "pulse 1.2s infinite", height: 16 }}></div>
                <div className="wave-bar" style={{ animation: "pulse 0.8s infinite", height: 28 }}></div>
                <div className="wave-bar" style={{ animation: "pulse 1.4s infinite", height: 12 }}></div>
                <span style={{ fontSize: "0.85rem", color: "var(--google-green)", marginLeft: 12, fontWeight: "600" }}>Listening... (0:0{recordingSeconds})</span>
              </div>
            ) : (
              <textarea 
                className="input-textarea"
                rows={1}
                placeholder={`Ask ${activeAgent.name}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            )}
            
            <div className="actions-row">
              <button className="icon-action-btn" title="Upload Image" onClick={() => handleFileUpload("Image")}>
                <ImageIcon size={18} />
              </button>
              <button className="icon-action-btn" title="Upload PDF/Doc" onClick={() => handleFileUpload("Document")}>
                <Paperclip size={18} />
              </button>
              <button 
                className={`icon-action-btn ${isRecording ? "active" : ""}`} 
                style={{ color: isRecording ? "var(--google-red)" : "var(--text-secondary)" }}
                title="Voice Input" 
                onClick={triggerVoiceInput}
              >
                <Mic size={18} />
              </button>
              <button 
                className="btn-primary" 
                style={{ padding: "8px 16px", borderRadius: "10px" }}
                onClick={() => handleSend()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Execution Log Tracker */}
      <div className="logs-pane">
        <div className="log-title">
          <BrainCircuit size={16} style={{ color: "var(--google-green)" }} />
          <span>MCP Router Logs</span>
        </div>
        <div className="log-list">
          {logs.length === 0 ? (
            <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", textAlign: "center", marginTop: 40 }}>
              No active session.<br />Submit a query to inspect the Multi-Agent routing flow.
            </div>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`log-entry ${log.active ? "active" : ""}`}>
                <div className="log-dot"></div>
                <div className="log-text">{log.text}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
