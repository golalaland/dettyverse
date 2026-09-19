/* ============================================
   DETTYVERSE — SHARED APP UTILITIES (v2)
   Toast, fullscreen viewer, and media-card rendering.
   Locked content stays visible and tempting — a small PRIVATE label,
   not a box that covers the image.
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
      return `<span class="badge badge--members">Private</span>`;
    }
    return "";
  }

  function lockMarkup() {
    return `
      <div class="media-card__lock">
        <span class="media-card__lock-text">Private</span>
        <span class="media-card__lock-enter">— Enter the Verse</span>
      </div>
    `;
  }

  /* ---------- RHYTHM PATTERN (Photos grid) ----------
     A repeating sequence of layout classes so the gallery reads as
     curated rather than uniform: big image, two smaller, full-width,
     three-sequence, big portrait, etc. */
  const RHYTHM_PATTERN = [
    "rhythm-hero", "rhythm-tall",
    "rhythm-small", "rhythm-small",
    "rhythm-wide",
    "rhythm-portrait", "rhythm-med", "rhythm-med",
  ];

  function rhythmClass(index) {
    return RHYTHM_PATTERN[index % RHYTHM_PATTERN.length];
  }

  /* ---------- PHOTO CARD (rhythm grid) ---------- */
  function photoCardHtml(photo, index = 0) {
    const locked = photo.visibility === "members" && !DVAuth.isMember();
    const cls = rhythmClass(index);
    return `
      <a class="media-card ${cls} ${locked ? "media-card--locked" : ""}"
         href="${locked ? "membership.html" : `content.html?type=photo&id=${photo.id}`}"
         data-id="${photo.id}">
        <div class="media-card__img-wrap">
          <img src="${photo.img}" alt="${locked ? "Private archive image" : photo.title}" loading="lazy" />
        </div>
        ${
          locked
            ? lockMarkup()
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

  /* ---------- CLIP CARD (native aspect ratio wall) ---------- */
  function clipCardHtml(clip) {
    const locked = clip.visibility === "members" && !DVAuth.isMember();
    // Native aspect ratio drives the wall — no forced 16:9.
    const ratio = clip.orientation === "portrait" ? "3/4" : clip.orientation === "square" ? "1/1" : "16/9";
    return `
      <a class="media-card ${locked ? "media-card--locked" : ""}" style="aspect-ratio:${ratio};"
         href="${locked ? "membership.html" : `content.html?type=film&id=${clip.id}`}">
        <div class="media-card__img-wrap">
          <img src="${clip.thumb}" alt="${locked ? "Private clip" : clip.title}" loading="lazy" />
        </div>
        ${!locked ? `<div class="media-card__play"><svg width="16" height="16" viewBox="0 0 24 24" fill="var(--ivory)"><path d="M8 5v14l11-7z"/></svg></div>` : ""}
        ${!locked ? `<div class="media-card__duration">${clip.duration}</div>` : ""}
        ${
          locked
            ? lockMarkup()
            : `<div class="media-card__overlay">
                 <div class="media-card__meta">
                   <div class="media-card__title">${clip.title}</div>
                   <div class="media-card__sub">${clip.category}</div>
                 </div>
               </div>`
        }
      </a>
    `;
  }

  /* ---------- STORY CARD ---------- */
  function storyCardHtml(story) {
    const locked = story.visibility === "members" && !DVAuth.isMember();
    return `
      <a class="story-card ${locked ? "story-card--locked" : ""}" href="${locked ? "membership.html" : `content.html?type=story&id=${story.id}`}">
        <div class="story-card__img-wrap">
          <img src="${story.cover}" alt="${story.title}" loading="lazy" />
          ${locked ? `<div class="story-card__lock-badge">Private</div>` : ""}
        </div>
        <div class="story-card__body">
          <div class="meta-label">${story.category} · ${story.date}</div>
          <h3 class="story-card__title">${locked ? "A Private Entry" : story.title}</h3>
          <p class="story-card__excerpt">${locked ? "Reserved for members." : story.excerpt}</p>
        </div>
      </a>
    `;
  }

  /* ---------- FULLSCREEN PHOTO VIEWER ---------- */
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
    const num = String(lightboxIndex + 1).padStart(3, "0");
    el.querySelector(".lightbox__img").src = item.img;
    el.querySelector(".lightbox__img").style.filter = "none";
    el.querySelector(".lightbox__caption-title").textContent = `Archive ${num}`;
    el.querySelector(".lightbox__caption-meta").textContent = `${item.date} · Photo`;
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
    clipCardHtml,
    storyCardHtml,
    openLightbox,
    visibilityBadge,
    rhythmClass,
  };
})();

window.DVApp = DVApp;
