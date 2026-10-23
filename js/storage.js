/* Central storage + XP rules. XP is DERIVED from unique reward keys, so refresh/replay can never duplicate it. */
const CS=(()=>{
const KEY='cybershield.v1',MAX={phish:300,pass:500,safe:400,arena:1000},ORDER=['phish','pass','safe','arena'];
const RANKS=[[2200,'Cyber Champion'],[1200,'Privacy Protector'],[800,'Security Guardian'],[300,'Link Scout'],[0,'Rookie Cadet']];
const BADGES=[['phish','Link Sleuth','🔍','Finish The Link Lab'],['pass','Password Guardian','🔐','Finish Password Fortress'],['safe','Privacy Protector','🛡️','Finish Digital Footprint Rescue'],['arena','Cyber Champion','🏆','Finish Operation: Secure the Academy']];
const listeners=[];
function load(){try{const r=JSON.parse(localStorage.getItem(KEY)||'null');
 if(r&&r.v===1&&r.g&&typeof r.g==='object'){const g={};for(const k in r.g){const n=r.g[k];if(typeof n==='number'&&n>=0&&n<=1000&&/^[a-z]+:/.test(k))g[k]=n}
 const d={};for(const m of ORDER)if(r.d&&typeof r.d[m]==='string')d[m]=r.d[m].slice(0,10);
 return{v:1,g,d,log:Array.isArray(r.log)?r.log.filter(x=>x&&typeof x.m==='string').slice(-30):[]}}}catch(e){}
 return{v:1,g:{},d:{},log:[]}}
let S=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const fire=(x)=>listeners.forEach(f=>f(x));
const api={MAX,ORDER,BADGES,
 on:f=>listeners.push(f),
 has:k=>k in S.g,
 xp:m=>Math.min(MAX[m],Object.keys(S.g).filter(k=>k.startsWith(m+':')).reduce((a,k)=>a+S.g[k],0)),
 total:()=>ORDER.reduce((a,m)=>a+api.xp(m),0),
 done:m=>!!S.d[m],
 doneCount:()=>ORDER.filter(api.done).length,
 rank:()=>(RANKS.find(r=>api.total()>=r[0])||RANKS[4])[1],
 nextRank:()=>{const t=api.total(),n=[...RANKS].reverse().find(r=>r[0]>t);return n?{name:n[1],need:n[0]-t}:null},
 unlocked:m=>{const i=ORDER.indexOf(m);return i<1||api.done(ORDER[i-1])},
 badges:()=>BADGES.filter(b=>api.done(b[0])),
 log:()=>S.log.slice(-6).reverse(),
 gain(k,xp,msg){if(k in S.g)return false;const m=k.split(':')[0];if(!MAX[m])return false;
  S.g[k]=Math.max(0,Math.min(Number(xp)||0,MAX[m]));S.log.push({t:Date.now(),m:msg||k});S.log=S.log.slice(-30);save();fire({xp:S.g[k],msg});return true},
 complete(m,bonus){api.gain(m+':complete',bonus,'Mission complete: '+m);if(!S.d[m]){S.d[m]=new Date().toISOString().slice(0,10);
  S.log.push({t:Date.now(),m:'Badge earned: '+BADGES[ORDER.indexOf(m)][1]});save();fire({badge:BADGES[ORDER.indexOf(m)][1]})}}};
return api})();
