# SDE-2 Launchpad

An interactive, **fully offline** interview-prep platform built around your stack (React Native · Node.js · AWS) and the exact gaps from your recent interviews. Read lessons, watch concepts animate, practice with spaced-repetition flashcards and mock mode — all stored locally in your browser, no backend, no database.

Built with [Astro](https://astro.build) + MDX. Ships as a static site you can run locally or deploy anywhere.

---

## Run it (one time setup)

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd sde2-launchpad
npm install        # installs dependencies (one time)
npm run dev        # start the dev server → open the printed http://localhost:4321
```

That's it. Open the URL it prints. Your progress saves automatically in that browser.

### Production build / install as an app

```bash
npm run build      # outputs a static site to ./dist
npm run preview    # serve the built site locally
```

Once it's served over `http://localhost`, your browser will offer to **Install** it (address-bar icon). Installed, it runs in its own window and works **completely offline** — a real PWA.

> A pre-built copy is already in the **`dist/`** folder. It must be *served*, not opened by double-click (browsers block service workers and absolute paths on `file://`). The quickest way without installing anything:
> ```bash
> npx serve dist      # then open the printed URL
> ```

## Deploy it (optional, still no backend)

The `dist/` folder is a plain static site. Drag it onto **Netlify Drop**, push it to **GitHub Pages**, or run `vercel`. There's nothing to configure — no server, no database.

---

## What's inside

```
sde2-launchpad/
├── src/
│   ├── content/lessons/      # all 27 lessons as MDX, grouped by track
│   ├── components/           # visualizers (ArrayViz, EventLoop, TreeTraversal, …)
│   ├── data/curriculum.ts    # tracks + the 8-week plan
│   ├── layouts/              # BaseLayout, LessonLayout
│   ├── pages/                # dashboard, tracks, lessons/[slug], practice, mistakes
│   └── styles/global.css     # the design system
├── public/
│   ├── store.js              # all progress/state (localStorage) — the offline "DB"
│   ├── viz-algos.js          # step-generator registry for <ArrayViz>
│   ├── sw.js                 # service worker (offline caching)
│   └── manifest.webmanifest  # PWA manifest
└── astro.config.mjs
```

## Features

- **Dashboard** — overall progress ring, level/XP, streaks, the 8-week plan, per-track progress, JSON backup/restore.
- **DSA Quest** — a Duolingo-style game over a 30-pattern, 180-problem ladder, with a mood-reactive mascot (happy on a streak, sad/sleepy when you lapse), daily goals, rotating motivation, XP, and confetti when you master a pattern.
- **In-depth lessons** across Quick Wins, JavaScript, React/React Native, DSA, System Design, Behavioral, and an AI Engineering Roadmap.
- **Interactive visualizers** — animated event loop, two-pointer / binary-search / sliding-window stepper, tree traversals, prototype chain, RN threading model, and a clickable scalable-architecture diagram. Plus a runnable JS playground.
- **Spaced-repetition flashcards** (SM-2), **mastery levels**, **Mock Mode** with a timer, and a searchable **Mistakes Log**.
- **⌘K command palette** to jump to any topic.
- **Gamification** — XP, levels, daily streaks, badges.

## How to extend it

- **Add a lesson:** drop a new `.mdx` file in `src/content/lessons/<track>/`. Frontmatter (`title`, `track`, `summary`, `order`, …) wires it into the track, dashboard, search, and flashcards automatically.
- **Add an array visualization:** add one entry to `public/viz-algos.js`, then put `<ArrayViz algo="your-key" />` in any lesson. No new component needed.

## Privacy

Everything lives in your browser's `localStorage`. Nothing is ever sent anywhere. Use **Backup / Restore** on the dashboard to move progress between machines.
