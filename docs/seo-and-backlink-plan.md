# ConnectiveStack SEO handoff

## Implemented September 30, 2026

- Build-time HTML for 25 public routes, including readable page content before JavaScript.
- Unique titles and descriptions, one canonical using https://www.connectivestack.com, social metadata and JSON-LD on every route.
- Sitemap generated from real routes. No stale timestamps or non-existent URLs.
- Crawlable robots.txt referencing the canonical sitemap.
- Legacy /solutions/website-systems permanently redirects to /solutions/website-development.
- Unknown routes return a 404 page rather than the homepage. Its noindex is intentional.
- Canonical host redirect and HSTS header. Vercel also handles HTTP-to-HTTPS redirection; verify that at the deployed edge.
- Existing image alt text checked; empty alt remains on decorative images or images whose enclosing controls already supply names.
- Five smaller WebP assets, explicit image dimensions and responsive intrinsic sizing.
- Internal links, anchors, assets, heading counts, metadata and schema are checked by `node scripts/check-seo.mjs` after build.

## Verification limits

Search Console currently shows no properties in the signed-in account. Use the Google account that owns the existing ConnectiveStack property. Check Settings > Ownership verification, submit https://www.connectivestack.com/sitemap.xml, and inspect the homepage plus one guide URL. Do not create duplicate properties just to hide an account mismatch.

Core Web Vitals are not certified by a build check. Run mobile PageSpeed Insights on the homepage, a demo and a guide after deployment. Track LCP, INP and CLS in Search Console once field data exists. Compare results before removing or adding animation. A synthetic score is not a guarantee of real-user performance.

The static link audit covers same-site URLs and assets, not third-party service availability. Check Calendly and Paw Nova separately in the browser.

## Backlink strategy

Goal: earn references from relevant businesses and practitioners, measured by referring pages, referral visits and qualified inquiries. No guaranteed ranking or backlink count.

1. Start with work you can substantiate. Ask clients who have approved public attribution whether they want an optional built-by credit linking to the relevant service page. No credit added without their consent; no disclosure of private AIA work or client systems.
2. Write one useful technical reference from your own work, such as tracing a website form through GHL to an assigned owner. Include a diagram, redacted example, failure checks and a working demo. Expand the current short guide before pitching it as a resource.
3. Each week, identify five relevant agency partners, GHL practitioners or service-business publications. Record a specific page where that guide helps readers. Send a short individual suggestion explaining the gap and the useful reference. One follow-up after a week is enough.
4. Publish an approved case study when a client result is available. Separate observed results from goals; the fictional demos must remain labelled as concepts. Ask the client or partner whether they would reference it from their own article or project page.
5. Keep brand name, website and service descriptions consistent on profiles you already own. Add the website link where the platform allows it, without assuming those links transfer ranking value.

Avoid paid ranking links, bulk directory submissions, automated comment links, private blog networks and invented testimonials. Useful references take effort; submitting a sitemap alone will not earn them.

Track: referring site and page, relevant audience, target ConnectiveStack URL, contact date, reply, published link, referral visits, inquiries. Review monthly; keep sources that send relevant readers.

Official references:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
