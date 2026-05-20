/* ============================================
   HABA PERFUMES — Firebase Config
   js/firebase.js
============================================ */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc,
  updateDoc, deleteDoc, doc, onSnapshot, setDoc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  GoogleAuthProvider, signInWithPopup, updateProfile }
  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCm_m0MPyu9giTRNa1cRLFBy0P0ZENbnY0",
  authDomain: "haba-perfumes.firebaseapp.com",
  projectId: "haba-perfumes",
  storageBucket: "haba-perfumes.firebasestorage.app",
  messagingSenderId: "854612991096",
  appId: "1:854612991096:web:1f59468d4ad67af1fc618d"
};

const app      = initializeApp(firebaseConfig);
const db       = getFirestore(app);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db, auth, provider,
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, onSnapshot, setDoc, getDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged,
  GoogleAuthProvider, signInWithPopup, updateProfile
};