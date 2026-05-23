// ── theme.js — Haba Perfumes ──
// Handles dark/light toggle across all pages.
// Must be loaded with defer so it doesn't block page render on iOS.

(function () {
  var STORAGE_KEY = 'habaTheme';

  // Apply a theme to <html> and update the button state
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  // Update the moon/sun icons on the button
  function updateButton(theme) {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    if (theme === 'light') {
      btn.classList.add('light-mode');
    } else {
      btn.classList.remove('light-mode');
    }
  }

  // The toggle function — exposed globally so onclick= still works
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Expose to window so inline onclick="toggleTheme()" works
  window.toggleTheme = toggleTheme;

  // Apply saved theme immediately to prevent flash of wrong theme
  var saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  // Once DOM is ready, attach click listener and update button icon
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      updateButton(saved);
    }
  });
})();