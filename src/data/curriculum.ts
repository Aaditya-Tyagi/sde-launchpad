// Curriculum metadata: track definitions + the 8-week study plan.
// Lessons themselves live in src/content/lessons/*. This file describes how
// they are grouped and the recommended week-by-week path.

export type ProgramId = 'sde2' | 'qa';

export interface ProgramMeta {
  id: ProgramId;
  name: string;
  tagline: string;
  blurb: string;
  home: string; // route to the program dashboard
  logo: string; // 2-char brand mark
  icon: string;
  accent: string;
  highlights: string[];
}

export const PROGRAMS: ProgramMeta[] = [
  {
    id: 'sde2',
    name: 'SDE-2 Launchpad',
    tagline: 'Software Engineer · Full-stack / Frontend / Backend',
    blurb:
      'An 8–10 week path to a higher-paying product/startup engineering role. DSA patterns, JS/TS internals, React Native, system design, and behavioral — with visualizers, drills, and mocks.',
    home: '/sde2',
    logo: 'S2',
    icon: '🚀',
    accent: '--accent',
    highlights: [
      'DSA Quest + in-browser Code Lab',
      'JS output quiz & system-design canvas',
      'Spaced-repetition flashcards & mock mode',
    ],
  },
  {
    id: 'qa',
    name: 'QA · Automation Launchpad',
    tagline: 'Manual → Automation · SDET / Test Engineer',
    blurb:
      'A 12-week path from manual tester to full-fledged automation engineer / SDET, tuned for the 2026 market. One language, Selenium & Playwright, API testing, framework design, CI/CD, performance, AI-assisted testing, plus cheat sheets and interview prep.',
    home: '/qa',
    logo: 'QA',
    icon: '🧪',
    accent: '--accent-2',
    highlights: [
      'Selenium + Playwright + API automation',
      'Framework design, CI/CD & AI testing',
      '12-week plan, cheat sheets & certs path',
    ],
  },
];

export type TrackId =
  // SDE-2 program
  | 'quick-wins'
  | 'javascript'
  | 'react-native'
  | 'dsa'
  | 'system-design'
  | 'behavioral'
  | 'ai-engineering'
  | 'js-output'
  | 'lld'
  | 'frontend-system-design'
  | 'hld'
  | 'backend'
  // QA program
  | 'qa-foundations'
  | 'qa-programming'
  | 'qa-web'
  | 'qa-api'
  | 'qa-framework'
  | 'qa-cicd'
  | 'qa-performance'
  | 'qa-ai'
  | 'qa-mobile'
  | 'qa-career'
  | 'qa-cheatsheets';

export interface TrackMeta {
  id: TrackId;
  program: ProgramId;
  name: string;
  blurb: string;
  goal: string;
  accent: string; // css var name
  icon: string; // emoji or short label
}

