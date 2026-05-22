/* ============================================
   HABA PERFUMES — Auth Guard (Silver Theme)
   js/auth.js
============================================ */

import {
  auth, onAuthStateChanged, signOut,
  db, doc, getDoc, setDoc
} from './firebase.js';

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  updateNavbar(user);
  if (user) await ensureUserDoc(user);
});

export function getUser()    { return currentUser; }
export function isLoggedIn() { return !!currentUser; }

async function ensureUserDoc(user) {
  try {
    const ref  = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid:      user.uid,
        name:     user.displayName || 'Haba Customer',
        email:    user.email || '',
        photo:    user.photoURL || '',
        joined:   new Date().toLocaleDateString(),
        orders:   0,
        wishlist: [],
        quizDone: false
      });
    }
  } catch(e) { console.log('ensureUserDoc error:', e); }
}

function updateNavbar(user) {
  document.querySelectorAll('.nav-account').forEach(btn => {
    if (user) {
      btn.innerHTML = `<i class="fa-solid fa-circle-user"></i>`;
      btn.href = 'profile.html';
    } else {
      btn.innerHTML = `<i class="fa-regular fa-circle-user"></i>`;
      btn.href = 'login.html';
    }
  });
  document.querySelectorAll('.nav-username').forEach(el => {
    el.textContent = user ? (user.displayName || 'Account') : 'Sign In';
  });
}

export async function logOut() {
  await signOut(auth);
  localStorage.removeItem('habaCart');
  window.location.href = 'index.html';
}

export function requireAuth(action, redirectPage = null) {
  if (currentUser) { action(); return; }
  if (redirectPage) sessionStorage.setItem('authRedirect', redirectPage);
  showAuthPopup();
}

export function showAuthPopup() {
  const existing = document.getElementById('authPopup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'authPopup';
  popup.innerHTML = `
    <div id="popupBackdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.80);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);"></div>
    <div style="position:relative;z-index:1;width:100%;max-width:480px;background:#141418;border-top:1px solid rgba(255,255,255,0.12);border-radius:28px 28px 0 0;padding:12px 28px 48px;text-align:center;">
      <div style="width:36px;height:4px;background:rgba(255,255,255,0.12);border-radius:999px;margin:0 auto 24px;"></div>
      <div style="font-size:2.8rem;margin-bottom:16px;">🌹</div>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;color:#FFFFFF;margin-bottom:10px;">Join Haba Perfumes</h3>
      <p style="font-size:0.78rem;color:#8A8A98;line-height:1.6;margin-bottom:28px;max-width:280px;margin-left:auto;margin-right:auto;">Create a free account to shop, save favourites, take the scent quiz and track your orders.</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
        <a href="login.html?tab=signup" style="width:100%;padding:15px;background:#FFFFFF;border:none;border-radius:999px;color:#0E0E12;font-family:'Montserrat',sans-serif;font-size:0.78rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;text-decoration:none;display:block;text-align:center;">Create Account</a>
        <a href="login.html?tab=login" style="width:100%;padding:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:999px;color:#E8E8F0;font-family:'Montserrat',sans-serif;font-size:0.78rem;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;text-decoration:none;display:block;text-align:center;">Sign In</a>
      </div>
      <button id="popupClose" style="background:none;border:none;color:rgba(200,200,208,0.40);font-size:0.72rem;letter-spacing:0.10em;cursor:pointer;padding:8px;">Maybe later</button>
    </div>
  `;

  popup.style.cssText = 'position:fixed;inset:0;z-index:9000;display:flex;align-items:flex-end;justify-content:center;';

  document.body.appendChild(popup);

  document.getElementById('popupBackdrop').addEventListener('click', closeAuthPopup);
  document.getElementById('popupClose').addEventListener('click', closeAuthPopup);
}

export function closeAuthPopup() {
  const popup = document.getElementById('authPopup');
  if (popup) popup.remove();
}

// Handle ?tab= param on login page
if (window.location.pathname.includes('login.html')) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('tab') === 'signup') {
    window.addEventListener('load', () => {
      if (window.switchTab) window.switchTab('signup');
    });
  }
}