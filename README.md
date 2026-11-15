# Webtics Digital website

Next.js 16 (App Router, React 19, TypeScript), Tailwind CSS 4, GSAP and Lenis for motion, plain canvas for the interactive character graphics, and Three.js (via React Three Fiber) for the 3D data field on the services pages. Blog posts and case studies are MDX files in the repo.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build: must pass before deploying
npm run start      # serve the production build
```

The internal brand page, with logo variations, colours and contrast ratios, is at `/brand`. It's hidden from search engines.

## Where things live

| What | Where |
| --- | --- |
| Site name, email, phone, booking link, socials | `src/lib/site.ts` |
| Services: copy, FAQs, SEO titles | `src/content/services.ts` |
| Packages and prices (shown on service pages and /pricing) | `src/content/packages.ts` |
| Blog posts | `src/content/blog/*.mdx` |
| Case studies | `src/content/work/*.mdx` |
| Logo (original artwork) | `public/brand/webtics-logo.png`, used by `src/components/Logo.tsx`. Favicons: `src/app/icon.png`, `src/app/apple-icon.png` |
| Hero splat background | `src/components/motion/GlyphField.tsx` |
| Logo and portrait drawn in characters | `src/components/motion/GlyphImage.tsx` |
| Opening curtain (once per session) | `src/components/Loader.tsx` |
| Custom pointer | `src/components/motion/CursorLabel.tsx` |
| Client screenshots | `public/work/<name>-desktop.jpg`, `-mobile.jpg`, `-page.jpg` |
| Colours, type scale, motion CSS | `src/app/globals.css` |
| 3D data field | `src/components/three/` |
| Scroll animations | `src/components/motion/` |
| Redirects and security headers | `next.config.ts` |
| Contact form endpoint | `src/app/api/contact/route.ts` |

## Adding a blog post

1. Copy any file in `src/content/blog/` and rename it. The file name becomes the URL: `my-new-post.mdx` is served at `/blog/my-new-post`.
2. Edit the front matter at the top:

```yaml
---
title: "Five signs your website needs a redesign"
description: "One or two sentences. This is the Google snippet, so aim for 150–160 characters."
category: "Web design"          # Web design · SEO · Website care · Data · Automation
date: "2026-12-01"
author: "Sufyaan Seedat"
featured: false                  # true = big card at the top of /blog
services: ["web-design"]         # links the post to these service pages
takeaways:
  - "First key point"
  - "Second key point"
---
```

3. Write the article in Markdown. Use `##` for main sections, which also build the table of contents, and `###` for subsections.
4. Add layout blocks anywhere you like (see below).
5. Run `npm run build` to check it, then commit and push. The host redeploys automatically.

To hide a post without deleting it, add `draft: true` to its front matter.

## Adding a case study

Same process in `src/content/work/`. The front matter looks like this:

```yaml
---
title: "Headline about the outcome"
client: "Client name"
sector: "Hospitality"
services: ["web-design", "seo"]  # slugs from services.ts
summary: "One sentence for listings and Google."
result: "62% more enquiries in 3 months"   # real figures only
timeline: "6 weeks"
tools: ["Next.js", "GA4"]
year: "2026"
order: 1                          # position on the index
accent: "ink"                     # ink · stone · scarlet (placeholder screen colour)
url: "clientsite.co.uk"
shots: "clientname"               # uses public/work/clientname-desktop.jpg, -mobile.jpg and -page.jpg
testimonial:
  quote: "Their words, with permission."
  name: "Jane Smith"
  role: "Owner, Client Co."
---
```

Screenshots go in `public/work/`, three per client:

- `<name>-desktop.jpg`: 1440 × 900, the top of the home page
- `<name>-mobile.jpg`: a phone-width capture
- `<name>-page.jpg`: the whole page, 1200px wide. It scrolls inside the browser frame on hover.

Set `shots: "<name>"` in the front matter and the mock-ups pick them up. In the body, `<FullBleed src="/work/<name>-page.jpg" tall alt="…" />` shows the long capture.

Three earlier placeholder studies (`werkix.mdx`, `hashtag-fitness.mdx`, `reporting-dashboard.mdx`) are hidden with `draft: true` until there is real material for them.

## Swapping the logo or the portrait

- **Logo:** replace `public/brand/webtics-logo.png` (or point `SRC` in `src/components/Logo.tsx` at an SVG). Also replace `public/brand/webtics-logo-sm.png`, a 320px copy that the character version of the logo is drawn from.
- **Portrait on the About page:** it is drawn from `public/brand/sufyaan-cutout.png`, a head-and-shoulders cut-out with a transparent background and boosted contrast. To change the photo, export a new cut-out about 420px wide to the same path.

## Layout blocks for MDX

```mdx
<PullQuote cite="Optional source">A big quote.</PullQuote>

<Callout title="Worth knowing">Tinted side note.</Callout>

<KeyTakeaways items={...} />   (blog posts add these automatically from front matter)

<StatRow>
  <Stat value="62%" label="More enquiries" />
  <Stat value="1.2s" label="Mobile load time" />
  <Stat value="3×" label="Organic visits" />
</StatRow>

<BeforeAfter before="What it was like" after="What it is like now" />

<FullBleed src="/work/image.jpg" alt="Description" caption="Optional caption" />

<TwoCol image="/work/image.jpg" alt="Description">Text beside the image.</TwoCol>

<Gallery>
  <GalleryItem src="/work/a.jpg" alt="…" caption="…" />
  <GalleryItem src="/work/b.jpg" alt="…" />
</Gallery>

<Devices label="Client" url="client.co.uk" accent="ink" />

<InlineCta title="Want us to check your website?" />
```

## Contact form: email and bot protection

Copy `.env.example` to `.env.local` for local work, and set the same names on your host for the live site.

**Email (Resend).** Without these, enquiries are only logged, not emailed.

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@webtics.digital
CONTACT_FROM_EMAIL="Webtics Digital <hello@webtics.digital>"
```

**Bot protection (Cloudflare Turnstile).** An invisible check that only shows a tick box if Cloudflare is unsure about a visitor.

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

To get live keys: in the Cloudflare dashboard, open Turnstile, add a widget for `webtics.digital` in "Managed" mode, and copy the site key and secret key into your host's environment variables. Then redeploy.

- With no keys set, the form works without Turnstile.
- `.env.local` currently holds Cloudflare's published dummy keys, which always pass. They are for local testing only and give no protection on a live site.
- The form also keeps its other defences: a hidden honeypot field, a minimum fill time, a limit of 5 messages per 10 minutes per IP address, and server-side validation.

## Deploying

- **Recommended:** Netlify (its free tier allows commercial use) or Vercel Pro. Connect the repo and the defaults work.
- **Vercel:** the free Hobby plan is for non-commercial use only.
- **Before launch:** point the domain, then submit `https://webtics.digital/sitemap.xml` in Google Search Console.

## Redirect map (old WordPress site to new site)

These are defined in `next.config.ts`. Check them against Search Console's indexed pages before launch.

| Old | New |
| --- | --- |
| `/service/` | `/services` |
| `/web-design/` | `/services/web-design` |
| `/website-management/` | `/services/website-care-plans` |
| `/website-hosting/` | `/services/website-care-plans` |
| `/branding/` | `/services` |
| `/about/`, `/contact/` | unchanged |
| `/feed` | `/blog` |

## Launch checklist

- [ ] Replace every `[… TO CONFIRM]` placeholder. Find them with `grep -rn "TO CONFIRM\|TO SUPPLY" src`.
- [ ] Swap in the final SVG logo when it arrives.
- [ ] Confirm the details in the three client case studies (results, timeline, tools, testimonials, other services).
- [ ] Add real screenshots, a photo and testimonials (only with permission).
- [ ] Set the Resend and live Turnstile environment variables on the host and send a test enquiry.
- [ ] Add a booking embed (Cal.com or Calendly) and allow its domain in the CSP in `next.config.ts`.
- [ ] Add GA4 behind a cookie consent banner (not built yet), and add its domains to the CSP.
- [ ] Review the privacy, cookie and terms drafts.
- [ ] Deploy, then run Lighthouse on the live URL.
- [ ] Verify the domain in Search Console, submit the sitemap and check the redirects.
