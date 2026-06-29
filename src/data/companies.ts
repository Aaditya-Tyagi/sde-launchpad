// Company prep packs — general, widely-known interview-style guidance to focus prep.
// emphasis: 1 = minor, 2 = important, 3 = dominant. Drives the checklist + focus.
export interface CompanyPack {
  id: string; name: string; icon: string; blurb: string;
  emphasis: { dsa: number; systemDesign: number; behavioral: number; frontend: number };
  rounds: string[];
  tips: string[];
  focus: { label: string; href: string }[];
}

export const COMPANIES: CompanyPack[] = [
  {
    id: 'amazon', name: 'Amazon', icon: '📦',
    blurb: 'Leadership Principles run the whole loop. Every round — including coding — probes behavioral signal.',
    emphasis: { dsa: 2, systemDesign: 2, behavioral: 3, frontend: 1 },
    rounds: ['Online assessment (2 DSA + work-style survey)', '1–2 coding rounds (DSA, medium)', 'System design (SDE-2+)', '2–3 behavioral rounds mapped to Leadership Principles', 'A "Bar Raiser" round'],
    tips: [
      'Prepare 6–8 STAR stories, each tagged to specific Leadership Principles (Ownership, Customer Obsession, Dive Deep, Deliver Results).',
      'Quantify every result — Amazon loves metrics.',
      'Coding is medium difficulty but bar is clean code + clear communication, not exotic algorithms.',
    ],
    focus: [{ label: 'STAR Story Bank', href: '/practice/stories' }, { label: 'DSA Quest', href: '/game' }, { label: 'HLD track', href: '/tracks/hld' }],
  },
  {
    id: 'google', name: 'Google', icon: '🔍',
    blurb: 'Algorithms-heavy. Strong DS&A fundamentals and clean problem-solving under time, plus system design at senior levels.',
    emphasis: { dsa: 3, systemDesign: 2, behavioral: 2, frontend: 1 },
    rounds: ['Phone screen (1–2 DSA)', '4–5 onsite: 3 coding (DSA, medium–hard)', '1 system design (L4+)', '1 "Googleyness & leadership"'],
    tips: [
      'Drill graphs, trees, DP and complexity analysis until automatic — depth matters here.',
      'Think out loud; Google scores your problem-solving process, not just the final answer.',
      'Always state time/space complexity and discuss trade-offs before coding.',
    ],
    focus: [{ label: 'DSA Quest', href: '/game' }, { label: 'Code Lab', href: '/practice/code' }, { label: 'Output Quiz', href: '/practice/quiz' }],
  },
  {
    id: 'meta', name: 'Meta', icon: '🟦',
    blurb: 'Fast coding (often two problems in 45 min), system/product design, and a behavioral round. Front-end roles add UI rounds.',
    emphasis: { dsa: 3, systemDesign: 2, behavioral: 2, frontend: 2 },
    rounds: ['Phone screen (1–2 DSA)', '2 coding rounds (speed matters)', '1 system design / product design', '1 behavioral ("career story")', 'Front-end loop: a UI build round'],
    tips: [
      'Practice solving mediums fast — pacing is the differentiator at Meta.',
      'For front-end roles, rehearse building a component live (state, events, accessibility).',
      'Have a crisp "career story": impact, growth, why Meta.',
    ],
    focus: [{ label: 'DSA Quest', href: '/game' }, { label: 'Code Lab', href: '/practice/code' }, { label: 'Frontend SD track', href: '/tracks/frontend-system-design' }, { label: 'LLD track', href: '/tracks/lld' }],
  },
  {
    id: 'microsoft', name: 'Microsoft', icon: '🪟',
    blurb: 'Balanced and practical. Solid coding, design, and collaboration signal — less about exotic algorithms.',
    emphasis: { dsa: 2, systemDesign: 2, behavioral: 2, frontend: 1 },
    rounds: ['1–2 phone/online coding', '3–4 onsite: coding + design + behavioral', 'An "as-appropriate" (AA) final round'],
    tips: [
      'Focus on clean, correct, well-tested code and clear reasoning.',
      'Be ready to discuss past projects in depth — architecture, your role, trade-offs.',
      'Collaboration and growth mindset are real signals here.',
    ],
    focus: [{ label: 'DSA Quest', href: '/game' }, { label: 'HLD track', href: '/tracks/hld' }, { label: 'STAR Story Bank', href: '/practice/stories' }],
  },
  {
    id: 'startup', name: 'Startup (Seed–Series B)', icon: '🚀',
    blurb: 'Breadth and shipping speed over algorithm puzzles. Practical full-stack, pragmatic design, and strong ownership signal.',
    emphasis: { dsa: 1, systemDesign: 2, behavioral: 2, frontend: 3 },
    rounds: ['Practical coding (often take-home or build-a-feature)', 'System design (pragmatic, real trade-offs)', 'Founder/team culture chat', 'Sometimes a paid trial day'],
    tips: [
      'Show you can ship end-to-end: frontend, API, data, deploy.',
      'Emphasize ownership, speed, and comfort with ambiguity — not big-tech process.',
      'Design answers should be pragmatic (cost, time-to-ship), not hyperscale.',
    ],
    focus: [{ label: 'React & RN track', href: '/tracks/react-native' }, { label: 'Frontend SD track', href: '/tracks/frontend-system-design' }, { label: 'LLD track', href: '/tracks/lld' }, { label: 'AI Engineering', href: '/tracks/ai-engineering' }],
  },
  {
    id: 'netflix', name: 'Netflix', icon: '🎬',
    blurb: 'Senior bar and a strong culture filter ("freedom & responsibility"). Deep system design and high-judgment behavioral.',
    emphasis: { dsa: 2, systemDesign: 3, behavioral: 3, frontend: 1 },
    rounds: ['Recruiter + hiring manager culture screen', 'Deep technical / system design', 'Cross-functional behavioral rounds', 'Culture-fit emphasis throughout'],
    tips: [
      'Read the Netflix culture memo; map your stories to high judgment and independent impact.',
      'Expect senior-level design depth — bottlenecks, trade-offs, failure modes.',
      'Communicate like a senior peer: candid, concise, context-rich.',
    ],
    focus: [{ label: 'HLD track', href: '/tracks/hld' }, { label: 'SD Canvas', href: '/practice/design' }, { label: 'STAR Story Bank', href: '/practice/stories' }],
  },
];
