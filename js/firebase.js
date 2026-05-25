// firebase.js — Haba Perfumes
// ⚠️ DO NOT use this file as-is — paste your REAL config below.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// ════════════════════════════════════════════════════════════
// ⚠️  REPLACE THIS WITH YOUR REAL FIREBASE CONFIG
//
// Get it from:
//   Firebase Console → ⚙️ Project Settings → General
//   → Your apps → Web app → SDK setup and configuration → Config
// ════════════════════════════════════════════════════════════
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

provider.setCustomParameters({ prompt: 'select_account' });

export {
  db,
  auth,
  provider,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile
};