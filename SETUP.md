# Yours, Not Theirs — Your Flyer, Not Theirs
## Not Theirs Studio · Kimberly Lohr Signature Method

A Next.js + TypeScript + Tailwind app. Deploys to Vercel out of the box.

## Local development

```
npm install
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
npm run dev
```

Open <http://localhost:3000>.

## Required environment variable

`ANTHROPIC_API_KEY` — your Anthropic API key. Set locally in `.env.local` (never commit). In Vercel, add it under Project → Settings → Environment Variables for **Production**, **Preview**, and **Development** scopes.

## Deploy

1. Push to `main` (or any branch) of the connected GitHub repo.
2. Vercel auto-detects Next.js, builds, and deploys.
3. Preview URLs are generated for every branch push.

## Specimens

Drop the 10 JPEG files into `public/specimens/specimen-01.jpg` through `specimen-10.jpg`. See `public/specimens/README.md` for the expected naming.

## Project structure

```
/app
  /page.tsx                    main app shell, state machine, screen routing
  /layout.tsx                  HTML shell, fonts, globals.css
  /globals.css                 design tokens, primitives, components
  /api
    /signature/route.ts        Signature generation endpoint
    /tiles/route.ts            visual-territory tile renderer
/components
  /JourneyIndicator.tsx        four-phase progress indicator
  /screens/                    one component per screen
  /specimens/                  PairSpecimen (renders one of 14 inline-HTML pair specimens)
/lib
  /decisions.ts                pair-choice → instruction strings
  /assemble.ts                 builds the system+user prompts from state
  /contradictions.ts           client-side tension detection
  /storage.ts                  localStorage helpers
/types
  /index.ts                    AppState, Screen, etc.
/public
  /specimens/                  user-provided JPEGs
```
