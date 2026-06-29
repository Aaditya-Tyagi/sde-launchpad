// Dense, scannable reference cards. Each sheet = sections; each section renders
// whichever content field it has (kv / table / list / code), in that order.
export interface CsSection {
  h: string; note?: string;
  kv?: [string, string][];
  table?: { cols: string[]; rows: string[][] };
  list?: string[];
  code?: { lang?: string; src: string };
}
export interface Cheatsheet { id: string; title: string; icon: string; blurb: string; sections: CsSection[]; }

export const CHEATSHEETS: Cheatsheet[] = [
  {
    id: 'big-o', title: 'Big-O & Complexity', icon: '⏱️',
    blurb: 'Operation costs, sorting, and how to guess the target complexity from input size.',
    sections: [
      {
        h: 'Guess complexity from n (the single most useful trick)',
        note: 'Given the constraint on n, the intended solution is usually:',
        table: { cols: ['n ≤', 'Target complexity'], rows: [
          ['10–12', 'O(n!) — permutations / brute force'],
          ['~20', 'O(2ⁿ) — subsets / bitmask DP'],
          ['~500', 'O(n³)'],
          ['~5,000', 'O(n²)'],
          ['~10⁶', 'O(n log n) or O(n)'],
          ['> 10⁶ / 10⁹', 'O(log n) or O(1)'],
        ] },
      },
      {
        h: 'Data structure operations (average)',
        table: { cols: ['Structure', 'Access', 'Search', 'Insert', 'Delete'], rows: [
          ['Array', 'O(1)', 'O(n)', 'O(n)', 'O(n)'],
          ['Hash map / set', '—', 'O(1)', 'O(1)', 'O(1)'],
          ['Stack / Queue', 'O(n)', 'O(n)', 'O(1)', 'O(1)'],
          ['Binary heap', 'O(1) peek', 'O(n)', 'O(log n)', 'O(log n)'],
          ['Balanced BST', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)'],
        ] },
      },
      {
        h: 'Sorting',
        table: { cols: ['Algorithm', 'Time', 'Space', 'Stable'], rows: [
          ['Quicksort', 'O(n log n) avg, O(n²) worst', 'O(log n)', 'No'],
          ['Mergesort', 'O(n log n)', 'O(n)', 'Yes'],
          ['Heapsort', 'O(n log n)', 'O(1)', 'No'],
          ['Counting / Radix', 'O(n + k)', 'O(n + k)', 'Yes'],
        ] },
      },
      {
        h: 'Rules of thumb',
        list: [
          'Drop constants and lower-order terms: O(2n + 5) → O(n).',
          'Nested loop over the same n → O(n²); halving each step → O(log n).',
          'Recursion cost = (number of nodes) × (work per node). Master theorem for divide & conquer.',
          'Hash map trades O(n) space for O(1) lookup — the classic time/space swap.',
        ],
      },
    ],
  },
  {
    id: 'dsa-patterns', title: 'DSA Patterns', icon: '🧩',
    blurb: 'When to reach for each pattern, plus the bug-free templates worth memorizing.',
    sections: [
      {
        h: 'Pattern → signal',
        table: { cols: ['Pattern', 'Reach for it when…'], rows: [
          ['Sliding window', 'Contiguous subarray/substring, "longest/shortest/at most k"'],
          ['Two pointers', 'Sorted array, pair/triplet sums, in-place dedup'],
          ['Fast & slow', 'Cycle detection, middle of list, O(1) space on linked list'],
          ['Binary search', 'Sorted input, or "minimize the max / maximize the min" (search the answer)'],
          ['Hashing', '"Have I seen this?", counts, complements (two-sum)'],
          ['Prefix sum', 'Many range-sum queries, subarray-sum-equals-k'],
          ['BFS', 'Shortest path in unweighted graph, level-order'],
          ['DFS / backtracking', 'All paths, permutations/combinations, islands'],
          ['Heap / top-K', '"K largest/smallest", merge K lists, streaming median'],
          ['Dynamic programming', 'Overlapping subproblems + optimal substructure ("count ways", "min cost")'],
          ['Monotonic stack', 'Next greater/smaller element, histogram problems'],
          ['Union-Find', 'Connectivity, number of components, cycle in undirected graph'],
        ] },
      },
      { h: 'Sliding window (variable)', code: { lang: 'js', src: 'let l = 0, best = 0;\nfor (let r = 0; r < n; r++) {\n  add(arr[r]);\n  while (invalid()) { remove(arr[l]); l++; }\n  best = Math.max(best, r - l + 1);\n}' } },
      { h: 'Binary search (clean template)', code: { lang: 'js', src: 'let lo = 0, hi = n - 1;\nwhile (lo <= hi) {\n  const mid = lo + ((hi - lo) >> 1);\n  if (a[mid] === t) return mid;\n  if (a[mid] < t) lo = mid + 1;\n  else hi = mid - 1;\n}\nreturn -1;' } },
      { h: 'BFS (shortest path / levels)', code: { lang: 'js', src: 'const q = [start], seen = new Set([start]);\nlet steps = 0;\nwhile (q.length) {\n  for (let k = q.length; k > 0; k--) {\n    const node = q.shift();\n    for (const nx of neighbors(node))\n      if (!seen.has(nx)) { seen.add(nx); q.push(nx); }\n  }\n  steps++;\n}' } },
      { h: 'Backtracking skeleton', code: { lang: 'js', src: 'function bt(path, choices) {\n  if (done(path)) { res.push([...path]); return; }\n  for (const c of choices) {\n    path.push(c);\n    bt(path, next(choices, c));\n    path.pop();        // undo\n  }\n}' } },
    ],
  },
  {
    id: 'javascript', title: 'JavaScript', icon: '🟨',
    blurb: 'Hoisting, this, the event loop, and coercion — the rules output questions test.',
    sections: [
      {
        h: 'var / let / const',
        table: { cols: ['', 'Scope', 'Hoisted', 'Redeclare', 'Reassign'], rows: [
          ['var', 'function', 'yes → undefined', 'yes', 'yes'],
          ['let', 'block', 'yes (TDZ)', 'no', 'yes'],
          ['const', 'block', 'yes (TDZ)', 'no', 'no'],
        ] },
        note: 'TDZ = accessing a let/const before its line throws ReferenceError.',
      },
      {
        h: 'this binding (check in this order)',
        list: [
          'new Foo() → this = the new object',
          'fn.call/apply/bind(obj) → this = obj (explicit)',
          'obj.fn() → this = obj (implicit)',
          'plain fn() → this = undefined (strict) / globalThis (sloppy)',
          'Arrow fn → no own this; inherits from enclosing scope',
        ],
      },
      {
        h: 'Event loop order',
        list: [
          '1. Run all synchronous code (the current call stack).',
          '2. Drain ALL microtasks (Promise .then/catch/finally, queueMicrotask).',
          '3. Run ONE macrotask (setTimeout, setInterval, I/O), then repeat from 2.',
          'So: sync → microtasks → one timer → microtasks → next timer …',
        ],
      },
      {
        h: 'Coercion gotchas',
        table: { cols: ['Expression', 'Result'], rows: [
          ['[] + []', '"" (empty string)'],
          ['[] + {}', '"[object Object]"'],
          ['0 == ""', 'true (both → 0)'],
          ['null == undefined', 'true'],
          ['NaN === NaN', 'false (use Number.isNaN)'],
          ['typeof null', '"object" (historical bug)'],
        ] },
        note: 'Always use === unless you specifically want loose equality. Falsy: false, 0, "", null, undefined, NaN.',
      },
    ],
  },
  {
    id: 'system-design', title: 'System Design', icon: '🏗️',
    blurb: 'Estimation numbers, caching, CAP, and the building-block one-liners.',
    sections: [
      {
        h: 'Numbers to know',
        kv: [
          ['Seconds/day', '86,400 ≈ 10⁵'],
          ['1 million writes/day', '≈ 12 writes/sec'],
          ['Read:write ratio (typical)', '~100:1 for social/feeds'],
          ['SSD read', '~100 µs · Memory read ~100 ns · Network RTT (same DC) ~0.5 ms'],
          ['Char ≈ 1 byte', '1 KB ≈ short post · 1 MB ≈ small image'],
        ],
      },
      {
        h: 'Caching strategies',
        table: { cols: ['Strategy', 'How', 'Trade-off'], rows: [
          ['Cache-aside', 'App reads cache, on miss loads DB & fills cache', 'Most common; stale risk → use TTL'],
          ['Write-through', 'Write to cache + DB synchronously', 'Consistent, slower writes'],
          ['Write-back', 'Write cache, flush to DB later', 'Fast writes, data-loss risk'],
        ] },
        note: 'Cache stampede fix: lock/single-flight on miss, or stagger TTLs.',
      },
      {
        h: 'CAP & consistency',
        list: [
          'CAP: under a network partition you pick Consistency OR Availability.',
          'CP (HBase, Zookeeper) — reject some requests to stay consistent.',
          'AP (Cassandra, DynamoDB) — always answer, may serve stale data.',
          'Models: strong > read-your-writes > monotonic > eventual.',
        ],
      },
      {
        h: 'SQL vs NoSQL',
        table: { cols: ['', 'SQL', 'NoSQL'], rows: [
          ['Schema', 'Fixed, relational', 'Flexible / denormalized'],
          ['Scale', 'Vertical (+ read replicas, sharding)', 'Horizontal by design'],
          ['Best for', 'Transactions, joins, integrity', 'High write throughput, simple access by key'],
        ] },
      },
      {
        h: 'Building blocks (one-liners)',
        list: [
          'Load balancer: spread traffic across stateless instances (L4 = transport, L7 = HTTP-aware).',
          'CDN: cache static assets near users; pull (lazy) vs push.',
          'Queue (Kafka/SQS): decouple producers/consumers, absorb spikes, async work.',
          'Sharding: partition data by key (consistent hashing avoids mass re-shuffle).',
          'Replication: copies for read scale + failover (leader-follower).',
        ],
      },
    ],
  },
  {
    id: 'react', title: 'React & React Native', icon: '⚛️',
    blurb: 'Re-render rules, hooks, memoization, and RN architecture.',
    sections: [
      {
        h: 'What triggers a re-render',
        list: [
          'state change (setState/useState setter) — even to an equal primitive value queues a render',
          'parent re-renders → children re-render by default (regardless of props)',
          'context value change → all consumers re-render',
          'Prevent: React.memo (props shallow-equal), useMemo/useCallback for stable refs, lift state down',
        ],
      },
      {
        h: 'useMemo vs useCallback',
        kv: [
          ['useMemo(fn, deps)', 'Memoizes the VALUE fn returns'],
          ['useCallback(fn, deps)', 'Memoizes the FUNCTION itself (= useMemo(() => fn, deps))'],
          ['When', 'Only when passing to memoized children or for genuinely expensive compute'],
        ],
      },
      {
        h: 'Hooks rules',
        list: [
          'Call hooks at the top level only — never in conditions, loops, or nested functions.',
          'Call from React functions only (components / custom hooks).',
          'useEffect deps: include every value used inside; cleanup return runs before next effect & on unmount.',
        ],
      },
      {
        h: 'Keys & reconciliation',
        list: [
          'Keys let React match list items across renders to reuse DOM nodes.',
          'Use a stable unique id — NOT the array index when the list can reorder/insert.',
        ],
      },
      {
        h: 'RN architecture',
        kv: [
          ['Old (bridge)', 'JS ↔ native via async JSON bridge — serialization bottleneck'],
          ['New (JSI/Fabric)', 'Direct synchronous JS↔native calls, new renderer (Fabric), TurboModules'],
          ['Threads', 'JS thread, native/UI thread, shadow thread (layout via Yoga)'],
        ],
      },
    ],
  },
  {
    id: 'behavioral', title: 'Behavioral / STAR', icon: '🎯',
    blurb: 'Story structure, the themes to cover, and what interviewers score.',
    sections: [
      {
        h: 'STAR structure',
        kv: [
          ['Situation', 'Context in 1–2 sentences — when, where, stakes'],
          ['Task', 'YOUR specific responsibility / the goal'],
          ['Action', 'What YOU did (use "I", not "we") — the bulk of the answer'],
          ['Result', 'Outcome with numbers + what you learned'],
        ],
        note: 'Aim for ~2 minutes. Front-load the result if asked for a summary.',
      },
      {
        h: 'Themes to have a story for',
        list: [
          'Leadership / influence without authority',
          'Conflict / disagreement with a coworker or manager',
          'Biggest failure + what you learned',
          'Going above and beyond / ownership',
          'Hardest technical problem solved',
          'Handling ambiguity / incomplete information',
        ],
      },
      {
        h: 'What they actually score',
        list: [
          'Self-awareness and growth (especially in failure stories)',
          'Impact — did it matter, and can you quantify it?',
          'Collaboration — how you treat teammates under pressure',
          'Ownership — did you drive, or just participate?',
        ],
      },
      {
        h: '"Tell me about yourself" (60–90s)',
        list: [
          'Present: current role + scope in one line.',
          'Path: 2–3 highlights that build toward this role.',
          'Why here: why this company/role, now.',
        ],
      },
      {
        h: 'Questions to ask them',
        list: [
          'What does success look like in this role in the first 6 months?',
          'What\'s the biggest technical challenge the team faces right now?',
          'How are decisions made / disagreements resolved on the team?',
        ],
      },
    ],
  },
];
