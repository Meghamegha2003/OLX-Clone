import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebase/Firebase"

const Login = () => {

  const[email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <Logo />
          <h2>Login</h2>
          <p>Enter your email and password to continue</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="login-input" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="login-input" />
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-option">
            Don't have an account? Sign Up 
          </p>
          <p className="login-footer-text">
            By continuing, you agree to OLX's Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;