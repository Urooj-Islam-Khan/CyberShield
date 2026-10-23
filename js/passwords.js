(() => {
  const T = tracker(),
    A = document.getElementById("app");

  // Local State Variables
  let inputVal = "";
  let fb = "";
  let score = 0; // 0 to 100

  // Live Criteria Tracker Rules
  const checkCriteria = (val) => {
    return {
      length: val.length >= 8,
      uppercase: /[A-Z]/.test(val),
      lowercase: /[a-z]/.test(val),
      number: /[0-9]/.test(val),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
    };
  };

  function calculateScore(c, val) {
    let pts = 0;
    if (val.length === 0) return 0;

    if (c.length) pts += 25;
    if (val.length >= 12) pts += 15; // Extra bonus for long passphrases
    if (c.uppercase) pts += 15;
    if (c.lowercase) pts += 15;
    if (c.number) pts += 15;
    if (c.special) pts += 15;

    return Math.min(pts, 100);
  }

  function getStatusInfo(s) {
    if (s === 0)
      return {
        label: "Empty",
        color: "#64748B",
        bg: "rgba(100, 116, 139, 0.2)",
      };
    if (s < 40)
      return {
        label: "🔴 Weak Password",
        color: "#F87171",
        bg: "rgba(248, 113, 113, 0.2)",
      };
    if (s < 75)
      return {
        label: "🟡 Medium Password",
        color: "#FBBF24",
        bg: "rgba(251, 191, 36, 0.2)",
      };
    if (s < 90)
      return {
        label: "🟢 Good Password",
        color: "#34D399",
        bg: "rgba(52, 211, 153, 0.2)",
      };
    return {
      label: "⚡ Strong Passphrase!",
      color: "#00F0FF",
      bg: "rgba(0, 240, 255, 0.2)",
    };
  }

  function render() {
    const c = checkCriteria(inputVal);
    score = calculateScore(c, inputVal);
    const status = getStatusInfo(score);
    const isCompleted = T.has("pass:strength");

    A.innerHTML = `
      <div class="glass-card" style="max-width: 650px; margin: 0 auto; padding: 25px; border-radius: 16px; background: rgba(18, 24, 38, 0.85); border: 1px solid rgba(34, 211, 238, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);">
        
        <!-- Header Section -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h2 style="font-size: 1.25rem; color: #00F0FF; margin: 0; display: flex; align-items: center; gap: 8px;">
            🛡️ Mission 2: Password Guardian
          </h2>
          <span style="background: rgba(167, 139, 250, 0.2); color: #A78BFA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">
            500 XP
          </span>
        </div>

        <p style="color: #94A3B8; font-size: 0.88rem; margin-bottom: 20px; line-height: 1.4;">
          Type a test password below to analyze its strength in real time. Learn what makes passwords unbreakable!
        </p>

        <!-- Warning Disclaimer -->
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 4px solid #FBBF24; padding: 10px 12px; border-radius: 6px; color: #FBBF24; font-size: 0.8rem; margin-bottom: 20px;">
          ⚠️ <b>Security Notice:</b> Never enter a real password that you actually use. All checks are done locally in memory!
        </div>

        <!-- Interactive Password Input Box -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; color: #F8FAFC; font-size: 0.9rem; margin-bottom: 8px; font-weight: bold;">
            Test Password Input:
          </label>
          <input 
            type="text" 
            id="pwd-input" 
            value="${inputVal}" 
            placeholder="Type your passphrase here..." 
            autocomplete="off"
            style="width: 100%; padding: 12px 16px; border-radius: 10px; background: #0F172A; border: 2px solid ${status.color}; color: #F8FAFC; font-family: monospace; font-size: 1.05rem; outline: none; transition: border-color 0.3s ease; box-sizing: border-box;"
          />
        </div>

        <!-- Dynamic Progress Bar & Status Gauge -->
        <div style="margin-bottom: 25px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.85rem; color: #94A3B8;">Security Score:</span>
            <span style="font-weight: bold; color: ${status.color}; font-size: 0.95rem;">
              ${status.label} (${score}%)
            </span>
          </div>

          <div style="width: 100%; height: 12px; background: #0F172A; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="width: ${score}%; height: 100%; background: ${status.color}; transition: width 0.4s ease, background-color 0.4s ease; box-shadow: 0 0 12px ${status.color};"></div>
          </div>
        </div>

        <!-- Real-Time Requirements Checklist -->
        <div style="background: rgba(15, 23, 42, 0.6); padding: 16px; border-radius: 12px; border: 1px solid #1E293B; margin-bottom: 20px;">
          <h4 style="margin: 0 0 12px 0; color: #F8FAFC; font-size: 0.9rem;">Strength Checklist:</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.85rem;">
            <div style="color: ${c.length ? "#34D399" : "#64748B"}; display: flex; align-items: center; gap: 6px;">
              <span>${c.length ? "✔" : "✖"}</span> At least 8 characters
            </div>
            <div style="color: ${c.uppercase ? "#34D399" : "#64748B"}; display: flex; align-items: center; gap: 6px;">
              <span>${c.uppercase ? "✔" : "✖"}</span> Uppercase letters (A-Z)
            </div>
            <div style="color: ${c.lowercase ? "#34D399" : "#64748B"}; display: flex; align-items: center; gap: 6px;">
              <span>${c.lowercase ? "✔" : "✖"}</span> Lowercase letters (a-z)
            </div>
            <div style="color: ${c.number ? "#34D399" : "#64748B"}; display: flex; align-items: center; gap: 6px;">
              <span>${c.number ? "✔" : "✖"}</span> Numbers (0-9)
            </div>
            <div style="color: ${c.special ? "#34D399" : "#64748B"}; display: flex; align-items: center; gap: 6px; grid-column: span 2;">
              <span>${c.special ? "✔" : "✖"}</span> Special symbols (@, #, $, %, !, etc.)
            </div>
          </div>
        </div>

        <!-- Submit & XP Claim Section -->
        <div style="text-align: center;">
          <button 
            id="claim-btn" 
            style="width: 100%; padding: 12px; border-radius: 10px; border: none; background: ${score >= 90 ? "#22D3EE" : "#334155"}; color: ${score >= 90 ? "#070B14" : "#94A3B8"}; font-weight: bold; font-size: 1rem; cursor: ${score >= 90 ? "pointer" : "not-allowed"}; transition: all 0.3s ease;"
            ${score < 90 ? "disabled" : ""}
          >
            ${isCompleted ? "✅ Mission Completed (500 XP Awarded)" : "🚀 Claim 500 XP & Save Progress"}
          </button>
        </div>

        <!-- Feedback Notification -->
        ${
          fb
            ? `
          <div style="margin-top: 15px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid #34D399; padding: 12px; border-radius: 6px; color: #F8FAFC; font-size: 0.88rem;">
            ${fb}
          </div>
        `
            : ""
        }

      </div>
    `;

    // Re-attach input focus and listener
    const inputEl = document.getElementById("pwd-input");
    if (inputEl) {
      inputEl.focus();
      // Cursor position maintained at end
      inputEl.setSelectionRange(inputVal.length, inputVal.length);

      inputEl.oninput = (e) => {
        inputVal = e.target.value;
        fb = "";
        render();
      };
    }
  }

  A.onclick = (ev) => {
    const btn = ev.target.closest("button");
    if (!btn) return;

    if (btn.id === "claim-btn" && score >= 90) {
      T.gain("pass:strength", 500, "Password Master");
      T.complete("pass", 500);
      fb =
        "🎉 <b>Outstanding!</b> You created an unbreakable password passphrase. Mission Accomplished!";
      render();
    }
  };

  render();
})();
