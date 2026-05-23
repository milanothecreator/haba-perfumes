// theme.js — Haba Perfumes
// Handles dark/light toggle. Loaded with defer on every page.

(function () {
  var STORAGE_KEY = 'habaTheme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  function updateButton(theme) {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    if (theme === 'light') {
      btn.classList.add('light-mode');
    } else {
      btn.classList.remove('light-mode');
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Expose globally — keeps onclick="toggleTheme()" working as backup
  window.toggleTheme = toggleTheme;

  // Apply saved theme immediately — prevents flash on page load
  var saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  // Attach click listener once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      updateButton(saved);
    }
  });
})();