export const TRACKS: TrackMeta[] = [
  {
    id: 'quick-wins',
    program: 'sde2',
    name: 'Quick Wins',
    blurb: 'Close your known interview gaps first — blind spots, not deep gaps.',
    goal: 'Solve move-zeros cold, explain the prototype chain on a whiteboard, and explain useImperativeHandle with a real use case.',
    accent: '--warn',
    icon: '⚡',
  },
  {
    id: 'javascript',
    program: 'sde2',
    name: 'JavaScript & TypeScript Core',
    blurb: 'The language internals interviewers probe to test depth beyond framework usage.',
    goal: 'Explain closures, the event loop, prototypes, and async clearly with examples.',
    accent: '--accent-2',
    icon: '🟨',
  },
  {
    id: 'react-native',
    program: 'sde2',
    name: 'React & React Native',
    blurb: 'Know the internals, not just the API — rendering, refs, perf, architecture.',
    goal: 'Explain rendering, refs, performance, and RN architecture under follow-up questions.',
    accent: '--accent',
    icon: '⚛️',
  },
  {
    id: 'dsa',
    program: 'sde2',
    name: 'Data Structures & Algorithms',
    blurb: 'The 18 patterns that cover ~90% of startup SDE-2 DSA. Quality over grind.',
    goal: 'Recognize the pattern instantly and code the template without bugs.',
    accent: '--accent-2',
    icon: '🧩',
  },
  {
    id: 'system-design',
    program: 'sde2',
    name: 'System Design',
    blurb: 'Frontend and backend design — a repeatable framework and the core building blocks.',
    goal: 'Structure any design answer and defend every tradeoff.',
    accent: '--hot',
    icon: '🏗️',
  },
  {
    id: 'behavioral',
    program: 'sde2',
    name: 'Behavioral & Job Search',
    blurb: 'The non-coding half that decides offers and pay. Do not skip it.',
    goal: 'Tell compelling STAR stories, target the right companies, negotiate well.',
    accent: '--mine',
    icon: '🎯',
  },
  {
    id: 'ai-engineering',
    program: 'sde2',
    name: 'AI Engineering Roadmap',
    blurb: 'A 6-phase path to become an AI engineer — built on your existing backend skills, hosted on your LeetCode clone.',
    goal: 'Ship raw LLM APIs → RAG on pgvector → a tool-using agent → evals & observability, one public project per phase.',
    accent: '--accent',
    icon: '🤖',
  },
  {
    id: 'js-output',
    program: 'sde2',
    name: 'JS Output Questions',
    blurb: '72 predict-the-output questions — the category that trips up even experienced JS devs in real interviews.',
    goal: 'Predict the output of any hoisting, closure, async, coercion, or prototype question without running it.',
    accent: '--accent-2',
    icon: '🔮',
  },
  {
    id: 'lld',
    program: 'sde2',
    name: 'Low-Level Design (LLD)',
    blurb: 'Design real UI systems from scratch — EventEmitter, Modal, Autocomplete, Toast, and Form Validation with full TypeScript implementations.',
    goal: 'Walk through a component LLD in under 30 minutes: requirements → API → data model → working code.',
    accent: '--hot',
    icon: '🧱',
  },
  {
    id: 'frontend-system-design',
    program: 'sde2',
    name: 'Frontend System Design',
    blurb: 'Architect production-scale frontend systems — feeds, chat, video, Kanban — using the 6-step framework.',
    goal: 'Apply the framework to any frontend design question, defend rendering/state/perf decisions under follow-up.',
    accent: '--mine',
    icon: '🖥️',
  },
  {
    id: 'hld',
    program: 'sde2',
    name: 'High-Level Design (HLD)',
    blurb: 'Design scalable backend systems — URL shortener, rate limiter, Twitter feed, notifications, and search autocomplete.',
    goal: 'Use the 6-step framework to design any system and defend every architectural decision under follow-up.',
    accent: '--accent-2',
    icon: '🏗️',
  },
  {
    id: 'backend',
    program: 'sde2',
    name: 'Backend Engineering Essentials',
    blurb: 'The 11 skills that keep a backend dev relevant in 2026 — APIs, auth, databases, caching, event-driven systems, concurrency, distributed systems, security, observability, cloud, and AI integration.',
    goal: 'Speak to each of the 11 areas with real depth, defend tradeoffs under follow-up, and connect them into a coherent production architecture.',
    accent: '--hot',
    icon: '🛠️',
  },
  {
    id: 'qa-foundations',
    program: 'qa',
    name: 'Testing Foundations',
    blurb: 'The vocabulary, techniques and process every QA interview and certification expects.',
    goal: 'Design test cases, write a clear bug report, and explain SDLC/STLC, test types and the defect lifecycle.',
    accent: '--accent',
    icon: '🧪',
  },
  {
    id: 'qa-programming',
    program: 'qa',
    name: 'Programming for Testers',
    blurb: 'Pick one language and go deep — the coding depth that separates an automation engineer from a script-copier.',
    goal: 'Write clean OOP code, handle data/files/JSON, and query a database with SQL.',
    accent: '--accent-2',
    icon: '💻',
  },
  {
    id: 'qa-web',
    program: 'qa',
    name: 'Web UI Automation',
    blurb: 'Locators, Selenium and Playwright — drive the browser reliably and kill flakiness.',
    goal: 'Build a stable cross-browser UI suite and explain every flakiness fix.',
    accent: '--accent-2',
    icon: '🌐',
  },
  {
    id: 'qa-api',
    program: 'qa',
    name: 'API Testing',
    blurb: 'The highest-ROI test layer — stable, fast, and in higher demand than UI testing in 2026.',
    goal: 'Test REST APIs in Postman and automate them in code with status, body and schema assertions.',
    accent: '--warn',
    icon: '🔌',
  },
  {
    id: 'qa-framework',
    program: 'qa',
    name: 'Framework Design',
    blurb: 'What turns a scripter into an engineer: maintainable, scalable automation architecture.',
    goal: 'Design a framework from scratch (POM + data-driven + config + reporting) and defend every choice.',
    accent: '--mine',
    icon: '🏗️',
  },
  {
    id: 'qa-cicd',
    program: 'qa',
    name: 'CI/CD & DevOps',
    blurb: 'Tests only deliver value running continuously — Git, pipelines, Docker and cloud grids.',
    goal: 'Run your suite automatically on every push, in parallel, across browsers, in CI.',
    accent: '--accent',
    icon: '⚙️',
  },
  {
    id: 'qa-performance',
    program: 'qa',
    name: 'Performance & NFR',
    blurb: 'Non-functional testing — load/performance, security and accessibility — makes you complete.',
    goal: 'Run and interpret a load test and apply basic security & accessibility checks.',
    accent: '--hot',
    icon: '🚀',
  },
  {
    id: 'qa-ai',
    program: 'qa',
    name: 'AI-Assisted Testing',
    blurb: 'The fastest-growing 2026 skill: self-healing locators, LLM test generation, agentic testing.',
    goal: 'Use AI to generate tests and self-heal locators — and explain the risks and limits.',
    accent: '--accent-2',
    icon: '🤖',
  },
  {
    id: 'qa-mobile',
    program: 'qa',
    name: 'Mobile Automation',
    blurb: 'Optional but valuable — automate native Android/iOS flows with Appium and beyond.',
    goal: 'Automate a native mobile flow and understand mobile-specific challenges.',
    accent: '--accent-2',
    icon: '📱',
  },
  {
    id: 'qa-career',
    program: 'qa',
    name: 'Career, Certs & Interviews',
    blurb: 'Turn the skills into a title, a salary and an offer — portfolio, certifications, interview prep.',
    goal: 'A quantified resume, the right certs (ISTQB to CTAL-TAE), and interview readiness.',
    accent: '--mine',
    icon: '🎯',
  },
  {
    id: 'qa-cheatsheets',
    program: 'qa',
    name: 'Cheat Sheets',
    blurb: 'Fast, printable quick reference — locators, Git, runners, HTTP codes, Playwright/Selenium APIs.',
    goal: 'Write a robust locator, a Git command or an API assertion from memory.',
    accent: '--warn',
    icon: '📑',
  },
];

