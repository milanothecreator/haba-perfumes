// firebase.js — Haba Perfumes
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

// ── Your Firebase config ──
const firebaseConfig = {
  apiKey:            "AIzaSyDLhkPFsJMdPbGwDL6pVvf0LXnQJIEqMhM",
  authDomain:        "haba-perfumes.firebaseapp.com",
  projectId:         "haba-perfumes",
  storageBucket:     "haba-perfumes.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef123456"
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