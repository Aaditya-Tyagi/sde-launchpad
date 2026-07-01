/* Shared app shell behaviour: streak/XP pills, mobile nav, command palette,
   PWA install affordance, and service-worker registration.
   Extracted from an inline <script> that was duplicated into every one of the
   ~200 built pages — as an external, deferred file it ships once, is parsed
   once, and is cached across navigations. Loaded with `defer`, so it runs
   after the document is parsed (all referenced elements exist) but before
   DOMContentLoaded; `store.js` runs synchronously in <head> first, so
   window.SDE2 is already available here. */
(function () {
  const store = window.SDE2;

  // ---- hydrate streak / xp pills ----
  function paintPills() {
    const s = store.streak();
    const lp = store.levelProgress();
    const sn = document.getElementById('streakNum');
    const ln = document.getElementById('lvlNum');
    if (sn) sn.textContent = String(s.count || 0);
    if (ln) ln.textContent = String(lp.lvl);
    const xpEl = document.getElementById('xpPill');
    if (xpEl) xpEl.title = `Level ${lp.lvl} · ${lp.xp} XP (${lp.pct}% to next)`;
  }
  paintPills();
  store.onChange(paintPills);

  // ---- mobile nav ----
  const burger = document.getElementById('navBurger');
  const navlinks = document.getElementById('navlinks');
  if (burger && navlinks) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navlinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navlinks.addEventListener('click', (e) => { if (e.target.tagName === 'A') navlinks.classList.remove('open'); });
    document.addEventListener('click', (e) => {
      if (!navlinks.contains(e.target) && e.target !== burger && !burger.contains(e.target)) navlinks.classList.remove('open');
    });
  }

  // ---- command palette ----
  const overlay = document.getElementById('cmdkOverlay');
  const input = document.getElementById('cmdkInput');
  const results = document.getElementById('cmdkResults');
  const baseUrl = (document.querySelector('link[rel=manifest]')?.getAttribute('href') || '/manifest.webmanifest').replace('/manifest.webmanifest', '');
  let INDEX = [];
  let sel = 0;

  async function loadIndex() {
    if (INDEX.length) return;
    try {
      const res = await fetch(`${baseUrl}/search.json`);
      INDEX = await res.json();
    } catch {}
  }
  function openCmdk() {
    overlay.classList.add('open');
    input.value = '';
    loadIndex().then(() => renderResults(''));
    setTimeout(() => input.focus(), 30);
  }
  function closeCmdk() { overlay.classList.remove('open'); }
  function renderResults(q) {
    q = q.trim().toLowerCase();
    let items = INDEX;
    if (q) {
      items = INDEX
        .map((it) => ({ it, score: scoreMatch(it, q) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.it);
    }
    items = items.slice(0, 12);
    sel = 0;
    results.innerHTML = items.map((it, i) => `
      <a href="${baseUrl}${it.url}" class="${i === 0 ? 'sel' : ''}" data-i="${i}">
        <div class="r-track">${it.track}</div>
        <div class="r-title">${it.title}</div>
      </a>`).join('') || '<div style="padding:16px;color:var(--muted)">No matches.</div>';
  }
  function scoreMatch(it, q) {
    const t = it.title.toLowerCase();
    const tags = (it.tags || []).join(' ').toLowerCase();
    const sum = (it.summary || '').toLowerCase();
    let s = 0;
    if (t.includes(q)) s += 10;
    if (t.startsWith(q)) s += 8;
    if (tags.includes(q)) s += 5;
    if (sum.includes(q)) s += 2;
    // token overlap
    q.split(/\s+/).forEach((tok) => { if (tok && (t.includes(tok) || tags.includes(tok))) s += 1; });
    return s;
  }
  document.getElementById('cmdkBtn')?.addEventListener('click', openCmdk);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeCmdk(); });
  input?.addEventListener('input', (e) => renderResults(e.target.value));
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.classList.contains('open') ? closeCmdk() : openCmdk(); }
    if (!overlay.classList.contains('open')) return;
    const links = [...results.querySelectorAll('a')];
    if (e.key === 'Escape') closeCmdk();
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, links.length - 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); }
    if (e.key === 'Enter' && links[sel]) { window.location.href = links[sel].getAttribute('href'); }
    links.forEach((a, i) => a.classList.toggle('sel', i === sel));
  });

  // ---- PWA install affordance ----
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferredPrompt = e;
    const b = document.getElementById('installBtn'); if (b) b.classList.remove('hide');
  });
  document.getElementById('installBtn')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.getElementById('installBtn').classList.add('hide');
  });

  // ---- service worker (offline) ----
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${baseUrl}/sw.js`).catch(() => {});
    });
  }
})();
