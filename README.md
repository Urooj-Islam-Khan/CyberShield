# CyberShield: The Digital Detective Academy
Think Like a Detective. Act Like a Defender. A browser game teaching Grade VI–VIII students phishing detection, account security, privacy, and incident response. Plain HTML/CSS/JS, no backend, no paid services.

## Run
Open the folder in VS Code and use **Live Server** on `index.html` (or `python3 -m http.server`, then visit http://localhost:8000).

## Missions & XP (max 2200)
1. Link Lab (300) – inspect sender, real link destination, clues, verdict, safe action.
2. Password Fortress (500) – fictional word-tile passphrase, unique password, 2-step, session revoke, recovery review. No real passwords are ever entered.
3. Digital Footprint Rescue (400) – fix a fictional profile; privacy meter is computed from settings.
4. Operation: Secure the Academy (1000) – evidence, keyboard-friendly ordering (↑/↓ buttons), code puzzle, vault.
Ranks: Rookie Cadet 0, Link Scout 300, Security Guardian 800, Privacy Protector 1200, Cyber Champion 2200. Badges unlock only on mission completion. Missions unlock in order.
XP is derived from unique reward keys, so refresh/replay cannot duplicate it; Practice mode awards nothing.

## Data
Key `cybershield.v1` in localStorage: reward keys, completion dates, short activity log. No personal data. localStorage is editable by students — it is not tamper-proof. Invalid data is ignored (progress restarts for that key). **Dev reset:** DevTools console → `localStorage.removeItem('cybershield.v1')` and refresh.

## Accessibility
Semantic HTML, visible focus, keyboard-only play, status text (not colour alone), reduced-motion support, print stylesheet for the report.

## Assets
All art is original inline SVG/emoji; no external assets or fonts (system font stack).

## Testing performed
JavaScript syntax checked with `node --check`. **Not tested in a real browser** by the author tool: layouts, keyboard flow, and gameplay should be verified manually.

## Limitations
No migration from any earlier project's storage (none was provided). Evidence Expert / Safe Responder badges and a reduced-motion toggle are not implemented (OS setting is honoured). Simplified lessons, not a full security policy.

## Presentation summary
Problem: students meet scams and privacy risks early but learn passively. Solution: four hands-on simulated missions with immediate feedback. Users: Grade VIII. Innovation: inspect-and-decide gameplay, derived scoring, fully offline. Impact is untested; no measured outcomes claimed.
