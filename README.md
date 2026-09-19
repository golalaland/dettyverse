# DETTYVERSE — Prototype (v2)

A working frontend prototype of DETTYVERSE: a private, members-only
visual archive — photos, clips and stories — with a $99.99/month
membership. Content-first, black canvas, neon red/pink brand identity
built from the official logo asset.

## Running it

No build step. Open `index.html` directly in a browser, or serve the
folder with any static server:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Pages

| Page | File |
|---|---|
| Homepage (logo splash → straight into the gallery) | `index.html` |
| Photos (curated rhythm grid, filterable, fullscreen viewer) | `photos.html` |
| Clips (native-aspect-ratio video wall — portrait stays portrait) | `clips.html` |
| Stories (minimal grid) | `stories.html` |
| Content detail (photo / clip / story — handles the paywall) | `content.html?type=photo\|film\|story&id=...` |
| Members landing ("Some things aren't public.") | `membership.html` |
| Sign in / create account (simulated) | `signin.html` |
| Checkout (simulated payment) | `checkout.html` |
| Member dashboard ("the back room") | `dashboard.html` |
| About / Creator | `about.html` |
| Store — not in main nav, linked from footer | `store.html` |
| Product detail | `product.html?id=...` |
| Creator/admin dashboard | `admin.html` |

## Brand assets

- `assets/dettyverse-logo.webp` — the official logo, trimmed to its
  bounding box, used untouched everywhere the wordmark appears (nav,
  footer, splash, auth pages, admin sidebar). Never recolored, never
  boxed, never re-glowed.
- Favicon is a small abbreviated mark (a neon dot on black), inlined
  as an SVG data URI in every page's `<head>` — the full script
  wordmark doesn't read at favicon size, so this stands in per the
  brief's instruction to use a tasteful abbreviated mark for very
  small applications.
- Brand palette lives in `css/tokens.css` (`--brand-1/2/3`, `--glow-*`)
  — pulled directly from the logo's gradient.

## Architecture

- `css/tokens.css` — design tokens (color, type, spacing, motion)
- `css/base.css` — reset + global styles + grain overlay
- `css/components.css` — every reusable component: nav, rhythm grid
  (Photos), clip wall (Clips), cards, the subtle "Private" lock
  treatment, fullscreen viewer, forms, admin table, etc.
- `js/data.js` — the mock content database (photos, clips, stories,
  products). **This is the file to point at a real API/CMS.** Clips
  carry an `orientation` field (`portrait` / `landscape` / `square`)
  that drives the wall layout — keep populating this correctly and
  the wall keeps working without any other changes.
- `js/auth.js` — simulated membership/session state in `localStorage`,
  used only to drive the prototype's UI states. Zero real security
  value — see the TODOs inside.
- `js/nav.js` — injects the shared nav + footer (logo, five links,
  one account control) into every page.
- `js/app.js` — toast messages, fullscreen photo viewer, and the card
  renderers for photos/clips/stories, including the rhythm-pattern
  assigner for the Photos grid.
- `js/gate.js` — the discreet entry/age-confirmation gate.

## Simulating membership states

Open the browser console and run:

```js
DVAuth.signIn("you@example.com");
DVAuth.becomeMember();
DVAuth.cancelMembership();
DVAuth.signOut();
```

Or just use the real flow: Sign In → Members → Checkout, all in the UI.

## The private-content treatment

Per the current design direction, locked content stays visible — a
photo is only lightly blurred/darkened with a small glowing "Private"
label in the corner, not covered by a paywall box. This lives in
`.media-card--locked` in `components.css` and the `lockMarkup()`
helper in `app.js`. If you want it more or less tantalizing, that's
the one place to tune it.

## What's real vs. simulated

Everything you can click works at the frontend level. None of it is
backed by a real server. Search each JS/HTML file for `TODO(backend)`
for the specific integration points:

- **Auth** is a `localStorage` flag. Replace with real session/JWT auth.
- **Payments** are simulated in `checkout.html` / `product.html`.
  Replace with Stripe (or similar) — card data should never touch
  your own server directly.
- **Membership state** must ultimately be verified server-side on
  every request for protected media. Never trust the client-side
  `isMember()` check for anything but UI.
- **Protected media** should be served via short-lived signed URLs
  generated only after server-side verification — not exposed at
  predictable public URLs.
- **Admin dashboard** (`admin.html`) is static/mock and has no auth
  gate at all in this prototype — it must sit behind real creator-only
  auth in production.
