# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pregustator: a responsive web app/site where people look up US food products, see which ingredients don't meet EU food standards (or need an EU warning label), and keep a personal pantry of products and watched ingredients. Brand voice is playful ("poison tester", Gus the taster); all verdict copy is neutral.

**Never read `.env*` files or print environment variables.** No secrets are needed (Open Food Facts requires no API key).

## Commands

```bash
npm run dev          # dev server on :3000 (Turbopack); also configured in .claude/launch.json
npm run build        # production build; the real check for Cache Components rules
npm run lint         # eslint
npm run typecheck    # tsc --noEmit (run `npx next typegen` first if LayoutProps/RouteContext are "not found")
npm test             # vitest run (node environment, src/**/*.test.ts)
npx vitest run src/lib/analyze.test.ts -t "Red 3"   # one file / one test by name
npm run icons        # regenerate apple-icon.png, favicon.ico, public/icon-*.png from src/app/icon.svg
```

## Next.js version warning

This is Next.js 16 with `cacheComponents` and `partialPrefetching` on (see `next.config.ts`). It differs from older versions: read the relevant guide in `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md). Consequences already in the code: `useSearchParams` pages are wrapped in `<Suspense>` (`src/app/app/page.tsx`), `use cache` + `cacheLife` is used inside functions in `src/lib/off.ts` (not directly in route handler bodies), and server components must not call `Date.now()`/`Math.random()`.

## Architecture

**Two layers, one app.** Route group `src/app/(site)/` holds the public marketing pages (Home, How It Works, Top Warnings, About Us) with header/footer. `src/app/app/` is the app shell ("Track the Poison"): Ask Gus (`/app`), My Pantry, Profile, Settings. `AppShell` shows a bottom `TabBar` below 900px and a left menu from 900px up. The app pages are client components reading URL params (`?q=` search, `?code=` selected product barcode).

**Design system port.** The design system lives in a Claude artifact (`https://claude.ai/artifact/5vKwf1t4ySnTwKZqQJfCUD`, a React/`window.Pregustator` bundle) and is ported by hand to `src/components/ds/*.tsx`, `src/styles/tokens.css` (from its `tokens.json`) and `src/styles/ds.css` (from its `bundle.css`). Component props mirror its `index.d.ts`. When changing look and feel, change it in the design system first, then re-port. `Cupboard` is the Ask Gus scene: geometry (jar width, Gus position, bubble tail) is computed in JS per `size` (`phone`/`desktop`), picked with `useIsDesktop` (phone-first on the server).

**Data pipeline (search to verdict).**
1. `src/lib/off.ts` (Open Food Facts, server only): `search.openfoodfacts.org` returns only codes/names, so each hit's label is fetched individually in parallel from the v2 product API; products without a readable ingredient list are dropped (no verdict possible). Alternatives come from the product's most specific category. All of it is cached for hours with `use cache`. OFF's old `cgi/search.pl` and comma-separated `code=` filters are unreliable, don't use them.
2. `src/lib/analyze.ts`: `normalize()` + phrase/E-number matching against the rules table; verdict is the worst status. Covered by `analyze.test.ts` (includes a real Pop-Tarts label).
3. `src/data/eu-rules.ts`: curated table of ingredients where EU and US rules differ. Every rule has `reviewed: false`: the summaries are unverified against the linked EU/US sources and must be checked and signed off before launch. `whatItDoes` already names the E-number/other names, `euRule`, `usRule` follow Gus's three-sentence order. Add new ingredients here (aliases are normalized phrases; use soft hyphens in `jarLabel`).
4. `src/app/api/search` and `api/product/[code]` expose results to the client; they return summaries (`code, name, brand, verdict, flaggedIds`) and the product detail plus alternatives.

**Client state.** No backend or accounts. `src/lib/localStore.ts` is a localStorage-backed `useSyncExternalStore` store (try/catch everywhere, in-memory fallback); `src/lib/pantry.ts` (products + watched rule ids, key `pregustator:pantry:v1`) and `MotionProvider` (key `pregustator:motion`, sets `<html data-motion>`) use it. Motion defaults to off when the device asks for reduced motion; `ds.css` turns off all animation via that attribute or the media query.

## Content and design rules (from the design system; enforced by a test for the forbidden words)

- Only three verdict phrases: **Doesn't meet EU standards**, **EU limit applies** (or **EU warning label required**), **Meets EU standards**. Never "unsafe", "toxic", "dangerous", "banned in Europe". The app compares rules; it does not judge safety.
- Products are square boxes, ingredients are round jars; product box colors (rose, teal, lilac, apple) never mean a verdict. Status is always icon + words + color.
- Single dark "Moss" theme, no emoji, no drop shadows, nothing that loops or flashes; every screen has a Motion control.
- Nav names: My Pantry, Ask Gus, Profile, Settings (app); How It Works, Track the Poison, Top Warnings, About Us (site).

## Gotchas

- `design-brief.md`, `polish-log.md` and `example-prompts.md` are a leftover coffee-shop template (light theme, Nunito, café photos). Ignore them; `site-plan.md` is the page plan and `references/references.md` the inspiration sites.
- All contact details, social links, the site URL and the OFF User-Agent in `src/data/site.ts` are placeholders (`.example` domain, 555-01xx phone). The disclaimer copy there is a draft that needs review before launch.
- Not a git repository yet.
