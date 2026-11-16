# Cloudflare Pages deployment for ConnectiveStack

The production site is in the repository root (not the nested `connective-stack/` folder).
It is a Vite + React project with a static SEO prerendering step.

## Git integration (Cloudflare Pages)

- Git repository: `ajelljeromesaliba-spec/Connective-Stack`
- Branch: `main`
- Root directory: `/` (repository root)
- Framework: Vite
- Build command: `npm run build`
- Build output directory: `dist`

Pages Functions are in `functions/api/contact.js` and use `/api/contact`.
In Cloudflare Pages > Settings > Variables and Secrets, add an **encrypted secret**
named `RESEND_API_KEY` using the existing Resend key, for production (and preview if testing).
Never commit that key. Verify the sending domain at Resend separately.

The `public/_redirects` and `public/_headers` files carry the old Vercel
route redirect and HTTP security headers to Cloudflare's static asset hosting.

## Domain

First test the `*.pages.dev` deployment and all demos, SEO routes and contact form.
Then connect `www.connectivestack.com` as a custom domain in Pages, configure
`connectivestack.com` to redirect to the www hostname using Cloudflare's domain
redirect rules, and update only the relevant DNS records as instructed by Cloudflare.
Do not delete MX, SPF, DKIM, DMARC or other mail-related records.

## Verification

- `npm ci && npm run build`
- Ensure `dist/index.html`, `dist/sitemap.xml`, and SEO page index files exist.
- Check main site and demo routes, contact POST, mobile display, video assets, and SEO metadata.
- Verify both www and apex domains after DNS migration.

No live domain or account configuration is changed by these repository files.
