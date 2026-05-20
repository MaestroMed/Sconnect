# Performance — playbook S Connect

Quick reference for the audits we run on the public surface, and how to reproduce them locally before pushing.

## Lighthouse (manual, on demand)

The `perf:lh` script wraps `npx lighthouse` (devtools throttling, desktop preset) against the local dev server.

```bash
# 1. Start the site
npm run dev

# 2. In another terminal — generate an HTML report and open it
npm run perf:lh           # desktop preset
npm run perf:lh:mobile    # mobile preset, slower throttling

# The report writes to ./lighthouse-report.html and pops up in the browser
```

**Targets we hold for 2026** (p75 field metrics, validated on each major release):

| Metric         | Threshold | Why |
|----------------|-----------|-----|
| LCP            | < 2.5 s   | Core Web Vital — Google ranking factor |
| INP            | < 200 ms  | Replaced FID as CWV in March 2024 |
| CLS            | < 0.1     | Layout stability — UX |
| TBT (lab)      | < 200 ms  | Proxy for INP in lab tests |
| Performance    | ≥ 90      | Lab score baseline |
| Accessibility  | ≥ 95      | Augments the axe-core E2E |
| Best Practices | ≥ 95      | Catches CSP, mixed content, console errors |
| SEO            | = 100     | Indexable hygiene |

## Bundle analysis

```bash
npm run analyze
# Generates a treemap at .next/analyze/{client,nodejs,edge}.html
```

Open the client report. Anything > 200 KB gzipped on the home/critical route warrants a code-split or dynamic import.

Watch list (already audited at session 2026-05-20):
- `framer-motion` — currently 11.x. Migrating to 12 would re-evaluate. Used widely → kept full.
- `next-mdx-remote` — runtime cost on /actualites/[slug]. Could be moved to RSC-only and pre-rendered statically (`force-static`) in a follow-up.

## Accessibility (axe-core, automated)

```bash
npm run test:a11y     # only the a11y suite
npm run test:e2e      # full Playwright suite (covers a11y too)
```

The a11y spec covers 14 public routes and fails on `serious` or `critical` violations of WCAG 2.1 AA. `color-contrast` is excluded because we audit gradients manually (and the AAA subtitle bump in May 2026 covers most of it).

## Image / video optimisation

Already in place — see `next.config.ts`:

- `images.formats: ['image/avif', 'image/webp']`
- `deviceSizes` covers 640 → 3840
- All hero videos are encoded both MP4 (H.264) and WebM (VP9). The WebM source is served first when supported, saving 65-90 % on bandwidth.
- `HeroVideo` component:
  - `preload="metadata"` (not `auto`) — avoids the multi-MB body fetch on first paint
  - Renders post-mount only — kills the SSR→hydration duplicate fetch
  - `disableRemotePlayback` — blocks AirPlay/Cast pre-buffering on iOS

## Monitoring (production)

- **Sentry** — error tracking + replay sampled at 10 %
- **Vercel Speed Insights** — RUM (Real User Monitoring) for the p75 field metrics. Gated behind cookie consent (see `AnalyticsGate`).
- **`/api/health`** — returns 200 / 503 with timings per dependency. Hook a monitor (BetterStack, UptimeRobot, Vercel Cron) onto it.

## When to re-run the audit

- Before each major release (route group changes, new dependency > 50 KB)
- After any change to `app/layout.tsx`, `next.config.ts`, or the hero/CTA path
- Once a quarter as a hygiene check