export interface PlanItem {
  text: string;
  lesson?: string; // slug of a lesson in the lessons collection
}
export interface PlanWeek {
  id: string;
  title: string;
  focus: string;
  goal: string;
  items: PlanItem[];
}

export const PLAN: PlanWeek[] = [
  {
    id: 'w1',
    title: 'Week 1 — Foundations & quick wins',
    focus: 'Close gaps, set rhythm, start DSA patterns.',
    goal: 'Daily 2 DSA problems begin. All Quick Wins done by end of week.',
    items: [
      { text: 'Master the two-pointer "move zeros" pattern', lesson: 'quick-wins/move-zeros' },
      { text: 'Understand the JS prototype chain', lesson: 'javascript/prototype-chain' },
      { text: 'Learn useImperativeHandle + forwardRef', lesson: 'react-native/imperative-handle' },
      { text: 'Arrays & Hashing patterns', lesson: 'dsa/arrays-hashing' },
      { text: 'JS: scope, closures, hoisting', lesson: 'javascript/closures-scope' },
    ],
  },
  {
    id: 'w2',
    title: 'Week 2 — Two pointers, sliding window, JS deep dive',
    focus: 'The patterns startups love most + JS internals.',
    goal: 'Comfortable with two-pointer & sliding-window template; can explain async JS end to end.',
    items: [
      { text: 'Two Pointers pattern', lesson: 'dsa/two-pointers' },
      { text: 'Sliding Window pattern', lesson: 'dsa/sliding-window' },
      { text: 'Linked Lists: dummy head, fast/slow, reversal', lesson: 'dsa/linked-lists' },
      { text: 'The event loop: microtasks vs macrotasks', lesson: 'javascript/event-loop' },
      { text: 'Promises & async/await', lesson: 'javascript/promises-async' },
      { text: 'this, call/apply/bind', lesson: 'javascript/this-binding' },
      { text: 'Type coercion, equality & truthy/falsy', lesson: 'javascript/type-coercion' },
    ],
  },
  {
    id: 'w3',
    title: 'Week 3 — Trees, recursion & RN internals',
    focus: 'Recursion fluency + the RN architecture questions.',
    goal: 'Recurse on trees confidently; explain the RN bridge/JSI and re-render model.',
    items: [
      { text: 'Binary Search template', lesson: 'dsa/binary-search' },
      { text: 'Trees: DFS/BFS, BST, traversals', lesson: 'dsa/trees' },
      { text: 'Stacks & queues + monotonic stack', lesson: 'dsa/stack-and-queue' },
      { text: 'RN architecture: bridge vs JSI/Fabric', lesson: 'react-native/architecture' },
      { text: 'Render, reconciliation & re-renders', lesson: 'react-native/rendering' },
      { text: 'Hooks deep dive: refs & memoization', lesson: 'react-native/hooks-deep' },
      { text: 'useCallback vs useMemo — when they actually help', lesson: 'react-native/usecallback-memo' },
    ],
  },
  {
    id: 'w4',
    title: 'Week 4 — Graphs, DP & frontend system design',
    focus: 'Harder DSA categories + structured frontend design.',
    goal: 'BFS/DFS on grids; structure a frontend system design answer.',
    items: [
      { text: 'Graphs: BFS/DFS, islands, topo sort', lesson: 'dsa/graphs' },
      { text: 'Dynamic Programming intro', lesson: 'dsa/dynamic-programming' },
      { text: 'Frontend system design framework', lesson: 'system-design/frontend-framework' },
      { text: 'Design an infinite-scroll feed', lesson: 'system-design/news-feed' },
      { text: 'State management: Redux Toolkit vs Zustand vs Context', lesson: 'react-native/state-management' },
    ],
  },
  {
    id: 'w5',
    title: 'Week 5 — HLD system design + JS depth',
    focus: 'Complete HLD framework + classic systems + JS advanced topics.',
    goal: 'Design any backend system with a structured 6-step approach. Implement debounce and curry cold.',
    items: [
      { text: 'HLD framework: 6-step process', lesson: 'hld/framework' },
      { text: 'HLD building blocks: cache, queues, CDN, CAP', lesson: 'hld/scalability-building-blocks' },
      { text: 'HLD: Design a URL shortener', lesson: 'hld/design-url-shortener' },
      { text: 'HLD: Design a rate limiter', lesson: 'hld/design-rate-limiter' },
      { text: 'HLD: Design Twitter/X feed (fanout)', lesson: 'hld/design-twitter-feed' },
      { text: 'HLD: Design a notification system', lesson: 'hld/design-notification-system' },
      { text: 'HLD: Design search autocomplete', lesson: 'hld/design-search-autocomplete' },
      { text: 'Caching & CDN: strategies, stampede, invalidation', lesson: 'system-design/caching-and-cdn' },
      { text: 'API & communication: REST/gRPC/GraphQL, retries, circuit breakers', lesson: 'system-design/api-and-communication' },
      { text: 'Debounce & throttle — implement from scratch', lesson: 'javascript/debounce-throttle' },
      { text: 'Functional JS: currying, composition, pure functions', lesson: 'javascript/functional-js' },
      { text: 'React Navigation: stacks, tabs, deep links', lesson: 'react-native/navigation' },
    ],
  },
  {
    id: 'w6',
    title: 'Week 6 — DSA consolidation + RN performance',
    focus: 'Tighten DSA gaps; master list performance and animations.',
    goal: 'Re-solve every missed problem. Explain FlatList virtualization and Reanimated worklets.',
    items: [
      { text: 'Heaps & priority queues', lesson: 'dsa/heaps' },
      { text: 'Backtracking: subsets, permutations, N-Queens', lesson: 'dsa/backtracking' },
      { text: 'Intervals: merge, insert, meeting rooms', lesson: 'dsa/intervals' },
      { text: 'Node.js internals: event loop, streams', lesson: 'system-design/nodejs-internals' },
      { text: 'Databases: SQL vs NoSQL, indexing', lesson: 'system-design/databases' },
      { text: 'List performance: FlatList, FlashList & virtualization', lesson: 'react-native/list-performance' },
      { text: 'Animations: Animated API vs Reanimated 3', lesson: 'react-native/animations' },
      { text: 'Re-solve everything in your mistakes log' },
    ],
  },
  {
    id: 'w7',
    title: 'Week 7 — Advanced JS + production RN patterns',
    focus: 'TypeScript depth, error handling, and production-grade RN.',
    goal: 'Explain TypeScript generics, utility types, and error boundaries confidently.',
    items: [
      { text: 'TypeScript: generics, utility types & narrowing', lesson: 'javascript/typescript-core' },
      { text: 'Error handling patterns', lesson: 'javascript/error-handling' },
      { text: 'ES Modules vs CommonJS — tree shaking', lesson: 'javascript/modules-bundling' },
      { text: 'Generators & iterators', lesson: 'javascript/generators-iterators' },
      { text: 'Design patterns in JavaScript', lesson: 'javascript/design-patterns' },
      { text: 'Immutability, WeakRefs & memory management', lesson: 'javascript/immutability-memory' },
      { text: 'Error boundaries & crash handling', lesson: 'react-native/error-boundaries' },
      { text: 'React 18: concurrent rendering & new hooks', lesson: 'react-native/react-18-concurrent' },
    ],
  },
  {
    id: 'w8',
    title: 'Week 8 — Production RN + behavioral prep',
    focus: 'Complete RN production knowledge + pressure-test everything.',
    goal: '3+ full mocks done. Can discuss storage, testing, Expo, and app lifecycle confidently.',
    items: [
      { text: 'Storage, networking & offline patterns', lesson: 'react-native/storage-networking' },
      { text: 'App lifecycle & background tasks', lesson: 'react-native/app-lifecycle' },
      { text: 'Testing React Native: RNTL, Jest & Detox', lesson: 'react-native/testing' },
      { text: 'Platform APIs, native modules & platform-specific code', lesson: 'react-native/platform-native' },
      { text: 'Expo, EAS Build & OTA updates', lesson: 'react-native/expo-eas' },
      { text: 'Prepare 6–8 STAR stories', lesson: 'behavioral/star-stories' },
      { text: '"Tell me about yourself" pitch', lesson: 'behavioral/tell-me-about-yourself' },
      { text: 'Drill the behavioral question bank (40+ Qs)', lesson: 'behavioral/question-bank' },
    ],
  },
  {
    id: 'w9',
    title: 'Week 9 — JS Output Questions + LLD',
    focus: 'Lock in JS internals via predict-the-output drills, then design real component systems.',
    goal: 'Zero surprises on JS output. Can walk through EventEmitter, Modal, Autocomplete, Toast, and Form LLD cold.',
    items: [
      { text: 'JS output: hoisting & scope (12 Qs)', lesson: 'js-output/hoisting-scope' },
      { text: 'JS output: closures & loops (12 Qs)', lesson: 'js-output/closures-loops' },
      { text: 'JS output: event loop & async (12 Qs)', lesson: 'js-output/event-loop-async' },
      { text: 'JS output: this & prototype (12 Qs)', lesson: 'js-output/this-prototype' },
      { text: 'JS output: coercion & operators (12 Qs)', lesson: 'js-output/coercion-operators' },
      { text: 'JS output: mixed & advanced (12 Qs)', lesson: 'js-output/mixed-advanced' },
      { text: 'LLD framework: 5-step process', lesson: 'lld/framework' },
      { text: 'LLD: SOLID principles in JS/TS', lesson: 'lld/solid-principles' },
      { text: 'LLD: Design an EventEmitter', lesson: 'lld/design-event-emitter' },
      { text: 'LLD: Design a Modal dialog', lesson: 'lld/design-modal' },
      { text: 'LLD: Design an Autocomplete / Typeahead', lesson: 'lld/design-autocomplete' },
      { text: 'LLD: Design a Toast notification system', lesson: 'lld/design-toast' },
      { text: 'LLD: Design a Form Validation library', lesson: 'lld/design-form-validation' },
    ],
  },
  {
    id: 'w10',
    title: 'Week 10 — Frontend System Design + Final Prep',
    focus: 'End-to-end frontend architecture answers + mocks, applications, and negotiation.',
    goal: 'Can walk through any frontend system design question. 3+ mocks done. Offers incoming.',
    items: [
      { text: 'Frontend SD framework: 6-step process', lesson: 'frontend-system-design/framework' },
      { text: 'Frontend SD: Design a social news feed', lesson: 'frontend-system-design/design-news-feed' },
      { text: 'Frontend SD: Design a real-time chat widget', lesson: 'frontend-system-design/design-chat-widget' },
      { text: 'Frontend SD: Design a Kanban board', lesson: 'frontend-system-design/design-kanban-board' },
      { text: 'Frontend SD: Design a video player', lesson: 'frontend-system-design/design-video-player' },
      { text: 'Run 3 mock interviews', lesson: 'behavioral/mock-strategy' },
      { text: 'What interviewers actually evaluate (signals & leveling)', lesson: 'behavioral/what-interviewers-evaluate' },
      { text: 'Polish resume & target list' },
      { text: 'Apply to 15–20 matching roles' },
      { text: 'Negotiation: know your number', lesson: 'behavioral/negotiation' },
      { text: 'Daily warm-up: 1 easy DSA + mistakes log' },
      { text: 'After each interview: log what was asked' },
    ],
  },
  {
    id: 'w11',
    title: 'Week 11 — Backend Essentials I: APIs, auth, data & concurrency',
    focus: 'The backend depth that keeps you relevant — the request path from API to database.',
    goal: 'Design a clean API contract, explain auth end to end, and reason about indexing, caching, and concurrency under load.',
    items: [
      { text: 'API design: REST, gRPC & GraphQL', lesson: 'backend/api-design' },
      { text: 'Auth: OAuth2, JWT, OIDC & Passkeys', lesson: 'backend/auth-and-authz' },
      { text: 'Databases: SQL/NoSQL, sharding, indexing, query tuning', lesson: 'backend/databases' },
      { text: 'Caching: Redis, CDN & edge strategies', lesson: 'backend/caching' },
      { text: 'Concurrency & async: reactive & structured concurrency', lesson: 'backend/concurrency-and-async' },
    ],
  },
  {
    id: 'w12',
    title: 'Week 12 — Backend Essentials II: scale, security & operations',
    focus: 'Distributed systems, security, observability, cloud, and AI integration — the senior-signal layer.',
    goal: 'Defend eventual consistency, the OWASP Top 10, OpenTelemetry, a K8s/GitOps deploy, and a RAG pipeline under follow-up.',
    items: [
      { text: 'Event-driven systems: Kafka, Pulsar & streaming', lesson: 'backend/event-driven-systems' },
      { text: 'Distributed systems: microservices, service mesh, eventual consistency', lesson: 'backend/distributed-systems' },
      { text: 'Security: HTTPS, encryption, zero trust, OWASP Top 10', lesson: 'backend/security' },
      { text: 'Observability: logs, metrics, traces & OpenTelemetry', lesson: 'backend/observability' },
      { text: 'Cloud & deployment: Docker, Kubernetes, serverless, GitOps', lesson: 'backend/cloud-and-deployment' },
      { text: 'AI integration: LLM APIs, vector DBs & RAG', lesson: 'backend/ai-integration' },
    ],
  },
];

