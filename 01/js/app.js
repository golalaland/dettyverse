/**
 * DETTYVERSE — Application Logic & Page Renderers
 * Creative direction: private, cinematic, nocturnal, luxurious, slightly dangerous.
 */

(function () {
  // ---------- Helpers ----------
  function toast(msg, duration = 2800) {
    const el = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    if (!el || !msgEl) return;
    msgEl.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.add('hidden'), duration);
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function lockIcon() {
    return `<svg class="lock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`;
  }

  function updateNavStatus() {
    const btn = document.getElementById('member-status-btn');
    const text = document.getElementById('member-status-text');
    const mobile = document.getElementById('mobile-member-status');
    if (!btn || !text) return;

    if (State.user.isAdmin) {
      text.textContent = 'Admin';
      btn.classList.remove('hidden');
      if (mobile) mobile.textContent = 'Admin · Full Access';
    } else if (State.user.isMember) {
      text.textContent = 'Member';
      btn.classList.remove('hidden');
      if (mobile) mobile.textContent = 'Member · Active';
    } else if (State.user.isAuthenticated) {
      text.textContent = State.user.name || 'Signed In';
      btn.classList.remove('hidden');
      if (mobile) mobile.textContent = 'Signed in · No membership';
    } else {
      text.textContent = 'Enter';
      btn.classList.remove('hidden');
      if (mobile) mobile.textContent = 'Visitor';
    }
  }

  // ---------- Auth Modal ----------
  function openAuth(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    const content = document.getElementById('auth-content');
    if (!modal || !content) return;

    if (mode === 'login') {
      content.innerHTML = `
        <p class="section-label mb-3">Access</p>
        <h2 class="editorial-title text-3xl md:text-4xl mb-2">Enter</h2>
        <p class="text-sm text-muted mb-8">Simulated authentication for the prototype.</p>
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-xs tracking-wide uppercase text-muted mb-2">Email</label>
            <input type="email" name="email" class="input-field" placeholder="you@domain.com" required value="member@dettyverse.local" />
          </div>
          <div class="flex flex-col gap-3 pt-2">
            <button type="submit" class="btn-primary w-full">Sign In as Member</button>
            <button type="button" id="login-visitor" class="btn-ghost w-full">Continue as Visitor</button>
            <button type="button" id="login-admin" class="btn-ghost w-full text-xs opacity-60">Sign In as Admin (demo)</button>
          </div>
        </form>
        <p class="text-xs text-muted/70 mt-8 leading-relaxed">In production this connects to your auth provider. Membership purchase would then activate protected media access.</p>
      `;
    } else if (mode === 'purchase') {
      content.innerHTML = `
        <p class="section-label mb-3">Membership</p>
        <h2 class="editorial-title text-3xl md:text-4xl mb-2">Private Access</h2>
        <p class="font-serif text-2xl text-ruby mb-1">$99.99 <span class="text-base text-muted font-sans tracking-wide">/ 1 MONTH</span></p>
        <p class="text-sm text-muted mb-8">Simulated purchase. No real payment is processed.</p>
        <ul class="space-y-2 text-sm text-soft/80 mb-8">
          ${DETTY.membership.perks.map(p => `<li class="flex gap-2"><span class="text-ruby">—</span> ${p}</li>`).join('')}
        </ul>
        <button id="confirm-purchase" class="btn-primary w-full">Activate Membership</button>
        <button id="auth-cancel" class="btn-ghost w-full mt-3">Cancel</button>
      `;
    }

    modal.classList.remove('hidden');

    // Bind
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.email.value || 'member@dettyverse.local';
        State.login(email, true, false);
        closeAuth();
        toast('Welcome back. Membership active.');
        updateNavStatus();
        Router.resolve();
      });
    }
    const visitorBtn = document.getElementById('login-visitor');
    if (visitorBtn) {
      visitorBtn.addEventListener('click', () => {
        State.login('visitor@dettyverse.local', false, false);
        closeAuth();
        toast('Signed in as visitor.');
        updateNavStatus();
        Router.resolve();
      });
    }
    const adminBtn = document.getElementById('login-admin');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        State.login('admin@dettyverse.local', true, true);
        closeAuth();
        toast('Admin session active.');
        updateNavStatus();
        Router.resolve();
      });
    }
    const purchaseBtn = document.getElementById('confirm-purchase');
    if (purchaseBtn) {
      purchaseBtn.addEventListener('click', () => {
        State.activateMembership();
        closeAuth();
        toast('Membership activated. Full archive unlocked.');
        updateNavStatus();
        Router.navigate('/dashboard');
      });
    }
    const cancelBtn = document.getElementById('auth-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeAuth);
  }

  function closeAuth() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ---------- Page: Home ----------
  function renderHome() {
    const featuredPhoto = DETTY.photography.find(p => !p.locked) || DETTY.photography[0];
    const featuredFilm = DETTY.films.find(f => !f.locked) || DETTY.films[0];
    const latestJournal = DETTY.journal.find(j => !j.locked) || DETTY.journal[0];

    return `
      <section class="relative min-h-[85vh] flex flex-col justify-end pb-16 md:pb-24">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent z-10"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/40 z-10"></div>
          <img src="${featuredPhoto.cover}" alt="" class="w-full h-full object-cover opacity-60" style="filter: brightness(0.55) contrast(1.1) saturate(0.9);" />
        </div>
        <div class="relative z-20 max-w-[1400px] mx-auto px-5 md:px-8 w-full">
          <div class="max-w-2xl">
            <p class="section-label mb-4">Private Cultural Universe</p>
            <h1 class="editorial-title text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.95] mb-6">
              The night<br/>has its own<br/><span class="italic text-ruby/90">archive</span>
            </h1>
            <p class="font-serif text-xl md:text-2xl text-soft/70 leading-relaxed mb-10 max-w-lg">
              Photography. Film. Journal. A selected public surface over a much larger private ledger.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#/membership" class="btn-primary">Membership — $99.99</a>
              <a href="#/archive" class="btn-ghost">Enter the Archive</a>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-[1400px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <div class="flex items-end justify-between mb-10">
          <div>
            <p class="section-label mb-2">Selected</p>
            <h2 class="editorial-title text-3xl md:text-4xl">From the Surface</h2>
          </div>
          <a href="#/archive" class="text-xs tracking-wide uppercase text-muted hover:text-ruby transition-colors hidden sm:block">Full Archive →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <a href="#/photo/${featuredPhoto.id}" class="group surface-hover">
            <div class="img-cinematic aspect-[3/4] mb-4">
              <img src="${featuredPhoto.cover}" alt="${featuredPhoto.title}" loading="lazy" />
              <div class="img-overlay"></div>
            </div>
            <p class="text-xs tracking-wide uppercase text-muted mb-1">${featuredPhoto.series} · ${featuredPhoto.year}</p>
            <h3 class="font-serif text-xl group-hover:text-ruby transition-colors">${featuredPhoto.title}</h3>
          </a>
          <a href="#/film/${featuredFilm.id}" class="group surface-hover">
            <div class="img-cinematic aspect-[3/4] mb-4">
              <img src="${featuredFilm.cover}" alt="${featuredFilm.title}" loading="lazy" />
              <div class="img-overlay"></div>
              <div class="absolute bottom-4 left-4 z-10">
                <span class="text-xs tracking-wide uppercase text-bone/80 bg-void/60 px-2 py-1">${featuredFilm.duration}</span>
              </div>
            </div>
            <p class="text-xs tracking-wide uppercase text-muted mb-1">Film · ${featuredFilm.year}</p>
            <h3 class="font-serif text-xl group-hover:text-ruby transition-colors">${featuredFilm.title}</h3>
          </a>
          <a href="#/journal/${latestJournal.id}" class="group surface-hover">
            <div class="surface p-6 md:p-8 aspect-[3/4] flex flex-col justify-between">
              <div>
                <p class="section-label mb-4">Journal</p>
                <h3 class="font-serif text-2xl md:text-3xl leading-snug group-hover:text-ruby transition-colors">${latestJournal.title}</h3>
              </div>
              <div>
                <p class="text-soft/70 text-sm leading-relaxed line-clamp-3 mb-4">${latestJournal.excerpt}</p>
                <p class="text-xs text-muted">${formatDate(latestJournal.date)}</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section class="border-y border-ash/40 bg-charcoal/40">
        <div class="max-w-[1400px] mx-auto px-5 md:px-8 py-16 md:py-20">
          <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p class="section-label mb-4">Membership</p>
              <h2 class="editorial-title text-4xl md:text-5xl mb-6">The door is not locked<br/>for everyone.</h2>
              <p class="font-serif text-lg text-soft/70 leading-relaxed mb-8">
                Public material is the invitation. Membership is the key to the larger private archive — unreleased sets, full film cuts, extended notes, and seasonal drops.
              </p>
              <a href="#/membership" class="btn-primary">View Membership — $99.99 / month</a>
            </div>
            <div class="space-y-4">
              ${DETTY.membership.perks.slice(0, 4).map(p => `
                <div class="flex gap-4 items-start border-b border-ash/40 pb-4">
                  <span class="text-ruby mt-1">—</span>
                  <p class="text-sm text-soft/80">${p}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-[1400px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <p class="section-label mb-4">Creator</p>
        <h2 class="editorial-title text-3xl md:text-4xl mb-6 max-w-xl">${DETTY.creator.bio}</h2>
        <a href="#/about" class="text-xs tracking-wide uppercase text-muted hover:text-ruby transition-colors">About the work →</a>
      </section>
    `;
  }

  // ---------- Page: Archive ----------
  function renderArchive() {
    const items = DETTY.archiveItems;
    return `
      <section class="max-w-[1400px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="mb-12 md:mb-16">
          <p class="section-label mb-3">Index</p>
          <h1 class="editorial-title text-5xl md:text-6xl mb-4">Archive</h1>
          <p class="font-serif text-xl text-soft/60 max-w-lg">Everything currently on the public surface, and the locked material that sits behind it.</p>
        </div>

        <div class="flex flex-wrap gap-3 mb-10">
          <button class="filter-btn active px-3 py-1.5 text-xs tracking-wide uppercase border border-ash text-soft" data-filter="all">All</button>
          <button class="filter-btn px-3 py-1.5 text-xs tracking-wide uppercase border border-ash/50 text-muted hover:text-soft" data-filter="photo">Photography</button>
          <button class="filter-btn px-3 py-1.5 text-xs tracking-wide uppercase border border-ash/50 text-muted hover:text-soft" data-filter="film">Film</button>
          <button class="filter-btn px-3 py-1.5 text-xs tracking-wide uppercase border border-ash/50 text-muted hover:text-soft" data-filter="journal">Journal</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="archive-grid">
          ${items.map(item => {
            const locked = item.locked && !State.canAccess({ locked: true });
            let href = '#/';
            if (item.type === 'photo') href = `#/photo/${item.ref}`;
            if (item.type === 'film') href = `#/film/${item.ref}`;
            if (item.type === 'journal') href = `#/journal/${item.ref}`;
            return `
              <a href="${locked ? '#/membership' : href}" class="group surface surface-hover p-5 flex flex-col justify-between min-h-[140px]" data-type="${item.type}">
                <div class="flex justify-between items-start">
                  <span class="text-xs tracking-wide uppercase text-muted">${item.type}</span>
                  ${item.locked ? `<span class="private-tag">Private</span>` : ''}
                </div>
                <div class="mt-6">
                  <h3 class="font-serif text-xl group-hover:text-ruby transition-colors ${locked ? 'opacity-70' : ''}">${item.title}</h3>
                  <p class="text-xs text-muted mt-1">${item.year}</p>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // ---------- Page: Photography ----------
  function renderPhotography() {
    return `
      <section class="max-w-[1400px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="mb-12 md:mb-16">
          <p class="section-label mb-3">Still Image</p>
          <h1 class="editorial-title text-5xl md:text-6xl mb-4">Photography</h1>
          <p class="font-serif text-xl text-soft/60 max-w-lg">Selected series. Some frames remain behind the membership door.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          ${DETTY.photography.map(p => {
            const locked = p.locked && !State.canAccess(p);
            return `
              <a href="${locked ? '#/membership' : `#/photo/${p.id}`}" class="group">
                <div class="img-cinematic aspect-[4/5] mb-4 relative">
                  <img src="${p.cover}" alt="${p.title}" loading="lazy" />
                  <div class="img-overlay"></div>
                  ${locked ? `
                    <div class="locked-overlay">
                      ${lockIcon()}
                      <span class="text-xs tracking-wide uppercase text-bone/80">Members Only</span>
                    </div>
                  ` : ''}
                </div>
                <div class="flex justify-between items-baseline">
                  <div>
                    <p class="text-xs tracking-wide uppercase text-muted mb-1">${p.series} · ${p.year}</p>
                    <h3 class="font-serif text-2xl group-hover:text-ruby transition-colors">${p.title}</h3>
                  </div>
                  ${p.locked ? `<span class="private-tag">Private</span>` : ''}
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // ---------- Page: Film ----------
  function renderFilm() {
    return `
      <section class="max-w-[1400px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="mb-12 md:mb-16">
          <p class="section-label mb-3">Moving Image</p>
          <h1 class="editorial-title text-5xl md:text-6xl mb-4">Film</h1>
          <p class="font-serif text-xl text-soft/60 max-w-lg">Short works and longer cuts. The private reel updates seasonally.</p>
        </div>
        <div class="space-y-16 md:space-y-24">
          ${DETTY.films.map(f => {
            const locked = f.locked && !State.canAccess(f);
            return `
              <article class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <a href="${locked ? '#/membership' : `#/film/${f.id}`}" class="group block">
                  <div class="film-still relative">
                    <img src="${f.cover}" alt="${f.title}" class="w-full h-full object-cover" style="filter: brightness(0.75) contrast(1.05);" loading="lazy" />
                    ${locked ? `
                      <div class="locked-overlay">
                        ${lockIcon()}
                        <span class="text-xs tracking-wide uppercase text-bone/80">Members Only</span>
                      </div>
                    ` : `
                      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-void/40">
                        <span class="w-16 h-16 border border-bone/40 rounded-full flex items-center justify-center">
                          <svg class="w-6 h-6 text-bone ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </span>
                      </div>
                    `}
                  </div>
                </a>
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-xs tracking-wide uppercase text-muted">${f.type} · ${f.year}</span>
                    ${f.locked ? `<span class="private-tag">Private</span>` : ''}
                  </div>
                  <h2 class="editorial-title text-3xl md:text-4xl mb-3">${f.title}</h2>
                  <p class="text-sm text-muted mb-4">${f.duration}</p>
                  <p class="font-serif text-lg text-soft/70 leading-relaxed mb-6">${f.excerpt}</p>
                  <a href="${locked ? '#/membership' : `#/film/${f.id}`}" class="text-xs tracking-wide uppercase text-ruby hover:underline">
                    ${locked ? 'Unlock with Membership' : 'View Work'} →
                  </a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // ---------- Page: Journal ----------
  function renderJournal() {
    return `
      <section class="max-w-[900px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="mb-12 md:mb-16">
          <p class="section-label mb-3">Writing</p>
          <h1 class="editorial-title text-5xl md:text-6xl mb-4">Journal</h1>
          <p class="font-serif text-xl text-soft/60 max-w-lg">Notes, process, and the occasional private letter.</p>
        </div>
        <div class="space-y-0 divide-y divide-ash/40">
          ${DETTY.journal.map(j => {
            const locked = j.locked && !State.canAccess(j);
            return `
              <a href="${locked ? '#/membership' : `#/journal/${j.id}`}" class="block py-10 group">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <time class="text-xs tracking-wide uppercase text-muted">${formatDate(j.date)}</time>
                  ${j.locked ? `<span class="private-tag">Private</span>` : ''}
                </div>
                <h2 class="editorial-title text-2xl md:text-3xl mb-3 group-hover:text-ruby transition-colors">${j.title}</h2>
                <p class="font-serif text-lg text-soft/65 leading-relaxed ${locked ? 'opacity-60' : ''}">${j.excerpt}</p>
                ${locked ? `<p class="text-xs text-ruby mt-4 tracking-wide uppercase">Members only</p>` : ''}
              </a>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // ---------- Content Detail: Photo ----------
  function renderPhotoDetail(params) {
    const p = DETTY.photography.find(x => x.id === params.id);
    if (!p) return `<div class="p-20 text-center"><p class="text-muted">Not found.</p><a href="#/photography" class="text-ruby text-sm mt-4 inline-block">← Photography</a></div>`;
    const locked = p.locked && !State.canAccess(p);
    if (locked) {
      return renderLocked('Photography', p.title, p.excerpt);
    }
    return `
      <section class="max-w-[1400px] mx-auto px-5 md:px-8 py-10 md:py-14">
        <a href="#/photography" class="text-xs tracking-wide uppercase text-muted hover:text-ruby mb-8 inline-block">← Photography</a>
        <div class="mb-10">
          <p class="section-label mb-2">${p.series} · ${p.year} · ${p.location}</p>
          <h1 class="editorial-title text-4xl md:text-6xl mb-4">${p.title}</h1>
          <p class="font-serif text-xl text-soft/70 max-w-2xl">${p.excerpt}</p>
        </div>
        <div class="space-y-6 md:space-y-8">
          ${(p.images.length ? p.images : [p.cover]).map(src => `
            <div class="img-cinematic w-full max-h-[85vh]">
              <img src="${src}" alt="${p.title}" class="w-full h-auto object-contain max-h-[85vh]" loading="lazy" />
            </div>
          `).join('')}
        </div>
        <div class="mt-12 max-w-2xl">
          <p class="prose-editorial">${p.body}</p>
        </div>
      </section>
    `;
  }

  // ---------- Content Detail: Film ----------
  function renderFilmDetail(params) {
    const f = DETTY.films.find(x => x.id === params.id);
    if (!f) return `<div class="p-20 text-center"><p class="text-muted">Not found.</p></div>`;
    const locked = f.locked && !State.canAccess(f);
    if (locked) {
      return renderLocked('Film', f.title, f.excerpt);
    }
    return `
      <section class="max-w-[1200px] mx-auto px-5 md:px-8 py-10 md:py-14">
        <a href="#/film" class="text-xs tracking-wide uppercase text-muted hover:text-ruby mb-8 inline-block">← Film</a>
        <div class="mb-10">
          <p class="section-label mb-2">${f.type} · ${f.year} · ${f.duration}</p>
          <h1 class="editorial-title text-4xl md:text-6xl mb-4">${f.title}</h1>
          <p class="font-serif text-xl text-soft/70 max-w-2xl">${f.excerpt}</p>
        </div>
        <div class="film-still mb-10 bg-smoke flex items-center justify-center min-h-[40vh]">
          <div class="text-center p-8">
            <div class="w-20 h-20 border border-bone/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-bone/70 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p class="text-sm text-muted tracking-wide uppercase">Playback simulated</p>
            <p class="text-xs text-muted/60 mt-2">In production this embeds protected video from your media store.</p>
          </div>
        </div>
        ${f.stills && f.stills.length ? `
          <div class="grid grid-cols-2 gap-4 mb-10">
            ${f.stills.map(s => `<div class="img-cinematic aspect-video"><img src="${s}" alt="" loading="lazy" /></div>`).join('')}
          </div>
        ` : ''}
        <div class="max-w-2xl">
          <p class="prose-editorial">${f.body}</p>
        </div>
      </section>
    `;
  }

  // ---------- Content Detail: Journal ----------
  function renderJournalDetail(params) {
    const j = DETTY.journal.find(x => x.id === params.id);
    if (!j) return `<div class="p-20 text-center"><p class="text-muted">Not found.</p></div>`;
    const locked = j.locked && !State.canAccess(j);
    if (locked) {
      return renderLocked('Journal', j.title, j.excerpt);
    }
    return `
      <article class="max-w-[720px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <a href="#/journal" class="text-xs tracking-wide uppercase text-muted hover:text-ruby mb-10 inline-block">← Journal</a>
        <header class="mb-12">
          <time class="text-xs tracking-wide uppercase text-muted block mb-4">${formatDate(j.date)}</time>
          <h1 class="editorial-title text-4xl md:text-5xl mb-6">${j.title}</h1>
          ${j.tags ? `<div class="flex gap-2">${j.tags.map(t => `<span class="text-xs text-muted tracking-wide">#${t}</span>`).join('')}</div>` : ''}
        </header>
        <div class="prose-editorial whitespace-pre-line">${j.body}</div>
      </article>
    `;
  }

  // ---------- Locked Content ----------
  function renderLocked(type, title, excerpt) {
    return `
      <section class="min-h-[70vh] flex items-center justify-center px-5">
        <div class="max-w-md text-center">
          <div class="mb-8 flex justify-center opacity-60">${lockIcon()}</div>
          <p class="section-label mb-3">${type} · Private</p>
          <h1 class="editorial-title text-3xl md:text-4xl mb-4">${title}</h1>
          <p class="font-serif text-lg text-soft/60 mb-10">${excerpt || 'This material lives behind membership.'}</p>
          <a href="#/membership" class="btn-primary">Unlock with Membership — $99.99</a>
          <p class="text-xs text-muted mt-6">Already a member? <button onclick="document.getElementById('member-status-btn').click()" class="text-ruby underline">Sign in</button></p>
        </div>
      </section>
    `;
  }

  // ---------- Membership ----------
  function renderMembership() {
    const isMember = State.user.isMember;
    return `
      <section class="max-w-[1000px] mx-auto px-5 md:px-8 py-14 md:py-20">
        <div class="text-center mb-14">
          <p class="section-label mb-3">Access</p>
          <h1 class="editorial-title text-5xl md:text-6xl mb-4">Membership</h1>
          <p class="font-serif text-xl text-soft/60 max-w-md mx-auto">Not a subscription in the usual sense. A key to the larger private archive.</p>
        </div>

        <div class="surface p-8 md:p-12 max-w-lg mx-auto text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ruby to-transparent opacity-60"></div>
          <p class="text-xs tracking-wide uppercase text-muted mb-2">Private Access</p>
          <p class="font-serif text-5xl md:text-6xl text-bone mb-1">$99.99</p>
          <p class="text-sm tracking-wide uppercase text-muted mb-8">per month</p>
          
          ${isMember ? `
            <div class="member-badge mx-auto mb-6">Active Member</div>
            <p class="text-sm text-soft/70 mb-6">You already hold the key. Expires ${State.user.expiresAt ? formatDate(State.user.expiresAt) : '—'}.</p>
            <a href="#/dashboard" class="btn-primary w-full">Go to Member Dashboard</a>
          ` : `
            <ul class="text-left space-y-3 mb-10">
              ${DETTY.membership.perks.map(p => `
                <li class="flex gap-3 text-sm text-soft/80">
                  <span class="text-ruby shrink-0">—</span>
                  <span>${p}</span>
                </li>
              `).join('')}
            </ul>
            <button id="start-membership" class="btn-primary w-full">Activate Membership</button>
            <p class="text-xs text-muted/70 mt-6">Simulated purchase for prototype. No real charge.</p>
          `}
        </div>

        <div class="mt-20 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <p class="text-xs tracking-wide uppercase text-muted mb-3">What you receive</p>
            <p class="font-serif text-lg text-soft/70">The complete current archive, including everything marked private, plus ongoing drops.</p>
          </div>
          <div>
            <p class="text-xs tracking-wide uppercase text-muted mb-3">How it works</p>
            <p class="font-serif text-lg text-soft/70">Monthly access. Cancel anytime. Content remains available for the paid period.</p>
          </div>
          <div>
            <p class="text-xs tracking-wide uppercase text-muted mb-3">Integration ready</p>
            <p class="font-serif text-lg text-soft/70">This flow is designed to connect to Stripe (or similar) and your auth provider.</p>
          </div>
        </div>
      </section>
    `;
  }

  // ---------- Member Dashboard ----------
  function renderDashboard() {
    if (!State.user.isAuthenticated) {
      return `
        <section class="min-h-[60vh] flex items-center justify-center px-5">
          <div class="text-center max-w-md">
            <p class="section-label mb-3">Member Area</p>
            <h1 class="editorial-title text-3xl mb-4">Sign in required</h1>
            <p class="text-soft/60 mb-8">Enter to access your dashboard and private material.</p>
            <button id="dash-login" class="btn-primary">Sign In</button>
          </div>
        </section>
      `;
    }

    const privatePhotos = DETTY.photography.filter(p => p.locked);
    const privateFilms = DETTY.films.filter(f => f.locked);
    const privateJournal = DETTY.journal.filter(j => j.locked);

    return `
      <section class="max-w-[1100px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p class="section-label mb-2">Member Area</p>
            <h1 class="editorial-title text-4xl md:text-5xl">Welcome${State.user.name ? ', ' + State.user.name : ''}</h1>
          </div>
          <div class="text-right">
            ${State.user.isMember ? `
              <div class="member-badge mb-2">Active</div>
              <p class="text-xs text-muted">Since ${formatDate(State.user.memberSince)} · Expires ${formatDate(State.user.expiresAt)}</p>
            ` : `
              <p class="text-sm text-muted mb-2">No active membership</p>
              <a href="#/membership" class="text-xs text-ruby tracking-wide uppercase">Upgrade →</a>
            `}
          </div>
        </div>

        ${State.user.isMember || State.user.isAdmin ? `
          <div class="grid md:grid-cols-3 gap-6 mb-14">
            <div class="surface p-6">
              <p class="text-xs tracking-wide uppercase text-muted mb-2">Private Photography</p>
              <p class="font-serif text-3xl">${privatePhotos.length}</p>
              <a href="#/photography" class="text-xs text-ruby mt-3 inline-block">View →</a>
            </div>
            <div class="surface p-6">
              <p class="text-xs tracking-wide uppercase text-muted mb-2">Private Films</p>
              <p class="font-serif text-3xl">${privateFilms.length}</p>
              <a href="#/film" class="text-xs text-ruby mt-3 inline-block">View →</a>
            </div>
            <div class="surface p-6">
              <p class="text-xs tracking-wide uppercase text-muted mb-2">Private Journal</p>
              <p class="font-serif text-3xl">${privateJournal.length}</p>
              <a href="#/journal" class="text-xs text-ruby mt-3 inline-block">View →</a>
            </div>
          </div>

          <h2 class="editorial-title text-2xl mb-6">Recently unlocked</h2>
          <div class="grid sm:grid-cols-2 gap-5">
            ${[...privatePhotos.slice(0,2), ...privateFilms.slice(0,1)].map(item => {
              const isFilm = item.duration !== undefined;
              const href = isFilm ? `#/film/${item.id}` : `#/photo/${item.id}`;
              return `
                <a href="${href}" class="surface surface-hover p-5 flex gap-4 items-center">
                  <div class="w-20 h-20 shrink-0 img-cinematic">
                    <img src="${item.cover}" alt="" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="text-xs text-muted uppercase tracking-wide mb-1">${isFilm ? 'Film' : 'Photo'}</p>
                    <h3 class="font-serif text-lg">${item.title}</h3>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="surface p-10 text-center">
            <p class="font-serif text-xl text-soft/70 mb-6">Your account is active, but membership is required for the private archive.</p>
            <a href="#/membership" class="btn-primary">Activate Membership — $99.99</a>
          </div>
        `}

        <div class="mt-14 pt-10 border-t border-ash/40">
          <button id="logout-btn" class="text-xs tracking-wide uppercase text-muted hover:text-ruby">Sign Out</button>
        </div>
      </section>
    `;
  }

  // ---------- About / Creator ----------
  function renderAbout() {
    return `
      <section class="max-w-[900px] mx-auto px-5 md:px-8 py-14 md:py-20">
        <p class="section-label mb-4">Creator</p>
        <h1 class="editorial-title text-5xl md:text-6xl mb-6">${DETTY.creator.name}</h1>
        <p class="text-sm tracking-wide uppercase text-muted mb-10">${DETTY.creator.title} · ${DETTY.creator.location}</p>
        
        <div class="prose-editorial mb-12 whitespace-pre-line">${DETTY.creator.longBio}</div>
        
        <div class="border-t border-ash/40 pt-10">
          <p class="text-xs tracking-wide uppercase text-muted mb-3">Contact</p>
          <p class="font-serif text-xl text-soft/80">${DETTY.creator.email}</p>
          <p class="text-sm text-muted mt-2">For membership and private inquiries.</p>
        </div>
      </section>
    `;
  }

  // ---------- Digital Store ----------
  function renderStore() {
    return `
      <section class="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="mb-12 md:mb-16">
          <p class="section-label mb-3">Objects</p>
          <h1 class="editorial-title text-5xl md:text-6xl mb-4">Store</h1>
          <p class="font-serif text-xl text-soft/60 max-w-lg">Selected digital and physical editions. Members receive preferential pricing.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          ${DETTY.store.map(item => {
            const locked = item.locked && !State.canAccess(item);
            const price = State.user.isMember && item.memberPrice !== undefined ? item.memberPrice : item.price;
            const isFree = price === 0;
            return `
              <div class="product-card overflow-hidden">
                <div class="img-cinematic aspect-[16/10] relative">
                  <img src="${item.cover}" alt="${item.title}" loading="lazy" />
                  ${locked ? `<div class="locked-overlay"><span class="text-xs tracking-wide uppercase">Members</span></div>` : ''}
                </div>
                <div class="p-6">
                  <div class="flex justify-between items-start mb-2">
                    <span class="text-xs tracking-wide uppercase text-muted">${item.type}</span>
                    ${item.locked ? `<span class="private-tag">Private</span>` : ''}
                  </div>
                  <h3 class="font-serif text-2xl mb-2">${item.title}</h3>
                  <p class="text-sm text-soft/65 mb-5 leading-relaxed">${item.description}</p>
                  <div class="flex items-center justify-between">
                    <p class="font-serif text-xl">
                      ${isFree ? 'Included' : `$${price}`}
                      ${State.user.isMember && item.memberPrice < item.price && !isFree ? `<span class="text-sm text-muted line-through ml-2">$${item.price}</span>` : ''}
                    </p>
                    ${locked ? `
                      <a href="#/membership" class="btn-outline-ruby text-xs">Unlock</a>
                    ` : `
                      <button class="btn-outline-ruby text-xs store-buy" data-id="${item.id}">${isFree ? 'Access' : 'Acquire'}</button>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <p class="text-xs text-muted mt-12 text-center">Store purchases are simulated. In production this connects to your payment and delivery system.</p>
      </section>
    `;
  }

  // ---------- Admin Dashboard ----------
  function renderAdmin() {
    if (!State.user.isAdmin) {
      return `
        <section class="min-h-[60vh] flex items-center justify-center px-5">
          <div class="text-center max-w-md">
            <p class="section-label mb-3">Admin</p>
            <h1 class="editorial-title text-3xl mb-4">Restricted</h1>
            <p class="text-soft/60 mb-8">Admin access required. Use the demo admin login from the Enter menu.</p>
            <button id="admin-login-prompt" class="btn-primary">Sign In as Admin</button>
          </div>
        </section>
      `;
    }

    return `
      <section class="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="mb-12">
          <p class="section-label mb-2">System</p>
          <h1 class="editorial-title text-4xl md:text-5xl">Admin Dashboard</h1>
          <p class="text-sm text-muted mt-2">Prototype control surface. Integration points for CMS, analytics, and media management.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div class="admin-stat">
            <p class="text-xs tracking-wide uppercase text-muted mb-1">Photography</p>
            <p class="font-serif text-3xl">${DETTY.photography.length}</p>
            <p class="text-xs text-muted mt-1">${DETTY.photography.filter(p=>p.locked).length} private</p>
          </div>
          <div class="admin-stat">
            <p class="text-xs tracking-wide uppercase text-muted mb-1">Films</p>
            <p class="font-serif text-3xl">${DETTY.films.length}</p>
            <p class="text-xs text-muted mt-1">${DETTY.films.filter(f=>f.locked).length} private</p>
          </div>
          <div class="admin-stat">
            <p class="text-xs tracking-wide uppercase text-muted mb-1">Journal</p>
            <p class="font-serif text-3xl">${DETTY.journal.length}</p>
            <p class="text-xs text-muted mt-1">${DETTY.journal.filter(j=>j.locked).length} private</p>
          </div>
          <div class="admin-stat">
            <p class="text-xs tracking-wide uppercase text-muted mb-1">Store Items</p>
            <p class="font-serif text-3xl">${DETTY.store.length}</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-10">
          <div>
            <h2 class="text-xs tracking-wide uppercase text-muted mb-4">Content Overview</h2>
            <div class="surface divide-y divide-ash/40">
              ${DETTY.archiveItems.slice(0, 8).map(item => `
                <div class="px-5 py-3 flex justify-between items-center text-sm">
                  <span class="text-soft/80">${item.title}</span>
                  <span class="text-xs text-muted uppercase">${item.type}${item.locked ? ' · private' : ''}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <h2 class="text-xs tracking-wide uppercase text-muted mb-4">Integration Points</h2>
            <div class="space-y-4 text-sm text-soft/70">
              <div class="surface p-5">
                <p class="text-xs text-ruby tracking-wide uppercase mb-2">Auth</p>
                <p>Replace State.login / logout with your provider (Clerk, Auth0, Supabase, custom JWT).</p>
              </div>
              <div class="surface p-5">
                <p class="text-xs text-ruby tracking-wide uppercase mb-2">Payments</p>
                <p>Membership & store flows ready for Stripe Checkout / Customer Portal.</p>
              </div>
              <div class="surface p-5">
                <p class="text-xs text-ruby tracking-wide uppercase mb-2">Media</p>
                <p>Protected images & video should move to signed URLs from your storage (S3, R2, Mux, etc.).</p>
              </div>
              <div class="surface p-5">
                <p class="text-xs text-ruby tracking-wide uppercase mb-2">CMS</p>
                <p>DETTY data object is the shape. Swap for headless CMS or database later.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-ash/40">
          <button id="admin-logout" class="text-xs tracking-wide uppercase text-muted hover:text-ruby">End Admin Session</button>
        </div>
      </section>
    `;
  }

  // ---------- Bind global UI ----------
  function bindGlobal() {
    // Mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-close');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => menu.classList.remove('translate-x-full'));
    }
    if (closeBtn && menu) {
      closeBtn.addEventListener('click', () => menu.classList.add('translate-x-full'));
    }

    // Member status / Enter
    const statusBtn = document.getElementById('member-status-btn');
    if (statusBtn) {
      statusBtn.addEventListener('click', () => {
        if (State.user.isAuthenticated) {
          if (confirm('Sign out?')) {
            State.logout();
            updateNavStatus();
            toast('Signed out.');
            Router.resolve();
          }
        } else {
          openAuth('login');
        }
      });
    }

    // Auth modal close
    const authClose = document.getElementById('auth-close');
    const authBackdrop = document.getElementById('auth-backdrop');
    if (authClose) authClose.addEventListener('click', closeAuth);
    if (authBackdrop) authBackdrop.addEventListener('click', closeAuth);

    // Nav scroll effect
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
    });

    // Delegate for dynamic buttons after render
    document.addEventListener('click', (e) => {
      if (e.target.id === 'start-membership' || e.target.closest('#start-membership')) {
        openAuth('purchase');
      }
      if (e.target.id === 'dash-login' || e.target.id === 'admin-login-prompt') {
        openAuth('login');
      }
      if (e.target.id === 'logout-btn' || e.target.id === 'admin-logout') {
        State.logout();
        updateNavStatus();
        toast('Signed out.');
        Router.navigate('/');
      }
      if (e.target.classList.contains('store-buy')) {
        toast('Purchase simulated. In production this would process payment and deliver the asset.');
      }
      // Archive filters
      if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active', 'border-ash', 'text-soft');
          b.classList.add('border-ash/50', 'text-muted');
        });
        e.target.classList.add('active', 'border-ash', 'text-soft');
        e.target.classList.remove('border-ash/50', 'text-muted');
        const filter = e.target.dataset.filter;
        document.querySelectorAll('#archive-grid [data-type]').forEach(card => {
          if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });

    State.subscribe(() => updateNavStatus());
    updateNavStatus();
  }

  // ---------- Register Routes ----------
  Router.register('/', renderHome);
  Router.register('/archive', renderArchive);
  Router.register('/photography', renderPhotography);
  Router.register('/film', renderFilm);
  Router.register('/journal', renderJournal);
  Router.register('/membership', renderMembership);
  Router.register('/dashboard', renderDashboard);
  Router.register('/about', renderAbout);
  Router.register('/store', renderStore);
  Router.register('/admin', renderAdmin);
  Router.register('/photo/:id', renderPhotoDetail);
  Router.register('/film/:id', renderFilmDetail);
  Router.register('/journal/:id', renderJournalDetail);

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    bindGlobal();
    Router.init();
  });
})();
