/* ============================================
   DETTYVERSE — SHARED NAVIGATION / FOOTER (v2)
   Simplified: logo mark, five links, single account control.
   Injected into any page with <div id="dv-nav"></div> and
   <div id="dv-footer"></div>.
   ============================================ */

(function () {
  const LOGO_SRC = "assets/dettyverse-logo.webp";

  const NAV_LINKS = [
    { href: "photos.html", label: "Photos" },
    { href: "clips.html", label: "Clips" },
    { href: "stories.html", label: "Stories" },
    { href: "membership.html", label: "Members" },
    { href: "about.html", label: "About" },
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    // Treat the member dashboard as the active "Members" state too.
    if (path === "dashboard.html") return "membership.html";
    return path;
  }

  function renderNav() {
    const mount = document.getElementById("dv-nav");
    if (!mount) return;
    const page = currentPage();
    const isMember = window.DVAuth && DVAuth.isMember();
    const isSignedIn = window.DVAuth && DVAuth.isSignedIn();

    const linksHtml = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${page === l.href ? "is-active" : ""}">${l.label}</a>`
    ).join("");

    const accountHref = isMember ? "dashboard.html" : (isSignedIn ? "membership.html" : "signin.html");
    const accountLabel = isMember ? "Account" : (isSignedIn ? "Finish Joining" : "Sign In");

    mount.innerHTML = `
      <nav class="nav" id="siteNav">
        <a href="index.html" class="nav__wordmark"><img src="${LOGO_SRC}" alt="DettyVerse" /></a>
        <div class="nav__links">${linksHtml}</div>
        <div class="nav__right">
          <a href="${accountHref}" class="nav__signin">${accountLabel}</a>
        </div>
        <button class="nav__burger" id="burgerBtn" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div class="mobile-menu" id="mobileMenu">
        <a href="index.html" class="mobile-menu__logo"><img src="${LOGO_SRC}" alt="DettyVerse" /></a>
        <div class="mobile-menu__links">${NAV_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}</div>
        <div class="mobile-menu__foot">
          <a href="${accountHref}" class="btn btn--ghost">${accountLabel}</a>
        </div>
      </div>
    `;

    const burger = document.getElementById("burgerBtn");
    const menu = document.getElementById("mobileMenu");
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        burger.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );

    const navEl = document.getElementById("siteNav");
    window.addEventListener("scroll", () => {
      navEl.classList.toggle("is-scrolled", window.scrollY > 40);
    });
  }

  function renderFooter() {
    const mount = document.getElementById("dv-footer");
    if (!mount) return;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="site-footer__top">
            <a href="index.html" class="site-footer__brand"><img src="${LOGO_SRC}" alt="DettyVerse" /></a>
            <div class="site-footer__links">
              <a href="photos.html">Photos</a>
              <a href="clips.html">Clips</a>
              <a href="stories.html">Stories</a>
              <a href="membership.html">Members</a>
              <a href="about.html">About</a>
              <a href="store.html">Store</a>
            </div>
          </div>
          <div class="site-footer__bottom">
            <span>© 2026 DETTYVERSE</span>
            <span>Terms · Privacy</span>
          </div>
        </div>
      </footer>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();
  });
})();
