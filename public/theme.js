// Loaded blocking in <head> so the theme is set before first paint.
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }

  var saved = stored();
  root.setAttribute('data-theme', saved ? saved : (mq.matches ? 'dark' : 'light'));

  // Follow the system only while the visitor hasn't picked a theme themselves.
  mq.addEventListener('change', function (e) {
    if (stored()) return;
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });
})();
