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
    const st = (m) =>
      CS.done(m[0])
        ? "Completed"
        : !CS.unlocked(m[0])
          ? "Locked"
          : CS.xp(m[0])
            ? "In progress"
            : "Available";

    A.innerHTML = `
      <h2 id="missions">Mission Map</h2>
      <section class="grid">
        ${M.map((m, i) => {
          const s = st(m),
            lock = s === "Locked",
            p = Math.round((CS.xp(m[0]) / CS.MAX[m[0]]) * 100);

          return `
            <article class="card mission ${lock ? "lock" : ""}">
              <div class="mission-content">
                <div class="ico">${m[2]}</div>
                <small style="color: #94a3b8;">Mission ${i + 1} · Status: <b style="color: #34d399;">${s}</b></small>
                <h3>${m[3]}</h3>
                <p>${m[4]}</p>
              </div>

              <div class="mission-footer">
                <div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100">
                  <i style="width:${p}%"></i>
                </div>
                <small>${CS.xp(m[0])}/${CS.MAX[m[0]]} XP</small>
                ${
                  lock
                    ? `<span class="muted">🔒 Finish Mission ${i} first</span>`
                    : `<a class="btn" href="${m[1]}">${
                        s === "Completed"
                          ? "Practice"
                          : s === "In progress"
                            ? "Continue"
                            : "Start Mission"
                      }</a>`
                }
              </div>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }

  render();
})();
