(() => {
  const T = tracker(),
    A = document.getElementById("app");

  let curCase = 0;
  let fb = "";

  // Visual Fake Webpage Scenarios with Directly Visible Spoofed URLs
  const spoofCases = [
    {
      id: "sp1",
      brand: "Google Account Security",
      logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      // URL mein hi galti saaf nazar aayegi!
      displayUrl: "https://accounts.g00gle-security-check.xyz/signin",
      hasSsl: false,
      title: "Google Security Lock - Action Required!",
      bodyText:
        "Your Google Account has been temporarily restricted. Enter your password immediately to unlock access.",
      isSpoofed: true,
      flags: [
        "❌ Domain uses 'g00gle' with zero ('0') instead of 'o'",
        "❌ Fake extension (.xyz instead of .com)",
        "⚠️ Not Secure (HTTP / Missing SSL Lock)",
      ],
      why: "Pakra gaya! Google kabhi bhi '.xyz' ya 'g00gle' spelling wale domain se email/password nahi maangta.",
    },
    {
      id: "sp2",
      brand: "Instagram Support Center",
      logo: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
      displayUrl: "https://www.instagram.com.support-verify-login.co/help",
      hasSsl: false,
      title: "Copyright Infringement Warning ⚠️",
      bodyText:
        "Your account will be deleted in 24 hours. Click below and sign in to appeal your photos.",
      isSpoofed: true,
      flags: [
        "❌ Weird subdomain trick (.instagram.com.support-verify.co)",
        "🚨 Fake urgency to create panic",
      ],
      why: "Yeh ek classic spoofing scam hai! Asli Instagram hamesha 'instagram.com' par hota hai, aisi lamba sub-domain trick par nahi.",
    },
    {
      id: "sp3",
      brand: "Official School Portal",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      displayUrl: "https://portal.school-education.edu.pk/student/dashboard",
      hasSsl: true,
      title: "Student Portal - Term 2 Result Board",
      bodyText:
        "Welcome back! View your latest examination report and attendance records safely.",
      isSpoofed: false,
      flags: [
        "✅ Official Government/Education Domain (.edu.pk)",
        "✅ Valid HTTPS Security Lock",
      ],
      why: "Yeh bilkul safe aur legitimate webpage hai kyunke domain official educational extension (.edu.pk) par hai.",
    },
  ];

  function render() {
    const c = spoofCases[curCase];

    A.innerHTML = `
      <div class="glass-card" style="max-width: 700px; margin: 0 auto; padding: 22px; border-radius: 16px; background: rgba(18, 24, 38, 0.9); border: 1px solid rgba(34, 211, 238, 0.35); box-shadow: 0 0 25px rgba(0, 240, 255, 0.15);">
        
        <!-- Top HUD Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h2 style="font-size: 1.25rem; color: #00F0FF; margin: 0; display: flex; align-items: center; gap: 8px;">
            🕵️‍♂️ Mission 3: Fake Portal & URL Inspector
          </h2>
          <span style="background: rgba(167, 139, 250, 0.2); color: #A78BFA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">
            Case ${curCase + 1} / ${spoofCases.length}
          </span>
        </div>

        <p style="color: #94A3B8; font-size: 0.88rem; margin-bottom: 15px;">
          Browser address bar ka URL aur page ka design dhyan se check karein. Kya yeh ek asli website hai ya nakli spoofed portal?
        </p>

        <!-- Simulated Browser Container -->
        <div style="background: #0B1120; border-radius: 12px; border: 1px solid #1E293B; overflow: hidden; margin-bottom: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.5);">
          
          <!-- Mock Browser Navigation Bar with DIRECT FAKE URL -->
          <div style="background: #172554; padding: 10px 14px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #1E293B;">
            <span style="font-size: 0.9rem;" title="${c.hasSsl ? "Secure" : "Not Secure"}">
              ${c.hasSsl ? "🔒 <span style='color: #34D399; font-size: 0.75rem;'>HTTPS</span>" : "⚠️ <span style='color: #F87171; font-size: 0.75rem;'>Unsafe</span>"}
            </span>
            
            <div style="background: #0F172A; color: ${c.isSpoofed ? "#F87171" : "#34D399"}; padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 0.84rem; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; border: 1px solid ${c.isSpoofed ? "rgba(248,113,113,0.4)" : "rgba(52,211,153,0.4)"}; font-weight: bold;">
              ${c.displayUrl}
            </div>
          </div>

          <!-- Visual Login Page Content -->
          <div style="padding: 25px; text-align: center; background: #0F172A;">
            <img src="${c.logo}" alt="${c.brand}" style="width: 48px; height: 48px; margin-bottom: 10px; object-fit: contain;" />
            <h3 style="margin: 0 0 8px 0; color: #F8FAFC; font-size: 1.1rem;">${c.brand}</h3>
            <p style="color: #94A3B8; font-size: 0.85rem; max-width: 450px; margin: 0 auto 20px auto; line-height: 1.4;">
              "${c.bodyText}"
            </p>

            <!-- Mock Form Fields -->
            <div style="max-width: 300px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px;">
              <input type="text" value="user@example.com" disabled style="padding: 8px 12px; border-radius: 6px; background: #1E293B; border: 1px solid #334155; color: #64748B; font-size: 0.82rem;" />
              <input type="password" value="••••••••••••" disabled style="padding: 8px 12px; border-radius: 6px; background: #1E293B; border: 1px solid #334155; color: #64748B; font-size: 0.82rem;" />
              <button disabled style="padding: 8px; border-radius: 6px; background: #334155; color: #94A3B8; border: none; font-weight: bold; font-size: 0.85rem; cursor: not-allowed;">
                Sign In
              </button>
            </div>
          </div>

        </div>

        <!-- Detective Decision Buttons -->
        <h3 style="font-size: 0.95rem; color: #F8FAFC; margin-bottom: 12px; text-align: center;">
          What is your Security Inspector Verdict?
        </h3>

        <div style="display: flex; gap: 12px; margin-bottom: 15px;">
          <button class="verdict-btn" data-v="real" style="flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #34D399; background: rgba(52, 211, 153, 0.15); color: #34D399; font-weight: bold; font-size: 0.92rem; cursor: pointer;">
            ✅ Legitimate Webpage
          </button>
          <button class="verdict-btn" data-v="fake" style="flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #F87171; background: rgba(248, 113, 113, 0.15); color: #F87171; font-weight: bold; font-size: 0.92rem; cursor: pointer;">
            🚨 Fake Spoofed Portal
          </button>
        </div>

        <!-- Feedback & Red Flags Banner -->
        ${
          fb
            ? `
          <div style="background: rgba(34, 211, 238, 0.12); border-left: 4px solid #00F0FF; padding: 12px; border-radius: 8px; color: #F8FAFC; font-size: 0.88rem; margin-bottom: 15px;">
            ${fb}
          </div>
        `
            : ""
        }

        <!-- Pagination Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
          <button id="prev-case-btn" style="background: transparent; border: 1px solid #475569; color: #94A3B8; padding: 8px 16px; border-radius: 6px; cursor: pointer;" ${curCase === 0 ? "disabled" : ""}>◀ Prev Case</button>
          <button id="next-case-btn" style="background: #22D3EE; border: none; color: #070B14; font-weight: bold; padding: 8px 20px; border-radius: 6px; cursor: pointer;">
            ${curCase < spoofCases.length - 1 ? "Next Case ▶" : "Finish Mission 🎉"}
          </button>
        </div>

      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    const c = spoofCases[curCase];

    // Verdict buttons
    document.querySelectorAll(".verdict-btn").forEach((btn) => {
      btn.onclick = () => {
        const choice = btn.dataset.v;
        const isCorrect =
          (choice === "fake" && c.isSpoofed) ||
          (choice === "real" && !c.isSpoofed);

        if (isCorrect) {
          T.gain(`safe:${c.id}`, 100, "Identified Spoofed Portal");
          fb = `🎉 <b>Correct Detective Work!</b> ${c.why} <br><br><b>Observed Red Flags:</b><br>${c.flags.join("<br>")}`;
        } else {
          fb = `❌ <b>Incorrect!</b> URL ko aur address bar ki details ko dhyan se dobara check karein.`;
        }
        render();
      };
    });

    // Case Navigation
    const nextBtn = document.getElementById("next-case-btn");
    const prevBtn = document.getElementById("prev-case-btn");

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (curCase < spoofCases.length - 1) {
          curCase++;
          fb = "";
          render();
        } else {
          T.complete("safe", 400);
          alert("Mission Complete! You earned 400 XP.");
        }
      };
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (curCase > 0) {
          curCase--;
          fb = "";
          render();
        }
      };
    }
  }

  render();
})();
