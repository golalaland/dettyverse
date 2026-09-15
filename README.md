# DETTYVERSE — Frontend Prototype

**Private. Cinematic. Nocturnal. Luxurious. Personal. Cultural. Slightly Dangerous.**

A complete self-contained frontend prototype of a private cultural publication / membership platform.

## Quick Start

Open `index.html` in a modern browser, or serve the folder:

```bash
cd dettyverse
python3 -m http.server 8080
# → http://localhost:8080
```

No build step. No dependencies beyond CDN Tailwind + Google Fonts.

## What’s Included

| Surface | Status |
|---------|--------|
| Homepage | Atmospheric hero, selected work, membership invitation |
| Archive | Filterable index of all public + private items |
| Photography | Series grid with locked states |
| Film | Editorial film list with stills + simulated playback |
| Journal / Stories | Editorial writing with private entries |
| Content Detail | Full photo sets, film pages, journal articles |
| Membership | $99.99 / 1 MONTH — prominent, tasteful |
| Locked Content | Consistent private gate with CTA |
| Member Dashboard | Status, unlocked counts, recent private work |
| Creator / About | Bio and positioning |
| Digital Store | Editions with member pricing |
| Admin Dashboard | Content overview + integration notes |
| Auth Simulation | Visitor / Member / Admin states (localStorage) |
| Responsive | Mobile-first navigation and layouts |

## Simulated Auth

- Click **Enter** in the nav (or mobile menu).
- **Sign In as Member** → full access to private material.
- **Continue as Visitor** → public only.
- **Sign In as Admin (demo)** → admin dashboard + full access.
- Membership purchase flow is also simulated (no real payment).

State persists in `localStorage` under `dettyverse_state`.

## Architecture Notes (for evolution)

```
js/
  data.js     → Editorial content shape (swap for CMS / API later)
  state.js    → Auth & membership state (replace with real JWT / session)
  router.js   → Lightweight hash router
  app.js      → Page renderers + UI bindings
```

**Clear integration points:**

1. **Auth** — `State.login` / `State.logout` / `State.user`
2. **Payments** — Membership CTA + store “Acquire” buttons
3. **Protected media** — Locked items already gate on `State.canAccess()`
4. **CMS** — `DETTY` object in `data.js` is the content contract

## Creative Direction

- Black environment, crimson / ruby accents
- Cormorant Garamond (editorial serif) + Space Grotesk / Inter
- Film grain overlay, subtle ambient red glow
- No sterile portfolio feel — private cultural universe
- Public surface vs larger private ledger is the core tension

---

Prototype only. Frontend complete. Ready to grow into a real platform.
