/**
 * DETTYVERSE — Client State & Simulated Auth
 * Clean integration points for real auth / payments later.
 */

const State = {
  // Simulated member status
  // In production: replace with JWT / session from auth provider
  user: {
    isAuthenticated: false,
    isMember: false,
    isAdmin: false,
    name: null,
    email: null,
    memberSince: null,
    expiresAt: null
  },

  // Simple local persistence for prototype
  load() {
    try {
      const raw = localStorage.getItem('dettyverse_state');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.user = { ...this.user, ...parsed.user };
      }
    } catch (e) {}
  },

  save() {
    try {
      localStorage.setItem('dettyverse_state', JSON.stringify({ user: this.user }));
    } catch (e) {}
  },

  // Simulated login (email only for prototype)
  login(email, asMember = false, asAdmin = false) {
    this.user.isAuthenticated = true;
    this.user.email = email;
    this.user.name = email.split('@')[0];
    this.user.isMember = asMember;
    this.user.isAdmin = asAdmin;
    if (asMember) {
      this.user.memberSince = new Date().toISOString().slice(0, 10);
      const exp = new Date();
      exp.setMonth(exp.getMonth() + 1);
      this.user.expiresAt = exp.toISOString().slice(0, 10);
    }
    this.save();
    this.notify();
    return true;
  },

  logout() {
    this.user = {
      isAuthenticated: false,
      isMember: false,
      isAdmin: false,
      name: null,
      email: null,
      memberSince: null,
      expiresAt: null
    };
    this.save();
    this.notify();
  },

  // Simulate successful membership purchase
  activateMembership() {
    if (!this.user.isAuthenticated) {
      this.login('member@dettyverse.local', true, false);
    } else {
      this.user.isMember = true;
      this.user.memberSince = new Date().toISOString().slice(0, 10);
      const exp = new Date();
      exp.setMonth(exp.getMonth() + 1);
      this.user.expiresAt = exp.toISOString().slice(0, 10);
      this.save();
      this.notify();
    }
  },

  // Listeners for UI updates
  listeners: [],
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },
  notify() {
    this.listeners.forEach(fn => fn(this.user));
  },

  // Access helpers
  canAccess(item) {
    if (!item.locked) return true;
    return this.user.isMember || this.user.isAdmin;
  },

  canAdmin() {
    return this.user.isAdmin;
  }
};

// Initialize
State.load();
