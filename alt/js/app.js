/* ============================================
   DETTYVERSE — SHARED APP UTILITIES
   Toast, lightbox, and media-card rendering used across pages.
   ============================================ */

const DVApp = (() => {
  /* ---------- TOAST ---------- */
  function toast(message, duration = 2600) {
    let el = document.getElementById("dvToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "dvToast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-visible"), duration);
  }

  /* ---------- BADGE HELPERS ---------- */
  function visibilityBadge(item) {
    if (item.visibility === "members") {
      return `<span class="badge badge--members">Members</span>`;
    }
    return `<span class="badge">Public</span>`;
  }

  /* ---------- MEDIA CARD (photo) ---------- */
  function photoCardHtml(photo, opts = {}) {
    const locked = photo.visibility === "members" && !DVAuth.isMember();
    const aspect =
      photo.ratio === "portrait" ? "aspect-ratio:3/4;" :
      photo.ratio === "square" ? "aspect-ratio:1/1;" :
      "aspect-ratio:4/3;";
    return `
      <a class="media-card ${locked ? "media-card--locked" : ""}" style="${aspect}"
         href="${locked ? "membership.html" : `content.html?type=photo&id=${photo.id}`}"
         data-id="${photo.id}">
        <div class="media-card__badge-row">
          ${visibilityBadge(photo)}
        </div>
        <div class="media-card__img-wrap">
          <img src="${photo.img}" alt="${locked ? "Private archive image" : photo.title}" loading="lazy" />
        </div>
        ${
          locked
            ? `<div class="media-card__lock">
                 <svg class="media-card__lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                 <span class="media-card__lock-text">Members Only</span>
               </div>`
            : `<div class="media-card__overlay">
                 <div class="media-card__meta">
                   <div class="media-card__title">${photo.title}</div>
                   <div class="media-card__sub">${photo.category} · ${photo.date}</div>
                 </div>
               </div>`
        }
      </a>
    `;
  }

  /* ---------- FILM CARD ---------- */
  function filmCardHtml(film) {
    const locked = film.visibility === "members" && !DVAuth.isMember();
    return `
      <a class="media-card ${locked ? "media-card--locked" : ""}" style="aspect-ratio:16/9;"
         href="${locked ? "membership.html" : `content.html?type=film&id=${film.id}`}">
        <div class="media-card__badge-row">${visibilityBadge(film)}</div>
        <div class="media-card__img-wrap">
          <img src="${film.thumb}" alt="${locked ? "Private film" : film.title}" loading="lazy" />
        </div>
        ${
          locked
            ? `<div class="media-card__lock">
                 <svg class="media-card__lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                 <span class="media-card__lock-text">Members Only</span>
               </div>`
            : `<div class="media-card__overlay">
                 <div class="media-card__meta">
                   <div class="media-card__title">${film.title}</div>
                   <div class="media-card__sub">${film.category} · ${film.duration}</div>
                 </div>
               </div>`
        }
      </a>
    `;
  }

  /* ---------- STORY CARD ---------- */
  function storyCardHtml(story, opts = {}) {
    const locked = story.visibility === "members" && !DVAuth.isMember();
    return `
      <a class="story-card ${locked ? "story-card--locked" : ""}" href="${locked ? "membership.html" : `content.html?type=story&id=${story.id}`}">
        <div class="story-card__img-wrap">
          <img src="${story.cover}" alt="${story.title}" loading="lazy" />
          ${locked ? `<div class="story-card__lock-badge">Members Only</div>` : ""}
        </div>
        <div class="story-card__body">
          <div class="meta-label">${story.category} · ${story.date}</div>
          <h3 class="story-card__title">${story.title}</h3>
          <p class="story-card__excerpt">${story.excerpt}</p>
        </div>
      </a>
    `;
  }

  /* ---------- LIGHTBOX (for archive grid) ---------- */
  let lightboxItems = [];
  let lightboxIndex = 0;

  function ensureLightbox() {
    let el = document.getElementById("dvLightbox");
    if (el) return el;
    el = document.createElement("div");
    el.className = "lightbox";
    el.id = "dvLightbox";
    el.innerHTML = `
      <button class="lightbox__close" aria-label="Close">✕</button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">‹</button>
      <img class="lightbox__img" src="" alt="" />
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next">›</button>
      <div class="lightbox__caption">
        <div class="lightbox__caption-title"></div>
        <div class="lightbox__caption-meta"></div>
      </div>
    `;
    document.body.appendChild(el);
    el.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    el.addEventListener("click", (e) => { if (e.target === el) closeLightbox(); });
    el.querySelector(".lightbox__nav--prev").addEventListener("click", () => stepLightbox(-1));
    el.querySelector(".lightbox__nav--next").addEventListener("click", () => stepLightbox(1));
    document.addEventListener("keydown", (e) => {
      if (!el.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
    return el;
  }

  function openLightbox(items, index) {
    lightboxItems = items;
    lightboxIndex = index;
    const el = ensureLightbox();
    el.classList.add("is-open");
    document.body.style.overflow = "hidden";
    renderLightbox();
  }

  function renderLightbox() {
    const el = document.getElementById("dvLightbox");
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    const locked = item.visibility === "members" && !DVAuth.isMember();
    el.querySelector(".lightbox__img").src = locked ? item.img : item.img;
    el.querySelector(".lightbox__img").style.filter = locked ? "blur(24px) brightness(0.5)" : "none";
    el.querySelector(".lightbox__caption-title").textContent = locked ? "Members Only" : item.title;
    el.querySelector(".lightbox__caption-meta").textContent = locked
      ? "Join to view this piece"
      : `${item.category} · ${item.date}`;
  }

  function stepLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  function closeLightbox() {
    const el = document.getElementById("dvLightbox");
    if (el) el.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  return {
    toast,
    photoCardHtml,
    filmCardHtml,
    storyCardHtml,
    openLightbox,
    visibilityBadge,
  };
})();

window.DVApp = DVApp;
