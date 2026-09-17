# DETTYVERSE — Prototype

A working frontend prototype of DETTYVERSE: a private, members-only
photography/film/writing archive with a $99.99/month membership.

## Running it

No build step. Open `index.html` directly in a browser, or serve the
folder with any static server, e.g.:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Pages

| Page | File |
|---|---|
| Homepage | `index.html` |
| Archive (photography, filterable, lightbox) | `archive.html` |
| Film section | `film.html` |
| Stories (filterable grid) | `stories.html` |
| Journal (running long-form list) | `journal.html` |
| Content detail (photo / film / story — handles paywall) | `content.html?type=photo\|film\|story&id=...` |
| Membership landing ("Come inside.") | `membership.html` |
| Sign in / create account (simulated) | `signin.html` |
| Checkout (simulated payment) | `checkout.html` |
| Member dashboard ("Welcome to the Verse") | `dashboard.html` |
| Creator / About | `about.html` |
| Digital store (Gumroad-style) | `store.html` |
| Product detail | `product.html?id=...` |
| Creator/admin dashboard | `admin.html` |

## Architecture

- `css/tokens.css` — design tokens (color, type, spacing, motion)
- `css/base.css` — reset + global styles + film grain overlay
- `css/components.css` — every reusable component (nav, cards, paywall,
  lightbox, forms, admin table, etc.) — all pages share this one file
- `js/data.js` — the mock content database (photos, films, stories,
  products). **This is the file to point at a real API/CMS.**
- `js/auth.js` — simulated membership/session state, stored in
  `localStorage` purely to drive the prototype's UI states. Has zero
  real security value — see the TODO comments inside.
- `js/nav.js` — injects the shared nav + footer into every page
- `js/app.js` — shared UI logic: toast messages, lightbox, card
  rendering helpers
- `js/gate.js` — the discreet entry/age-confirmation gate

## Simulating membership states

Open the browser console and run:

```js
DVAuth.signIn("you@example.com");   // sign in
DVAuth.becomeMember();              // activate membership
DVAuth.cancelMembership();          // cancel
DVAuth.signOut();                   // sign out
```

Or just use the real flows: Sign In → Join → Checkout, all in the UI.

## What's real vs. simulated

Everything you can click works at the frontend level — filters,
lightbox, mobile menu, membership state, paywall gating, checkout,
admin table actions. None of it is backed by a real server:

- **Auth** is a `localStorage` flag. Replace with real session/JWT auth.
- **Payments** are simulated in `checkout.html` / `product.html`.
  Replace with Stripe (or similar) Checkout/Payment Element — card data
  should never touch your own server directly.
- **Membership state** must ultimately be verified server-side on every
  request for protected media. Never trust the client-side `isMember()`
  check for anything but UI — it's there to make the prototype feel real,
  not to protect anything.
- **Protected media** (locked photos/films/stories) should be served via
  short-lived signed URLs generated only after server-side membership
  verification, not exposed at predictable public URLs.
- **Admin dashboard** (`admin.html`) is entirely static/mock and must sit
  behind real creator-only auth in production — it currently has no
  auth gate at all.

Search each JS/HTML file for `TODO(backend)` to find every integration
point called out explicitly in the code.
