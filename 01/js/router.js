/**
 * DETTYVERSE — Lightweight Client Router
 */

const Router = {
  routes: {},
  current: null,

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    if (path.startsWith('#')) path = path.slice(1);
    if (!path.startsWith('/')) path = '/' + path;
    window.location.hash = path;
  },

  resolve() {
    let hash = window.location.hash.slice(1) || '/';
    if (!hash.startsWith('/')) hash = '/' + hash;

    // Match exact or parameterized
    let handler = this.routes[hash];
    let params = {};

    if (!handler) {
      // Try dynamic routes: /content/:type/:id
      const parts = hash.split('/').filter(Boolean);
      if (parts[0] === 'content' && parts.length >= 3) {
        handler = this.routes['/content/:type/:id'];
        params = { type: parts[1], id: parts[2] };
      } else if (parts[0] === 'photo' && parts[1]) {
        handler = this.routes['/photo/:id'];
        params = { id: parts[1] };
      } else if (parts[0] === 'film' && parts[1]) {
        handler = this.routes['/film/:id'];
        params = { id: parts[1] };
      } else if (parts[0] === 'journal' && parts[1]) {
        handler = this.routes['/journal/:id'];
        params = { id: parts[1] };
      }
    }

    if (!handler) {
      handler = this.routes['/'] || (() => '<p>Not found</p>');
    }

    this.current = hash;
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '';
      const content = handler(params);
      if (typeof content === 'string') {
        app.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        app.appendChild(content);
      }
      app.classList.remove('page-enter');
      void app.offsetWidth;
      app.classList.add('page-enter');
    }

    // Update active nav
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.classList.remove('active');
      const nav = el.getAttribute('data-nav');
      if (hash === '/' && nav === 'home') el.classList.add('active');
      else if (hash.startsWith('/' + nav)) el.classList.add('active');
    });

    // Close mobile menu
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.add('translate-x-full');

    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  init() {
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
    // Initial
    this.resolve();
  }
};
