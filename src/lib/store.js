/* ===========================================================
   Client-side store — all state persists in localStorage.
   No backend, no DB. Works fully offline.
   =========================================================== */

const NS = 'sde2_v1_';
const K = {
  done: NS + 'done',
  mastery: NS + 'mastery',
  srs: NS + 'srs',
  streak: NS + 'streak',
  xp: NS + 'xp',
  mistakes: NS + 'mistakes',
  customTracks: NS + 'customTracks',
  customItems: NS + 'customItems',
  links: NS + 'links',
  revisit: NS + 'revisit',
  badges: NS + 'badges',
  notes: NS + 'notes',
};

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}
function write(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  emit();
}

const listeners = new Set();
function emit() { listeners.forEach((fn) => { try { fn(); } catch {} }); }

function todayStr() { return new Date().toISOString().slice(0, 10); }

export const store = {
  K,
  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  /* ---- lesson completion ---- */
  isDone(id) { return !!read(K.done, {})[id]; },
  allDone() { return read(K.done, {}); },
  setDone(id, val) {
    const d = read(K.done, {});
    if (val) d[id] = true; else delete d[id];
    write(K.done, d);
    if (val) { store.addXp(20); store.touchStreak(); store.checkBadges(); }
  },

  /* ---- mastery: 0 none, 1 learned, 2 practiced, 3 can-teach ---- */
  mastery(id) { return read(K.mastery, {})[id] || 0; },
  allMastery() { return read(K.mastery, {}); },
  setMastery(id, level) {
    const m = read(K.mastery, {});
    const prev = m[id] || 0;
    m[id] = level;
    write(K.mastery, m);
    if (level > prev) { store.addXp((level - prev) * 15); store.touchStreak(); }
    store.checkBadges();
  },

  /* ---- spaced repetition (SM-2 lite) ---- */
  srs(id) { return read(K.srs, {})[id] || null; },
  allSrs() { return read(K.srs, {}); },
  scheduleSrs(id, quality) {
    // quality: 0 again, 3 hard, 4 good, 5 easy
    const all = read(K.srs, {});
    let c = all[id] || { ease: 2.5, interval: 0, reps: 0 };
    if (quality < 3) {
      c.reps = 0; c.interval = 1;
    } else {
      c.reps += 1;
      if (c.reps === 1) c.interval = 1;
      else if (c.reps === 2) c.interval = 3;
      else c.interval = Math.round(c.interval * c.ease);
      c.ease = Math.max(1.3, c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    }
    const due = new Date();
    due.setDate(due.getDate() + c.interval);
    c.due = due.toISOString().slice(0, 10);
    all[id] = c;
    write(K.srs, all);
    store.addXp(5); store.touchStreak();
  },
  dueCards() {
    const all = read(K.srs, {});
    const today = todayStr();
    return Object.keys(all).filter((id) => all[id].due <= today);
  },
  trackSrs(id) {
    // add a card if not present (with immediate due)
    const all = read(K.srs, {});
    if (!all[id]) { all[id] = { ease: 2.5, interval: 0, reps: 0, due: todayStr() }; write(K.srs, all); }
  },

  /* ---- streaks ---- */
  streak() { return read(K.streak, { count: 0, last: null, best: 0 }); },
  touchStreak() {
    const s = read(K.streak, { count: 0, last: null, best: 0 });
    const today = todayStr();
    if (s.last === today) return;
    const yest = new Date(); yest.setDate(yest.getDate() - 1);
    const yestStr = yest.toISOString().slice(0, 10);
    s.count = s.last === yestStr ? s.count + 1 : 1;
    s.last = today;
    s.best = Math.max(s.best || 0, s.count);
    write(K.streak, s);
  },

  /* ---- XP / level ---- */
  xp() { return read(K.xp, 0); },
  addXp(n) { write(K.xp, read(K.xp, 0) + n); },
  level() {
    const xp = read(K.xp, 0);
    return Math.floor(Math.sqrt(xp / 50)) + 1; // gentle curve
  },
  levelProgress() {
    const xp = read(K.xp, 0);
    const lvl = store.level();
    const cur = 50 * (lvl - 1) * (lvl - 1);
    const next = 50 * lvl * lvl;
    return { lvl, xp, cur, next, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
  },

  /* ---- badges ---- */
  badges() { return read(K.badges, {}); },
  award(id) {
    const b = read(K.badges, {});
    if (!b[id]) { b[id] = todayStr(); write(K.badges, b); }
  },
  checkBadges() {
    const done = Object.keys(read(K.done, {})).length;
    const s = store.streak();
    const teach = Object.values(read(K.mastery, {})).filter((v) => v >= 3).length;
    if (done >= 1) store.award('first-step');
    if (done >= 10) store.award('ten-down');
    if (done >= 30) store.award('grinder');
    if (s.count >= 3) store.award('streak-3');
    if (s.count >= 7) store.award('streak-7');
    if (teach >= 5) store.award('teacher');
  },

  /* ---- mistakes log ---- */
  mistakes() { return read(K.mistakes, []); },
  addMistake(m) {
    const list = read(K.mistakes, []);
    list.unshift({ id: 'm_' + Date.now(), date: todayStr(), ...m });
    write(K.mistakes, list);
    store.addXp(8); store.touchStreak();
  },
  delMistake(id) { write(K.mistakes, read(K.mistakes, []).filter((x) => x.id !== id)); },

  /* ---- custom tracks / items / links / revisit (ported) ---- */
  customTracks() { return read(K.customTracks, []); },
  addTrack(t) { const l = read(K.customTracks, []); l.push(t); write(K.customTracks, l); },
  delTrack(id) {
    write(K.customTracks, read(K.customTracks, []).filter((x) => x.id !== id));
    write(K.customItems, read(K.customItems, []).filter((x) => x.track !== id));
  },
  customItems() { return read(K.customItems, []); },
  addItem(it) { const l = read(K.customItems, []); l.push(it); write(K.customItems, l); },
  delItem(id) { write(K.customItems, read(K.customItems, []).filter((x) => x.id !== id)); },

  links() { return read(K.links, []); },
  addLink(l) { const list = read(K.links, []); list.push(l); write(K.links, list); },
  delLink(id) { write(K.links, read(K.links, []).filter((x) => x.id !== id)); },

  revisit() { return read(K.revisit, {}); },
  toggleRevisit(id) {
    const r = read(K.revisit, {});
    if (r[id]) delete r[id]; else r[id] = true;
    write(K.revisit, r);
  },

  notes(id) { return read(K.notes, {})[id] || ''; },
  setNote(id, txt) { const n = read(K.notes, {}); n[id] = txt; write(K.notes, n); },

  /* ---- backup / restore ---- */
  exportAll() {
    const out = {};
    Object.values(K).forEach((k) => { out[k] = read(k, null); });
    return { __sde2: true, version: 1, exported: new Date().toISOString(), data: out };
  },
  importAll(obj) {
    if (!obj || !obj.__sde2 || !obj.data) throw new Error('Not a valid SDE-2 Launchpad backup.');
    Object.entries(obj.data).forEach(([k, v]) => {
      if (v == null) localStorage.removeItem(k);
      else localStorage.setItem(k, JSON.stringify(v));
    });
    emit();
  },
  resetAll() { Object.values(K).forEach((k) => localStorage.removeItem(k)); emit(); },
};

if (typeof window !== 'undefined') window.SDE2 = store;
