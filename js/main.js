/* ============================================
   HABA PERFUMES — Main JS
   js/main.js
============================================ */

// ── Page Fade In ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// ── Scroll Animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(28px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)';
  observer.observe(el);
});

// ── Navbar Hide/Show ──
let lastScroll = 0, ticking = false;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const cur = window.scrollY;
      if (cur > lastScroll && cur > 80) {
        navbar && (navbar.style.transform = 'translateY(-100%)');
      } else {
        navbar && (navbar.style.transform = 'translateY(0)');
      }
      if (cur > 60) navbar && navbar.classList.add('scrolled');
      else navbar && navbar.classList.remove('scrolled');
      lastScroll = cur;
      ticking = false;
    });
    ticking = true;
  }
});

// Navbar scroll style
const navStyle = document.createElement('style');
navStyle.textContent = `
  .navbar {
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
    background 0.4s ease, box-shadow 0.4s ease;
  }
  .navbar.scrolled {
    background: rgba(8,8,8,0.95) !important;
    box-shadow: 0 1px 0 rgba(201,168,76,0.12);
  }
`;
document.head.appendChild(navStyle);

// ── Ripple Effect ──
document.querySelectorAll('.btn-gold, .btn-ghost, .add-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.18); border-radius:50%;
      transform:scale(0); animation:rippleAnim 0.55s ease-out forwards;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform:scale(2.5); opacity:0; }
  }`;
document.head.appendChild(rippleStyle);

// ── Card Touch Effect ──
document.querySelectorAll('.shop-card, .product-card').forEach(card => {
  card.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.97)';
  }, { passive: true });
  card.addEventListener('touchend', function() {
    this.style.transform = '';
  }, { passive: true });
});

// ── Drag to Scroll ──
document.querySelectorAll('.pills-row, .tabs-row').forEach(row => {
  let isDown = false, startX, scrollLeft;
  row.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
    row.style.cursor = 'grabbing';
  });
  row.addEventListener('mouseleave', () => { isDown = false; row.style.cursor = ''; });
  row.addEventListener('mouseup',    () => { isDown = false; row.style.cursor = ''; });
  row.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    row.scrollLeft = scrollLeft - (e.pageX - row.offsetLeft - startX) * 1.5;
  });
});

// ── Gold Glow on Hover ──
document.querySelectorAll('.shop-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    this.style.background = `radial-gradient(circle at ${x}% ${y}%,
      rgba(201,168,76,0.10) 0%, rgba(255,255,255,0.04) 60%)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.background = '';
  });
});

// ── Button Touch Feedback ──
document.querySelectorAll('.btn-gold, .btn-ghost').forEach(btn => {
  btn.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.96)';
  }, { passive: true });
  btn.addEventListener('touchend', function() {
    this.style.transform = '';
  }, { passive: true });
});

// ── Bottom Nav Active ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-item').forEach(item => {
  const href = item.getAttribute('href');
  if (href && href.includes(currentPage)) item.classList.add('active');
});

// ── Cart Count from localStorage ──
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('habaCart') || '[]');
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.classList.toggle('visible', total > 0);
  });
}
updateCartBadge();

// ── Console Branding ──
console.log('%c HABA PERFUMES ',
  'background:linear-gradient(135deg,#C9A84C,#E8C97E);color:#080808;' +
  'font-size:14px;font-weight:700;padding:6px 16px;border-radius:20px;');
console.log('%c Find Your Signature Scent 🌹',
  'color:#C9A84C;font-size:11px;');