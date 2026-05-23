/* ============================================
   HABA PERFUMES — Theme Toggle
   js/theme.js
============================================ */

(function() {

  // ── Apply theme instantly before page renders (no flash) ──
  function getTheme() {
    var saved = localStorage.getItem('habaTheme');
    if (saved) return saved;
    // Follow system setting
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('habaTheme', theme);
  }

  // Apply immediately
  var currentTheme = getTheme();
  applyTheme(currentTheme);

  // ── Toggle function ──
  window.toggleTheme = function() {
    var isLight = document.body.classList.contains('light-mode');
    applyTheme(isLight ? 'dark' : 'light');
    // Animate toggle button
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(function() { btn.style.transform = ''; }, 400);
    }
  };

  // ── Listen for system theme changes ──
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
      // Only auto-switch if user hasn't manually chosen
      if (!localStorage.getItem('habaTheme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

})();