// ───────────────── QA / Automation 12-week plan ─────────────────
export const QA_PLAN: PlanWeek[] = [
  {
    id: 'qw1',
    title: 'Week 1 — Setup, language basics & Git',
    focus: 'Pick one language, install the tools, ship your first test.',
    goal: 'A working IDE, Git + GitHub, and a passing UI test that opens a site and asserts a result.',
    items: [
      { text: 'Pick ONE language and set up your toolchain', lesson: 'qa-programming/pick-a-language' },
      { text: 'Learn just enough Git; create your portfolio repo', lesson: 'qa-cicd/git-for-qa' },
      { text: 'Write your first UI test (Playwright recommended)', lesson: 'qa-web/playwright-core' },
      { text: 'Internalize the testing pyramid & start a mistakes log' },
    ],
  },
  {
    id: 'qw2',
    title: 'Week 2 — Programming for testers',
    focus: 'The coding constructs every framework leans on.',
    goal: 'Write classes, handle collections, parse JSON/CSV, and read a stack trace.',
    items: [
      { text: 'OOP for testers: 4 pillars, collections, JSON/CSV, exceptions', lesson: 'qa-programming/oop-for-testers' },
      { text: 'Data structures testers actually use (maps, sets, stacks)', lesson: 'qa-programming/data-structures-for-testers' },
      { text: 'Crack the SDET coding round (strings, arrays, Big-O)', lesson: 'qa-programming/coding-round-for-sdet' },
      { text: 'SQL for testers: JOINs, GROUP BY & classic queries', lesson: 'qa-programming/sql-for-testers' },
      { text: 'Mini project: a CLI that reads test data from a file' },
    ],
  },
  {
    id: 'qw3',
    title: 'Week 3 — Testing fundamentals',
    focus: 'Manual depth still matters — test design beats clicking robots.',
    goal: 'Design test cases, write a great bug report, explain SDLC/STLC and the defect lifecycle.',
    items: [
      { text: 'SDLC vs STLC, principles, test pyramid & shift-left', lesson: 'qa-foundations/testing-fundamentals' },
      { text: 'Test design techniques (EP, BVA, decision tables, state)', lesson: 'qa-foundations/test-design-techniques' },
      { text: 'Defect lifecycle, severity vs priority, bug reports & metrics', lesson: 'qa-foundations/bug-lifecycle' },
      { text: 'Test planning & strategy, risk-based testing', lesson: 'qa-foundations/test-planning-strategy' },
      { text: 'QA in Agile + the manual/automation/SDET roles & test types', lesson: 'qa-foundations/agile-and-qa-process' },
      { text: 'Write 15 test cases + 3 bug reports for a real app' },
    ],
  },
  {
    id: 'qw4',
    title: 'Week 4 — Web internals & locators',
    focus: "You can't automate what you can't locate.",
    goal: 'Write robust CSS and XPath locators for any element using DevTools.',
    items: [
      { text: 'HTML/DOM basics & DevTools', lesson: 'qa-web/locators' },
      { text: 'CSS selectors & XPath for automation', lesson: 'qa-web/locators' },
      { text: 'Validate selectors in the console; locate 20 elements' },
    ],
  },
  {
    id: 'qw5',
    title: 'Week 5 — Selenium WebDriver core',
    focus: 'The industry standard; most legacy suites are Selenium.',
    goal: 'Drive a browser: find elements, interact, handle the common scenarios.',
    items: [
      { text: 'WebDriver architecture, setup, locators & interactions', lesson: 'qa-web/selenium-core' },
      { text: 'Waits & killing flakiness (never Thread.sleep)', lesson: 'qa-web/waits-and-flakiness' },
      { text: 'Tricky scenarios: iframes, tabs, uploads, tables, shadow DOM', lesson: 'qa-web/handling-complex-scenarios' },
      { text: 'Project: automate login + add-to-cart + checkout' },
    ],
  },
  {
    id: 'qw6',
    title: 'Week 6 — Playwright (the 2026 frontrunner)',
    focus: 'Faster, auto-waiting, less flaky.',
    goal: 'Write Playwright tests with auto-wait, web-first assertions, fixtures and traces.',
    items: [
      { text: 'Playwright setup, config, cross-browser projects', lesson: 'qa-web/playwright-core' },
      { text: 'Resilient locators (getByRole/Text/TestId)', lesson: 'qa-web/playwright-core' },
      { text: 'Selenium vs Playwright vs Cypress — when each wins', lesson: 'qa-web/tool-comparison' },
      { text: 'Re-build the Week 5 flow in Playwright; compare' },
    ],
  },
  {
    id: 'qw7',
    title: 'Week 7 — Runners, assertions & Page Object Model',
    focus: 'From scripts to a maintainable, structured framework.',
    goal: 'Structure tests with a runner, rich assertions and a clean POM.',
    items: [
      { text: 'Test runners: TestNG & JUnit 5 (annotations, data providers, parallel)', lesson: 'qa-web/test-runners-testng-junit' },
      { text: 'Page Object Model: pages as classes (Java + Playwright TS)', lesson: 'qa-framework/page-object-model' },
      { text: 'Data-driven testing from JSON/CSV/Excel', lesson: 'qa-framework/framework-architecture' },
      { text: 'Refactor your suite into clean POM' },
    ],
  },
  {
    id: 'qw8',
    title: 'Week 8 — Build a real framework',
    focus: 'Your portfolio centerpiece. Make it production-shaped.',
    goal: 'POM + data-driven + config + logging + reporting, on GitHub with a README.',
    items: [
      { text: 'Framework architecture: layers, config, secrets, parallel-safety', lesson: 'qa-framework/framework-architecture' },
      { text: 'Reporting & logging: Allure, Extent, traces, failure evidence', lesson: 'qa-framework/reporting-logging-and-allure' },
      { text: 'Design patterns for automation (Factory, Singleton, Builder, SOLID)', lesson: 'qa-framework/design-patterns-for-automation' },
      { text: 'BDD with Cucumber & Gherkin (optional but often asked)', lesson: 'qa-framework/bdd-cucumber' },
      { text: 'Write a strong README — recruiters read it' },
    ],
  },
  {
    id: 'qw9',
    title: 'Week 9 — API testing',
    focus: 'In higher demand than UI testing in 2026.',
    goal: 'Test REST APIs in Postman and automate them in code with assertions.',
    items: [
      { text: 'HTTP foundations: methods, codes, headers, auth (JWT/OAuth2)', lesson: 'qa-api/http-foundations' },
      { text: 'Postman: variables, pm.* scripts, chaining, Newman + CI', lesson: 'qa-api/postman-and-automation' },
      { text: 'Automate in code: REST Assured deep dive (given/when/then)', lesson: 'qa-api/rest-assured-deep-dive' },
      { text: 'Advanced: contract testing, schema validation, GraphQL & API security', lesson: 'qa-api/api-testing-advanced' },
      { text: 'Project: full CRUD with assertions on a public API' },
    ],
  },
  {
    id: 'qw10',
    title: 'Week 10 — CI/CD, Docker & cloud grids',
    focus: '~89% of QA roles expect CI/CD.',
    goal: 'Your suite runs automatically on every push, in parallel, in the cloud.',
    items: [
      { text: 'CI/CD fundamentals + GitHub Actions, Docker & Grid', lesson: 'qa-cicd/ci-cd-docker' },
      { text: 'Jenkins & declarative pipelines (enterprise favourite)', lesson: 'qa-cicd/jenkins-and-pipelines' },
      { text: 'Pipeline strategy: which tests run when, gates, flaky handling', lesson: 'qa-cicd/test-automation-in-pipeline-strategy' },
      { text: 'Make YOUR framework run green in CI on every push' },
    ],
  },
  {
    id: 'qw11',
    title: 'Week 11 — Performance, AI tooling & mobile',
    focus: 'Round out into a full-spectrum SDET.',
    goal: 'Run a basic load test, use an AI testing assistant, and run one mobile test.',
    items: [
      { text: 'Performance fundamentals (metrics, percentiles, SLAs)', lesson: 'qa-performance/performance-and-nfr' },
      { text: 'Load testing hands-on: JMeter & k6', lesson: 'qa-performance/jmeter-and-k6' },
      { text: 'Security testing basics (OWASP Top 10, ZAP)', lesson: 'qa-performance/security-testing-basics' },
      { text: 'Accessibility testing (WCAG, axe-core)', lesson: 'qa-performance/accessibility-testing' },
      { text: 'AI in testing + using LLMs for QA work', lesson: 'qa-ai/using-llms-for-testing' },
      { text: 'Mobile automation: Appium + mobile testing strategy', lesson: 'qa-mobile/appium-basics' },
    ],
  },
  {
    id: 'qw12',
    title: 'Week 12 — Portfolio, resume & interviews',
    focus: 'Convert skills into offers.',
    goal: 'A polished portfolio, an SDET resume, and active applications + mocks.',
    items: [
      { text: 'Portfolio + SDET resume + how the interview process works', lesson: 'qa-career/resume-portfolio-interview' },
      { text: 'Drill the QA/SDET interview question bank (80+ Q&A)', lesson: 'qa-career/interview-questions-bank' },
      { text: '"How would you test X" + test/framework design round', lesson: 'qa-career/how-would-you-test-and-system-design' },
      { text: 'Behavioral round: STAR stories for QA', lesson: 'qa-career/behavioral-interview-for-qa' },
      { text: 'Certifications & roadmap: ISTQB → CTAL-TAE', lesson: 'qa-career/certifications-and-roadmap' },
      { text: 'Mock interviews out loud; apply to 5–10 roles/week; log what was asked' },
    ],
  },
];
