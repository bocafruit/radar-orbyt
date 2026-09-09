const VERSION = 'RADAR v0.4.1.1 Cloud';
const BRAVE_API = 'https://api.search.brave.com/res/v1/web/search';
const SERPAPI_API = 'https://serpapi.com/search';

const HTML = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>RADAR — ORBYT</title>
<style>
:root{--bg:#070914;--panel:#101426;--panel2:#161b32;--text:#f7f8ff;--muted:#99a1c2;--line:#252c4d;--purple:#9b6cff;--cyan:#55d5ff;--green:#69f0b5;--amber:#ffd166;--red:#ff6f91;--shadow:0 18px 50px rgba(0,0,0,.35)}
*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;background:radial-gradient(circle at 20% 0,#16122f 0,transparent 34%),radial-gradient(circle at 90% 15%,#082a35 0,transparent 30%),var(--bg);color:var(--text);min-height:100vh}.wrap{max-width:1100px;margin:auto;padding:22px 16px 80px}.hero{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:22px}.brand{display:flex;align-items:center;gap:14px}.radar{width:54px;height:54px;border:1px solid #5c68a8;border-radius:50%;position:relative;box-shadow:0 0 26px rgba(85,213,255,.16) inset,0 0 22px rgba(155,108,255,.12)}.radar:before,.radar:after{content:"";position:absolute;inset:11px;border:1px solid #39446e;border-radius:50%}.radar:after{inset:25px;background:var(--green);border:none;box-shadow:0 0 14px var(--green)}.beam{position:absolute;left:50%;top:50%;width:22px;height:1px;background:linear-gradient(90deg,var(--green),transparent);transform-origin:0 50%;animation:spin 2.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}h1{font-size:24px;margin:0;letter-spacing:.12em}.sub{color:var(--muted);font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-top:5px}.version{font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:7px 10px;background:#0b0e1a}.panel{background:linear-gradient(180deg,rgba(22,27,50,.96),rgba(12,15,29,.96));border:1px solid var(--line);border-radius:22px;padding:18px;box-shadow:var(--shadow)}.grid{display:grid;grid-template-columns:1.25fr 1fr .9fr .9fr 1fr;gap:12px}.field label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.11em;color:var(--muted);margin:0 0 7px}.field input,.field select{width:100%;height:44px;border:1px solid #30385f;background:#0a0d1b;color:#fff;border-radius:13px;padding:0 12px;outline:none}.field input:focus,.field select:focus{border-color:var(--purple);box-shadow:0 0 0 3px rgba(155,108,255,.12)}.actions{display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap}.btn{border:0;border-radius:13px;padding:12px 15px;font-weight:800;cursor:pointer;color:#fff;background:linear-gradient(135deg,#7a5cff,#38bdf8);box-shadow:0 10px 24px rgba(100,90,255,.22)}.btn.secondary{background:#171d35;border:1px solid #313a62;box-shadow:none}.btn:disabled{opacity:.55;cursor:wait}.status{font-size:12px;color:var(--muted)}.resultsHead{display:flex;justify-content:space-between;align-items:end;margin:26px 2px 12px}.resultsHead h2{font-size:17px;margin:0}.count{font-size:12px;color:var(--muted)}.cards{display:grid;gap:13px}.card{background:linear-gradient(180deg,#11162a,#0b0f1e);border:1px solid var(--line);border-radius:19px;padding:16px;box-shadow:0 12px 30px rgba(0,0,0,.22)}.top{display:flex;gap:12px;justify-content:space-between;align-items:flex-start}.title{font-weight:900;font-size:17px;line-height:1.2}.source{font-size:11px;color:var(--muted);margin-top:6px;max-width:680px}.badge{white-space:nowrap;font-size:10px;font-weight:900;border-radius:999px;padding:7px 9px;background:rgba(105,240,181,.1);color:var(--green);border:1px solid rgba(105,240,181,.25)}.badge.mid{color:var(--amber);border-color:rgba(255,209,102,.25);background:rgba(255,209,102,.08)}.badge.weak{color:#aab2d6;border-color:#3a4267;background:#14192b}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.metric{background:#0a0e1c;border:1px solid #202744;border-radius:12px;padding:10px}.metric b{display:block;font-size:18px}.metric span{display:block;color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin-top:3px}.why{border-top:1px solid #212744;padding-top:12px;color:#cad0eb;font-size:12px;line-height:1.5}.why b{color:#fff}.cardActions{display:flex;gap:9px;flex-wrap:wrap;margin-top:13px}.linkbtn,.curatorBtn{display:inline-flex;align-items:center;text-decoration:none;border-radius:11px;padding:10px 12px;font-size:12px;font-weight:800;color:#fff;background:#171d35;border:1px solid #30385f;cursor:pointer}.curatorBtn{background:linear-gradient(135deg,rgba(155,108,255,.18),rgba(85,213,255,.12));border-color:#514b91}.curatorBox{margin-top:12px;display:none;background:#090d1a;border:1px solid #272e50;border-radius:14px;padding:12px}.curatorBox.open{display:block}.curatorGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.kv{background:#0d1223;border-radius:10px;padding:9px}.kv small{display:block;color:var(--muted);font-size:9px;text-transform:uppercase;letter-spacing:.08em}.kv div{font-size:12px;margin-top:4px;word-break:break-word}.ciHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.ciTitle{font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#fff}.ciScore{font-size:11px;font-weight:900;border:1px solid #3b4774;background:#11172b;border-radius:999px;padding:6px 9px}.conf{display:inline-flex;align-items:center;margin-left:6px;padding:3px 6px;border-radius:999px;font-size:9px;font-weight:900;letter-spacing:.04em}.conf.high{color:var(--green);background:rgba(105,240,181,.09);border:1px solid rgba(105,240,181,.22)}.conf.medium{color:var(--amber);background:rgba(255,209,102,.08);border:1px solid rgba(255,209,102,.22)}.conf.low{color:#aab2d6;background:#14192b;border:1px solid #353d62}.contactValue{display:flex;align-items:center;gap:5px;flex-wrap:wrap}.microAction{border:1px solid #30385f;background:#151b31;color:#fff;border-radius:9px;padding:7px 9px;font-size:10px;font-weight:800;cursor:pointer}.microAction:disabled{opacity:.5}.association{margin-top:10px;padding:10px;border-radius:11px;border:1px solid #232b4b;background:#0b1020;color:#bdc5e5;font-size:11px;line-height:1.45}.empty{padding:40px 18px;text-align:center;color:var(--muted);border:1px dashed #2b3356;border-radius:18px}.error{color:#ff9bb1}.hidden{display:none}.scanPanel{display:none;margin-top:16px;overflow:hidden;position:relative;background:linear-gradient(180deg,rgba(10,18,35,.98),rgba(7,10,22,.98));border:1px solid #2c3964;border-radius:22px;padding:18px;box-shadow:0 16px 45px rgba(0,0,0,.28),0 0 40px rgba(85,213,255,.05) inset}.scanPanel.active{display:block}.scanPanel:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(85,213,255,.035),transparent);transform:translateX(-100%);animation:scanShimmer 2.2s linear infinite;pointer-events:none}@keyframes scanShimmer{to{transform:translateX(100%)}}.scanLayout{display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:center}.scanRadar{width:132px;height:132px;margin:auto;border-radius:50%;position:relative;overflow:hidden;border:1px solid rgba(85,213,255,.42);background:repeating-radial-gradient(circle,transparent 0 21px,rgba(85,213,255,.13) 22px 23px),linear-gradient(90deg,transparent 49.5%,rgba(85,213,255,.12) 50%,transparent 50.5%),linear-gradient(0deg,transparent 49.5%,rgba(85,213,255,.12) 50%,transparent 50.5%),radial-gradient(circle,rgba(20,65,72,.3),#07101d 70%);box-shadow:0 0 34px rgba(85,213,255,.12),0 0 28px rgba(105,240,181,.06) inset}.scanSweep{position:absolute;inset:50% 0 0 50%;transform-origin:0 0;background:conic-gradient(from 270deg,rgba(105,240,181,.58),rgba(85,213,255,.15) 28deg,transparent 65deg);animation:scanSpin 2s linear infinite}.scanSweep:after{content:"";position:absolute;left:0;top:0;width:64px;height:1px;background:linear-gradient(90deg,var(--green),transparent);box-shadow:0 0 8px var(--green)}@keyframes scanSpin{to{transform:rotate(360deg)}}.scanDot{position:absolute;width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 12px var(--green);opacity:.15;animation:ping 2.4s ease-in-out infinite}.scanDot.d1{left:68%;top:30%;animation-delay:.2s}.scanDot.d2{left:28%;top:62%;animation-delay:1.1s}.scanDot.d3{left:61%;top:70%;animation-delay:1.7s}@keyframes ping{0%,35%,100%{opacity:.12;transform:scale(.7)}45%,65%{opacity:1;transform:scale(1.4)}}.scanEyebrow{font-size:10px;letter-spacing:.18em;color:var(--green);font-weight:900;text-transform:uppercase}.scanTitle{font-size:19px;font-weight:900;margin-top:5px}.scanMessage{font-size:12px;color:#c5cce8;margin-top:6px;min-height:18px}.progressRow{display:flex;align-items:center;gap:12px;margin-top:15px}.progressTrack{height:8px;flex:1;background:#10162a;border:1px solid #263052;border-radius:999px;overflow:hidden}.progressFill{height:100%;width:4%;border-radius:999px;background:linear-gradient(90deg,var(--purple),var(--cyan),var(--green));transition:width .5s ease;box-shadow:0 0 14px rgba(85,213,255,.35)}.progressPct{width:42px;text-align:right;font-size:12px;font-weight:900;color:#fff}.scanStats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px}.scanStat{padding:9px 10px;background:#0a0f20;border:1px solid #202a4b;border-radius:11px}.scanStat b{display:block;font-size:15px}.scanStat span{display:block;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:2px}.scanFooter{display:flex;justify-content:space-between;gap:12px;margin-top:11px;color:var(--muted);font-size:10px}.scanPulse{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--green);margin-right:6px;box-shadow:0 0 8px var(--green);animation:pulse 1s ease-in-out infinite}@keyframes pulse{50%{opacity:.3;transform:scale(.7)}}@media(max-width:820px){.grid{grid-template-columns:1fr 1fr}.metrics{grid-template-columns:1fr 1fr}}@media(max-width:700px){.scanLayout{grid-template-columns:1fr}.scanRadar{width:112px;height:112px}.scanStats{grid-template-columns:1fr 1fr}.scanFooter{flex-direction:column;gap:4px}}@media(max-width:520px){.wrap{padding:16px 12px 60px}.hero{align-items:flex-start}.version{display:none}.grid{grid-template-columns:1fr}.panel{padding:14px}.top{gap:8px}.badge{font-size:9px}.curatorGrid{grid-template-columns:1fr}.title{font-size:16px}}

/* v0.4.0F Premium Result Cards */
.orbytLogo{width:118px;height:42px;object-fit:contain;object-position:left center;filter:drop-shadow(0 0 12px rgba(255,255,255,.06))}.brandDivider{width:1px;height:34px;background:linear-gradient(transparent,#39446e,transparent);margin:0 2px}.card{padding:15px}.cardBody{display:grid;grid-template-columns:minmax(0,1fr) 118px;gap:14px;align-items:stretch}.cardMain{min-width:0}.scoreRail{border-left:1px solid #202744;padding-left:11px;display:flex;flex-direction:column;gap:7px;justify-content:center}.scoreMini{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}.scoreMini b{font-size:12px;color:#fff;letter-spacing:0}.scoreBar{height:3px;background:#151c32;border-radius:99px;overflow:hidden;margin-top:3px}.scoreBar i{display:block;height:100%;background:linear-gradient(90deg,var(--purple),var(--cyan),var(--green));border-radius:99px}.contactPanel{margin-top:12px;padding:11px;border:1px solid #263052;border-radius:13px;background:linear-gradient(180deg,#0b1122,#090d1a)}.contactHead{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--green);font-weight:900;margin-bottom:8px}.contactList{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.contactItem{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding:8px 9px;background:#0d1325;border:1px solid #202947;border-radius:10px}.contactMeta{min-width:0}.contactMeta small{display:block;color:var(--muted);font-size:8px;text-transform:uppercase;letter-spacing:.08em}.contactMeta strong{display:block;margin-top:2px;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.contactAction{flex:0 0 auto;text-decoration:none;border:1px solid #344064;background:#151c32;color:#fff;border-radius:8px;padding:6px 8px;font-size:9px;font-weight:800;cursor:pointer}.noContacts{font-size:10px;color:var(--muted)}.cardActions{margin-top:10px}.linkbtn{padding:8px 10px;font-size:10px}.scanSweep{position:absolute;inset:0;transform-origin:50% 50%;background:conic-gradient(from -90deg at 50% 50%,rgba(105,240,181,.52) 0deg,rgba(85,213,255,.13) 32deg,transparent 68deg,transparent 360deg);animation:scanSpin 2s linear infinite}.scanSweep:after{content:"";position:absolute;left:50%;top:50%;width:50%;height:1px;transform-origin:0 50%;background:linear-gradient(90deg,var(--green),rgba(105,240,181,.35),transparent);box-shadow:0 0 8px var(--green)}@keyframes scanSpin{to{transform:rotate(360deg)}}
@media(max-width:700px){.orbytLogo{width:96px;height:34px}.brandDivider{height:28px}.cardBody{grid-template-columns:1fr}.scoreRail{border-left:0;border-top:1px solid #202744;padding:9px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.scoreMini{display:block;text-align:center;background:#0a0f20;border:1px solid #202947;border-radius:9px;padding:6px 4px}.scoreMini b{display:block;margin-top:2px}.scoreBar{display:none}.contactList{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.hero{gap:10px}.brand{gap:9px}.orbytLogo{width:84px;height:30px}h1{font-size:20px}.sub{font-size:9px}.contactList{grid-template-columns:1fr}.card{padding:13px}}

/* v0.4.1 Product UI Foundation */
.orbytLogo,.brandDivider,.scoreRail{display:none!important}
.heroTools{display:flex;align-items:center;gap:8px}.langSelect,.sortSelect{height:36px;border:1px solid #30385f;background:#0b0f1e;color:#fff;border-radius:11px;padding:0 10px;font-weight:800;outline:none}
.resultsTools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}.filterChip{border:1px solid #30385f;background:#0d1223;color:#aeb6d6;border-radius:999px;padding:8px 10px;font-size:10px;font-weight:800;cursor:pointer}.filterChip.active{color:var(--green);border-color:rgba(105,240,181,.4);background:rgba(105,240,181,.08)}
.cardBody{display:block!important}.cardMain{width:100%}.contactPanel{margin-top:12px}.legalFooter{margin-top:34px;padding:20px 4px 4px;border-top:1px solid #202744;color:#7f88aa;font-size:10px;line-height:1.55}.legalFooter strong{color:#b7bfdd}.legalLinks{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}.legalLinks button{border:0;background:none;color:#9aa6d0;padding:0;font:inherit;text-decoration:underline;cursor:pointer}.legalNote{max-width:850px}
@media(max-width:700px){.resultsHead{align-items:flex-start;gap:10px;flex-direction:column}.resultsTools{justify-content:flex-start;width:100%}.sortSelect{flex:1;min-width:150px}.heroTools{margin-left:auto}}

</style>
</head>
<body><main class="wrap">
<section class="hero"><div class="brand"><div class="radar"><div class="beam"></div></div><div><h1>RADAR</h1><div class="sub" data-i18n="subtitle">Playlist Intelligence</div></div></div><div class="heroTools"><select id="language" class="langSelect" aria-label="Language"><option value="it">IT</option><option value="en">EN</option><option value="es">ES</option><option value="fr">FR</option></select><div class="version">v0.4.1.1</div></div></section>
<section class="panel">
<div class="grid">
<div class="field"><label>Genere principale</label><input id="genre" value="melodic techno" placeholder="es. melodic techno" /></div>
<div class="field"><label>Artisti simili</label><input id="artists" placeholder="es. Anyma, Massano" /></div>
<div class="field"><label>Modalità</label><select id="mode"><option value="quick">Ricerca Rapida</option><option value="complete">Analisi Completa</option></select></div>
<div class="field"><label>Strategia</label><select id="strategy"><option value="balanced">Bilanciata</option><option value="audience">Audience reale</option><option value="coverage">Massima copertura</option><option value="new">Nuovi curatori</option></select></div>
<div class="field"><label>Obiettivo</label><select id="objective"><option value="contact" selected>Contact-First</option><option value="playlist">Playlist Discovery</option></select></div>
</div>
<div class="actions"><button class="btn" id="discover">Scansiona playlist</button><button class="btn secondary" id="health">Test sistema</button><span class="status" id="status">Pronto.</span></div>
</section>
<section class="scanPanel" id="scanPanel"><div class="scanLayout"><div class="scanRadar"><div class="scanSweep"></div><i class="scanDot d1"></i><i class="scanDot d2"></i><i class="scanDot d3"></i></div><div><div class="scanEyebrow"><span class="scanPulse"></span>Scansione in corso</div><div class="scanTitle" id="scanTitle">Inizializzazione RADAR…</div><div class="scanMessage" id="scanMessage">Preparo i motori di ricerca e i criteri di contatto.</div><div class="progressRow"><div class="progressTrack"><div class="progressFill" id="scanProgress"></div></div><div class="progressPct" id="scanPct">4%</div></div><div class="scanStats"><div class="scanStat"><b id="statCandidates">0</b><span>Candidate</span></div><div class="scanStat"><b id="statChecked">0</b><span>Analizzate</span></div><div class="scanStat"><b id="statContacts">0</b><span>Contatti</span></div><div class="scanStat"><b id="statGoogle">0</b><span>Google fallback</span></div></div><div class="scanFooter"><span id="scanEngine">Brave → Google fallback → RADAR</span><span id="scanTimer">Tempo 0s</span></div></div></div></section>
<div class="resultsHead"><div><h2 id="resultsTitle">Playlist contattabili</h2><span class="count" id="count">0 risultati</span></div><div class="resultsTools"><select id="sortResults" class="sortSelect"><option value="contact-desc">Contattabilità ↓</option><option value="contact-asc">Contattabilità ↑</option><option value="match-desc">Match ↓</option><option value="match-asc">Match ↑</option><option value="confidence-desc">Confidenza ↓</option><option value="confidence-asc">Confidenza ↑</option><option value="az">A–Z</option><option value="za">Z–A</option></select><button class="filterChip" data-filter="email">Email</button><button class="filterChip" data-filter="instagram">Instagram</button><button class="filterChip" data-filter="submission">Submission</button></div></div>
<div id="results" class="cards"><div class="empty">Imposta il genere e avvia RADAR. Contact-First mostra prima le playlist con almeno un canale pubblico utile: email, Instagram o submission.</div></div>
<footer class="legalFooter"><div class="legalNote" id="legalText"><strong>RADAR</strong> utilizza informazioni disponibili pubblicamente sul web per aiutare a individuare playlist e canali di contatto. I dati possono essere incompleti, non aggiornati o attribuiti in modo errato: verifica sempre le informazioni prima di utilizzarle. RADAR non è affiliato a Spotify, Google, Brave o alle piattaforme mostrate.</div><div class="legalLinks"><button type="button">Privacy</button><button type="button">Terms</button><button type="button">Data Sources</button><button type="button">Contact / Removal Request</button></div></footer>
</main>
<script>
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function metric(label,val){return '<div class="metric"><b>'+esc(val)+'</b><span>'+label+'</span></div>'}
function badgeClass(label){return label==='Strong Match'?'':label==='Worth Checking'?'mid':'weak'}
function contactSummary(r){const bits=[];if(r.email)bits.push('Email ✓');if(r.instagram)bits.push('Instagram ✓');if(r.submission)bits.push('Submission ✓');if(r.site)bits.push('Sito ✓');return bits.length?bits.join(' · '):'Contatto non ancora verificato'}
function scoreMini(label,val){const n=Math.max(0,Math.min(100,Number(val)||0));return '<div><div class="scoreMini"><span>'+label+'</span><b>'+esc(n)+'</b></div><div class="scoreBar"><i style="width:'+n+'%"></i></div></div>'}
function contactCard(label,value,action,href){if(!value)return '';const button=action==='copy'?'<button class="contactAction copyEmail" data-email="'+esc(value)+'">Copia</button>':href?'<a class="contactAction" target="_blank" rel="noopener" href="'+esc(href)+'">Apri</a>':'';return '<div class="contactItem"><div class="contactMeta"><small>'+label+'</small><strong>'+esc(value)+'</strong></div>'+button+'</div>'}
function visibleContacts(r){const rows=[];rows.push(contactCard('Email',r.email,'copy',''));rows.push(contactCard('Instagram',r.instagramHandle||r.instagram,'open',r.instagram));rows.push(contactCard('Submission',r.submission?'Invio disponibile':'','open',r.submission));rows.push(contactCard('Sito',r.site?'Sito curatore':'','open',r.site));const html=rows.filter(Boolean).join('');return '<div class="contactPanel"><div class="contactHead">● Contatti pubblici trovati</div><div class="contactList">'+(html||'<div class="noContacts">Nessun canale pubblico verificato per questa playlist.</div>')+'</div></div>'}
let radarResults=[];
const activeFilters=new Set();
function sortedFilteredResults(){
  let a=radarResults.filter(r=>(!activeFilters.has('email')||r.email)&&(!activeFilters.has('instagram')||r.instagram)&&(!activeFilters.has('submission')||r.submission));
  const s=$('#sortResults')?.value||'contact-desc';
  const n=(v)=>Number(v)||0;
  a=[...a].sort((x,y)=>{
    if(s==='contact-desc')return n(y.contactability)-n(x.contactability);
    if(s==='contact-asc')return n(x.contactability)-n(y.contactability);
    if(s==='match-desc')return n(y.match)-n(x.match);
    if(s==='match-asc')return n(x.match)-n(y.match);
    if(s==='confidence-desc')return n(y.confidence)-n(x.confidence);
    if(s==='confidence-asc')return n(x.confidence)-n(y.confidence);
    if(s==='az')return String(x.name||'').localeCompare(String(y.name||''));
    if(s==='za')return String(y.name||'').localeCompare(String(x.name||''));
    return 0;
  });
  return a;
}
function paintResults(items){
  const box=$('#results');$('#count').textContent=items.length+' risultati';
  if(!items.length){box.innerHTML='<div class="empty">Nessun risultato con i filtri selezionati.</div>';return}
  box.innerHTML=items.map((r,i)=>'<article class="card"><div class="cardBody"><div class="cardMain"><div class="top"><div><div class="title">'+esc(r.name)+'</div><div class="source">'+esc(r.snippet||r.sourceTitle||'Segnale web pubblico')+'</div></div><span class="badge '+badgeClass(r.badge)+'">'+esc(r.badge)+'</span></div>'+visibleContacts(r)+'<div class="cardActions"><a class="linkbtn" target="_blank" rel="noopener" href="'+esc(r.spotifyUrl)+'">Apri su Spotify</a></div></div></div></article>').join('');
}
function render(items){radarResults=items||[];paintResults(sortedFilteredResults())}
let scanClock=null,scanStarted=0;
function scanStart(){const p=$('#scanPanel');p.classList.add('active');scanStarted=Date.now();clearInterval(scanClock);scanClock=setInterval(()=>{$('#scanTimer').textContent='Tempo '+Math.floor((Date.now()-scanStarted)/1000)+'s';},1000);scanUpdate(4,'Avvio scansione','Interrogo i motori e costruisco la lista iniziale.',{candidates:0,checked:0,contacts:0,google:0});}
function scanUpdate(pct,title,msg,stats={}){pct=Math.max(4,Math.min(100,Math.round(pct)));$('#scanProgress').style.width=pct+'%';$('#scanPct').textContent=pct+'%';if(title)$('#scanTitle').textContent=title;if(msg)$('#scanMessage').textContent=msg;if(stats.candidates!=null)$('#statCandidates').textContent=stats.candidates;if(stats.checked!=null)$('#statChecked').textContent=stats.checked;if(stats.contacts!=null)$('#statContacts').textContent=stats.contacts;if(stats.google!=null)$('#statGoogle').textContent=stats.google;}
function scanFinish(title,msg,stats={}){scanUpdate(100,title,msg,stats);clearInterval(scanClock);scanClock=null;setTimeout(()=>$('#scanPanel').classList.remove('active'),1800);}
function scanError(msg){clearInterval(scanClock);scanClock=null;scanUpdate(100,'Scansione interrotta',msg);$('#scanEngine').textContent='Controlla lo stato dei motori e riprova';}

async function discover(){
  const b=$('#discover');b.disabled=true;
  const payload={genre:$('#genre').value.trim(),artists:$('#artists').value.trim(),mode:$('#mode').value,strategy:$('#strategy').value,objective:$('#objective').value};
  let googleUsed=0;
  const googleMax=payload.mode==='complete'?6:3;
  try{
    scanStart();
    $('#results').innerHTML='<div class="empty">Fase 1/3 · Cerco playlist candidate su Brave e, se serve, Google…</div>';
    $('#status').textContent='Discovery playlist…';
    const baseRes=await fetch('/api/discover-base',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    const base=await baseRes.json();
    if(!baseRes.ok)throw new Error(base.error||'Errore discovery');
    const candidates=base.candidates||[];
    googleUsed+=Number(base.googleUsed||0);
    scanUpdate(22,'Candidate individuate','Ora verifico quali playlist hanno contatti pubblici realmente associati.',{candidates:candidates.length,checked:0,contacts:0,google:googleUsed});
    $('#count').textContent=candidates.length+' candidate';
    if(payload.objective!=='contact'){
      render(candidates);
      scanFinish('Discovery completata',candidates.length+' playlist trovate.',{candidates:candidates.length,checked:candidates.length,contacts:0,google:googleUsed});
      $('#status').textContent='Brave '+(base.braveConfigured?'ON':'OFF')+' · Google '+(base.serpapiConfigured?'ON':'OFF')+' · '+candidates.length+' playlist';
      return;
    }
    if(!candidates.length){
      render([]);
      scanFinish('Scansione completata','Nessuna playlist candidata trovata.',{candidates:0,checked:0,contacts:0,google:googleUsed});
      $('#status').textContent='0 candidate · controlla genere o motori di ricerca';
      return;
    }
    const final=[];
    const chunkSize=3;
    for(let i=0;i<candidates.length;i+=chunkSize){
      const chunk=candidates.slice(i,i+chunkSize);
      const done=Math.min(i+chunk.length,candidates.length);
      const remainingGoogle=Math.max(0,googleMax-googleUsed);
      $('#results').innerHTML='<div class="empty">Fase 2/3 · Ricerca contatti '+i+'/'+candidates.length+'<br><br>Brave scandaglia per primo. Google interviene solo dove mancano contatti utili.</div>';
      $('#status').textContent='Ricerca contatti · '+i+'/'+candidates.length+' · Google fallback '+googleUsed+'/'+googleMax;
      const er=await fetch('/api/contact-enrich',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...payload,candidates:chunk,googleSlots:remainingGoogle})});
      const ed=await er.json();
      if(!er.ok)throw new Error(ed.error||'Errore ricerca contatti');
      googleUsed+=Number(ed.googleUsed||0);
      final.push(...(ed.results||[]));
      const liveContacts=final.filter(r=>r.contactability>=30&&(r.email||r.instagram||r.submission||r.site)).length;
      const livePct=22+Math.round((done/candidates.length)*68);
      scanUpdate(livePct,'Analisi contatti · '+done+'/'+candidates.length,'Verifico email, Instagram, submission e siti pubblici.',{candidates:candidates.length,checked:done,contacts:liveContacts,google:googleUsed});
      $('#status').textContent='Ricerca contatti · '+done+'/'+candidates.length+' · Google usato '+googleUsed+' volte';
    }
    scanUpdate(94,'Verifica finale','Incrocio le evidenze e ordino i risultati più utili.',{candidates:candidates.length,checked:candidates.length,contacts:final.filter(r=>r.contactability>=30&&(r.email||r.instagram||r.submission||r.site)).length,google:googleUsed});
    $('#results').innerHTML='<div class="empty">Fase 3/3 · Incrocio Brave + Google, verifico associazioni e ordino…</div>';
    const filtered=final.filter(r=>r.contactability>=30 && (r.email||r.instagram||r.submission||r.site))
      .sort((a,b)=>b.score-a.score||b.contactability-a.contactability);
    render(filtered.slice(0,payload.mode==='complete'?24:12));
    scanFinish('Scansione completata',filtered.length+' playlist contattabili trovate.',{candidates:candidates.length,checked:candidates.length,contacts:filtered.length,google:googleUsed});
    $('#status').textContent='Dual-engine · '+filtered.length+' contattabili su '+candidates.length+' · Google fallback '+googleUsed;
  }catch(e){
    scanError(e.message||'Errore durante la scansione');
    $('#status').innerHTML='<span class="error">'+esc(e.message)+'</span>';
  }finally{b.disabled=false}
}
function confLabel(n){n=Number(n)||0;return n>=75?['Alta','high']:n>=50?['Media','medium']:['Bassa','low']}
function confPill(n){const c=confLabel(n);return '<span class="conf '+c[1]+'">'+c[0]+' '+Math.round(Number(n)||0)+'</span>'}
function contactRow(label,value,confidence,actionHtml){return '<div class="kv"><small>'+esc(label)+'</small><div class="contactValue"><span>'+esc(value||'Non trovato')+'</span>'+(value?confPill(confidence):'')+(actionHtml||'')+'</div></div>'}
async function copyText(text,button){try{await navigator.clipboard.writeText(text);const old=button.textContent;button.textContent='Copiata';setTimeout(()=>button.textContent=old,1200)}catch(e){button.textContent='Copia fallita'}}
async function findCurator(button){const idx=button.dataset.index, box=document.getElementById('curator-'+idx);box.classList.add('open');box.innerHTML='<div class="status">Curator Intelligence: verifico associazioni e contatti pubblici…</div>';const old=button.textContent;button.textContent='Analisi curatore…';button.disabled=true;try{const res=await fetch('/api/curator',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({playlistName:button.dataset.playlistName,spotifyUrl:button.dataset.spotifyUrl})});const d=await res.json();if(!res.ok)throw new Error(d.error||'Ricerca contatti non riuscita');const links=[];if(d.instagram)links.push('<a class="linkbtn" target="_blank" rel="noopener" href="'+esc(d.instagram)+'">Apri Instagram</a>');if(d.submission)links.push('<a class="linkbtn" target="_blank" rel="noopener" href="'+esc(d.submission)+'">Apri Submission</a>');if(d.site)links.push('<a class="linkbtn" target="_blank" rel="noopener" href="'+esc(d.site)+'">Apri sito</a>');const copyEmail=d.email?'<button class="microAction copyEmail" data-email="'+esc(d.email)+'">Copia email</button>':'';box.innerHTML='<div class="ciHead"><div class="ciTitle">Curator Intelligence</div><div class="ciScore">Curator Match '+esc(d.curatorMatch)+'/100</div></div><div class="curatorGrid">'+contactRow('Possibile curatore',d.curator,d.curatorConfidence,'')+contactRow('Email pubblica',d.email,d.emailConfidence,copyEmail)+contactRow('Instagram',d.instagramHandle||d.instagram,d.instagramConfidence,'')+contactRow('Submission page',d.submission?'Disponibile':'',d.submissionConfidence,'')+contactRow('Sito',d.site,d.siteConfidence,'')+'</div><div class="association"><b>PERCHÉ QUESTO CONTATTO?</b><br>'+esc(d.reason)+'</div><div class="cardActions">'+links.join('')+'</div>'}catch(e){box.innerHTML='<div class="error">'+esc(e.message)+'</div>'}finally{button.textContent=old;button.disabled=false}}
document.addEventListener('click',e=>{const b=e.target.closest('.curatorBtn');if(b)findCurator(b);const c=e.target.closest('.copyEmail');if(c)copyText(c.dataset.email,c)});$('#discover').addEventListener('click',discover);$('#health').addEventListener('click',async()=>{try{const d=await fetch('/api/health').then(r=>r.json());$('#status').textContent=d.version+' · Brave '+(d.braveConfigured?'ON':'OFF')+' · Google '+(d.serpapiConfigured?'ON':'OFF')+' · DB '+(d.dbConfigured?'ON':'OFF')}catch(e){$('#status').textContent='Health check fallito'}});

const I18N={
 it:{title:'Playlist contattabili',legal:'<strong>RADAR</strong> utilizza informazioni disponibili pubblicamente sul web per aiutare a individuare playlist e canali di contatto. I dati possono essere incompleti, non aggiornati o attribuiti in modo errato: verifica sempre le informazioni prima di utilizzarle. RADAR non è affiliato a Spotify, Google, Brave o alle piattaforme mostrate.'},
 en:{title:'Contactable playlists',legal:'<strong>RADAR</strong> uses publicly available web information to help identify playlists and contact channels. Data may be incomplete, outdated or incorrectly attributed: always verify information before use. RADAR is not affiliated with Spotify, Google, Brave or the platforms shown.'},
 es:{title:'Playlists contactables',legal:'<strong>RADAR</strong> utiliza información disponible públicamente en la web para ayudar a identificar playlists y canales de contacto. Los datos pueden estar incompletos, desactualizados o atribuidos incorrectamente: verifica siempre la información antes de usarla. RADAR no está afiliado con Spotify, Google, Brave ni con las plataformas mostradas.'},
 fr:{title:'Playlists contactables',legal:'<strong>RADAR</strong> utilise des informations publiquement disponibles sur le web pour aider à identifier des playlists et des canaux de contact. Les données peuvent être incomplètes, obsolètes ou mal attribuées : vérifiez toujours les informations avant utilisation. RADAR n’est affilié ni à Spotify, ni à Google, ni à Brave, ni aux plateformes affichées.'}
};
function applyLanguage(){
 const l=$('#language')?.value||'it',t=I18N[l]||I18N.it;
 document.documentElement.lang=l; if($('#resultsTitle'))$('#resultsTitle').textContent=t.title;if($('#legalText'))$('#legalText').innerHTML=t.legal;
}
$('#language')?.addEventListener('change',applyLanguage);
$('#sortResults')?.addEventListener('change',()=>paintResults(sortedFilteredResults()));
document.querySelectorAll('.filterChip').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.filter;if(activeFilters.has(f))activeFilters.delete(f);else activeFilters.add(f);b.classList.toggle('active',activeFilters.has(f));paintResults(sortedFilteredResults())}));
applyLanguage();

</script></body></html>`;

function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}})}
function clamp(n,min=0,max=100){return Math.max(min,Math.min(max,Math.round(n)))}
function normalize(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function unique(arr){return [...new Set(arr.filter(Boolean))]}
function cleanPlaylistUrl(url){const m=String(url||'').match(/https?:\/\/open\.spotify\.com\/playlist\/[A-Za-z0-9]+/i);return m?m[0]:''}
function cleanTitle(title){return String(title||'').replace(/\s*[-|·]\s*Spotify.*$/i,'').replace(/^Spotify\s*[-|:]\s*/i,'').trim()||'Spotify Playlist'}
function extractEmails(text){return unique((String(text||'').match(/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/ig)||[]).map(x=>x.toLowerCase()))}
function extractInstagram(text){const matches=String(text||'').match(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._\-]+\/?/ig)||[];return unique(matches.map(x=>x.replace(/[),.;]+$/,'')))}
function instagramHandleFromUrl(url){const m=String(url||'').match(/instagram\.com\/([^/?#]+)/i);return m?'@'+m[1]:''}
function isSubmissionUrl(url){const s=normalize(url);return /(submit|submission|playlist|music|demo|groover|dailyplaylists|soundplate|linktr\.ee|beacons\.ai|forms\.gle|form)/.test(s) && !/open\.spotify\.com/.test(s)}
function extractSubmissionUrl(results){for(const r of results){if(isSubmissionUrl(r.url))return r.url;const extras=r.profile?.long_name?[r.profile.long_name]:[];for(const x of extras)if(isSubmissionUrl(x))return x}return''}
function guessCuratorName(playlistName,results){const p=normalize(playlistName);for(const r of results){const t=String(r.title||'').replace(/\s*[-|·].*$/,'').trim();const n=normalize(t);if(t && t.length>2 && t.length<80 && n!==p && !/spotify|playlist|submit|instagram|facebook/i.test(t))return t}return''}
function confidenceFromScore(n){return clamp(n,0,100)}
function hostOf(url){try{return new URL(url).hostname.replace(/^www\./,'')}catch{return''}}
function isGenericHost(h){return /^(open\.spotify\.com|spotify\.com|instagram\.com|facebook\.com|x\.com|twitter\.com|youtube\.com|tiktok\.com|soundcloud\.com)$/i.test(h)}
function contactEvidence(results,playlistName){
  const name=normalize(playlistName), words=name.split(/\s+/).filter(w=>w.length>=4);
  const rows=results.map(r=>{
    const text=normalize((r.title||'')+' '+(r.description||'')+' '+(r.url||''));
    let assoc=0;
    if(name && text.includes(name)) assoc+=45;
    const hits=words.filter(w=>text.includes(w)).length;
    assoc+=Math.min(30,hits*10);
    if(/spotify|playlist/.test(text)) assoc+=10;
    return{r,text,assoc:clamp(assoc)};
  });
  const emailMap=new Map(), igMap=new Map(), subMap=new Map(), siteMap=new Map();
  for(const row of rows){
    const combined=(row.r.title||'')+' '+(row.r.description||'')+' '+(row.r.url||'');
    for(const email of extractEmails(combined)){
      const prev=emailMap.get(email)||0;
      emailMap.set(email,Math.max(prev,row.assoc + (/@(gmail|outlook|hotmail|yahoo)\./i.test(email)?0:8)));
    }
    for(const ig of extractInstagram(combined)){
      const prev=igMap.get(ig)||0;
      igMap.set(ig,Math.max(prev,row.assoc+8));
    }
    if(isSubmissionUrl(row.r.url)){
      const prev=subMap.get(row.r.url)||0;
      subMap.set(row.r.url,Math.max(prev,row.assoc+15));
    }
    const host=hostOf(row.r.url);
    if(host && !isGenericHost(host) && /^https?:/i.test(row.r.url)){
      const prev=siteMap.get(row.r.url)||0;
      siteMap.set(row.r.url,Math.max(prev,row.assoc+5));
    }
  }
  const best=m=>[...m.entries()].sort((a,b)=>b[1]-a[1])[0]||['',0];
  return{email:best(emailMap),instagram:best(igMap),submission:best(subMap),site:best(siteMap),rows};
}

async function braveSearch(query,env,count=10){if(!env.BRAVE_API_KEY)return[];const u=new URL(BRAVE_API);u.searchParams.set('q',query);u.searchParams.set('count',String(Math.min(20,count)));u.searchParams.set('safesearch','moderate');const r=await fetch(u,{headers:{Accept:'application/json','Accept-Encoding':'gzip','X-Subscription-Token':env.BRAVE_API_KEY}});if(!r.ok)throw new Error('Brave API HTTP '+r.status);const d=await r.json();return (d.web&&d.web.results)||[]}

async function serpSearch(query,env,count=10){
  if(!env.SERPAPI_KEY)return[];
  const u=new URL(SERPAPI_API);
  u.searchParams.set('engine','google');
  u.searchParams.set('q',query);
  u.searchParams.set('api_key',env.SERPAPI_KEY);
  u.searchParams.set('num',String(Math.min(10,count)));
  u.searchParams.set('hl','en');
  u.searchParams.set('safe','active');
  const r=await fetch(u,{headers:{Accept:'application/json'}});
  if(!r.ok)throw new Error('SerpAPI HTTP '+r.status);
  const d=await r.json();
  if(d.error)throw new Error('SerpAPI: '+d.error);
  return (d.organic_results||[]).map(x=>({
    title:x.title||'',
    description:x.snippet||'',
    url:x.link||''
  }));
}


function buildQueries(input){const genre=String(input.genre||'').trim();const artists=String(input.artists||'').split(',').map(s=>s.trim()).filter(Boolean).slice(0,3);const q=[];if(genre){q.push('site:open.spotify.com/playlist "'+genre+'" playlist');q.push('"'+genre+'" "Spotify playlist" submissions curator')}for(const a of artists)q.push('"'+a+'" "'+genre+'" Spotify playlist');if(input.mode==='complete'){q.push('"'+genre+'" playlist curator Instagram');for(const a of artists)q.push('"'+a+'" playlist curator submit music')}return unique(q).slice(0,input.mode==='complete'?7:4)}

function scoreResult(r,input){const text=normalize((r.title||'')+' '+(r.description||'')+' '+(r.url||''));const genreTerms=normalize(input.genre||'').split(/\s+/).filter(x=>x.length>2);const artists=String(input.artists||'').split(',').map(normalize).filter(Boolean);const matchHits=genreTerms.filter(t=>text.includes(t)).length+artists.filter(a=>text.includes(a)).length*2;let match=clamp(40+matchHits*12);let activity=45;if(/updated|weekly|daily|new music|2026|fresh|latest/.test(text))activity+=20;if(/2025|2024|archive|old/.test(text))activity-=15;let curator=45;if(/curator|submit|submission|instagram|gmail|contact|linktr/.test(text))curator+=20;let contact=35;if(/@|instagram|submit|submission|contact|linktr|beacons/.test(text))contact+=25;let history=50;const strategy=input.strategy||'balanced';let score=.35*activity+.30*match+.15*curator+.10*contact+.10*history;if(strategy==='audience')score+=activity*.08;if(strategy==='coverage')score+=match*.05+contact*.04;if(strategy==='new')score+=curator*.05;score=clamp(score);const confidence=clamp(42+(r.description?18:0)+(cleanPlaylistUrl(r.url)?18:0)+(matchHits>0?12:0)+(contact>50?8:0));const badge=score>=72?'Strong Match':score>=55?'Worth Checking':'Weak Match';const why=[];if(match>=65)why.push('buona coerenza con genere/artisti');if(activity>=60)why.push('segnali web di attività recente');if(contact>=55)why.push('tracce pubbliche di contatto/submission');if(!why.length)why.push('match preliminare da verificare');return{score,activity:clamp(activity),match,confidence,badge,why:why.join('; ')+'.'} }

function contactabilityFromEvidence(ev){
  const email=ev.email?.[0]||'', instagram=ev.instagram?.[0]||'', submission=ev.submission?.[0]||'', site=ev.site?.[0]||'';
  const emailC=clamp(ev.email?.[1]||0), igC=clamp(ev.instagram?.[1]||0), subC=clamp(ev.submission?.[1]||0), siteC=clamp(ev.site?.[1]||0);
  let score=0;
  if(email)score+=38;
  if(instagram)score+=25;
  if(submission)score+=30;
  if(site)score+=12;
  score+=Math.round((emailC+igC+subC+siteC)/18);
  const strongest=Math.max(emailC,igC,subC,siteC);
  if(strongest<25)score=Math.min(score,28);
  return{contactability:clamp(score),email,instagram,submission,site,emailConfidence:emailC,instagramConfidence:igC,submissionConfidence:subC,siteConfidence:siteC};
}

function rescoreContactFirst(r,input){
  if((input.objective||'contact')!=='contact')return r;
  let score=clamp(r.match*.32+r.contactability*.40+r.activity*.10+r.confidence*.18);
  if(r.contactability<30)score=clamp(score-28);
  const badge=score>=74&&r.contactability>=55?'Strong Match':score>=56&&r.contactability>=30?'Worth Checking':'Weak Match';
  const why=[];
  if(r.contactability>=70)why.push('contatto pubblico forte verificato sul web');
  else if(r.contactability>=30)why.push('almeno un canale pubblico utile associato');
  if(r.match>=65)why.push('buona coerenza con genere/artisti');
  if(r.activity>=60)why.push('segnali web di attività recente');
  return{...r,score,badge,why:(why.length?why:['contatto pubblico da verificare']).join('; ')+'.'};
}

async function deepContactForCandidate(c,input,env,allowGoogle=false){
  const raw=String(c.name||'').replace(/"/g,'').trim();
  const genre=String(input.genre||'').replace(/"/g,'').trim();
  const queries=[
    '"'+raw+'" Spotify playlist curator contact email Instagram',
    '"'+raw+'" playlist submit music submission contact',
    '"'+raw+'" playlist website curator '+(genre?'"'+genre+'"':'')
  ];
  const braveBatches=await Promise.all(queries.map(q=>braveSearch(q,env,input.mode==='complete'?12:10).catch(()=>[])));
  let results=braveBatches.flat();
  let ev=contactEvidence(results,c.name);
  let ct=contactabilityFromEvidence(ev);
  let googleUsed=0;
  if(allowGoogle && env.SERPAPI_KEY && ct.contactability<30){
    const googleQuery='"'+raw+'" Spotify playlist curator email Instagram submit music contact';
    const googleResults=await serpSearch(googleQuery,env,10).catch(()=>[]);
    if(googleResults.length){
      results=results.concat(googleResults);
      ev=contactEvidence(results,c.name);
      ct=contactabilityFromEvidence(ev);
    }
    googleUsed=1;
  }
  return{result:rescoreContactFirst({...c,...ct,searchSources:googleUsed?'Brave + Google':'Brave'},input),googleUsed};
}

async function discoverBase(input,env){
  const genre=String(input.genre||'').trim();
  if(!genre)return{braveConfigured:!!env.BRAVE_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,googleUsed:0,candidates:[]};
  if(!env.BRAVE_API_KEY&&!env.SERPAPI_KEY)return{braveConfigured:false,serpapiConfigured:false,googleUsed:0,candidates:[]};
  const queries=buildQueries(input);
  const braveBatches=env.BRAVE_API_KEY?await Promise.all(queries.map(q=>braveSearch(q,env,input.mode==='complete'?12:10).catch(()=>[]))):[];
  let rawResults=braveBatches.flat();
  let googleUsed=0;
  const desired=input.mode==='complete'?10:5;
  const initialSpotifyCount=unique(rawResults.map(r=>cleanPlaylistUrl(r.url)||cleanPlaylistUrl(r.description)||cleanPlaylistUrl(r.title))).length;
  if(env.SERPAPI_KEY && initialSpotifyCount<desired){
    const artists=String(input.artists||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,2).join(' ');
    const q='"'+genre+'" Spotify playlist" curator submit music contact '+artists;
    const g=await serpSearch(q,env,10).catch(()=>[]);
    rawResults=rawResults.concat(g);
    googleUsed=1;
  }
  const map=new Map();
  for(const r of rawResults){
    const spotifyUrl=cleanPlaylistUrl(r.url)||cleanPlaylistUrl(r.description)||cleanPlaylistUrl(r.title);
    if(!spotifyUrl||map.has(spotifyUrl))continue;
    const base=scoreResult(r,input);
    map.set(spotifyUrl,{name:cleanTitle(r.title),spotifyUrl,snippet:r.description||'',sourceTitle:r.title||'',contactability:0,email:'',instagram:'',submission:'',site:'',...base});
  }
  let candidates=[...map.values()].sort((a,b)=>b.score-a.score);
  const cap=input.mode==='complete'?18:9;
  candidates=candidates.slice(0,cap);
  return{braveConfigured:!!env.BRAVE_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,googleUsed,candidates};
}

async function enrichContactBatch(input,env){
  if(!env.BRAVE_API_KEY&&!env.SERPAPI_KEY)return{braveConfigured:false,serpapiConfigured:false,googleUsed:0,results:[]};
  const candidates=Array.isArray(input.candidates)?input.candidates.slice(0,3):[];
  let slots=Math.max(0,Math.min(3,Number(input.googleSlots||0)));
  let googleUsed=0;
  const results=[];
  for(const c of candidates){
    const pack=await deepContactForCandidate(c,input,env,slots>0);
    results.push(pack.result);
    if(pack.googleUsed){googleUsed+=pack.googleUsed;slots-=pack.googleUsed}
  }
  return{braveConfigured:!!env.BRAVE_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,googleUsed,results};
}

async function discover(input,env){
  const base=await discoverBase(input,env);
  if((input.objective||'contact')!=='contact')return{braveConfigured:base.braveConfigured,serpapiConfigured:base.serpapiConfigured,googleUsed:base.googleUsed,objective:'playlist',results:base.candidates};
  const out=[];
  let googleUsed=base.googleUsed||0;
  const googleMax=input.mode==='complete'?6:3;
  for(let i=0;i<base.candidates.length;i+=3){
    const part=await enrichContactBatch({...input,candidates:base.candidates.slice(i,i+3),googleSlots:Math.max(0,googleMax-googleUsed)},env);
    googleUsed+=part.googleUsed||0;
    out.push(...part.results);
  }
  const results=out.filter(r=>r.contactability>=30&&(r.email||r.instagram||r.submission||r.site))
    .sort((a,b)=>b.score-a.score||b.contactability-a.contactability)
    .slice(0,input.mode==='complete'?24:12);
  return{braveConfigured:base.braveConfigured,serpapiConfigured:base.serpapiConfigured,googleUsed,objective:'contact',results};
}

async function discoverCurator(input,env){
  if(!env.BRAVE_API_KEY)return{curator:'',email:'',instagram:'',instagramHandle:'',submission:'',site:'',curatorMatch:0,curatorConfidence:0,emailConfidence:0,instagramConfidence:0,submissionConfidence:0,siteConfidence:0,reason:'BRAVE_API_KEY non configurata.'};
  const name=String(input.playlistName||'').trim();
  if(!name)throw new Error('Nome playlist mancante');
  const queries=[
    '"'+name+'" Spotify playlist curator email Instagram',
    '"'+name+'" submit music playlist',
    '"'+name+'" curator contact official',
    '"'+name+'" playlist website'
  ];
  const batches=await Promise.all(queries.map(q=>braveSearch(q,env,10).catch(()=>[])));
  let results=batches.flat();
  let ev=contactEvidence(results,name);
  let pre=contactabilityFromEvidence(ev);
  if(env.SERPAPI_KEY && pre.contactability<30){
    const g=await serpSearch('"'+name+'" Spotify playlist curator email Instagram submit music contact',env,10).catch(()=>[]);
    results=results.concat(g);
    ev=contactEvidence(results,name);
  }
  const email=ev.email[0]||'', instagram=ev.instagram[0]||'', submission=ev.submission[0]||'', site=ev.site[0]||'';
  const curator=guessCuratorName(name,results);
  const nameNorm=normalize(name);
  const curatorEvidence=curator?results.reduce((best,r)=>{
    const t=normalize((r.title||'')+' '+(r.description||''));
    let s=0;if(t.includes(nameNorm))s+=45;if(t.includes(normalize(curator)))s+=30;if(/curator|playlist|spotify/.test(t))s+=10;return Math.max(best,s)
  },0):0;
  const curatorConfidence=confidenceFromScore(curator?Math.max(35,curatorEvidence):0);
  const emailConfidence=confidenceFromScore(ev.email[1]);
  const instagramConfidence=confidenceFromScore(ev.instagram[1]);
  const submissionConfidence=confidenceFromScore(ev.submission[1]);
  const siteConfidence=confidenceFromScore(ev.site[1]);
  const strongest=Math.max(curatorConfidence,emailConfidence,instagramConfidence,submissionConfidence,siteConfidence);
  const evidenceCount=[curator,email,instagram,submission,site].filter(Boolean).length;
  let curatorMatch=clamp(strongest*.55 + (emailConfidence+instagramConfidence+submissionConfidence+siteConfidence)*.10 + evidenceCount*5);
  if(evidenceCount===0)curatorMatch=0;
  const reasons=[];
  if(curator)reasons.push('nome candidato associato a risultati che citano la playlist');
  if(email)reasons.push('email pubblica trovata con associazione '+(emailConfidence>=75?'forte':emailConfidence>=50?'media':'debole'));
  if(instagram)reasons.push('profilo Instagram pubblico con associazione '+(instagramConfidence>=75?'forte':instagramConfidence>=50?'media':'debole'));
  if(submission)reasons.push('pagina di submission pubblica rilevata');
  if(site)reasons.push('sito pubblico compatibile con il brand/playlist');
  if(!reasons.length)reasons.push('nessun contatto pubblico sufficientemente associato alla playlist');
  if(curatorMatch<50 && evidenceCount>0)reasons.push('associazione incerta: verifica manualmente prima del contatto');
  return{
    curator,email,instagram,instagramHandle:instagramHandleFromUrl(instagram),submission,site,
    curatorMatch,curatorConfidence,emailConfidence,instagramConfidence,submissionConfidence,siteConfidence,
    reason:reasons.join('; ')+'. RADAR usa solo segnali web pubblici e non considera una corrispondenza come verifica definitiva.'
  }
}

async function dbHealth(env){
  if(!env.DB)return{ok:false,configured:false,error:'Binding DB non disponibile'};
  try{
    const row=await env.DB.prepare("SELECT COUNT(*) AS total FROM campaigns").first();
    return{ok:true,configured:true,campaigns:Number(row?.total||0)};
  }catch(e){
    return{ok:false,configured:true,error:String(e?.message||e)};
  }
}

async function listCampaigns(env){
  if(!env.DB)throw new Error('Database DB non collegato');
  const q=await env.DB.prepare(`
    SELECT c.*,
      (SELECT COUNT(*) FROM campaign_playlists p WHERE p.campaign_id=c.id) AS playlist_count
    FROM campaigns c
    ORDER BY c.created_at DESC, c.id DESC
  `).all();
  return q.results||[];
}

async function createCampaign(input,env){
  if(!env.DB)throw new Error('Database DB non collegato');
  const name=String(input.name||'').trim();
  if(!name)throw new Error('Nome campagna obbligatorio');
  const trackTitle=String(input.trackTitle||'').trim();
  const genre=String(input.genre||'').trim();
  const strategy=String(input.strategy||'balanced').trim()||'balanced';
  const r=await env.DB.prepare(
    `INSERT INTO campaigns (name,track_title,genre,strategy,status)
     VALUES (?,?,?,?, 'active')`
  ).bind(name,trackTitle,genre,strategy).run();
  const id=Number(r.meta?.last_row_id||0);
  if(id){
    await env.DB.prepare(
      `INSERT INTO campaign_history (campaign_id,playlist_id,action,details)
       VALUES (?,NULL,'campaign_created',?)`
    ).bind(id,'Campagna creata in RADAR').run();
  }
  return{id,name,trackTitle,genre,strategy,status:'active'};
}

async function listCampaignPlaylists(campaignId,env){
  if(!env.DB)throw new Error('Database DB non collegato');
  const id=Number(campaignId);
  if(!id)throw new Error('Campaign ID non valido');
  const q=await env.DB.prepare(
    `SELECT * FROM campaign_playlists WHERE campaign_id=? ORDER BY created_at DESC,id DESC`
  ).bind(id).all();
  return q.results||[];
}

async function addPlaylistToCampaign(input,env){
  if(!env.DB)throw new Error('Database DB non collegato');
  const campaignId=Number(input.campaignId);
  const playlistName=String(input.playlistName||'').trim();
  if(!campaignId||!playlistName)throw new Error('campaignId e playlistName obbligatori');
  const spotifyUrl=String(input.spotifyUrl||'').trim();
  const curatorName=String(input.curatorName||'').trim();
  const email=String(input.email||'').trim();
  const instagram=String(input.instagram||'').trim();
  const submissionUrl=String(input.submissionUrl||'').trim();
  const radarScore=Number.isFinite(Number(input.radarScore))?Number(input.radarScore):null;
  const curatorMatch=Number.isFinite(Number(input.curatorMatch))?Number(input.curatorMatch):null;
  const r=await env.DB.prepare(
    `INSERT INTO campaign_playlists
      (campaign_id,playlist_name,spotify_url,curator_name,email,instagram,submission_url,radar_score,curator_match,contact_status)
     VALUES (?,?,?,?,?,?,?,?,?,'Da contattare')`
  ).bind(campaignId,playlistName,spotifyUrl,curatorName,email,instagram,submissionUrl,radarScore,curatorMatch).run();
  const playlistId=Number(r.meta?.last_row_id||0);
  await env.DB.prepare(
    `INSERT INTO campaign_history (campaign_id,playlist_id,action,details)
     VALUES (?,?,'playlist_added',?)`
  ).bind(campaignId,playlistId,'Playlist aggiunta alla campagna').run();
  return{id:playlistId,campaignId,playlistName,contactStatus:'Da contattare'};
}

async function updateCampaignPlaylist(input,env){
  if(!env.DB)throw new Error('Database DB non collegato');
  const id=Number(input.id);
  if(!id)throw new Error('Playlist ID non valido');
  const allowed=['Da contattare','Inviata','Risposto','Accettata','Rifiutata','Follow-up'];
  const status=allowed.includes(String(input.contactStatus||''))?String(input.contactStatus):null;
  const notes=input.notes===undefined?null:String(input.notes||'');
  const existing=await env.DB.prepare(`SELECT * FROM campaign_playlists WHERE id=?`).bind(id).first();
  if(!existing)throw new Error('Playlist campagna non trovata');
  const nextStatus=status||existing.contact_status;
  const nextNotes=notes===null?existing.notes:notes;
  const lastContact=['Inviata','Risposto','Accettata','Rifiutata','Follow-up'].includes(nextStatus)
    ? new Date().toISOString()
    : existing.last_contact_at;
  await env.DB.prepare(
    `UPDATE campaign_playlists
     SET contact_status=?,notes=?,last_contact_at=?,updated_at=CURRENT_TIMESTAMP
     WHERE id=?`
  ).bind(nextStatus,nextNotes,lastContact,id).run();
  if(nextStatus!==existing.contact_status){
    await env.DB.prepare(
      `INSERT INTO campaign_history (campaign_id,playlist_id,action,details)
       VALUES (?,?,'status_changed',?)`
    ).bind(existing.campaign_id,id,String(existing.contact_status||'')+' → '+nextStatus).run();
  }
  return{ok:true,id,contactStatus:nextStatus,notes:nextNotes,lastContactAt:lastContact};
}

async function campaignHistory(campaignId,env){
  if(!env.DB)throw new Error('Database DB non collegato');
  const id=Number(campaignId);
  if(!id)throw new Error('Campaign ID non valido');
  const q=await env.DB.prepare(
    `SELECT h.*,p.playlist_name
     FROM campaign_history h
     LEFT JOIN campaign_playlists p ON p.id=h.playlist_id
     WHERE h.campaign_id=?
     ORDER BY h.created_at DESC,h.id DESC`
  ).bind(id).all();
  return q.results||[];
}

export default {async fetch(request,env){const url=new URL(request.url);
      if(url.pathname==='/api/db-health' && request.method==='GET')return json(await dbHealth(env));

      if(url.pathname==='/api/campaigns' && request.method==='GET'){
        try{return json({ok:true,campaigns:await listCampaigns(env)})}
        catch(e){return json({ok:false,error:String(e.message||e)},500)}
      }
      if(url.pathname==='/api/campaigns' && request.method==='POST'){
        try{return json({ok:true,campaign:await createCampaign(await request.json(),env)},201)}
        catch(e){return json({ok:false,error:String(e.message||e)},400)}
      }

      const playlistListMatch=url.pathname.match(/^\/api\/campaigns\/(\d+)\/playlists$/);
      if(playlistListMatch && request.method==='GET'){
        try{return json({ok:true,playlists:await listCampaignPlaylists(playlistListMatch[1],env)})}
        catch(e){return json({ok:false,error:String(e.message||e)},400)}
      }

      const historyMatch=url.pathname.match(/^\/api\/campaigns\/(\d+)\/history$/);
      if(historyMatch && request.method==='GET'){
        try{return json({ok:true,history:await campaignHistory(historyMatch[1],env)})}
        catch(e){return json({ok:false,error:String(e.message||e)},400)}
      }

      if(url.pathname==='/api/campaign-playlists' && request.method==='POST'){
        try{return json({ok:true,playlist:await addPlaylistToCampaign(await request.json(),env)},201)}
        catch(e){return json({ok:false,error:String(e.message||e)},400)}
      }

      if(url.pathname==='/api/campaign-playlists' && request.method==='PATCH'){
        try{return json(await updateCampaignPlaylist(await request.json(),env))}
        catch(e){return json({ok:false,error:String(e.message||e)},400)}
      }
if(url.pathname==='/api/health')return json({ok:true,version:VERSION,braveConfigured:!!env.BRAVE_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,dbConfigured:!!env.DB});
if(url.pathname==='/api/discover-base'&&request.method==='POST'){try{return json(await discoverBase(await request.json(),env))}catch(e){return json({error:e.message||'Errore discovery base'},500)}}
if(url.pathname==='/api/contact-enrich'&&request.method==='POST'){try{return json(await enrichContactBatch(await request.json(),env))}catch(e){return json({error:e.message||'Errore contact enrich'},500)}}
if(url.pathname==='/api/discover'&&request.method==='POST'){try{return json(await discover(await request.json(),env))}catch(e){return json({error:e.message||'Errore discovery'},500)}}if(url.pathname==='/api/curator'&&request.method==='POST'){try{return json(await discoverCurator(await request.json(),env))}catch(e){return json({error:e.message||'Errore curator discovery'},500)}}if(url.pathname==='/'||url.pathname==='/index.html')return new Response(HTML,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});return new Response('Not Found',{status:404})}};
