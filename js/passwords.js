(() => {
  const T = tracker(),
    A = document.getElementById("app");

  // State Variables
  let mode = "personal"; // 'personal' or 'analyzer'
  let pData = { name: "", nickname: "", dob: "", fatherName: "", caste: "" };
  let generatedPwds = [];
  let submitted = false;

  let inputVal = "";
  let fb = "";
  let score = 0;

  // Function to generate dangerous passwords based on personal info
  function generateDangerousPasswords(data) {
    const list = [];
    const name = data.name.trim().toLowerCase().replace(/\s+/g, "");
    const nick = data.nickname.trim().toLowerCase().replace(/\s+/g, "");
    const father = data.fatherName.trim().toLowerCase().replace(/\s+/g, "");
    const caste = data.caste.trim().toLowerCase().replace(/\s+/g, "");
    const year = data.dob ? data.dob.split("-")[0] : "";
    const dayMonth = data.dob ? data.dob.split("-").slice(1).join("") : "";

    if (name) {
      if (year)
        list.push(`${name}${year}`, `${name}@${year}`, `${year}${name}`);
      if (nick) list.push(`${name}_${nick}`, `${nick}123`);
      list.push(`${name}123`, `${name}@123`, `${name}786`);
    }

    if (father) {
      if (year) list.push(`${father}${year}`, `${father}@${year}`);
      list.push(`${father}123`, `${father}786`);
    }

    if (caste) {
      if (year) list.push(`${caste}${year}`, `${caste}123`);
      if (name) list.push(`${name}${caste}`, `${caste}_${name}`);
    }

    if (nick && year) list.push(`${nick}${year}`, `${nick}@${year}`);

    // Fallback if very few inputs given
    if (list.length === 0) {
      list.push("user123", "pakistan123", "password123");
    }

    // Remove duplicates & return top 6
    return [...new Set(list)].slice(0, 6);
  }

  // Helper Functions for Live Analyzer
  const checkCriteria = (val) => ({
    length: val.length >= 8,
    uppercase: /[A-Z]/.test(val),
    lowercase: /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
  });

  function calculateScore(c, val) {
    let pts = 0;
    if (val.length === 0) return 0;
    if (c.length) pts += 25;
    if (val.length >= 12) pts += 15;
    if (c.uppercase) pts += 15;
    if (c.lowercase) pts += 15;
    if (c.number) pts += 15;
    if (c.special) pts += 15;
    return Math.min(pts, 100);
  }

  function getStatusInfo(s) {
    if (s === 0) return { label: "Empty", color: "#64748B" };
    if (s < 40) return { label: "🔴 Weak Password", color: "#F87171" };
    if (s < 75) return { label: "🟡 Medium Password", color: "#FBBF24" };
    if (s < 90) return { label: "🟢 Good Password", color: "#34D399" };
    return { label: "⚡ Strong Passphrase!", color: "#00F0FF" };
  }

  function render() {
    const isCompleted = T.has("pass:strength");

    A.innerHTML = `
      <div class="glass-card" style="max-width: 680px; margin: 0 auto; padding: 25px; border-radius: 16px; background: rgba(18, 24, 38, 0.85); border: 1px solid rgba(34, 211, 238, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);">
        
        <!-- Header Section -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h2 style="font-size: 1.25rem; color: #00F0FF; margin: 0; display: flex; align-items: center; gap: 8px;">
            🛡️ Mission 2: Password Guardian Lab
          </h2>
          <span style="background: rgba(167, 139, 250, 0.2); color: #A78BFA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">
            500 XP
          </span>
        </div>

        <!-- Mode Toggle Tabs -->
        <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid #1E293B; padding-bottom: 10px;">
          <button id="tab-personal" style="flex: 1; padding: 10px; border-radius: 8px; border: none; background: ${mode === "personal" ? "rgba(34, 211, 238, 0.2)" : "transparent"}; color: ${mode === "personal" ? "#00F0FF" : "#94A3B8"}; font-weight: bold; cursor: pointer; border: 1px solid ${mode === "personal" ? "#22D3EE" : "transparent"};">
            ⚠️ Step 1: Personal Info Trap Test
          </button>
          <button id="tab-analyzer" style="flex: 1; padding: 10px; border-radius: 8px; border: none; background: ${mode === "analyzer" ? "rgba(34, 211, 238, 0.2)" : "transparent"}; color: ${mode === "analyzer" ? "#00F0FF" : "#94A3B8"}; font-weight: bold; cursor: pointer; border: 1px solid ${mode === "analyzer" ? "#22D3EE" : "transparent"};">
            🧪 Step 2: Live Strength Analyzer
          </button>
        </div>

        ${mode === "personal" ? renderPersonalSection() : renderAnalyzerSection()}

        <!-- Global Mission Completion Status -->
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

    attachEvents();
  }

  function renderPersonalSection() {
    return `
      <div>
        <p style="color: #94A3B8; font-size: 0.88rem; margin-bottom: 15px; line-height: 1.4;">
          See how hackers easily guess passwords when people use personal information! Enter some sample or personal details below:
        </p>

        <!-- Form Inputs Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px;">
          <div>
            <label style="display: block; color: #CBD5E1; font-size: 0.8rem; margin-bottom: 4px;">Full Name / First Name:</label>
            <input type="text" id="p-name" value="${pData.name}" placeholder="e.g. Ali" style="width: 100%; padding: 8px 12px; border-radius: 6px; background: #0F172A; border: 1px solid #334155; color: #F8FAFC; font-size: 0.88rem; box-sizing: border-box;" />
          </div>

          <div>
            <label style="display: block; color: #CBD5E1; font-size: 0.8rem; margin-bottom: 4px;">Nickname:</label>
            <input type="text" id="p-nickname" value="${pData.nickname}" placeholder="e.g. PixelPanda" style="width: 100%; padding: 8px 12px; border-radius: 6px; background: #0F172A; border: 1px solid #334155; color: #F8FAFC; font-size: 0.88rem; box-sizing: border-box;" />
          </div>

          <div>
            <label style="display: block; color: #CBD5E1; font-size: 0.8rem; margin-bottom: 4px;">Date of Birth / Year:</label>
            <input type="date" id="p-dob" value="${pData.dob}" style="width: 100%; padding: 8px 12px; border-radius: 6px; background: #0F172A; border: 1px solid #334155; color: #F8FAFC; font-size: 0.88rem; box-sizing: border-box;" />
          </div>

          <div>
            <label style="display: block; color: #CBD5E1; font-size: 0.8rem; margin-bottom: 4px;">Father's Name / Caste / City:</label>
            <input type="text" id="p-father" value="${pData.fatherName}" placeholder="e.g. Khan / Hyderabad" style="width: 100%; padding: 8px 12px; border-radius: 6px; background: #0F172A; border: 1px solid #334155; color: #F8FAFC; font-size: 0.88rem; box-sizing: border-box;" />
          </div>
        </div>

        <button id="gen-pwd-btn" style="width: 100%; padding: 10px; border-radius: 8px; border: none; background: #22D3EE; color: #070B14; font-weight: bold; cursor: pointer; font-size: 0.95rem;">
          🔍 Predict Hacker's Password Dictionary
        </button>

        ${
          submitted
            ? `
          <div style="margin-top: 20px; background: rgba(248, 113, 113, 0.1); border: 1px dashed #F87171; padding: 15px; border-radius: 10px;">
            <h4 style="margin: 0 0 10px 0; color: #F87171; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
              🚨 Danger! Hacker Dictionary Prediction Result:
            </h4>
            <p style="color: #CBD5E1; font-size: 0.85rem; margin-bottom: 10px;">
              If you use these details, automated hacking tools can crack your account in seconds! <b>NEVER create passwords like these:</b>
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: monospace; font-size: 0.9rem;">
              ${generatedPwds
                .map(
                  (pwd) => `
                <div style="background: rgba(15, 23, 42, 0.8); padding: 8px; border-radius: 6px; color: #FBBF24; border-left: 3px solid #F87171; text-align: center;">
                  ❌ ${pwd}
                </div>
              `,
                )
                .join("")}
            </div>

            <button id="go-analyzer-btn" style="width: 100%; margin-top: 15px; padding: 10px; border-radius: 8px; border: none; background: #34D399; color: #070B14; font-weight: bold; cursor: pointer;">
              Next Step: Create an Unbreakable Passphrase ▶
            </button>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  function renderAnalyzerSection() {
    const c = checkCriteria(inputVal);
    score = calculateScore(c, inputVal);
    const status = getStatusInfo(score);
    const isCompleted = T.has("pass:strength");

    return `
      <div>
        <p style="color: #94A3B8; font-size: 0.88rem; margin-bottom: 15px; line-height: 1.4;">
          Type a test password below to analyze its strength in real time. Combine unrelated random words and symbols!
        </p>

        <!-- Test Input -->
        <div style="margin-bottom: 15px;">
          <input 
            type="text" 
            id="pwd-input" 
            value="${inputVal}" 
            placeholder="Type a random passphrase (e.g. BlueTiger#39Sky)..." 
            autocomplete="off"
            style="width: 100%; padding: 12px 16px; border-radius: 10px; background: #0F172A; border: 2px solid ${status.color}; color: #F8FAFC; font-family: monospace; font-size: 1rem; outline: none; box-sizing: border-box;"
          />
        </div>

        <!-- Progress Bar -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.85rem; color: #94A3B8;">Security Rating:</span>
            <span style="font-weight: bold; color: ${status.color}; font-size: 0.9rem;">${status.label} (${score}%)</span>
          </div>

          <div style="width: 100%; height: 10px; background: #0F172A; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="width: ${score}%; height: 100%; background: ${status.color}; transition: width 0.3s ease;"></div>
          </div>
        </div>

        <!-- Requirements Checklist -->
        <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 10px; border: 1px solid #1E293B; margin-bottom: 15px; font-size: 0.82rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div style="color: ${c.length ? "#34D399" : "#64748B"};">${c.length ? "✔" : "✖"} 8+ Characters</div>
            <div style="color: ${c.uppercase ? "#34D399" : "#64748B"};">${c.uppercase ? "✔" : "✖"} Uppercase (A-Z)</div>
            <div style="color: ${c.lowercase ? "#34D399" : "#64748B"};">${c.lowercase ? "✔" : "✖"} Lowercase (a-z)</div>
            <div style="color: ${c.number ? "#34D399" : "#64748B"};">${c.number ? "✔" : "✖"} Numbers (0-9)</div>
            <div style="color: ${c.special ? "#34D399" : "#64748B"}; grid-column: span 2;">${c.special ? "✔" : "✖"} Special Symbols (@,#,$,etc.)</div>
          </div>
        </div>

        <!-- Claim Button -->
        <button 
          id="claim-btn" 
          style="width: 100%; padding: 12px; border-radius: 10px; border: none; background: ${score >= 90 ? "#22D3EE" : "#334155"}; color: ${score >= 90 ? "#070B14" : "#94A3B8"}; font-weight: bold; cursor: ${score >= 90 ? "pointer" : "not-allowed"};"
          ${score < 90 ? "disabled" : ""}
        >
          ${isCompleted ? "✅ Mission Completed (500 XP Earned)" : "🚀 Claim 500 XP & Finish Mission"}
        </button>
      </div>
    `;
  }

  function attachEvents() {
    // Mode Switch
    const tabP = document.getElementById("tab-personal");
    const tabA = document.getElementById("tab-analyzer");

    if (tabP)
      tabP.onclick = () => {
        mode = "personal";
        render();
      };
    if (tabA)
      tabA.onclick = () => {
        mode = "analyzer";
        render();
      };

    // Personal Form Submit
    const genBtn = document.getElementById("gen-pwd-btn");
    if (genBtn) {
      genBtn.onclick = () => {
        pData.name = document.getElementById("p-name").value;
        pData.nickname = document.getElementById("p-nickname").value;
        pData.dob = document.getElementById("p-dob").value;
        pData.fatherName = document.getElementById("p-father").value;

        generatedPwds = generateDangerousPasswords(pData);
        submitted = true;
        render();
      };
    }

    const goAnaBtn = document.getElementById("go-analyzer-btn");
    if (goAnaBtn) {
      goAnaBtn.onclick = () => {
        mode = "analyzer";
        render();
      };
    }

    // Input Analyzer Listener
    const pwdIn = document.getElementById("pwd-input");
    if (pwdIn) {
      pwdIn.focus();
      pwdIn.setSelectionRange(inputVal.length, inputVal.length);
      pwdIn.oninput = (e) => {
        inputVal = e.target.value;
        render();
      };
    }

    // Claim Button Listener
    const claimBtn = document.getElementById("claim-btn");
    if (claimBtn) {
      claimBtn.onclick = () => {
        if (score >= 90) {
          T.gain("pass:strength", 500, "Password Guardian Master");
          T.complete("pass", 500);
          fb =
            "🎉 <b>Outstanding!</b> You learned why personal details make bad passwords and created a high-security passphrase!";
          render();
        }
      };
    }
  }

  render();
})();
