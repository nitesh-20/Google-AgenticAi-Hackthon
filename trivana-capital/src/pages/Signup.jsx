import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      navigate("/");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
      <p onClick={() => navigate("/login")}>Already have an account? Login</p>
    </div>
  );
}
