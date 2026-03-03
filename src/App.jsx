import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import "./App.css";
import ViewPage from "./pages/ViewPage";
import PostAdPage from "./pages/PostAdPage";
import MyAdsPage from "./pages/MyAdsPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./route/ProtectedRoute";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // optional: show a loader here

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/postad"
          element={
            <ProtectedRoute user={user}>
              <PostAdPage />
            </ProtectedRoute>
          }
        />
        <Route path="/view/:id" element={<ViewPage />} />
        <Route
          path="/myads"
          element={
            <ProtectedRoute user={user}>
              <MyAdsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;