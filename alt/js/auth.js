/* ============================================
   DETTYVERSE — SIMULATED AUTH / MEMBERSHIP STATE
   ============================================
   TODO(backend): This entire module is a frontend-only mock.
   Replace with real session handling:
     - Auth: cookie/JWT session issued by your auth provider
       (e.g. NextAuth, Clerk, Auth0, or custom).
     - Membership status MUST be verified server-side on every
       request for protected media — never trust localStorage.
     - Payment: Stripe Checkout/Billing (or similar) webhook should
       be the single source of truth for membership.start/expiry.
     - Protected media should be served via short-lived signed URLs
       (e.g. S3 signed URL / Cloudflare signed token), generated only
       after server-side membership verification — not via any
       client-visible "isMember" flag.

   For the prototype, membership state lives in localStorage purely
   to let you click through the simulated member experience. It has
   zero security value and is intentionally easy to toggle.
   ============================================ */

const DVAuth = (() => {
  const KEY = "dv_session_mock";

  function getSession() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function isSignedIn() {
    return !!getSession();
  }

  function isMember() {
    const s = getSession();
    if (!s || !s.membership) return false;
    if (s.membership.expiry && new Date(s.membership.expiry) < new Date()) return false;
    return s.membership.status === "active";
  }

  function signIn(email) {
    const session = {
      email: email || "member@example.com",
      name: "A. Vale",
      joined: "2026-03-14",
      membership: null,
    };
    localStorage.setItem(KEY, JSON.stringify(session));
    return session;
  }

  function signOut() {
    localStorage.removeItem(KEY);
  }

  function becomeMember() {
    let s = getSession();
    if (!s) s = signIn();
    const start = new Date();
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    s.membership = {
      status: "active",
      start: start.toISOString(),
      expiry: expiry.toISOString(),
      plan: "$99.99 / 1 Month",
      paymentId: "mock_pay_" + Math.random().toString(36).slice(2, 10),
    };
    localStorage.setItem(KEY, JSON.stringify(s));
    return s;
  }

  function cancelMembership() {
    const s = getSession();
    if (s && s.membership) {
      s.membership.status = "cancelled";
      localStorage.setItem(KEY, JSON.stringify(s));
    }
  }

  return { getSession, isSignedIn, isMember, signIn, signOut, becomeMember, cancelMembership };
})();

window.DVAuth = DVAuth;
