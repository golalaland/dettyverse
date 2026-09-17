/* ============================================
   DETTYVERSE — SHARED NAVIGATION / FOOTER
   Injected into any page with <div id="dv-nav"></div> and
   <div id="dv-footer"></div>. Keeps every page in sync without
   duplicating markup.
   ============================================ */

(function () {
  const NAV_LINKS = [
    { href: "archive.html", label: "Archive" },
    { href: "film.html", label: "Film" },
    { href: "stories.html", label: "Stories" },
    { href: "journal.html", label: "Journal" },
    { href: "membership.html", label: "Members" },
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
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

    mount.innerHTML = `
      <nav class="nav" id="siteNav">
        <a href="index.html" class="nav__wordmark">DETTYVERSE</a>
        <div class="nav__links">${linksHtml}</div>
        <div class="nav__right">
          ${
            isSignedIn
              ? `<a href="dashboard.html" class="nav__signin">${isMember ? "My Room" : "Account"}</a>`
              : `<a href="signin.html" class="nav__signin">Sign In</a>`
          }
          ${
            isMember
              ? `<a href="dashboard.html" class="nav__join" style="border-color:var(--surface-line);">Members</a>`
              : `<a href="membership.html" class="nav__join">Join — $99.99</a>`
          }
        </div>
        <button class="nav__burger" id="burgerBtn" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu__links">${NAV_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}</div>
        <div class="mobile-menu__foot">
          ${
            isSignedIn
              ? `<a href="dashboard.html" class="btn btn--ghost">Account</a>`
              : `<a href="signin.html" class="btn btn--ghost">Sign In</a>`
          }
          <a href="membership.html" class="btn btn--primary">Join — $99.99 / Month</a>
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
            <div class="site-footer__brand">DETTYVERSE</div>
            <div class="site-footer__cols">
              <div class="site-footer__col">
                <h4>Explore</h4>
                <a href="archive.html">Archive</a>
                <a href="film.html">Film</a>
                <a href="stories.html">Stories</a>
                <a href="journal.html">Journal</a>
              </div>
              <div class="site-footer__col">
                <h4>The Verse</h4>
                <a href="membership.html">Membership</a>
                <a href="store.html">Store</a>
                <a href="about.html">About</a>
              </div>
              <div class="site-footer__col">
                <h4>Legal</h4>
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="membership.html">Membership Terms</a>
              </div>
            </div>
          </div>
          <div class="site-footer__bottom">
            <span>© 2026 DETTYVERSE</span>
            <span>Seen only by those who were let in.</span>
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
