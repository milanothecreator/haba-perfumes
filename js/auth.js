/* ============================================
   HABA PERFUMES — Auth Guard
   js/auth.js
============================================ */

import {
  auth, onAuthStateChanged, signOut,
  db, doc, getDoc, setDoc
} from './firebase.js';

// ── Current User State ──
let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  updateNavbar(user);
  if (user) await ensureUserDoc(user);
});

// ── Get Current User ──
export function getUser() { return currentUser; }

// ── Check if logged in ──
export function isLoggedIn() { return !!currentUser; }

// ── Ensure user doc exists ──
async function ensureUserDoc(user) {
  const ref  = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid:      user.uid,
      name:     user.displayName || 'Haba Customer',
      email:    user.email,
      photo:    user.photoURL || '',
      joined:   new Date().toLocaleDateString(),
      orders:   0,
      wishlist: [],
      quizDone: false
    });
  }
}

// ── Update Navbar based on auth state ──
function updateNavbar(user) {
  const accountBtns = document.querySelectorAll('.nav-account');
  const userNameEls = document.querySelectorAll('.nav-username');

  accountBtns.forEach(btn => {
    if (user) {
      btn.innerHTML = `<i class="fa-solid fa-circle-user"></i>`;
      btn.href = 'profile.html';
    } else {
      btn.innerHTML = `<i class="fa-regular fa-circle-user"></i>`;
      btn.href = 'login.html';
    }
  });

  userNameEls.forEach(el => {
    el.textContent = user
      ? (user.displayName || 'My Account')
      : 'Sign In';
  });
}

// ── Sign Out ──
export async function logOut() {
  await signOut(auth);
  localStorage.removeItem('habaCart');
  window.location.href = 'index.html';
}

// ── Auth Guard — shows popup if not logged in ──
export function requireAuth(action, redirectPage = null) {
  if (currentUser) {
    action();
    return;
  }

  // Save redirect
  if (redirectPage) {
    sessionStorage.setItem('authRedirect', redirectPage);
  }

  showAuthPopup();
}

// ── Show Auth Popup ──
export function showAuthPopup() {
  // Remove existing popup if any
  const existing = document.getElementById('authPopup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'authPopup';
  popup.innerHTML = `
    <div class="auth-popup-backdrop" id="popupBackdrop"></div>
    <div class="auth-popup-sheet">
      <div class="popup-handle"></div>

      <div class="popup-icon">🌹</div>
      <h3 class="popup-title">Join Haba Perfumes</h3>
      <p class="popup-sub">
        Create a free account to shop, save favourites,
        take the scent quiz and track your orders.
      </p>

      <div class="popup-actions">
        <a href="login.html?tab=signup" class="btn-gold popup-btn">
          <i class="fa-solid fa-user-plus"></i>
          Create Account
        </a>
        <a href="login.html?tab=login" class="btn-ghost popup-btn">
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
          Sign In
        </a>
      </div>

      <button class="popup-close" id="popupClose">
        Maybe later
      </button>
    </div>
  `;

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #authPopup {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .auth-popup-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(6px);
      animation: fadeIn 0.3s ease;
    }
    .auth-popup-sheet {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 480px;
      background: #111111;
      border-top: 1px solid rgba(201,168,76,0.22);
      border-radius: 28px 28px 0 0;
      padding: 12px 28px 48px;
      text-align: center;
      animation: slideUp 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .popup-handle {
      width: 36px;
      height: 4px;
      background: rgba(201,168,76,0.25);
      border-radius: 999px;
      margin: 0 auto 24px;
    }
    .popup-icon {
      font-size: 2.8rem;
      margin-bottom: 16px;
      display: block;
    }
    .popup-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem;
      font-weight: 300;
      color: #FFFFFF;
      margin-bottom: 10px;
    }
    .popup-sub {
      font-size: 0.78rem;
      color: #C8BCA0;
      line-height: 1.6;
      margin-bottom: 28px;
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
    }
    .popup-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }
    .popup-btn {
      width: 100%;
      justify-content: center;
    }
    .popup-close {
      background: none;
      border: none;
      color: rgba(200,188,160,0.45);
      font-size: 0.72rem;
      letter-spacing: 0.10em;
      cursor: pointer;
      padding: 8px;
      transition: color 0.2s ease;
    }
    .popup-close:hover { color: #C8BCA0; }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(popup);

  // Close handlers
  document.getElementById('popupBackdrop').addEventListener('click', closeAuthPopup);
  document.getElementById('popupClose').addEventListener('click', closeAuthPopup);
}

export function closeAuthPopup() {
  const popup = document.getElementById('authPopup');
  if (popup) popup.remove();
}

// ── Handle ?tab= param on login page ──
if (window.location.pathname.includes('login.html')) {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab === 'signup') {
    window.addEventListener('load', () => {
      if (window.switchTab) window.switchTab('signup');
    });
  }
}