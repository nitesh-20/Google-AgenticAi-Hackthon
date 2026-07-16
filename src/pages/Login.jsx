import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpUser, loginUser } from "../firebase/auth";
import "../styles/Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      toast.info("Signing up...");
      const { user, error } = await signUpUser(email, password);
      // Fallback check if it fails due to lack of API keys, we can simulate for now
      if (error) {
        toast.error("Error signing up: " + error + " (Is Firebase configured?)");
      } else {
        toast.success("Successfully registered!");
        navigate("/app/workspace"); 
      }
    } else {
      toast.info("Logging in...");
      const { user, error } = await loginUser(email, password);
      if (error) {
        toast.error("Error logging in: " + error + " (Is Firebase configured?)");
      } else {
        toast.success("Successfully logged in!");
        navigate("/app/workspace"); 
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignup ? "Create an Account" : "Welcome Back!"}</h2>
        <p>{isSignup ? "Join AgroAi Trading Platform" : "Login to AgroAi Trading Platform"}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="signup-link">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span 
            onClick={() => setIsSignup(!isSignup)} 
            style={{ color: "#28a745", fontWeight: "600", cursor: "pointer", textDecoration: "none" }}
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}