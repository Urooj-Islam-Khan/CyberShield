const NAV = [
  ["index.html", "Academy Home"],
  ["phishing.html", "Link Lab"],
  ["passwords.html", "Password Fortress"],
  ["safety.html", "Digital Footprint Rescue"],
  //   ["arena.html", "Cyber Escape Room"],
];
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
function toast(t) {
  const b = document.getElementById("toasts");
  if (!b) return;
  const d = document.createElement("div");
  d.className = "toast";
  d.textContent = t;
  b.append(d);
  setTimeout(() => d.remove(), 3500);
}
function chip() {
  const c = document.getElementById("chip");
  if (c) c.textContent = `${CS.rank()} · ${CS.total()} XP`;
}
function buildNav() {
  const cur = location.pathname.split("/").pop() || "index.html";
  document.getElementById("nav").innerHTML =
    `<a class="logo" href="index.html"><svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2l12 5v8c0 8-5 13-12 15C9 28 4 23 4 15V7z" fill="#151F35" stroke="#43D9FF" stroke-width="2"/><circle cx="15" cy="14" r="4" fill="none" stroke="#9B7BFF" stroke-width="2"/><path d="M18 17l4 4" stroke="#9B7BFF" stroke-width="2"/></svg> CyberShield</a>
 <button class="menu" aria-expanded="false" aria-controls="links">Menu</button>
 <nav id="links" aria-label="Main">${NAV.map((n) => `<a href="${n[0]}"${n[0] === cur ? ' aria-current="page"' : ""}>${n[1]}</a>`).join("")}</nav><span id="chip" class="pill"></span>`;
  const mb = document.querySelector(".menu");
  mb.onclick = () => {
    const o = document.getElementById("links").classList.toggle("open");
    mb.setAttribute("aria-expanded", o);
  };
  chip();
}
CS.on((e) => {
  chip();
  if (e.xp) toast("+" + e.xp + " XP — " + (e.msg || ""));
  if (e.badge) toast("🏅 Badge unlocked: " + e.badge);
});
/* tracker: persistent normally; in-memory only during practice replays (no XP) */
function tracker() {
  let p = false,
    s = new Set();
  return {
    get practice() {
      return p;
    },
    set(v) {
      p = v;
      s = new Set();
    },
    has: (k) => (p ? s.has(k) : CS.has(k)),
    gain(k, xp, msg) {
      if (p) {
        if (s.has(k)) return false;
        s.add(k);
        return true;
      }
      return CS.gain(k, xp, msg);
    },
    complete(m, b) {
      if (!p) CS.complete(m, b);
    },
  };
}
function head(n, title, obj, reward) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Academy</a> › Mission ${n}</nav><h1>${title}</h1><p class="obj"><b>Objective:</b> ${obj}</p><p class="muted">Reward: ${reward}. All content is fictional and simulated.</p>`;
}
function lockedGate(m) {
  if (CS.unlocked(m)) return false;
  document.getElementById("app").innerHTML =
    `<div class="card"><h1>🔒 Mission locked</h1><p>Complete the previous mission first.</p><a class="btn" href="index.html">Back to Academy</a></div>`;
  return true;
}
document.addEventListener("DOMContentLoaded", buildNav);
