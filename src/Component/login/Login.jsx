import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toastOptions = { style: { background: "#003670", color: "#fff" } };

  const firebaseErrorMessages = {
    "auth/invalid-email": "Please enter a valid email address",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password. Please try again",
    "auth/invalid-credential": "Invalid login credentials. Please check your email and password",
    "auth/too-many-requests": "Too many login attempts. Please try again later",
    "auth/network-request-failed": "Network error. Please check your connection",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() && !password.trim()) {
      toast("Please enter your email and password", toastOptions);
      return;
    }

    if (!email.trim()) {
      toast("Please enter your email", toastOptions);
      return;
    }

    if (!password.trim()) {
      toast("Please enter your password", toastOptions);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      toast("Login successful! Redirecting...", toastOptions);
      navigate("/");
    } catch (error) {
      const message =
        firebaseErrorMessages[error.code] || "Something went wrong. Please try again";
      toast(message, toastOptions);
    }
  };

  return (
    <div className="login-page">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="login-container">
        <div className="login-left">
          <Logo />
          <h2>Login</h2>
          <p>Enter your email and password to continue</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="login-input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="signup-option">
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
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