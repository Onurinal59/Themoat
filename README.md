# Economic Moat Academy

An open, bilingual learning and company-analysis application based on Michael Mauboussin and Dan Callahan's economic-moat framework. It combines an eight-module curriculum, interactive finance simulators, a five-step company audit, spaced-repetition flashcards and a Socratic AI coach.

Live application: [measure-moat.vercel.app](https://measure-moat.vercel.app/)

## Stack

- React 19, TypeScript and Vite
- Tailwind CSS 4, Motion, Recharts and Lucide
- Vercel Functions for server-only API routes
- Cloudflare Workers AI (Qwen3) for coaching and committee feedback
- Vercel Analytics and Speed Insights

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in `.env.local` to use AI routes locally. Never prefix these variables with `VITE_`; they must remain server-only.

## Quality checks

```bash
npm run lint
npm test
npm run build
npm audit --audit-level=high
```

GitHub Actions runs the same checks for pushes and pull requests. Financial regression tests explicitly cover non-positive invested capital, where ROIC is reported as not meaningful rather than as an artificial percentage.

## Data and privacy

Company dossiers are stored locally in the current browser and can be exported as JSON. Imports are schema-checked and limited in size. AI questions and committee defenses are sent to Cloudflare Workers AI to generate responses; users should not include personal or confidential information.

This application is educational and does not provide personalized investment advice.
