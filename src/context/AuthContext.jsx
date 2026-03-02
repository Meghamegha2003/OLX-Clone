import React, { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password, userName, phoneNumber) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      id: result.user.uid,
      userName,
      PhoneNumber: phoneNumber,
    });
    setCurrentUser(result.user);
    return result.user;
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);