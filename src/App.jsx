import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DiseaseDetect from "./pages/DiseaseDetect";
import MarketPrices from "./pages/MarketPrices";
import "./App.css"; // Optional but good to centralize global fixes

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-tools" element={<DiseaseDetect />} />
        <Route path="/exchange" element={<MarketPrices />} />
      </Routes>
    </>
  );
}

export default App;
