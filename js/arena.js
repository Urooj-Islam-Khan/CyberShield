(()=>{const T=tracker(),A=document.getElementById('app');
const EV=[['🚨 Sign-in alert','New sign-in to academy account from an unknown device. 7 failed attempts, then success.','7'],['💻 Session list','2 unknown sessions are active on the account.','2'],['✉️ Message','“Verify within 4 hours or lose access” with a link to a look-alike site.','4']];
const ACT=['Report the incident through the official support channel','Enable two-step verification','Do not click the message link or attachment','Review and sign out unknown sessions','Verify the alert through a known official route','Change the password using the real service'];
const ORD=[2,4,5,1,3,0];let order=[0,1,2,3,4,5],fb='',hint=false,vault=false;
const s=n=>T.has('arena:'+n);
function render(){const st=!s('s1')?1:!EV.every((_,i)=>s('ev'+i))?2:!s('s3')?3:!s('s4')?4:5;
A.innerHTML=head(4,'Operation: Secure the Academy','Investigate the alert, choose a safe response, solve the evidence code, open the vault.','up to 1000 XP + Cyber Champion badge')+(T.practice?'<p class="note">Practice mode: no XP awarded.</p>':'')+`<p><b>Stage ${st>4&&s('vault')?5:st} of 5</b> · Mission progress ${CS.xp('arena')}/1000 XP</p>
<div class="two"><section class="card console"><h3>🖥️ Security console</h3>
${st===1?`<p>🚨 ALERT: Unknown sign-in on the fictional academy account.</p><p><b>Stage 1:</b> Read the incident report: what do we know, what is suspicious, and what is uncertain?</p><button class="btn" data-a="s1">Open incident report</button>`:''}
${s('s1')?'<p class="note"><b>Known:</b> a sign-in happened. <b>Suspicious:</b> unknown device, many failed attempts. <b>Uncertain:</b> whether data was accessed.</p>':''}
${st===2||st>2?`<h4>Stage 2: Evidence (click each card)</h4><div class="grid">${EV.map((e,i)=>`<button class="card ev" data-e="${i}" ${s('s1')?'':'disabled'}><b>${e[0]}</b><br>${s('ev'+i)?esc(e[1]):'Click to inspect'}</button>`).join('')}</div>`:''}
${st>=3?`<h4>Stage 3: Put the response in a safe order</h4><ol class="ord">${order.map((a,i)=>`<li>${ACT[a]} <button class="sm" data-u="${i}" aria-label="Move up">↑</button><button class="sm" data-d="${i}" aria-label="Move down">↓</button></li>`).join('')}</ol>${s('s3')?'<p>✔ Sequence correct. This is a simplified scenario; real incidents depend on the situation, and changing a password alone is not always enough.</p>':'<button class="btn" data-a="chk">Check sequence</button>'}`:''}
${st>=4?`<h4>Stage 4: Evidence code</h4><p>Notebook: attempts, unknown sessions, hours. Enter them in that order.</p>${s('s4')?'<p>✔ Code accepted: 724</p>':'<label>Code <input id="cd" inputmode="numeric" maxlength="3" aria-label="Three digit code"></label> <button class="btn" data-a="code">Try code</button> <button class="sm" data-a="h">Hint</button>'}${hint?'<small>Use the first number in each evidence card: alert, sessions, message.</small>':''}`:''}
${st>=5?`<h4>Stage 5: The vault</h4><div class="vault ${vault||s('vault')?'open':''}">${vault||s('vault')?'🔓':'🔒'}</div>${s('vault')?'':'<button class="btn" data-a="vault">Unlock vault</button>'}`:''}
<p class="fb" role="status">${fb}</p></section>
<section class="card"><h3>📓 Investigation notebook</h3><ul>${EV.map((e,i)=>`<li>${s('ev'+i)?'✔ '+e[0]+': '+e[2]:'❔ Not yet inspected'}</li>`).join('')}</ul></section></div>
${s('vault')?`<section class="card"><h2>🏆 Cyber Champion!</h2><p>XP: <b>${CS.xp('arena')}</b>/1000. You inspected evidence, followed a safe response order (verify officially → avoid link → secure account → 2-step → revoke sessions → report), and solved the code from facts.</p><button class="btn" data-a="pr">Replay for practice</button> <a class="btn ghost" href="index.html">Back to Academy</a></section>`:''}`}
A.onclick=ev=>{const b=ev.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.a==='s1'){T.gain('arena:s1',50,'Incident report read')}
 else if(d.e!==undefined){T.gain('arena:ev'+d.e,60,'Evidence collected')}
 else if(d.u!==undefined&&+d.u>0){const i=+d.u;[order[i-1],order[i]]=[order[i],order[i-1]]}
 else if(d.d!==undefined&&+d.d<5){const i=+d.d;[order[i+1],order[i]]=[order[i],order[i+1]]}
 else if(d.a==='chk'){if(order.every((a,i)=>a===ORD[i])){T.gain('arena:s3',200,'Safe response sequence');fb=''}else fb='Not quite. Hint: verify first, avoid the link, then secure the account, then clean up and report.'}
 else if(d.a==='code'){const v=document.getElementById('cd').value;if(v==='724'){T.gain('arena:s4',200,'Evidence code solved');fb=''}else fb='That code does not match the evidence. Re-check the notebook.'}
 else if(d.a==='h')hint=true;
 else if(d.a==='vault'){vault=true;T.gain('arena:vault',370,'Vault unlocked');T.complete('arena',0);fb='Vault unlocked!'}
 else if(d.a==='pr'){T.set(true);order=[0,1,2,3,4,5];vault=false;fb=''}
 render()};
if(!lockedGate('arena'))render()})();
