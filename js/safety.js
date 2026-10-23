(()=>{const T=tracker(),A=document.getElementById('app');
const I=[['bio','Bio: “Sana, Grade 8, Green Valley School”','Bio: “Grade 8 student who loves science”',1],['route','Post: “I walk home alone at 4pm via Park Rd!”','Post: “Heading home after school!”',1],['loc','Photo caption: “📍 Live at Hilltop Mall right now”','Photo caption: “Fun weekend”',1],['ph','Profile: phone 0300-555-0100 (fictional)','Profile: (contact info removed)',1],['bd','Profile: full birthday 03 May 2011','Profile: birthday hidden',1],['sci','Post: “Loved the science fair today!”','',0]];
const W={bio:12,route:12,loc:12,ph:12,bd:12},KEYS=['vis','geo','blk'];
let sel=-1,fb='',vis=T.has('safe:vis')?'friends':'public',geo=!T.has('safe:geo'),blk=T.has('safe:blk'),reply=false;
const fixed=k=>T.has('safe:'+k);
function score(){let s=0;for(const k in W)if(fixed(k))s+=W[k];return s+(vis==='friends'?15:0)+(geo?0:15)+(blk?10:0)}
const base=0;
function render(){const sc=score(),all=Object.keys(W).every(fixed)&&vis==='friends'&&!geo&&blk;
A.innerHTML=head(3,'Digital Footprint Rescue: Protect Your Privacy','Find the risky details on a fictional profile and make safer choices.','up to 400 XP + Privacy Protector badge')+(T.practice?'<p class="note">Practice mode: no XP awarded.</p>':'')+`
<div class="two"><section class="card"><h3>FriendSpace (fictional) — @sana_demo</h3>${I.map((x,i)=>`<button class="post ${i===sel?'sel':''}" data-p="${i}">${fixed(x[0])?'✔ Fixed: '+esc(x[2]):esc(x[1])}</button>`).join('')}
<div class="card">📩 Message from <b>unknown_user77</b>: “Hi! Send me your school and your login code, I’ll help you win points.” ${blk?'<b>Blocked ✔</b>':'<br><button class="sm" data-a="blk">Block &amp; report</button> <button class="sm" data-a="rep">Reply to them</button>'}</div></section>
<section class="card"><h3>Privacy meter: <b>${sc}%</b></h3><div class="bar" role="progressbar" aria-valuenow="${sc}" aria-valuemin="0" aria-valuemax="100" aria-label="Privacy meter"><i style="width:${sc}%"></i></div><small>Started at 0% · educational indicator, not a validated privacy score. Settings never guarantee total protection.</small>
<h4>Settings</h4><label>Who can see posts <select id="vis"><option value="public" ${vis==='public'?'selected':''}>Anyone (public)</option><option value="friends" ${vis==='friends'?'selected':''}>Friends only</option></select></label><br><label><input type="checkbox" id="geo" ${geo?'checked':''}> Share live location</label>
${sel>=0?`<h4>Selected item</h4><p>${esc(I[sel][1])}</p><button class="btn" data-a="fix">${I[sel][3]?'Remove / generalize detail':'Remove it'}</button> <button class="btn ghost" data-a="keep">Keep as is</button>`:'<p class="muted">Tap an item on the left to review it.</p>'}
<p class="fb" role="status">${fb}</p></section></div>
<section class="card"><h3>What is still visible?</h3><ul>${I.filter(x=>x[3]&&!fixed(x[0])).map(x=>`<li>⚠ ${esc(x[1])}</li>`).join('')||'<li>✔ No risky details left.</li>'}<li>Audience: ${vis==='friends'?'friends only':'anyone'}; live location ${geo?'ON':'off'}</li></ul></section>
${all?`<section class="card"><h2>Rescue report</h2><p>Privacy meter 0% → <b>${sc}%</b>. XP: <b>${CS.xp('safe')}</b>/400.</p><p>Remember: never share passwords, codes, or live location with strangers. If someone threatens, pressures, or harasses you, tell a trusted adult or school staff — do not confront them yourself.</p><button class="btn" data-a="pr">Practice again</button> <a class="btn ghost" href="index.html">Back to Academy</a></section>`:''}`;
 document.getElementById('vis').onchange=e=>{vis=e.target.value;if(vis==='friends'){T.gain('safe:vis',40,'Profile set to friends only');fb='Friends-only limits who sees your posts (it is not perfect protection).'}else fb='Public means anyone can see posts.';fin()};
 document.getElementById('geo').onchange=e=>{geo=e.target.checked;if(!geo){T.gain('safe:geo',40,'Location sharing off');fb='Good: live location can reveal where you are right now.'}fin()}}
function fin(){if(Object.keys(W).every(fixed)&&vis==='friends'&&!geo&&blk)T.complete('safe',30);render()}
A.onclick=ev=>{const b=ev.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.p!==undefined){sel=+d.p;fb=''}
 else if(d.a==='fix'){const x=I[sel];if(x[3]){T.gain('safe:'+x[0],50,'Privacy risk fixed');fb='Safer! Sharing less personal detail makes you harder to track or trick.';x[0]&&(W[x[0]]!==undefined&&0)}else fb='This post is harmless — good judgment means not everything is a risk.'}
 else if(d.a==='keep'){fb=I[sel][3]?'That detail could help a stranger find or trick you. Try removing or generalizing it.':'Correct! This is a harmless post.'}
 else if(d.a==='blk'){blk=true;T.gain('safe:blk',40,'Stranger blocked & reported');fb='Blocked and reported. Also tell a trusted adult if it continues.'}
 else if(d.a==='rep')fb='Never reply or share codes/school details with strangers. Block and report instead.'
 else if(d.a==='pr'){T.set(true);vis='public';geo=true;blk=false}
 fin()};
if(!lockedGate('safe'))render()})();
