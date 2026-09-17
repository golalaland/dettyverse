/* ============================================
   DETTYVERSE — ENTRY GATE
   A discreet, sophisticated age confirmation, shown once per
   browser session. No childish copy, no heavy-handed warnings.

   TODO(backend/legal): For a real deployment, age assurance for
   adult-marketed publications is a genuine legal requirement in many
   jurisdictions and goes well beyond a client-side confirmation —
   consult counsel on what your specific jurisdictions require
   (some now mandate third-party age verification, not a self-attest
   click-through). This is a UI placeholder only.
   ============================================ */

(function () {
  const KEY = "dv_gate_confirmed";
  if (sessionStorage.getItem(KEY)) return;

  document.addEventListener("DOMContentLoaded", () => {
    const gate = document.createElement("div");
    gate.className = "entry-gate";
    gate.id = "entryGate";
    gate.innerHTML = `
      <div class="entry-gate__content">
        <div class="entry-gate__wordmark">DETTYVERSE</div>
        <p class="entry-gate__text">This is a private publication intended for an adult audience. By entering, you confirm you are of legal age in your place of residence.</p>
        <div class="entry-gate__ctas">
          <button class="btn btn--primary" id="gateEnter">Enter</button>
          <a class="btn btn--ghost" href="https://www.google.com">Leave</a>
        </div>
      </div>
    `;
    document.body.appendChild(gate);
    document.body.style.overflow = "hidden";

    document.getElementById("gateEnter").addEventListener("click", () => {
      sessionStorage.setItem(KEY, "1");
      gate.classList.add("is-hidden");
      document.body.style.overflow = "";
      setTimeout(() => gate.remove(), 500);
    });
  });
})();
