import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AppContainer from "./components/AppContainer";
import AIWorkspace from "./pages/AIWorkspace";
import MCPAgents from "./pages/MCPAgents";
import Marketplace from "./pages/Marketplace";
import MapsExperience from "./pages/MapsExperience";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import FarmerProfile from "./pages/FarmerProfile";
import SettingsPage from "./pages/Settings";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Private Dashboard Workspace Routes */}
        <Route path="/app" element={<AppContainer />}>
          <Route path="workspace" element={<AIWorkspace />} />
          <Route path="mcp" element={<MCPAgents />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="maps" element={<MapsExperience />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
