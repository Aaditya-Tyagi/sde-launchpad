/* SDE-2 / QA Launchpad — motion layer.
   Scroll reveal, cursor spotlight, button ripples, nav scroll-shadow,
   and pill bump animations. Fully gated on prefers-reduced-motion and
   degrades to "everything visible" if JS or IntersectionObserver is absent. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    if (!reduce) {
      html.classList.add('js-anim');
      setupReveal();
      setupSpotlight();
      setupRipple();
      setupPillPulse();
    }
    setupNavScroll();
  });

  /* Reveal cards/panels/callouts as they scroll into view, with a light stagger. */
  function setupReveal() {
    var targets = document.querySelectorAll(
      '.tcard, .path-card, .panel, .viz, .callout, [data-reveal]'
    );
    if (!targets.length) return;
    targets.forEach(function (el) { el.setAttribute('data-reveal', ''); });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.style.setProperty('--rd', Math.min(i * 60, 260) + 'ms');
        el.classList.add('in');
        io.unobserve(el);
        i++;
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* Radial light that follows the cursor across cards (one delegated listener). */
  function setupSpotlight() {
    var cards = document.querySelectorAll('.tcard, .path-card, .panel');
    if (!cards.length) return;
    cards.forEach(function (el) { el.classList.add('spotlight'); });
    document.addEventListener('mousemove', function (e) {
      var card = e.target.closest && e.target.closest('.spotlight');
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* Material-style ripple on any button. */
  function setupRipple() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.btn, .btn-primary');
      if (!btn) return;
      var r = btn.getBoundingClientRect();
      var d = Math.max(r.width, r.height);
      var s = document.createElement('span');
      s.className = 'ripple';
      s.style.width = s.style.height = d + 'px';
      s.style.left = (e.clientX - r.left - d / 2) + 'px';
      s.style.top = (e.clientY - r.top - d / 2) + 'px';
      btn.appendChild(s);
      setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 600);
    });
  }

  /* Drop a soft shadow under the nav once the page is scrolled. */
  function setupNavScroll() {
    var nav = document.querySelector('.topnav');
    if (!nav) return;
    var on = null;
    function upd() {
      var s = window.scrollY > 8;
      if (s !== on) { on = s; nav.classList.toggle('scrolled', s); }
    }
    upd();
    window.addEventListener('scroll', upd, { passive: true });
  }

  /* Pop the streak / XP pills whenever their number changes. */
  function setupPillPulse() {
    if (reduce) return;
    ['streakNum', 'lvlNum'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var last = el.textContent;
      var mo = new MutationObserver(function () {
        if (el.textContent === last) return;
        last = el.textContent;
        var pill = el.closest('.streakpill, .xppill');
        if (!pill) return;
        pill.classList.remove('pill-bump');
        void pill.offsetWidth; /* restart the animation */
        pill.classList.add('pill-bump');
      });
      mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }
})();
