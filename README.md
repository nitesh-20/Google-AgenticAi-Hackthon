# 🎨 Framer Prototype

Check out the Framer design for this project:

[Landing page](https://framer.com/projects/Webster-copy--HsbU2qYYn6Fm727KaLQk-fw1Tq?node=B9ze90l9s)

# Agri Sahayak (Trivana)

A full-stack AI-powered agriculture assistant and social platform.

## Features
- AgroAI chatbot (Gemini & OpenAI integration, voice, image, text)
- Agri Socio (social page)
- Utility Tools (weather, land, seeds, etc.)
- Firebase Auth, Vite + React frontend
- FastAPI Python backend

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone <https://github.com/nitesh-20/Google-AgenticAi-Hackthon>
cd Google-AgenticAi-Hackthon
```

### 2. Backend Setup (FastAPI)
```bash
cd agri_ai_bot_with_key
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt  # (create if missing)
cp .env.example .env  # or create .env and add GEMINI_API_KEY=...
uvicorn main:app --reload --port 8002
```

- Edit `.env` and set your Gemini API key.

### 3. Frontend Setup (React + Vite)
```bash
cd ../trivana-capital
npm install
npm run dev
```
- App runs at http://localhost:5173

### 4. Firebase Setup
- Add your Firebase config to `src/firebase.js`.
- Enable Email/Password Auth in Firebase Console.

---

## 🛠️ Project Structure

- `agri_ai_bot_with_key/` — FastAPI backend (Python)
- `trivana-capital/` — React frontend (Vite, Firebase)

---

## 🔑 Environment Variables
- Backend: `.env` with `GEMINI_API_KEY=...`
- Frontend: Firebase config in `src/firebase.js`

---

## 🧑‍💻 Development
- Backend: Python 3.10+, FastAPI, httpx, python-dotenv
- Frontend: Node.js 18+, React, Vite, Firebase

---

## 📦 Install Requirements (Backend)
If `requirements.txt` is missing, create it with:
```
fastapi
uvicorn
python-dotenv
httpx
```
# 🌾 AgriSahayak AI — Powering Bharat’s Next Agri Revolution  
Built by *Trivana Capital* | Agentic AI Hackathon Finalist 2025

---

## 📌 Overview

*AgriSahayak AI* is a next-gen *Agricultural Copilot OS—built as a multilingual, voice-first, offline-resilient AI assistant tailored for India’s 100M+ farmers. It’s not just a chatbot — it’s a **Multi-Agent Command Tree System (MCP)*, backed by Google’s latest AI tools and agent architecture (ADK), enabling 30+ powerful agents that work together to support real agricultural decisions.

---

## 💡 Key Differentiators

•⁠  ⁠🤖 Not a general chatbot — a *Modular AI Copilot* with deep logic for every farming need.
•⁠  ⁠🌐 Works even in low-connectivity rural India (offline-first protocols).
•⁠  ⁠🧠 Learns farmer behavior and responds in native languages (voice/text/image).
•⁠  ⁠🛰 Built for real impact — from disease detection to subsidy access to insurance filing.

---

## 🧠 Core Modules & Agents

### 🔹 1. Market Operations
•⁠  ⁠NCDEX & VyapaarBazaar Live Price Tracker
•⁠  ⁠Crop Transport Cost Advisor
•⁠  ⁠Mandi Price Comparison Bot
•⁠  ⁠Seed/Fertilizer Dept. Alert Agents
•⁠  ⁠Khasra-based Land Record Agent

### 🔹 2. Smart Utility Tools
•⁠  ⁠📷 Plant Disease Detector (Image + Voice + Text)
•⁠  ⁠🧪 Soil Report Analyzer (PDF upload)
•⁠  ⁠📞 AI Call Copilot for WhatsApp & Voice
•⁠  ⁠🐄 Cattle Health Vet Assistant
•⁠  ⁠🛰 Satellite Monitoring using Google Earth
•⁠  ⁠📊 Farm Productivity Dashboard
•⁠  ⁠📉 Expense, Profit, Yield Tracker
•⁠  ⁠💧 Irrigation Planner Agent

### 🔹 3. Farmer Life & Docs
•⁠  ⁠🎯 Government Scheme Navigator
•⁠  ⁠📝 Automatic Insurance Claim Generator
•⁠  ⁠🧭 Organic Kheti Agent
•⁠  ⁠✍️ Personalized Feedback Learner
•⁠  ⁠🧾 Smart Farm Diary Generator
•⁠  ⁠📱 1-Click Voice Hotline to Experts

---

## 🚀 Tech Stack

| Google Tech                     | Usage                                                                 |
|--------------------------------|------------------------------------------------------------------------|
| *Gemini Pro / Flash*         | Crop disease detection, multilingual chat, scheme advisory            |
| *Vertex AI*                  | ML for yield prediction, image analysis, agent pipelines              |
| *Firebase (Auth, Firestore)* | Real-time farmer profiles, chat history, weather info, offline sync   |
| *Cloud Run + FastAPI*        | Modular MCP backend, routes to agents based on context                |
| *Cloud Storage (GCS)*        | Store KYC, crop/land images, speech input                             |
| *Speech-to-Text / TTS APIs*  | Voice queries + voice-based AI replies                                |
| *Google Maps API*            | Land mapping (Khasra no.), route prediction, market mapping           |

✅ These enable our system to support rural scale, offline functionality, voice-first navigation, and agent-based orchestration.

---

## 🧱 MCP Architecture

•⁠  ⁠🧠 Root Agent: Handles language, input processing, context parsing
•⁠  ⁠🌲 Sub-Agents: 33+ agents (Disease, Price, Schemes, Insurance, Transport, Vet, etc.)
•⁠  ⁠🔁 Shared Memory: Keeps state (farmer profile, crop history, preferences)
•⁠  ⁠🔌 Offline Fallback: Local protocol (GSM/BLE) to work without internet

---

## 📦 Getting Started

### 🛠 Backend

```bash
cd backend/
uvicorn main:app --reload  # Using FastAPI on Cloud Run

💻 Frontend

📁 Deployment
	•	✅ Deployed via Firebase Hosting
	•	✅ MCP server deployed via Google Cloud Run
	•	✅ Gemini, Vertex AI & STT APIs connected via environment variables

    🌱 Vision & Impact

“We are not just building an app — we are building Bharat’s agricultural brain.”

AgriSahayak AI brings modern intelligence to the most underserved, non-digital, voice-first communities of India — empowering farmers with confidence, clarity, and control over their land and future.

⸻

🤝 Team

Made with ❤️ by Trivana Capital
Built using only Google-native technologies for Agentic AI Hackathon 2025
---

## 📝 License
MIT
