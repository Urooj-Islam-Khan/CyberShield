(() => {
  const A = document.getElementById("app");
  const M = [
    [
      "phish",
      "phishing.html",
      "🔍",
      "The Link Lab",
      "Spot phishing clues and choose a safe response.",
    ],
    [
      "pass",
      "passwords.html",
      "🔐",
      "Password Fortress",
      "Secure a fictional account.",
    ],
    [
      "safe",
      "safety.html",
      "🛡️",
      "Digital Footprint Rescue",
      "Fix a profile that shares too much.",
    ],
    // [
    //   "arena",
    //   "arena.html",
    //   "🏆",
    //   "Operation: Secure the Academy",
    //   "Final mission: investigate an alert and open the vault.",
    // ],
  ];
  let name = "";
  function render() {
    const nx = CS.nextRank(),
      pct = Math.round((CS.total() / 2200) * 100);
    const next = M.find((m) => !CS.done(m[0]));
    const st = (m) =>
      CS.done(m[0])
        ? "Completed"
        : !CS.unlocked(m[0])
          ? "Locked"
          : CS.xp(m[0])
            ? "In progress"
            : "Available";
    A.innerHTML = `<section class="hero card"><div><h1>Welcome, Cyber Cadet.</h1><p class="tag">Think Like a Detective. Act Like a Defender.</p><p>Your digital world needs a defender. Investigate suspicious links, secure accounts, protect privacy, and complete the final academy operation.</p>
<a class="btn" href="${next ? next[1] : "#cert"}">${next ? "Continue Mission" : "View Certificate"}</a> <a class="btn ghost" href="#missions">Explore Academy</a></div>
<svg class="mascot" viewBox="0 0 120 120" role="img" aria-label="CyberBuddy, a friendly robot detective"><rect x="30" y="35" width="60" height="50" rx="14" fill="#151F35" stroke="#43D9FF" stroke-width="3"/><circle cx="48" cy="58" r="7" fill="#43D9FF"/><circle cx="72" cy="58" r="7" fill="#43D9FF"/><path d="M48 74q12 8 24 0" stroke="#43E6A5" stroke-width="3" fill="none"/><line x1="60" y1="35" x2="60" y2="22" stroke="#9B7BFF" stroke-width="3"/><circle cx="60" cy="19" r="5" fill="#9B7BFF"/><circle cx="92" cy="92" r="11" fill="none" stroke="#FFC857" stroke-width="3"/><line x1="100" y1="100" x2="110" y2="110" stroke="#FFC857" stroke-width="4"/></svg></section>
<section class="stats"><div class="card"><b>${CS.rank()}</b><span>Rank</span></div><div class="card"><b>${CS.total()} XP</b><span>${nx ? nx.need + " to " + nx.name : "Top rank reached"}</span></div><div class="card"><b>${CS.doneCount()}/3</b><span>Missions</span></div><div class="card"><b>${CS.badges().length}/</b><span>Badges</span></div></section>
<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Overall progress"><i style="width:${pct}%"></i></div>
<h2 id="missions">Mission Map</h2><section class="grid">${M.map((m, i) => {
      const s = st(m),
        lock = s === "Locked",
        p = Math.round((CS.xp(m[0]) / CS.MAX[m[0]]) * 100);
      return `<article class="card mission ${lock ? "lock" : ""}"><div class="ico">${m[2]}</div><small>Mission ${i + 1} · Status: <b>${s}</b></small><h3>${m[3]}</h3><p>${m[4]}</p><div class="bar"><i style="width:${p}%"></i></div><small>${CS.xp(m[0])}/${CS.MAX[m[0]]} XP</small><br>${lock ? '<span class="muted">🔒 Finish Mission ' + i + " first</span>" : `<a class="btn" href="${m[1]}">${s === "Completed" ? "Practice" : s === "In progress" ? "Continue" : "Start Mission"}</a>`}</article>`;
    }).join("")}</section>
<h2>Badges</h2><section class="grid">${CS.BADGES.map((b) => {
      const e = CS.done(b[0]);
      return `<div class="card badge ${e ? "" : "dim"}"><span class="ico">${e ? b[2] : "❔"}</span><b>${b[1]}</b><small>${e ? "Earned" : "Locked"} — ${b[3]}</small></div>`;
    }).join("")}</section>
<h2>Recent Activity</h2><section class="card">${
      CS.log().length
        ? "<ul>" +
          CS.log()
            .map(
              (l) =>
                `<li>${esc(l.m)} <small class="muted">${new Date(l.t).toLocaleDateString()}</small></li>`,
            )
            .join("") +
          "</ul>"
        : '<p class="muted">No activity yet. Start Mission 1!</p>'
    }</section>
<h2>How to Play</h2><section class="card"><ol><li>Investigate the evidence.</li><li>Read feedback carefully.</li><li>Use hints when stuck.</li><li>Earn XP through correct, safe actions.</li><li>Retry missions in Practice mode to improve.</li></ol></section>`;
    const n = document.getElementById("nm");
    if (n) n.oninput = (e) => (name = e.target.value);
    const p = document.getElementById("pr");
    if (p) p.onclick = () => print();
  }
  render();
})();
