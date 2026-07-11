# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start full-stack dev server (Express + Vite HMR)
npm run build     # Build frontend (Vite) + backend (esbuild → dist/server.cjs)
npm start         # Run production build
npm run lint      # TypeScript type-check (no emit)
npm run preview   # Preview Vite production build
```

No test suite is configured.

## Environment Setup

Copy `.env.example` to `.env` and fill in `SMTP_PASS`. All other vars have defaults. Without SMTP config, email endpoints still succeed but log to console instead of sending.

## Architecture

**Full-stack TypeScript SPA** — React frontend served by an Express backend that also handles email API routes.

### Request Flow

- **Dev**: `tsx server.ts` starts Express, which mounts Vite as middleware for HMR + asset serving
- **Production**: Express serves pre-built `dist/` static files with SPA fallback (`*` → `index.html`)
- **API routes**: `POST /api/send-order` and `POST /api/send-contact` — handled by Express before the SPA fallback

### Key Files

| File | Role |
|------|------|
| `server.ts` | Express entry point; Vite middleware in dev, static serving in prod, email API endpoints |
| `server/email.ts` | Nodemailer SMTP setup + HTML email template builders (bilingual EN/AR) |
| `src/App.tsx` | Root component; owns all global state (language, cart, activePanel, routing) |
| `src/types.ts` | Shared TypeScript types: `TeaProduct`, `CartItem`, `Language`, `ActivePanel`, `TranslationSet` |
| `src/data.ts` | Static product catalog (`TEA_PRODUCTS[]`) and full bilingual `TRANSLATIONS` object |

### Routing

The app uses **custom client-side routing via `window.history.pushState`** — no React Router. `App.tsx` tracks an `activePanel` state (`'shop' | 'contact' | 'sustainability' | 'farms' | null`) and conditionally renders full-page sections.

### Internationalization

Language toggle (`'en' | 'ar'`) lives in `App.tsx` state. Arabic enables RTL layout. All UI strings come from `TRANSLATIONS` in `src/data.ts`. Email templates in `server/email.ts` also support both languages.

### Styling

Tailwind CSS 4 via the Vite plugin (`@tailwindcss/vite`). Global styles in `src/index.css`. Animations use the `motion` package (Framer Motion fork).

### Email Service

`server/email.ts` connects to Zoho Mail SMTP. Each form submission sends two emails: one to the admin (`SMTP_TO`) and one confirmation to the customer. If SMTP env vars are missing, the function returns a simulated success and logs to console — no crash.
