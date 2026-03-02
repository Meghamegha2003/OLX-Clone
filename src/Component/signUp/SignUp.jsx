import React, {  useState } from "react";
import "./Signup.css";
import Logo from "../../assets/Logo";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
const Signup = () => {

    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [PhoneNumber,setPhoneNumber] = useState("")
    const navigate  = useNavigate()
   const handleFn = async (e)=>{
    e.preventDefault()
    try {
      const result = await createUserWithEmailAndPassword(auth,email,password)
      await addDoc(collection(db,'users'),{
        id:result.user.uid,
        userName:userName,
        PhoneNumber:PhoneNumber,
      })
      navigate("/login")
    } catch (error) {
      alert(error.message)
    }
   }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <Logo />
          <h2>Sign Up</h2>
          <p>Create your account to continue</p>
          <form className="signup-form" onSubmit={handleFn}>
            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Full Name" className="signup-input" />
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="signup-input" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="signup-input" />
            <input type="number" value={PhoneNumber} onChange={(e)=>{if(e.target.value.length<=10)setPhoneNumber(e.target.value)}} placeholder="Enter Number" className="signup-input" />
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="login-option">
            Already have an account? <a href="/login">Login</a>
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