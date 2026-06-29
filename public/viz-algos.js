/* ===========================================================
   Step-generator registry for the generic <ArrayViz> component.
   One entry per array/string visualization. Each gen() runs live
   on user input and returns a list of frames the renderer paints.

   Frame shape:
     { cells: [{ v, s }], ptrs: [{ i, label, cls }], msg }
       s   ∈ '' | 'dim' | 'active' | 'good' | 'bad' | 'win'
       cls ∈ 'a' (blue) | 'b' (green) | 'c' (amber)

   To add a new visualization: add one object here, then drop
   <ArrayViz algo="your-key" /> into any lesson. That's it.
   =========================================================== */
window.VIZ_ALGOS = {
  'move-zeros': {
    title: 'Two pointers · Move Zeroes',
    desc: 'A <b style="color:var(--accent)">slow</b> write pointer marks the next slot for a non-zero; a <b style="color:var(--accent-2)">fast</b> read pointer scans ahead. Swap on each non-zero.',
    inputs: [{ key: 'arr', label: 'array', type: 'ints', placeholder: '0,1,0,3,12', def: '0,1,0,3,12' }],
    gen: function (v) {
      var a = v.arr.slice(), out = [], placed = [], slow = 0;
      out.push({ cells: a.map(function (x) { return { v: x, s: x === 0 ? 'dim' : '' }; }), ptrs: [{ i: 0, label: 'slow', cls: 'a' }, { i: 0, label: 'fast', cls: 'b' }], msg: 'Start. slow=0, fast=0.' });
      for (var fast = 0; fast < a.length; fast++) {
        if (a[fast] !== 0) {
          if (slow !== fast) { var t = a[slow]; a[slow] = a[fast]; a[fast] = t; }
          out.push(frame(a, placed, [slow, fast], slow, fast, 'a[' + fast + ']=' + a[slow] + ' is non-zero → place at slot ' + slow + '.'));
          placed = placed.concat([slow]); slow++;
          out.push(frame(a, placed, [], slow, fast, 'Advance slow → ' + slow + '.'));
        } else {
          out.push(frame(a, placed, [], slow, fast, 'a[' + fast + ']=0 → advance fast only.'));
        }
      }
      out.push({ cells: a.map(function (x, i) { return { v: x, s: placed.indexOf(i) >= 0 ? 'good' : (x === 0 ? 'dim' : '') }; }), ptrs: [], msg: 'Done. Non-zeros compacted left, zeros pushed right. O(n) time, O(1) space.' });
      return out;
      function frame(arr, pl, act, sl, fa, msg) {
        return {
          cells: arr.map(function (x, i) { var s = ''; if (x === 0) s = 'dim'; if (pl.indexOf(i) >= 0) s = 'good'; if (act.indexOf(i) >= 0) s = 'active'; return { v: x, s: s }; }),
          ptrs: [{ i: sl, label: 'slow', cls: 'a' }, { i: fa, label: 'fast', cls: 'b' }], msg: msg,
        };
      }
    },
  },

  'binary-search': {
    title: 'Binary search',
    desc: 'Halve the search space each step. Watch the <b style="color:var(--accent)">lo</b>/<b style="color:var(--accent-2)">hi</b> boundaries and the <b style="color:var(--warn)">mid</b>.',
    inputs: [
      { key: 'arr', label: 'sorted array', type: 'ints', placeholder: '1,3,5,7,9,11,13', def: '1,3,5,7,9,11,13,15,17' },
      { key: 'target', label: 'target', type: 'int', placeholder: '13', def: '13' },
    ],
    gen: function (v) {
      var a = v.arr, t = v.target, out = [], lo = 0, hi = a.length - 1;
      function snap(mid, found, msg) {
        return {
          cells: a.map(function (x, i) { var s = ''; if (i < lo || i > hi) s = 'dim'; if (i === mid) s = 'active'; if (i === found) s = 'good'; return { v: x, s: s }; }),
          ptrs: found == null ? [{ i: lo, label: 'lo', cls: 'a' }, { i: hi, label: 'hi', cls: 'b' }] : [], msg: msg,
        };
      }
      out.push(snap(-1, null, 'Search for ' + t + '. lo=0, hi=' + hi + '.'));
      while (lo <= hi) {
        var mid = Math.floor((lo + hi) / 2);
        out.push(snap(mid, null, 'mid = ⌊(' + lo + '+' + hi + ')/2⌋ = ' + mid + ', a[' + mid + ']=' + a[mid] + '.'));
        if (a[mid] === t) { out.push(snap(mid, mid, 'a[' + mid + ']=' + t + ' ✓ found at index ' + mid + '.')); return out; }
        if (a[mid] < t) { lo = mid + 1; out.push(snap(mid, null, a[mid] + ' < ' + t + ' → discard left half. lo=' + lo + '.')); }
        else { hi = mid - 1; out.push(snap(mid, null, a[mid] + ' > ' + t + ' → discard right half. hi=' + hi + '.')); }
      }
      out.push(snap(-1, null, 'lo > hi → ' + t + ' is not present. Return -1.'));
      return out;
    },
  },

  'sliding-window': {
    title: 'Sliding window · longest unique substring',
    desc: 'The <b style="color:var(--accent)">right</b> pointer grows the window; on a duplicate the <b style="color:var(--accent-2)">left</b> pointer shrinks it. O(n).',
    inputs: [{ key: 'str', label: 'string', type: 'chars', placeholder: 'abcabcbb', def: 'abcabcbb' }],
    gen: function (v) {
      var s = v.str, out = [], seen = {}, left = 0, best = 0, bi = [0, -1];
      function snap(right, dup, msg) {
        return {
          cells: s.split('').map(function (ch, i) { var st = ''; if (i >= left && i <= right) st = 'win'; if (i >= bi[0] && i <= bi[1]) st = 'good'; if (i === dup) st = 'bad'; return { v: ch, s: st }; }),
          ptrs: [{ i: left, label: 'L', cls: 'b' }, { i: right < 0 ? 0 : right, label: 'R', cls: 'a' }], msg: msg,
        };
      }
      out.push(snap(-1, -1, 'Empty window. left=0.'));
      for (var right = 0; right < s.length; right++) {
        var c = s[right];
        if (seen[c] != null && seen[c] >= left) { out.push(snap(right, right, "'" + c + "' already in window → shrink from left.")); left = seen[c] + 1; }
        seen[c] = right;
        var len = right - left + 1; if (len > best) { best = len; bi = [left, right]; }
        out.push(snap(right, -1, 'Window "' + s.slice(left, right + 1) + '" (len ' + len + '). Best: ' + best + '.'));
      }
      out.push(snap(s.length - 1, -1, 'Answer: longest = ' + best + ' ("' + s.slice(bi[0], bi[1] + 1) + '").'));
      return out;
    },
  },
};
