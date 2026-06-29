// Entry diagnostic — a short mixed assessment that scores the candidate per area,
// flags focus areas, and refines onboarding confidence. Auto-graded MCQs +
// a couple of self-report items for behavioral.
export interface DiagOption { label: string; value?: number; } // value used for 'rate' items
export interface DiagQuestion {
  id: string; area: string; type: 'mcq' | 'rate';
  q: string; code?: string; options: DiagOption[];
  correct?: string; explain?: string;
}

export const DIAG_AREAS: Record<string, { label: string; icon: string }> = {
  javascript: { label: 'JavaScript', icon: '🟨' },
  dsa: { label: 'Data Structures & Algorithms', icon: '🧩' },
  'system-design': { label: 'System Design', icon: '🏗️' },
  react: { label: 'React & Frontend', icon: '⚛️' },
  behavioral: { label: 'Behavioral', icon: '🎯' },
};

// where to send the user to improve each area
export const DIAG_ACTIONS: Record<string, { label: string; href: string }[]> = {
  javascript: [{ label: 'JavaScript track', href: '/tracks/javascript' }, { label: 'Output Quiz', href: '/practice/quiz' }],
  dsa: [{ label: 'DSA Quest', href: '/game' }, { label: 'Code Lab', href: '/practice/code' }],
  'system-design': [{ label: 'HLD track', href: '/tracks/hld' }, { label: 'Frontend SD track', href: '/tracks/frontend-system-design' }],
  react: [{ label: 'React & RN track', href: '/tracks/react-native' }],
  behavioral: [{ label: 'STAR Story Bank', href: '/practice/stories' }, { label: 'Behavioral track', href: '/tracks/behavioral' }],
};

export const DIAGNOSTIC: DiagQuestion[] = [
  {
    id: 'js1', area: 'javascript', type: 'mcq',
    q: 'What does this return?',
    code: 'function make() {\n  const fns = [];\n  for (var i = 0; i < 3; i++) fns.push(() => i);\n  return fns.map(f => f());\n}\nmake();',
    options: [{ label: '[0, 1, 2]' }, { label: '[3, 3, 3]' }, { label: '[0, 0, 0]' }, { label: 'undefined' }],
    correct: '[3, 3, 3]',
    explain: '`var` is function-scoped, so all three closures share the same `i`, which is `3` after the loop ends. Using `let` would create a fresh binding per iteration → [0, 1, 2].',
  },
  {
    id: 'js2', area: 'javascript', type: 'mcq',
    q: 'What is the output?',
    code: 'console.log(x);\nlet x = 1;',
    options: [{ label: 'undefined' }, { label: '1' }, { label: 'ReferenceError' }, { label: 'null' }],
    correct: 'ReferenceError',
    explain: '`let`/`const` are hoisted but sit in the Temporal Dead Zone until their declaration line runs. Accessing before that throws a ReferenceError (unlike `var`, which would log `undefined`).',
  },
  {
    id: 'js3', area: 'javascript', type: 'mcq',
    q: 'What does the last line evaluate to?',
    code: "const user = {\n  name: 'Ana',\n  greet() { return `Hi ${this.name}`; }\n};\nconst greet = user.greet;\ngreet.call({ name: 'Bob' });",
    options: [{ label: "'Hi Ana'" }, { label: "'Hi Bob'" }, { label: "'Hi undefined'" }, { label: 'TypeError' }],
    correct: "'Hi Bob'",
    explain: '`.call(thisArg)` sets `this` explicitly to `{name:\'Bob\'}` for that invocation, regardless of how the function was extracted from `user`.',
  },
  {
    id: 'dsa1', area: 'dsa', type: 'mcq',
    q: 'You need the longest substring without repeating characters. Which pattern fits best?',
    options: [{ label: 'Sliding Window' }, { label: 'Binary Search' }, { label: 'Dynamic Programming' }, { label: 'Backtracking' }],
    correct: 'Sliding Window',
    explain: 'A contiguous window that expands and contracts while tracking seen characters solves it in O(n) — the classic variable-size sliding window.',
  },
  {
    id: 'dsa2', area: 'dsa', type: 'mcq',
    q: 'Time complexity of binary search on a sorted array of n elements?',
    options: [{ label: 'O(n)' }, { label: 'O(log n)' }, { label: 'O(n log n)' }, { label: 'O(1)' }],
    correct: 'O(log n)',
    explain: 'Each comparison halves the search space, giving logarithmic time.',
  },
  {
    id: 'dsa3', area: 'dsa', type: 'mcq',
    q: 'Detect a cycle in a linked list using O(1) extra space. Best approach?',
    options: [{ label: 'Hash set of visited nodes' }, { label: 'Fast & slow pointers' }, { label: 'Recursion' }, { label: 'Sort the list first' }],
    correct: 'Fast & slow pointers',
    explain: "Floyd's tortoise & hare: two pointers at different speeds must meet inside a cycle. O(1) space (a hash set works but costs O(n) space).",
  },
  {
    id: 'sd1', area: 'system-design', type: 'mcq',
    q: 'A read-heavy service keeps hitting the DB for the same rows. The cheapest first fix is…',
    options: [{ label: 'Add a cache (e.g. Redis) in front of the DB' }, { label: 'Shard the database' }, { label: 'Switch to NoSQL' }, { label: 'Add more app servers' }],
    correct: 'Add a cache (e.g. Redis) in front of the DB',
    explain: 'Cache-aside on hot reads is the highest-leverage, lowest-effort fix for repeated identical queries before you reach for sharding.',
  },
  {
    id: 'sd2', area: 'system-design', type: 'mcq',
    q: 'What lets you horizontally scale stateless API servers?',
    options: [{ label: 'A load balancer across many instances' }, { label: 'A bigger single server' }, { label: 'A read replica' }, { label: 'A message queue' }],
    correct: 'A load balancer across many instances',
    explain: 'Stateless servers scale out behind a load balancer that distributes traffic; vertical scaling (bigger box) has a ceiling.',
  },
  {
    id: 're1', area: 'react', type: 'mcq',
    q: 'A parent re-renders and its child re-renders too, even though the child\'s props are unchanged. The fix?',
    options: [{ label: 'Wrap the child in React.memo' }, { label: 'Add a useEffect' }, { label: 'Add useState' }, { label: 'Give it a key' }],
    correct: 'Wrap the child in React.memo',
    explain: 'React.memo skips re-render when props are shallow-equal. Pair it with useCallback/useMemo so function/object props stay referentially stable.',
  },
  {
    id: 're2', area: 'react', type: 'mcq',
    q: 'Why does React need a stable `key` on list items?',
    options: [{ label: 'To identify which items changed/moved during reconciliation' }, { label: 'To style them' }, { label: 'To sort them' }, { label: 'For accessibility' }],
    correct: 'To identify which items changed/moved during reconciliation',
    explain: 'Keys let React match elements between renders so it can reuse/move DOM nodes instead of recreating them. Index keys break this when the list reorders.',
  },
  {
    id: 'beh1', area: 'behavioral', type: 'rate',
    q: 'How many polished STAR stories could you confidently tell right now?',
    options: [{ label: '0–1', value: 0.1 }, { label: '2–3', value: 0.45 }, { label: '4–6', value: 0.75 }, { label: '7+', value: 1 }],
  },
  {
    id: 'beh2', area: 'behavioral', type: 'rate',
    q: 'How comfortable are you walking through a past conflict or failure in interview format?',
    options: [{ label: 'Not at all', value: 0.1 }, { label: 'Somewhat', value: 0.45 }, { label: 'Fairly', value: 0.75 }, { label: 'Very', value: 1 }],
  },
];
