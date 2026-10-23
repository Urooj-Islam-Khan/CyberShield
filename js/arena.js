(() => {
  const T = tracker(),
    A = document.getElementById("app");

  // Evidence Cards Data
  const EV = [
    [
      "🚨 Sign-in Alert",
      "New sign-in to academy account from an unknown device. 7 failed attempts, then success.",
      "7",
    ],
    [
      "💻 Active Sessions",
      "2 unknown devices currently active from a foreign location.",
      "2",
    ],
    [
      "✉️ Phishing Warning",
      "Phishing SMS received: 'Verify account within 4 hours or lose access.'",
      "4",
    ],
  ];

  // Response Ordering Step Mechanics
  const ACT = [
    "Report incident through official support channel",
    "Enable two-step verification (2FA)",
    "Do NOT click suspicious links or attachments",
    "Review & sign out unknown active sessions",
    "Verify alert through official academy route",
    "Change password using the real official site",
  ];
  const ORD = [2, 4, 5, 1, 3, 0];

  let order = [0, 1, 2, 3, 4, 5],
    codeVal = "",
    fb = "",
    hint = false,
    vault = false;

  const s = (n) => T.has("arena:" + n);

  function render() {
    const st = !s("s1")
      ? 1
      : !EV.every((_, i) => s("ev" + i))
        ? 2
        : !s("s3")
          ? 3
          : !s("s4")
            ? 4
            : 5;

    A.innerHTML = `
      <div class="glass-card" style="max-width: 750px; margin: 0 auto; padding: 22px; border-radius: 16px; background: rgba(18, 24, 38, 0.9); border: 1px solid rgba(34, 211, 238, 0.35); box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);">
        
        <!-- Command Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #1E293B; padding-bottom: 12px;">
          <h2 style="font-size: 1.2rem; color: #00F0FF; margin: 0; display: flex; align-items: center; gap: 8px;">
            🏆 Operation: Secure the Academy Command
          </h2>
          <span style="background: rgba(167, 139, 250, 0.2); color: #A78BFA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">
            Stage ${st > 4 && s("vault") ? 5 : st} / 5
          </span>
        </div>

        <!-- Progress Tracker Bar -->
        <div style="display: flex; gap: 6px; margin-bottom: 20px;">
          ${[1, 2, 3, 4, 5]
            .map(
              (step) => `
            <div style="flex: 1; height: 6px; border-radius: 4px; background: ${step < st || (step === 5 && s("vault")) ? "#34D399" : step === st ? "#22D3EE" : "#1E293B"}; transition: all 0.3s ease;"></div>
          `,
            )
            .join("")}
        </div>

        <!-- Terminal Console Panel -->
        <div style="background: #0B1120; border: 1px solid #1E293B; border-radius: 12px; padding: 18px; margin-bottom: 20px; font-family: sans-serif;">
          
          <!-- Stage 1: Incident Trigger -->
          <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 8px 0; color: #F8FAFC; font-size: 0.95rem;">🚨 Stage 1: Security Breach Report</h3>
            ${
              !s("s1")
                ? `
              <p style="color: #F87171; font-size: 0.85rem; margin-bottom: 10px;">Warning: Unauthorized login attempt detected on Academy Main Server!</p>
              <button id="s1-btn" style="padding: 8px 16px; border-radius: 6px; border: none; background: #F87171; color: white; font-weight: bold; cursor: pointer;">
                🔍 Inspect Breach Incident Report
              </button>
            `
                : `
              <div style="background: rgba(52, 211, 153, 0.1); border-left: 3px solid #34D399; padding: 8px 12px; color: #34D399; font-size: 0.82rem;">
                ✔ Incident report reviewed: Unknown device logged in after 7 failed attempts.
              </div>
            `
            }
          </div>

          <!-- Stage 2: Evidence Cards -->
          ${
            s("s1")
              ? `
            <div style="margin-top: 20px; border-top: 1px solid #1E293B; padding-top: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #F8FAFC; font-size: 0.95rem;">🔎 Stage 2: Collect Forensic Evidence</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                ${EV.map(
                  (e, i) => `
                  <button class="ev-card" data-e="${i}" style="padding: 10px; border-radius: 8px; border: 1px solid ${s("ev" + i) ? "#34D399" : "#334155"}; background: ${s("ev" + i) ? "rgba(52,211,153,0.1)" : "#0F172A"}; color: #F8FAFC; cursor: pointer; text-align: left;">
                    <span style="font-size: 0.8rem; font-weight: bold; color: ${s("ev" + i) ? "#34D399" : "#00F0FF"}; display: block;">${e[0]}</span>
                    <span style="font-size: 0.75rem; color: #94A3B8;">${s("ev" + i) ? e[1] : "Click to Analyze"}</span>
                  </button>
                `,
                ).join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- Stage 3: Response Order -->
          ${
            EV.every((_, i) => s("ev" + i))
              ? `
            <div style="margin-top: 20px; border-top: 1px solid #1E293B; padding-top: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #F8FAFC; font-size: 0.95rem;">🛡️ Stage 3: Tactical Defense Sequence</h3>
              <p style="color: #94A3B8; font-size: 0.8rem; margin-bottom: 10px;">Move actions into the correct defensive sequence (Use ↑ ↓ buttons):</p>
              
              <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
                ${order
                  .map(
                    (a, i) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #0F172A; padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; font-size: 0.82rem; color: #CBD5E1;">
                    <span><b>${i + 1}.</b> ${ACT[a]}</span>
                    ${
                      !s("s3")
                        ? `
                      <div style="display: flex; gap: 4px;">
                        <button class="seq-btn" data-u="${i}" style="background: #1E293B; border: 1px solid #475569; color: #00F0FF; padding: 2px 8px; border-radius: 4px; cursor: pointer;">↑</button>
                        <button class="seq-btn" data-d="${i}" style="background: #1E293B; border: 1px solid #475569; color: #00F0FF; padding: 2px 8px; border-radius: 4px; cursor: pointer;">↓</button>
                      </div>
                    `
                        : ""
                    }
                  </div>
                `,
                  )
                  .join("")}
              </div>

              ${
                !s("s3")
                  ? `
                <button id="chk-seq-btn" style="width: 100%; padding: 8px; border-radius: 6px; border: none; background: #22D3EE; color: #070B14; font-weight: bold; cursor: pointer;">
                  Verify Defensive Sequence
                </button>
              `
                  : `
                <div style="color: #34D399; font-size: 0.82rem; font-weight: bold;">✔ Correct Sequence Applied!</div>
              `
              }
            </div>
          `
              : ""
          }

          <!-- Stage 4: Interactive Keypad Code Vault -->
          ${
            s("s3")
              ? `
            <div style="margin-top: 20px; border-top: 1px solid #1E293B; padding-top: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #F8FAFC; font-size: 0.95rem;">🔑 Stage 4: Enter Forensic Evidence Key Code</h3>
              <p style="color: #94A3B8; font-size: 0.8rem; margin-bottom: 10px;">Extract numbers from the evidence cards in order (Failed Attempts ➔ Sessions ➔ Phishing Hours):</p>
              
              ${
                !s("s4")
                  ? `
                <div style="max-width: 220px; margin: 0 auto; text-align: center;">
                  <!-- Keypad Display -->
                  <div style="background: #0F172A; border: 2px solid #00F0FF; color: #00F0FF; font-family: monospace; font-size: 1.4rem; padding: 8px; border-radius: 8px; margin-bottom: 10px; letter-spacing: 6px; min-height: 35px;">
                    ${codeVal || "___"}
                  </div>

                  <!-- Keypad Buttons 0-9 -->
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 10px;">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9]
                      .map(
                        (num) => `
                      <button class="num-key" data-n="${num}" style="padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #1E293B; color: #F8FAFC; font-weight: bold; cursor: pointer;">${num}</button>
                    `,
                      )
                      .join("")}
                    <button id="clr-key" style="padding: 10px; border-radius: 6px; border: 1px solid #F87171; background: rgba(248,113,113,0.2); color: #F87171; font-weight: bold; cursor: pointer;">C</button>
                    <button class="num-key" data-n="0" style="padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #1E293B; color: #F8FAFC; font-weight: bold; cursor: pointer;">0</button>
                    <button id="sub-code-btn" style="padding: 10px; border-radius: 6px; border: none; background: #34D399; color: #070B14; font-weight: bold; cursor: pointer;">OK</button>
                  </div>
                </div>
              `
                  : `
                <div style="color: #34D399; font-size: 0.85rem; font-weight: bold;">✔ Evidence Key Code Accepted (724)!</div>
              `
              }
            </div>
          `
              : ""
          }

          <!-- Stage 5: Open Vault -->
          ${
            s("s4")
              ? `
            <div style="margin-top: 20px; border-top: 1px solid #1E293B; padding-top: 15px; text-align: center;">
              <h3 style="margin: 0 0 10px 0; color: #F8FAFC; font-size: 0.95rem;">🏛️ Stage 5: Unlock Security Vault</h3>
              <div style="font-size: 3rem; margin-bottom: 10px; text-shadow: 0 0 20px ${s("vault") ? "#34D399" : "#F87171"};">
                ${s("vault") ? "🔓" : "🔒"}
              </div>

              ${
                !s("vault")
                  ? `
                <button id="open-vault-btn" style="padding: 12px 24px; border-radius: 8px; border: none; background: #34D399; color: #070B14; font-weight: bold; font-size: 1rem; cursor: pointer;">
                  🚀 Unlock Academy Central Vault
                </button>
              `
                  : `
                <div style="background: rgba(52, 211, 153, 0.15); border: 1px dashed #34D399; padding: 15px; border-radius: 10px; color: #F8FAFC;">
                  <h3 style="color: #34D399; margin: 0 0 6px 0;">🎉 MISSION ACCOMPLISHED!</h3>
                  <p style="margin: 0 0 12px 0; font-size: 0.88rem; color: #CBD5E1;">You secured the academy network and earned the Cyber Champion Badge (1000 XP)!</p>
                  <a href="report.html" style="display: inline-block; padding: 10px 20px; background: #22D3EE; color: #070B14; font-weight: bold; border-radius: 6px; text-decoration: none;">
                    📊 View Final Certificate & Report
                  </a>
                </div>
              `
              }
            </div>
          `
              : ""
          }

        </div>

        <!-- Feedback Messages -->
        ${
          fb
            ? `
          <div style="background: rgba(34, 211, 238, 0.15); border-left: 4px solid #00F0FF; padding: 10px 14px; border-radius: 6px; color: #F8FAFC; font-size: 0.85rem;">
            ${fb}
          </div>
        `
            : ""
        }

      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Stage 1
    const s1Btn = document.getElementById("s1-btn");
    if (s1Btn) {
      s1Btn.onclick = () => {
        T.gain("arena:s1", 100, "Incident Report Reviewed");
        render();
      };
    }

    // Stage 2
    document.querySelectorAll(".ev-card").forEach((btn) => {
      btn.onclick = () => {
        const idx = btn.dataset.e;
        T.gain("arena:ev" + idx, 100, "Analyzed Evidence Card");
        render();
      };
    });

    // Stage 3 Sequence Arrows
    document.querySelectorAll(".seq-btn").forEach((btn) => {
      btn.onclick = () => {
        const u = btn.dataset.u;
        const d = btn.dataset.d;
        if (u !== undefined && +u > 0) {
          const i = +u;
          [order[i - 1], order[i]] = [order[i], order[i - 1]];
        } else if (d !== undefined && +d < order.length - 1) {
          const i = +d;
          [order[i + 1], order[i]] = [order[i], order[i + 1]];
        }
        render();
      };
    });

    const chkSeq = document.getElementById("chk-seq-btn");
    if (chkSeq) {
      chkSeq.onclick = () => {
        if (order.every((a, i) => a === ORD[i])) {
          T.gain("arena:s3", 250, "Correct Defense Sequence");
          fb = "🎉 Safe response order verified successfully!";
        } else {
          fb =
            "❌ Incorrect sequence. Tip: Verify first ➔ Avoid suspicious links ➔ Secure credentials.";
        }
        render();
      };
    }

    // Stage 4 Keypad Dialing
    document.querySelectorAll(".num-key").forEach((btn) => {
      btn.onclick = () => {
        if (codeVal.length < 3) {
          codeVal += btn.dataset.n;
          render();
        }
      };
    });

    const clrKey = document.getElementById("clr-key");
    if (clrKey)
      clrKey.onclick = () => {
        codeVal = "";
        render();
      };

    const subCode = document.getElementById("sub-code-btn");
    if (subCode) {
      subCode.onclick = () => {
        if (codeVal === "724") {
          T.gain("arena:s4", 250, "Evidence Key Code Unlocked");
          fb = "🎉 Key Code Accepted!";
        } else {
          fb =
            "❌ Wrong Key Code! Hint: Check numbers on evidence cards (7, 2, 4).";
          codeVal = "";
        }
        render();
      };
    }

    // Stage 5 Vault
    const openVault = document.getElementById("open-vault-btn");
    if (openVault) {
      openVault.onclick = () => {
        T.gain("arena:vault", 300, "Academy Vault Unlocked");
        T.complete("arena", 1000);
        render();
      };
    }
  }

  render();
})();
