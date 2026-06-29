/* ===========================================================
   SDE-2 Launchpad — global client store (classic script).
   Loaded in <head> so window.SDE2 exists before any page script.
   All state persists in localStorage. No backend, no DB. Offline.
   =========================================================== */
window.SDE2 = (function () {
  var NS = 'sde2_v1_';
  var K = {
    done: NS + 'done', mastery: NS + 'mastery', srs: NS + 'srs', streak: NS + 'streak',
    xp: NS + 'xp', mistakes: NS + 'mistakes', customTracks: NS + 'customTracks',
    customItems: NS + 'customItems', links: NS + 'links', revisit: NS + 'revisit',
    badges: NS + 'badges', notes: NS + 'notes',
    dsaSolved: NS + 'dsaSolved', dsaGoal: NS + 'dsaGoal', dsaDaily: NS + 'dsaDaily',
    profile: NS + 'profile', dailyTasks: NS + 'dailyTasks', mockScores: NS + 'mockScores',
    stories: NS + 'stories', quizStats: NS + 'quizStats', mockSessions: NS + 'mockSessions',
    designs: NS + 'designs',
  };
  function read(key, fb) { try { var v = localStorage.getItem(key); return v == null ? fb : JSON.parse(v); } catch (e) { return fb; } }
  var listeners = new Set();
  function emit() { listeners.forEach(function (fn) { try { fn(); } catch (e) {} }); }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} emit(); }
  function today() { return new Date().toISOString().slice(0, 10); }

  var store = {
    K: K,
    onChange: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },

    isDone: function (id) { return !!read(K.done, {})[id]; },
    allDone: function () { return read(K.done, {}); },
    setDone: function (id, val) {
      var d = read(K.done, {}); if (val) d[id] = true; else delete d[id]; write(K.done, d);
      if (val) { store.addXp(20); store.touchStreak(); store.checkBadges(); }
    },

    mastery: function (id) { return read(K.mastery, {})[id] || 0; },
    allMastery: function () { return read(K.mastery, {}); },
    setMastery: function (id, level) {
      var m = read(K.mastery, {}); var prev = m[id] || 0; m[id] = level; write(K.mastery, m);
      if (level > prev) { store.addXp((level - prev) * 15); store.touchStreak(); }
      store.checkBadges();
    },

    srs: function (id) { return read(K.srs, {})[id] || null; },
    allSrs: function () { return read(K.srs, {}); },
    scheduleSrs: function (id, quality) {
      var all = read(K.srs, {}); var c = all[id] || { ease: 2.5, interval: 0, reps: 0 };
      if (quality < 3) { c.reps = 0; c.interval = 1; }
      else {
        c.reps += 1;
        if (c.reps === 1) c.interval = 1; else if (c.reps === 2) c.interval = 3; else c.interval = Math.round(c.interval * c.ease);
        c.ease = Math.max(1.3, c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      }
      var due = new Date(); due.setDate(due.getDate() + c.interval); c.due = due.toISOString().slice(0, 10);
      all[id] = c; write(K.srs, all); store.addXp(5); store.touchStreak();
    },
    dueCards: function () { var all = read(K.srs, {}); var t = today(); return Object.keys(all).filter(function (id) { return all[id].due <= t; }); },
    allCards: function () { return Object.keys(read(K.srs, {})); },
    trackSrs: function (id) { var all = read(K.srs, {}); if (!all[id]) { all[id] = { ease: 2.5, interval: 0, reps: 0, due: today() }; write(K.srs, all); } },
    untrackSrs: function (id) { var all = read(K.srs, {}); delete all[id]; write(K.srs, all); },

    streak: function () { return read(K.streak, { count: 0, last: null, best: 0 }); },
    touchStreak: function () {
      var s = read(K.streak, { count: 0, last: null, best: 0 }); var t = today(); if (s.last === t) return;
      var y = new Date(); y.setDate(y.getDate() - 1); var ys = y.toISOString().slice(0, 10);
      s.count = s.last === ys ? s.count + 1 : 1; s.last = t; s.best = Math.max(s.best || 0, s.count); write(K.streak, s);
    },

    xp: function () { return read(K.xp, 0); },
    addXp: function (n) { write(K.xp, read(K.xp, 0) + n); },
    level: function () { return Math.floor(Math.sqrt(read(K.xp, 0) / 50)) + 1; },
    levelProgress: function () {
      var xp = read(K.xp, 0); var lvl = store.level();
      var cur = 50 * (lvl - 1) * (lvl - 1); var next = 50 * lvl * lvl;
      return { lvl: lvl, xp: xp, cur: cur, next: next, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
    },

    badges: function () { return read(K.badges, {}); },
    award: function (id) { var b = read(K.badges, {}); if (!b[id]) { b[id] = today(); write(K.badges, b); } },
    checkBadges: function () {
      var done = Object.keys(read(K.done, {})).length; var s = store.streak();
      var teach = Object.values(read(K.mastery, {})).filter(function (v) { return v >= 3; }).length;
      if (done >= 1) store.award('first-step');
      if (done >= 10) store.award('ten-down');
      if (done >= 30) store.award('grinder');
      if (s.count >= 3) store.award('streak-3');
      if (s.count >= 7) store.award('streak-7');
      if (s.count >= 30) store.award('streak-30');
      if (teach >= 5) store.award('teacher');
      var solved = store.solvedCount();
      if (solved >= 1) store.award('first-solve');
      if (solved >= 25) store.award('solver-25');
      if (solved >= 90) store.award('solver-90');
      if (solved >= 180) store.award('solver-180');
    },

    mistakes: function () { return read(K.mistakes, []); },
    addMistake: function (m) { var l = read(K.mistakes, []); l.unshift(Object.assign({ id: 'm_' + Date.now(), date: today() }, m)); write(K.mistakes, l); store.addXp(8); store.touchStreak(); },
    delMistake: function (id) { write(K.mistakes, read(K.mistakes, []).filter(function (x) { return x.id !== id; })); },

    customTracks: function () { return read(K.customTracks, []); },
    addTrack: function (t) { var l = read(K.customTracks, []); l.push(t); write(K.customTracks, l); },
    delTrack: function (id) { write(K.customTracks, read(K.customTracks, []).filter(function (x) { return x.id !== id; })); write(K.customItems, read(K.customItems, []).filter(function (x) { return x.track !== id; })); },
    customItems: function () { return read(K.customItems, []); },
    addItem: function (it) { var l = read(K.customItems, []); l.push(it); write(K.customItems, l); },
    delItem: function (id) { write(K.customItems, read(K.customItems, []).filter(function (x) { return x.id !== id; })); },

    links: function () { return read(K.links, []); },
    addLink: function (l) { var list = read(K.links, []); list.push(l); write(K.links, list); },
    delLink: function (id) { write(K.links, read(K.links, []).filter(function (x) { return x.id !== id; })); },

    revisit: function () { return read(K.revisit, {}); },
    toggleRevisit: function (id) { var r = read(K.revisit, {}); if (r[id]) delete r[id]; else r[id] = true; write(K.revisit, r); },

    notes: function (id) { return read(K.notes, {})[id] || ''; },
    setNote: function (id, txt) { var n = read(K.notes, {}); n[id] = txt; write(K.notes, n); },

    /* ---- DSA Quest game ---- */
    dsaSolved: function () { return read(K.dsaSolved, {}); },
    isSolved: function (pid) { return !!read(K.dsaSolved, {})[pid]; },
    solvedCount: function () { return Object.keys(read(K.dsaSolved, {})).length; },
    toggleSolved: function (pid, difficulty) {
      var s = read(K.dsaSolved, {});
      if (s[pid]) { delete s[pid]; write(K.dsaSolved, s); store.checkBadges(); return false; }
      s[pid] = today(); write(K.dsaSolved, s);
      var xp = difficulty === 'Hard' ? 30 : difficulty === 'Easy' ? 10 : 20;
      store.addXp(xp); store.touchStreak(); store._bumpDaily(); store.checkBadges();
      return true;
    },
    dsaGoal: function () { return read(K.dsaGoal, 2); },
    setDsaGoal: function (n) { write(K.dsaGoal, Math.max(1, n | 0)); },
    _bumpDaily: function () { var d = read(K.dsaDaily, { date: today(), count: 0 }); if (d.date !== today()) d = { date: today(), count: 0 }; d.count += 1; write(K.dsaDaily, d); },
    solvedToday: function () { var d = read(K.dsaDaily, { date: today(), count: 0 }); return d.date === today() ? d.count : 0; },
    daysSincePractice: function () {
      var s = read(K.streak, { count: 0, last: null });
      if (!s.last) return null;
      var diff = Math.floor((new Date(today()) - new Date(s.last)) / 86400000);
      return diff;
    },
    // mascot mood: new | happy | fire | content | sad | sleeping
    mood: function () {
      var solved = store.solvedCount();
      var since = store.daysSincePractice();
      var streak = store.streak().count || 0;
      if (since === null || solved === 0) return 'new';
      if (since === 0) return streak >= 7 ? 'fire' : 'happy';
      if (since === 1) return 'content';
      if (since <= 3) return 'sad';
      return 'sleeping';
    },

    /* ---- profile / onboarding ---- */
    profile: function () { return read(K.profile, null); },
    isOnboarded: function () { return !!read(K.profile, null); },
    saveProfile: function (p) {
      var existing = read(K.profile, {}) || {};
      var merged = Object.assign({}, existing, p);
      if (!merged.startedAt) merged.startedAt = today();
      write(K.profile, merged);
    },

    /* ---- daily task flags (for the "Today" queue) ---- */
    dailyTaskDone: function (key) { var d = read(K.dailyTasks, {}); return d.date === today() && !!(d.tasks || {})[key]; },
    markDailyTask: function (key) {
      var d = read(K.dailyTasks, {});
      if (d.date !== today()) d = { date: today(), tasks: {} };
      d.tasks[key] = true; write(K.dailyTasks, d);
    },

    /* ---- mock self-rated sessions ---- */
    mockScores: function () { return read(K.mockScores, []); },
    logMock: function (score, track) {
      var l = read(K.mockScores, []);
      l.unshift({ score: score, track: track || 'all', date: today(), ts: Date.now() });
      write(K.mockScores, l.slice(0, 100)); store.addXp(12); store.touchStreak();
    },
    mockSessions: function () { return read(K.mockSessions, []); },
    logMockSession: function (rec) {
      var l = read(K.mockSessions, []);
      l.unshift(Object.assign({ id: 'ms_' + Date.now(), date: today() }, rec));
      write(K.mockSessions, l.slice(0, 50));
    },

    /* ---- STAR behavioral story bank ---- */
    stories: function () { return read(K.stories, []); },
    addStory: function (s) {
      var l = read(K.stories, []);
      var id = 'st_' + Date.now();
      l.unshift(Object.assign({ id: id, created: today(), rehearsals: 0, lastRehearsed: null, confidence: 0 }, s));
      write(K.stories, l); store.addXp(15); store.touchStreak(); store.checkBadges();
      return id;
    },
    updateStory: function (id, patch) {
      var l = read(K.stories, []); var i = l.findIndex(function (x) { return x.id === id; });
      if (i >= 0) { l[i] = Object.assign({}, l[i], patch); write(K.stories, l); }
    },
    delStory: function (id) { write(K.stories, read(K.stories, []).filter(function (x) { return x.id !== id; })); },
    rehearseStory: function (id, rating) {
      var l = read(K.stories, []); var i = l.findIndex(function (x) { return x.id === id; });
      if (i >= 0) {
        l[i].rehearsals = (l[i].rehearsals || 0) + 1; l[i].lastRehearsed = today();
        if (rating) l[i].confidence = rating;
        write(K.stories, l);
      }
      store.addXp(8); store.touchStreak();
    },

    /* ---- system design canvas ---- */
    designs: function () { return read(K.designs, []); },
    addDesign: function (d) {
      var l = read(K.designs, []);
      var id = 'dz_' + Date.now();
      l.unshift(Object.assign({ id: id, created: today(), updated: today(), steps: {} }, d));
      write(K.designs, l); store.addXp(10); store.touchStreak();
      return id;
    },
    updateDesign: function (id, patch) {
      var l = read(K.designs, []); var i = l.findIndex(function (x) { return x.id === id; });
      if (i >= 0) { l[i] = Object.assign({}, l[i], patch, { updated: today() }); write(K.designs, l); }
    },
    delDesign: function (id) { write(K.designs, read(K.designs, []).filter(function (x) { return x.id !== id; })); },

    /* ---- predict-the-output quiz stats ---- */
    quizStats: function () { return read(K.quizStats, {}); },
    quizStat: function (id) { return read(K.quizStats, {})[id] || null; },
    recordQuiz: function (id, correct) {
      var m = read(K.quizStats, {});
      var s = m[id] || { seen: 0, correct: 0, last: null };
      s.seen += 1; if (correct) s.correct += 1; s.last = correct ? 'ok' : 'miss'; s.date = today();
      m[id] = s; write(K.quizStats, m);
      store.addXp(correct ? 6 : 2); store.touchStreak();
    },

    /* ---- Readiness Score ----
       Content-agnostic: caller passes totals it derives from the lesson/pattern
       collections. Returns a 0-100 composite + the six sub-dimensions (each 0-100).
       totals = {
         lessonWeightDone, lessonWeightTotal,   // priority-weighted lesson coverage
         dsaSolved, dsaTarget,                   // dsaTarget e.g. 90 (diminishing returns)
         behavioralDone, behavioralTotal,        // behavioral lessons
       }                                                                          */
    readiness: function (t) {
      t = t || {};
      var clamp = function (n) { return Math.max(0, Math.min(100, Math.round(n))); };

      // Coverage — priority-weighted lesson completion
      var coverage = t.lessonWeightTotal > 0 ? (t.lessonWeightDone / t.lessonWeightTotal) * 100 : 0;

      // DSA fluency — diminishing returns toward a target count
      var dsaTarget = t.dsaTarget || 90;
      var dsa = Math.min(100, ((t.dsaSolved || 0) / dsaTarget) * 100);

      // Recall — fraction of tracked SRS cards that are "mature" (>=3 reps or interval>=7d)
      var cards = read(K.srs, {});
      var ids = Object.keys(cards);
      var mature = ids.filter(function (id) { var c = cards[id]; return c && (c.reps >= 3 || c.interval >= 7); }).length;
      var recall = ids.length ? (mature / ids.length) * 100 : 0;

      // Behavioral — half lesson coverage, half STAR story bank coverage (8 stories = strong)
      var stories = read(K.stories, []);
      var storyCov = Math.min(1, stories.length / 8) * 100;
      var lessonCov = t.behavioralTotal > 0 ? (t.behavioralDone / t.behavioralTotal) * 100 : 0;
      var behavioral = t.behavioralTotal > 0 ? lessonCov * 0.5 + storyCov * 0.5 : storyCov;

      // Mock performance — average self-rated score (1-5 → 0-100)
      var ms = read(K.mockScores, []);
      var mock = ms.length ? (ms.reduce(function (s, m) { return s + m.score; }, 0) / ms.length / 5) * 100 : 0;

      // Consistency — current streak toward a 14-day habit
      var streak = (read(K.streak, { count: 0 }).count) || 0;
      var consistency = Math.min(100, (streak / 14) * 100);

      var dims = {
        coverage: clamp(coverage), dsa: clamp(dsa), recall: clamp(recall),
        behavioral: clamp(behavioral), mock: clamp(mock), consistency: clamp(consistency),
      };
      var W = { coverage: 25, dsa: 25, recall: 15, behavioral: 10, mock: 15, consistency: 10 };
      var score = 0; Object.keys(W).forEach(function (k) { score += dims[k] * W[k] / 100; });
      return { score: clamp(score), dims: dims, weights: W };
    },

    exportAll: function () { var out = {}; Object.values(K).forEach(function (k) { out[k] = read(k, null); }); return { __sde2: true, version: 1, exported: new Date().toISOString(), data: out }; },
    importAll: function (obj) {
      if (!obj || !obj.__sde2 || !obj.data) throw new Error('Not a valid SDE-2 Launchpad backup.');
      Object.entries(obj.data).forEach(function (e) { if (e[1] == null) localStorage.removeItem(e[0]); else localStorage.setItem(e[0], JSON.stringify(e[1])); });
      emit();
    },
    resetAll: function () { Object.values(K).forEach(function (k) { localStorage.removeItem(k); }); emit(); },
  };
  return store;
})();
