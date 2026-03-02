import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLFXgHBr1aqxpniPWjMcmbM55JhC5_UcM",
  authDomain: "derry-world.firebaseapp.com",
  projectId: "derry-world",
  storageBucket: "derry-world.firebasestorage.app",
  messagingSenderId: "976660041168",
  appId: "1:976660041168:web:69452a678843da2db7fdd5",
  measurementId: "G-7LJ7EK3000"
};

const app= initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

