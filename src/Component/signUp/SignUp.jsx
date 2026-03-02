import React, { useState } from "react";
import "./Signup.css";
import Logo from "../../assets/Logo";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const toastOptions = { style: { background: "#003670", color: "#fff" } };

  const firebaseErrorMessages = {
    "auth/email-already-in-use": "This email is already registered",
    "auth/invalid-email": "Please enter a valid email address",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/operation-not-allowed": "Signup not allowed. Contact support",
    "auth/network-request-failed": "Network error. Please check your connection",
  };

  const handleFn = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim() || !PhoneNumber.trim()) {
      toast("Please fill all fields", toastOptions);
      return;
    }

    if (userName.trim().length < 3) {
      toast("Name must be at least 3 characters", toastOptions);
      return;
    }

    if (password.trim().length < 6) {
      toast("Password must be at least 6 characters", toastOptions);
      return;
    }

    if (!/^\d{10}$/.test(PhoneNumber.trim())) {
      toast("Phone number must be 10 digits", toastOptions);
      return;
    }

    try {
      await signup(email.trim(), password.trim(), userName.trim(), PhoneNumber.trim());
      toast("Account created successfully!", toastOptions);
      navigate("/login");
    } catch (error) {
      const message =
        firebaseErrorMessages[error.code] || "Something went wrong. Please try again";
      toast(message, toastOptions);
    }
  };

  return (
    <div className="signup-page">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="signup-container">
        <div className="signup-left">
          <Logo />
          <h2>Sign Up</h2>
          <p>Create your account to continue</p>
          <form className="signup-form" onSubmit={handleFn}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Full Name"
              className="signup-input"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="signup-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="signup-input"
            />
            <input
              type="number"
              value={PhoneNumber}
              onChange={(e) => {
                if (e.target.value.length <= 10) setPhoneNumber(e.target.value);
              }}
              placeholder="Enter Number"
              className="signup-input"
            />
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
          <p className="login-option">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p className="signup-footer-text">
            By signing up, you agree to OLX's Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;