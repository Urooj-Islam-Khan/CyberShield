(() => {
  const T = tracker(), A = document.getElementById("app");
  let cur = 0, fb = "", showReal = false;
  
  const E = [
    {
      id: "e1",
      brand: "Facebook",
      logo: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
      subj: "Security Alert: Verify your account now!",
      displayUrl: "https://www.facebook.com/security/login",
      realUrl: "https://www.faceb00k-verify-login.xyz/auth",
      previewText: "Your account will be suspended in 24 hours due to unusual activity. Click below to verify.",
      v: "scam",
      why: "Look closely at the real URL! 'faceb00k' uses zero ('0') instead of 'o', and ends in '.xyz' instead of '.com'."
    },
    {
      id: "e2",
      brand: "Google Classroom",
      logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      subj: "New Assignment: Math Homework Week 4",
      displayUrl: "https://classroom.google.com/c/math-hw",
      realUrl: "https://classroom.google.com/c/math-hw",
      previewText: "Ms. Rao uploaded a new PDF assignment. Deadline is next Monday.",
      v: "safe",
      why: "The real domain matches Google's official link, and there is no request for passwords or urgent pressure."
    },
    {
      id: "e3",
      brand: "Gaming Reward",
      logo: "https://cdn-icons-png.flaticon.com/512/686/686589.png",
      subj: "CLAIM FREE 10,000 GEMS NOW!!!",
      displayUrl: "https://free-gems-giveaway.test",
      realUrl: "https://free-gems.collect-data.ru/steal-login",
      previewText: "You are today's lucky winner! Enter your gaming email and password to collect instant gems.",
      v: "scam",
      why: "Free gift popups asking for your secret login or password are always phishing scams!"
    }
  ];

  function render() {
    const e = E[cur];

    A.innerHTML = `
      <div class="phish-container glass-card" style="max-width: 650px; margin: 0 auto; padding: 20px; border-radius: 16px; background: rgba(18, 24, 38, 0.85); border: 1px solid rgba(34, 211, 238, 0.3);">
        
        <!-- Top Visual Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h2 style="font-size: 1.2rem; color: #00F0FF; margin: 0;">🔎 Mission 1: Link Inspector</h2>
          <span style="background: rgba(167, 139, 250, 0.2); color: #A78BFA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">Case ${cur + 1} / ${E.length}</span>
        </div>

        <!-- Simulated Visual Browser Mockup -->
        <div style="background: #0F172A; border-radius: 12px; border: 1px solid #1E293B; overflow: hidden; margin-bottom: 20px;">
          
          <!-- Mock Browser Bar -->
          <div style="background: #1E293B; padding: 8px 12px; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.8rem; color: #34D399;">🔒</span>
            <div style="background: #0F172A; color: #94A3B8; padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 0.85rem; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${e.displayUrl}
            </div>
          </div>

          <!-- Mock Message / Email Visual Body -->
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <img src="${e.logo}" alt="${e.brand}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: contain;" />
              <div>
                <h4 style="margin: 0; color: #F8FAFC; font-size: 1rem;">${e.brand}</h4>
                <p style="margin: 0; color: #94A3B8; font-size: 0.85rem;"><b>Subject:</b> ${e.subj}</p>
              </div>
            </div>

            <p style="color: #CBD5E1; font-size: 0.9rem; line-height: 1.4; margin-bottom: 15px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
              "${e.previewText}"
            </p>

            <!-- Clickable Inspect Link Box -->
            <div style="background: rgba(34, 211, 238, 0.08); border: 1px dashed #22D3EE; padding: 12px; border-radius: 8px; text-align: center;">
              <button id="inspect-link-btn" style="background: transparent; border: none; color: #00F0FF; font-weight: bold; font-size: 0.95rem; text-decoration: underline; cursor: pointer;">
                👉 Click Here To Inspect Real Link
              </button>
              
              ${showReal ? `
                <div style="margin-top: 10px; background: rgba(248, 113, 113, 0.15); border: 1px solid #F87171; padding: 8px; border-radius: 6px; color: #F87171; font-family: monospace; font-size: 0.85rem; word-break: break-all;">
                  🚨 <b>Actual Destination:</b> ${e.realUrl}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Action Choice Buttons -->
        <h3 style="font-size: 0.95rem; color: #F8FAFC; margin-bottom: 10px; text-align: center;">What is your Detective Verdict?</h3>
        <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 15px;">
          <button class="v-btn" data-v="safe" style="flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #34D399; background: rgba(52, 211, 153, 0.1); color: #34D399; font-weight: bold; cursor: pointer;">✅ Legitimate (Safe)</button>
          <button class="v-btn" data-v="scam" style="flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #F87171; background: rgba(248, 113, 113, 0.1); color: #F87171; font-weight: bold; cursor: pointer;">🚨 Phishing Scam</button>
        </div>

        <!-- Feedback Box -->
        ${fb ? `<div style="background: rgba(34, 211, 238, 0.15); border-left: 4px solid #00F0FF; padding: 12px; border-radius: 6px; color: #F8FAFC; font-size: 0.88rem; margin-bottom: 15px;">${fb}</div>` : ""}

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <button id="prev-btn" style="background: transparent; border: 1px solid #64748B; color: #94A3B8; padding: 6px 14px; border-radius: 6px; cursor: pointer;" ${cur === 0 ? "disabled" : ""}>◀ Prev Case</button>
          <button id="next-btn" style="background: #22D3EE; border: none; color: #070B14; font-weight: bold; padding: 8px 18px; border-radius: 6px; cursor: pointer;">Next Case ▶</button>
        </div>

      </div>
    `;
  }

  A.onclick = (ev) => {
    const btn = ev.target.closest("button");
    if (!btn) return;

    const e = E[cur];

    if (btn.id === "inspect-link-btn") {
      showReal = !showReal;
      render();
    } else if (btn.classList.contains("v-btn")) {
      const choice = btn.dataset.v;
      if (choice === e.v) {
        T.gain(`phish:${e.id}:v`, 100, "Correct Verdict");
        fb = `🎉 <b>Correct!</b> ${e.why}`;
      } else {
        fb = `❌ <b>Incorrect!</b> Inspect the real link destination carefully before deciding.`;
      }
      render();
    } else if (btn.id === "next-btn") {
      if (cur < E.length - 1) {
        cur++;
        fb = "";
        showReal = false;
        render();
      } else {
        alert("Mission Complete! Returning to Headquarters.");
      }
    } else if (btn.id === "prev-btn") {
      if (cur > 0) {
        cur--;
        fb = "";
        showReal = false;
        render();
      }
    }
  };

  render();
})();