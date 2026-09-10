const VERSION = 'RADAR v0.4.7.19 Cloud';
const BRAVE_API = 'https://api.search.brave.com/res/v1/web/search';
const SERPAPI_API = 'https://serpapi.com/search';
const TAVILY_API = 'https://api.tavily.com/search';

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
.orbytLogo{width:118px;height:42px;object-fit:contain;object-position:left center;filter:drop-shadow(0 0 12px rgba(255,255,255,.06))}.brandDivider{width:1px;height:34px;background:linear-gradient(transparent,#39446e,transparent);margin:0 2px}.card{padding:15px}.cardBody{display:grid;grid-template-columns:minmax(0,1fr) 118px;gap:14px;align-items:stretch}.cardMain{min-width:0}.scoreRail{border-left:1px solid #202744;padding-left:11px;display:flex;flex-direction:column;gap:7px;justify-content:center}.scoreMini{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}.scoreMini b{font-size:12px;color:#fff;letter-spacing:0}.scoreBar{height:3px;background:#151c32;border-radius:99px;overflow:hidden;margin-top:3px}.scoreBar i{display:block;height:100%;background:linear-gradient(90deg,var(--purple),var(--cyan),var(--green));border-radius:99px}.contactPanel{margin-top:12px;padding:11px;border:1px solid #263052;border-radius:13px;background:linear-gradient(180deg,#0b1122,#090d1a)}.contactHead{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--green);font-weight:900;margin-bottom:8px}.contactList{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.contactItem{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding:8px 9px;background:#0d1325;border:1px solid #202947;border-radius:10px}.contactMeta{min-width:0}.contactMeta small{display:block;color:var(--muted);font-size:8px;text-transform:uppercase;letter-spacing:.08em}.contactMeta strong{display:block;margin-top:2px;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.contactConfidence{display:inline-flex;align-items:center;margin-left:6px;padding:3px 6px;border-radius:999px;font-size:8px;font-weight:900;letter-spacing:.05em;vertical-align:middle}.contactConfidence.high{color:var(--green);background:rgba(105,240,181,.09);border:1px solid rgba(105,240,181,.22)}.contactConfidence.medium{color:var(--amber);background:rgba(255,209,102,.08);border:1px solid rgba(255,209,102,.22)}.contactConfidence.low{color:#aab2d6;background:#14192b;border:1px solid #353d62}.contactAction{flex:0 0 auto;text-decoration:none;border:1px solid #344064;background:#151c32;color:#fff;border-radius:8px;padding:6px 8px;font-size:9px;font-weight:800;cursor:pointer}.noContacts{font-size:10px;color:var(--muted)}.cardActions{margin-top:10px}.linkbtn{padding:8px 10px;font-size:10px}.scanSweep{position:absolute;inset:0;transform-origin:50% 50%;background:conic-gradient(from -90deg at 50% 50%,rgba(105,240,181,.52) 0deg,rgba(85,213,255,.13) 32deg,transparent 68deg,transparent 360deg);animation:scanSpin 2s linear infinite}.scanSweep:after{content:"";position:absolute;left:50%;top:50%;width:50%;height:1px;transform-origin:0 50%;background:linear-gradient(90deg,var(--green),rgba(105,240,181,.35),transparent);box-shadow:0 0 8px var(--green)}@keyframes scanSpin{to{transform:rotate(360deg)}}
@media(max-width:700px){.orbytLogo{width:96px;height:34px}.brandDivider{height:28px}.cardBody{grid-template-columns:1fr}.scoreRail{border-left:0;border-top:1px solid #202744;padding:9px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.scoreMini{display:block;text-align:center;background:#0a0f20;border:1px solid #202947;border-radius:9px;padding:6px 4px}.scoreMini b{display:block;margin-top:2px}.scoreBar{display:none}.contactList{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.hero{gap:10px}.brand{gap:9px}.orbytLogo{width:84px;height:30px}h1{font-size:20px}.sub{font-size:9px}.contactList{grid-template-columns:1fr}.card{padding:13px}}

/* v0.4.1 Product UI Foundation */
.orbytLogo,.brandDivider,.scoreRail{display:none!important}
.heroTools{display:flex;align-items:center;gap:8px}.langSelect,.sortSelect{height:36px;border:1px solid #30385f;background:#0b0f1e;color:#fff;border-radius:11px;padding:0 10px;font-weight:800;outline:none}
.resultsTools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}.filterChip{border:1px solid #30385f;background:#0d1223;color:#aeb6d6;border-radius:999px;padding:8px 10px;font-size:10px;font-weight:800;cursor:pointer}.filterChip.active{color:var(--green);border-color:rgba(105,240,181,.4);background:rgba(105,240,181,.08)}
.cardBody{display:block!important}.cardMain{width:100%}.contactPanel{margin-top:12px}.legalFooter{margin-top:34px;padding:20px 4px 4px;border-top:1px solid #202744;color:#7f88aa;font-size:10px;line-height:1.55}.legalFooter strong{color:#b7bfdd}.legalLinks{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}.legalLinks button{border:0;background:none;color:#9aa6d0;padding:0;font:inherit;text-decoration:underline;cursor:pointer}.legalNote{max-width:850px}
@media(max-width:700px){.resultsHead{align-items:flex-start;gap:10px;flex-direction:column}.resultsTools{justify-content:flex-start;width:100%}.sortSelect{flex:1;min-width:150px}.heroTools{margin-left:auto}}


/* v0.4.2 Outreach Builder */
.selectContact{width:34px;height:34px;border-radius:10px;border:1px solid #40507d;background:#151c32;color:#fff;font-size:20px;line-height:1;font-weight:800;cursor:pointer;display:inline-grid;place-items:center}
.selectContact.selected{background:rgba(105,240,181,.12);border-color:rgba(105,240,181,.5);color:var(--green)}
.emailOpen{border-color:rgba(85,213,255,.36)!important;background:rgba(85,213,255,.08)!important}
.outreachBar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%) translateY(120px);width:min(720px,calc(100% - 24px));z-index:50;padding:11px 12px;border:1px solid #39476f;border-radius:16px;background:rgba(10,14,28,.96);box-shadow:0 18px 50px rgba(0,0,0,.45),0 0 30px rgba(85,213,255,.08);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:space-between;gap:10px;transition:transform .28s ease}
.outreachBar.open{transform:translateX(-50%) translateY(0)}
.outreachCount{font-size:12px;font-weight:900}.outreachCount span{color:var(--green)}.outreachMini{font-size:9px;color:var(--muted);margin-top:2px}
.composerOverlay{position:fixed;inset:0;z-index:80;background:rgba(3,5,12,.78);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:16px}
.composerOverlay.open{display:flex}.composer{width:min(760px,100%);max-height:92vh;overflow:auto;border:1px solid #303a62;background:linear-gradient(180deg,#11162a,#080c18);border-radius:22px;padding:18px;box-shadow:0 24px 70px rgba(0,0,0,.5)}
.composerHead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.composerHead h3{margin:0;font-size:19px}.composerSub{font-size:11px;color:var(--muted);margin-top:5px}.closeComposer{width:34px;height:34px;border-radius:10px;border:1px solid #30385f;background:#151b31;color:#fff;font-size:19px;cursor:pointer}
.composeGrid{display:grid;gap:10px;margin-top:15px}.composeGrid label{font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}.composeGrid input,.composeGrid textarea{width:100%;border:1px solid #30385f;background:#080c18;color:#fff;border-radius:12px;padding:11px 12px;outline:none}.composeGrid textarea{min-height:170px;resize:vertical;line-height:1.5}
.tokenRow{display:flex;gap:6px;flex-wrap:wrap}.token{border:1px solid #30385f;background:#12182c;color:#bdc7e9;border-radius:999px;padding:6px 8px;font-size:9px;cursor:pointer}
.recipientList{display:grid;gap:7px;margin-top:12px}.recipient{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:9px 10px;border:1px solid #232b4b;background:#0b1020;border-radius:11px}.recipient strong{font-size:11px;display:block}.recipient small{font-size:9px;color:var(--muted);display:block;margin-top:2px}.recipientActions{display:flex;gap:6px}.recipientRemove{border:1px solid #3d3654;background:#171225;color:#ffc0d0;border-radius:8px;padding:7px 8px;font-size:9px;cursor:pointer}
.composeActions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:15px}.sendHint{font-size:9px;color:var(--muted);margin-top:10px;line-height:1.45}
@media(max-width:560px){.outreachBar{align-items:flex-end}.recipient{grid-template-columns:1fr}.recipientActions{justify-content:flex-start}.composer{padding:14px}}


/* v0.4.3 Playlist Covers */
.cardMain{display:grid;grid-template-columns:92px minmax(0,1fr);gap:13px;align-items:start}
.playlistCover{width:92px;height:92px;border-radius:14px;object-fit:cover;border:1px solid #2b3459;background:linear-gradient(135deg,#151b31,#0a0e1c);box-shadow:0 12px 28px rgba(0,0,0,.28)}
.playlistCoverWrap{position:relative;width:92px;height:92px;flex:0 0 auto}
.playlistCoverFallback{position:absolute;inset:0;display:grid;place-items:center;border-radius:14px;border:1px solid #2b3459;background:radial-gradient(circle at 30% 30%,rgba(85,213,255,.12),transparent 45%),linear-gradient(135deg,#151b31,#0a0e1c);color:#66719b;font-size:22px;font-weight:900}
.playlistInfo{min-width:0}
@media(max-width:560px){.cardMain{grid-template-columns:72px minmax(0,1fr);gap:11px}.playlistCoverWrap,.playlistCover{width:72px;height:72px;border-radius:12px}.playlistCoverFallback{border-radius:12px}}


/* v0.4.4 Premium Compact Cards + verified links */
.dateClock{font-size:10px;font-weight:800;letter-spacing:.06em;color:#aeb7d7;border:1px solid #252e50;background:#0b0f1e;border-radius:10px;padding:7px 9px;white-space:nowrap}
.card{padding:14px}.cardMain{grid-template-columns:96px minmax(0,1fr);gap:14px}.playlistCoverWrap,.playlistCover{width:96px;height:96px}.playlistMeta{display:flex;gap:7px;flex-wrap:wrap;margin-top:7px}.metaPill{font-size:10px;color:#aeb7d7;border:1px solid #263052;background:#0b1020;border-radius:999px;padding:5px 8px}.source{display:none!important}.badge{font-size:8px;padding:5px 7px;opacity:.78}.contactPanel{margin-top:11px;padding:9px}.contactHead{margin-bottom:7px}.contactList{display:flex;gap:7px;flex-wrap:wrap}.contactItem{min-width:0;flex:0 1 auto;padding:0;border:0;background:transparent}.contactMeta{display:none}.contactAction,.selectContact{height:34px;border-radius:10px}.contactAction{display:inline-flex;align-items:center;padding:0 10px;font-size:10px}.contactAction.pending{opacity:.55;pointer-events:none}.contactAction.invalid{display:none}.verifiedDot{font-size:8px;color:var(--green);margin-left:5px}.cardActions{display:inline-flex;margin-top:9px}.linkbtn{opacity:.72}.playlistInfo .top{align-items:flex-start}
@media(max-width:560px){.heroTools{gap:5px}.dateClock{font-size:9px;padding:7px}.cardMain{grid-template-columns:82px minmax(0,1fr);gap:11px}.playlistCoverWrap,.playlistCover{width:82px;height:82px}.title{font-size:16px}.badge{display:none}.contactPanel{margin-top:9px}.contactList{gap:6px}}


/* v0.4.5 Visual Polish */
.brand h1{font-family:"Arial Black","Helvetica Neue",Arial,sans-serif;font-weight:900;letter-spacing:.105em;line-height:.9;font-size:29px;transform:scaleX(1.04);transform-origin:left center}
.brand .sub{margin-top:8px;letter-spacing:.18em}
.dateClock{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:84px;line-height:1.15;padding:6px 8px}
.dateClock .clockDate{font-size:8px;letter-spacing:.09em;color:#8893b8;font-weight:900}
.dateClock .clockTime{font-size:11px;color:#c8d0ea;font-weight:800;margin-top:3px}
.spotifyIcon{width:15px;height:15px;display:inline-block;vertical-align:-3px;margin-right:5px}
@media(max-width:560px){.brand h1{font-size:27px}.dateClock{min-width:76px;padding:6px}.dateClock .clockDate{font-size:7px}.dateClock .clockTime{font-size:10px}}

.opportunityIdentity{font-size:10px;color:var(--muted);margin-top:5px;letter-spacing:.05em}.opportunityIdentity b{color:var(--green)}.curatorIdentity{margin-top:5px;font-size:10px;line-height:1.25;color:#8f99bb;letter-spacing:.045em}.curatorIdentity b{color:#b8c1df;font-weight:800;letter-spacing:.08em}
</style>
</head>
<body><main class="wrap">
<section class="hero"><div class="brand"><div class="radar"><div class="beam"></div></div><div><h1>RADAR</h1><div class="sub" data-i18n="subtitle">Playlist Intelligence</div></div></div><div class="heroTools"><div class="dateClock" id="dateClock">—</div><select id="language" class="langSelect" aria-label="Language"><option value="it">IT</option><option value="en">EN</option><option value="es">ES</option><option value="fr">FR</option></select><div class="version">v0.4.7.19</div></div></section>
<section class="panel">
<div class="grid">
<div class="field"><label data-i18n="genreLabel">Genere principale</label><input id="genre" value="melodic techno" placeholder="es. melodic techno" /></div>
<div class="field"><label data-i18n="artistsLabel">Artisti simili</label><input id="artists" placeholder="es. Anyma, Massano" /></div>
<div class="field"><label data-i18n="modeLabel">Modalità</label><select id="mode"><option value="quick" data-i18n="quick">Ricerca Rapida</option><option value="complete" data-i18n="complete">Analisi Completa</option></select></div>
<div class="field"><label data-i18n="strategyLabel">Strategia</label><select id="strategy"><option value="balanced" data-i18n="balanced">Bilanciata</option><option value="audience" data-i18n="audience">Audience reale</option><option value="coverage" data-i18n="coverage">Massima copertura</option><option value="new" data-i18n="newCurators">Nuovi curatori</option></select></div>
<div class="field"><label data-i18n="objectiveLabel">Obiettivo</label><select id="objective"><option value="contact" selected>Contact-First</option><option value="playlist">Playlist Discovery</option></select></div>
</div>
<div class="actions"><button class="btn" id="discover" data-i18n="scan">Scansiona playlist</button><button class="btn secondary" id="health" data-i18n="health">Test sistema</button><span class="status" id="status" data-i18n="ready">Pronto.</span></div>
</section>
<section class="scanPanel" id="scanPanel"><div class="scanLayout"><div class="scanRadar"><div class="scanSweep"></div><i class="scanDot d1"></i><i class="scanDot d2"></i><i class="scanDot d3"></i></div><div><div class="scanEyebrow"><span class="scanPulse"></span>Scansione in corso</div><div class="scanTitle" id="scanTitle">Inizializzazione RADAR…</div><div class="scanMessage" id="scanMessage">Preparo i motori di ricerca e i criteri di contatto.</div><div class="progressRow"><div class="progressTrack"><div class="progressFill" id="scanProgress"></div></div><div class="progressPct" id="scanPct">4%</div></div><div class="scanStats"><div class="scanStat"><b id="statCandidates">0</b><span>Candidate</span></div><div class="scanStat"><b id="statChecked">0</b><span>Analizzate</span></div><div class="scanStat"><b id="statContacts">0</b><span>Contatti</span></div><div class="scanStat"><b id="statGoogle">0</b><span>Google fallback</span></div></div><div class="scanFooter"><span id="scanEngine">Brave → Google fallback → RADAR</span><span id="scanTimer">Tempo 0s</span></div></div></div></section>
<div class="resultsHead"><div><h2 id="resultsTitle" data-i18n="resultsTitle">Playlist contattabili</h2><span class="count" id="count">0 risultati</span></div><div class="resultsTools"><select id="sortResults" class="sortSelect"><option value="contact-desc" data-i18n="sortContactDesc">Contattabilità ↓</option><option value="contact-asc" data-i18n="sortContactAsc">Contattabilità ↑</option><option value="match-desc" data-i18n="sortMatchDesc">Match ↓</option><option value="match-asc" data-i18n="sortMatchAsc">Match ↑</option><option value="confidence-desc" data-i18n="sortConfDesc">Confidenza ↓</option><option value="confidence-asc" data-i18n="sortConfAsc">Confidenza ↑</option><option value="az">A–Z</option><option value="za">Z–A</option></select><button class="filterChip" data-filter="email">Email</button><button class="filterChip" data-filter="instagram">Instagram</button><button class="filterChip" data-filter="submission">Submission</button></div></div>
<div id="results" class="cards"><div class="empty">Imposta il genere e avvia RADAR. Contact-First mostra prima le playlist con almeno un canale pubblico utile: email, Instagram o submission.</div></div>
<div class="outreachBar" id="outreachBar"><div><div class="outreachCount"><span id="selectedCount">0</span> <span data-i18n="selected">selezionati</span></div><div class="outreachMini" data-i18n="outreachMini">Crea un unico format e personalizzalo per ogni curatore.</div></div><button class="btn" id="openComposer" data-i18n="prepareOutreach">Prepara outreach</button></div>
<div class="composerOverlay" id="composerOverlay"><section class="composer"><div class="composerHead"><div><h3 data-i18n="composerTitle">Outreach Builder</h3><div class="composerSub" data-i18n="composerSub">Un template, email individuali e personalizzate.</div></div><button class="closeComposer" id="closeComposer">×</button></div><div class="composeGrid"><div><label data-i18n="subjectLabel">Oggetto</label><input id="mailSubject" value="Music submission for {{playlist}}" /></div><div><label data-i18n="messageLabel">Messaggio</label><textarea id="mailBody">Hi {{curator}},

I’m {{artist}} and I’d love to submit my track {{track}} for consideration on {{playlist}}.

Listen here: {{spotify_link}}

Thank you for your time.</textarea></div><div><label data-i18n="variables">Variabili rapide</label><div class="tokenRow"><button class="token" data-token="{{curator}}">{{curator}}</button><button class="token" data-token="{{playlist}}">{{playlist}}</button><button class="token" data-token="{{artist}}">{{artist}}</button><button class="token" data-token="{{track}}">{{track}}</button><button class="token" data-token="{{spotify_link}}">{{spotify_link}}</button></div></div><div><label data-i18n="artistLabel">Artista</label><input id="senderArtist" value="ORBYT" /></div><div><label data-i18n="trackLabel">Brano</label><input id="senderTrack" placeholder="es. EUPHORIA" /></div><div><label data-i18n="trackLinkLabel">Link brano</label><input id="senderTrackLink" placeholder="https://open.spotify.com/track/..." /></div></div><div class="recipientList" id="recipientList"></div><div class="composeActions"><button class="btn secondary" id="clearSelection" data-i18n="clear">Svuota lista</button></div><div class="sendHint" data-i18n="sendHint">RADAR prepara email separate: nessun destinatario vede gli altri. In questa versione l’invio finale si apre nel client email del dispositivo; l’invio diretto batch verrà collegato a un provider email autorizzato.</div></section></div>
<footer class="legalFooter"><div class="legalNote" id="legalText"><strong>RADAR</strong> utilizza informazioni disponibili pubblicamente sul web per aiutare a individuare playlist e canali di contatto. I dati possono essere incompleti, non aggiornati o attribuiti in modo errato: verifica sempre le informazioni prima di utilizzarle. RADAR non è affiliato a Spotify, Google, Brave o alle piattaforme mostrate.</div><div class="legalLinks"><button type="button">Privacy</button><button type="button">Terms</button><button type="button">Data Sources</button><button type="button">Contact / Removal Request</button></div></footer>
</main>
<script>
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function metric(label,val){return '<div class="metric"><b>'+esc(val)+'</b><span>'+label+'</span></div>'}
function badgeClass(label){return label==='Strong Match'?'':label==='Worth Checking'?'mid':'weak'}
function contactSummary(r){const bits=[];if(r.email)bits.push('Email ✓');if(r.instagram)bits.push('Instagram ✓');if(r.submission)bits.push('Submission ✓');if(r.site)bits.push('Sito ✓');return bits.length?bits.join(' · '):'Contatto non ancora verificato'}
function scoreMini(label,val){const n=Math.max(0,Math.min(100,Number(val)||0));return '<div><div class="scoreMini"><span>'+label+'</span><b>'+esc(n)+'</b></div><div class="scoreBar"><i style="width:'+n+'%"></i></div></div>'}
function t(k){
  const l=$('#language')?.value||'it';
  return (I18N[l]&&I18N[l][k]) || (I18N.it&&I18N.it[k]) || k;
}
function badgeText(label){
  if(label==='Strong Match')return t('strongMatch');
  if(label==='Worth Checking')return t('worthChecking');
  if(label==='Weak Match')return t('weakMatch');
  return label||'';
}
function badgeClass(label){return label==='Strong Match'?'':label==='Worth Checking'?'mid':'weak'}
let selectedOutreach=new Map();
function keyFor(r){return String(r.email||'').toLowerCase()}

function cleanPlaylistName(raw){
  let s=String(raw||'').replace(/<[^>]*>/g,' ').replace(/&amp;/gi,'&').replace(/\\s+/g,' ').trim();
  s=s.replace(/\s*[\|\u2022]\s*(Soundplate(?:\.com)?|Spotify|SubmitHub|Groover|Daily Playlists).*$/i,'');
  s=s.replace(/\\s*[-:]\\s*Spotify Playlist.*$/i,'');
  s=s.replace(/\\s*\\[(?:Submit Music Here|Submit(?: Your)? Music|Playlist Submission)\\].*$/i,'');
  s=s.replace(/\\s*\\((?:Submit Music Here|Submit(?: Your)? Music)\\).*$/i,'');
  s=s.replace(/\\s*[\\|\\u2022]\\s*$/,'').trim();
  return s||String(raw||'');
}
function displayPlaylistIdentity(r){
  const raw=String((r&&r.sourceTitle)||'').replace(/<[^>]*>/g,' ').replace(/&amp;/gi,'&').replace(/\u00a0/g,' ').replace(/\\s+/g,' ').trim();
  const fallback=String((r&&r.name)||'').trim();
  const enrichedCurator=String((r&&r.curator)||'').replace(/<[^>]*>/g,' ').replace(/\\s+/g,' ').trim();
  const source=(raw||fallback)
    .replace(/\\s*[|·]\\s*Spotify\\s*$/i,'')
    .replace(/\\s*[-–—:]\\s*Spotify\\s*$/i,'')
    .trim();
  const m=source.match(/^(.*?)\s*[-–—:]\s*playlist\s+by\s+(.+?)\s*$/i);
  if(m){
    const playlist=m[1].trim(),curator=m[2].trim();
    if(playlist.length>=3&&curator.length>=2&&curator.length<=100)return {name:playlist,curator:enrichedCurator||curator};
  }
  return {name:fallback||source,curator:enrichedCurator};
}

function spotifySvg(){
  return '<svg class="spotifyIcon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1ED760"/><path d="M17.7 16.5a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.35.22.46.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.55-11.96-1.4a.94.94 0 1 1-.54-1.8c4.36-1.31 9.78-.67 13.48 1.59.44.27.58.85.31 1.29Zm.13-3.4C15.43 7.53 9.04 7.32 5.35 8.44a1.12 1.12 0 1 1-.65-2.15c4.24-1.28 11.3-1.03 15.75 1.61a1.12 1.12 0 0 1-1.15 1.93Z" fill="#07120b"/></svg>';
}

function parsePlaylistMeta(r){
  const s=String((r.snippet||'')+' '+(r.sourceTitle||''));
  const out=[];
  const fol=s.match(/(\d+(?:[.,]\d+)?\s*[KMB]?)\s*(?:followers?|follower)/i);
  const sav=s.match(/(\d+(?:[.,]\d+)?\s*[KMB]?)\s*(?:saves?|saved)/i);
  const items=s.match(/(\d+(?:[.,]\d+)?\s*[KMB]?)\s*(?:items?|tracks?|songs?|brani)/i);
  if(fol)out.push({v:fol[1].replace(/\s+/g,''),k:'followers'});
  else if(sav)out.push({v:sav[1].replace(/\s+/g,''),k:'saves'});
  if(items)out.push({v:items[1].replace(/\s+/g,''),k:'tracks'});
  return out;
}
function metaHtml(r){
  const a=parsePlaylistMeta(r);
  if(!a.length)return '';
  return '<div class="playlistMeta">'+a.map(x=>'<span class="metaPill">'+esc(x.v)+' '+t(x.k)+'</span>').join('')+'</div>';
}
function updateClock(){
  const l=$('#language')?.value||'it';
  const locale={it:'it-IT',en:'en-GB',es:'es-ES',fr:'fr-FR'}[l]||'it-IT';
  const now=new Date();
  const d=new Intl.DateTimeFormat(locale,{day:'2-digit',month:'short',year:'numeric'}).format(now).replace(/\./g,'').toUpperCase();
  const tm=new Intl.DateTimeFormat(locale,{hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
  if($('#dateClock'))$('#dateClock').innerHTML='<span class="clockDate">'+esc(d)+'</span><span class="clockTime">'+esc(tm)+'</span>';
}

function contactConfidenceBadge(score){
  const n=Number(score)||0;
  const level=n>=75?'high':n>=50?'medium':'low';
  const label=n>=75?'ALTA':n>=50?'MEDIA':'BASSA';
  return '<span class="contactConfidence '+level+'">'+label+'</span>';
}
function contactCard(label,value,action,href,r,confidence){
  if(!value)return '';
  const conf=contactConfidenceBadge(confidence);
  if(action==='email'){
    const sel=selectedOutreach.has(keyFor(r));
    return '<div class="contactItem"><a class="contactAction emailOpen" href="mailto:'+encodeURIComponent(value)+'">✉ '+t('email')+conf+'</a><button class="selectContact '+(sel?'selected':'')+'" data-select-email="'+esc(value)+'" title="'+t('addToList')+'">'+(sel?'✓':'+')+'</button></div>';
  }
  if(!href)return '';
  const kind=action==='submission'?'submission':'site';
  return '<div class="contactItem"><a class="contactAction pending" data-verify-kind="'+kind+'" data-verify-url="'+esc(href)+'" target="_blank" rel="noopener" href="'+esc(href)+'">'+label+conf+' <span class="verifiedDot" style="display:none">✓</span></a></div>';
}
function visibleContacts(r){
  const rows=[];
  rows.push(contactCard('Email',r.email,'email','',r,r.emailConfidence));
  rows.push(contactCard('Instagram',r.instagramHandle||r.instagram,'site',r.instagram,r,r.instagramConfidence));
  rows.push(contactCard(t('submission'),r.submission,'submission',r.submission,r,r.submissionConfidence));
  rows.push(contactCard(t('site'),r.site,'site',r.site,r,r.siteConfidence));
  const html=rows.filter(Boolean).join('');
  if(!html)return '';
  return '<div class="contactPanel"><div class="contactHead">● '+t('publicContacts')+'</div><div class="contactList">'+html+'</div></div>';
}
let radarResults=[];
const activeFilters=new Set();
function sortedFilteredResults(){
  let a=radarResults.filter(r=>(!activeFilters.has('email')||r.email)&&(!activeFilters.has('instagram')||r.instagram)&&(!activeFilters.has('submission')||r.submission));
  const s=$('#sortResults')?.value||'contact-desc';
  const n=(v)=>Number(v)||0;
  a=[...a].sort((x,y)=>{
    if(s==='contact-desc')return n(y.opportunityScore)-n(x.opportunityScore)||n(y.contactability)-n(x.contactability);
    if(s==='contact-asc')return n(x.opportunityScore)-n(y.opportunityScore)||n(x.contactability)-n(y.contactability);
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
async function verifyVisibleLinks(){
  const nodes=[...document.querySelectorAll('[data-verify-url]')];
  if(!nodes.length)return;
  const entries=nodes.map((n,i)=>({id:i,url:n.dataset.verifyUrl,kind:n.dataset.verifyKind}));
  try{
    const res=await fetch('/api/validate-links',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({entries})});
    if(!res.ok)throw new Error('validation');
    const data=await res.json();
    const byId=new Map((data.results||[]).map(x=>[String(x.id),x]));
    nodes.forEach((n,i)=>{
      const v=byId.get(String(i));
      n.classList.remove('pending');
      if(!v||!v.ok){
        n.classList.add('invalid');
        const panel=n.closest('.contactPanel');
        if(panel){
          setTimeout(()=>{
            const usable=[...panel.querySelectorAll('.contactAction')].some(a=>!a.classList.contains('invalid')&&!a.classList.contains('pending'));
            if(!usable)panel.remove();
          },0);
        }
        return
      }
      if(v.finalUrl)n.href=v.finalUrl;
      const dot=n.querySelector('.verifiedDot');if(dot)dot.style.display='inline';
      n.title=t('verifiedLink');
    });
  }catch(e){
    nodes.forEach(n=>n.classList.remove('pending'));
  }
}

async function loadPlaylistCovers(items){
  const imgs=[...document.querySelectorAll('.playlistCover[data-cover-index]')];
  await Promise.all(imgs.map(async img=>{
    const i=Number(img.dataset.coverIndex),r=items[i];
    if(!r||!r.spotifyUrl)return;
    try{
      const u='https://open.spotify.com/oembed?url='+encodeURIComponent(r.spotifyUrl);
      const res=await fetch(u);
      if(!res.ok)return;
      const d=await res.json();
      const canonical=String(d.title||'').replace(/\\s+/g,' ').trim();
      const titleNode=document.querySelector('.title[data-title-index="'+i+'"]');
      if(titleNode&&canonical.length>=3&&canonical.length<=180)titleNode.textContent=canonical;
      if(!d.thumbnail_url)return;
      img.onload=()=>{img.style.opacity='1';const f=img.previousElementSibling;if(f)f.style.display='none'};
      img.src=d.thumbnail_url;
    }catch(e){}
  }));
}

function paintResults(items){
  const box=$('#results');$('#count').textContent=items.length+' '+t('results');
  if(!items.length){box.innerHTML='<div class="empty">'+t('noFilteredResults')+'</div>';return}
  box.innerHTML=items.map((r,i)=>'<article class="card"><div class="cardBody"><div class="cardMain"><div class="playlistCoverWrap"><div class="playlistCoverFallback">◉</div><img class="playlistCover" data-cover-index="'+i+'" alt="" loading="lazy" style="opacity:0" /></div><div class="playlistInfo"><div class="top"><div><div class="title" data-title-index="'+i+'">'+esc(displayPlaylistIdentity(r).name)+'</div>'+(displayPlaylistIdentity(r).curator?'<div class="curatorIdentity"><b>CURATOR</b> · '+esc(displayPlaylistIdentity(r).curator)+'</div>':'')+(r.opportunityScore!=null?'<div class="opportunityIdentity"><b>OPPORTUNITÀ</b> · '+esc(r.opportunityScore)+'/100</div>':'')+metaHtml(r)+'</div><span class="badge '+badgeClass(r.badge)+'">'+esc(badgeText(r.badge))+'</span></div>'+visibleContacts(r)+'<div class="cardActions"><a class="linkbtn" target="_blank" rel="noopener" href="'+esc(r.spotifyUrl)+'">'+spotifySvg()+t('spotify')+'</a></div></div></div></div></article>').join('');
  loadPlaylistCovers(items); verifyVisibleLinks();
}
function render(items){radarResults=items||[];paintResults(sortedFilteredResults())}
function updateOutreachBar(){
  $('#selectedCount').textContent=selectedOutreach.size;
  $('#outreachBar').classList.toggle('open',selectedOutreach.size>0);
  renderRecipients();updateClock();
}
function toggleRecipient(email){
  const r=radarResults.find(x=>String(x.email||'').toLowerCase()===String(email||'').toLowerCase());
  if(!r)return;
  const k=keyFor(r);
  if(selectedOutreach.has(k))selectedOutreach.delete(k);else selectedOutreach.set(k,r);
  paintResults(sortedFilteredResults());
  updateOutreachBar();
}
function fillTemplate(str,r){
  const curator=(r.curator||r.curatorName||'').trim() || t('curatorFallback');
  return String(str||'')
    .replaceAll('{{curator}}',curator)
    .replaceAll('{{playlist}}',r.name||'')
    .replaceAll('{{artist}}',$('#senderArtist').value.trim())
    .replaceAll('{{track}}',$('#senderTrack').value.trim())
    .replaceAll('{{spotify_link}}',$('#senderTrackLink').value.trim());
}
function mailtoFor(r){
  const s=fillTemplate($('#mailSubject').value,r),b=fillTemplate($('#mailBody').value,r);
  return 'mailto:'+encodeURIComponent(r.email)+'?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(b);
}
function renderRecipients(){
  const box=$('#recipientList'); if(!box)return;
  const items=[...selectedOutreach.values()];
  box.innerHTML=items.map(r=>'<div class="recipient"><div><strong>'+esc(r.name)+'</strong><small>'+esc(r.email)+'</small></div><div class="recipientActions"><a class="contactAction emailOpen" href="'+mailtoFor(r)+'">'+t('emailOpen')+'</a><button class="recipientRemove" data-remove-email="'+esc(r.email)+'">'+t('remove')+'</button></div></div>').join('');
}
let scanClock=null,scanStarted=0;
function scanStart(){const p=$('#scanPanel');p.classList.add('active');scanStarted=Date.now();clearInterval(scanClock);scanClock=setInterval(()=>{$('#scanTimer').textContent=t('time')+' '+Math.floor((Date.now()-scanStarted)/1000)+'s';},1000);scanUpdate(4,t('scanStartTitle'),t('scanStartMsg'),{candidates:0,checked:0,contacts:0,google:0});}
function scanUpdate(pct,title,msg,stats={}){pct=Math.max(4,Math.min(100,Math.round(pct)));$('#scanProgress').style.width=pct+'%';$('#scanPct').textContent=pct+'%';if(title)$('#scanTitle').textContent=title;if(msg)$('#scanMessage').textContent=msg;if(stats.candidates!=null)$('#statCandidates').textContent=stats.candidates;if(stats.checked!=null)$('#statChecked').textContent=stats.checked;if(stats.contacts!=null)$('#statContacts').textContent=stats.contacts;if(stats.google!=null)$('#statGoogle').textContent=stats.google;}
function scanFinish(title,msg,stats={}){scanUpdate(100,title,msg,stats);clearInterval(scanClock);scanClock=null;setTimeout(()=>$('#scanPanel').classList.remove('active'),1800);}
function scanError(msg){clearInterval(scanClock);scanClock=null;scanUpdate(100,t('scanInterrupted'),msg);$('#scanEngine').textContent=t('checkEngines');}

async function discover(){
  const b=$('#discover');b.disabled=true;
  const payload={genre:$('#genre').value.trim(),artists:$('#artists').value.trim(),mode:$('#mode').value,strategy:$('#strategy').value,objective:$('#objective').value};
  let googleUsed=0;
  const googleMax=payload.mode==='complete'?6:3;
  try{
    window.__radarEngines=new Set();window.__radarFailovers=new Set();
    scanStart();
    $('#results').innerHTML='<div class="empty">'+t('phase1')+'</div>';
    $('#status').textContent=t('discoveryStatus');
    const baseRes=await fetch('/api/discover-base',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    const base=await baseRes.json();
    if(!baseRes.ok)throw new Error(base.error||t('discoveryError'));
    const candidates=base.candidates||[];
    (base.enginesUsed||[]).forEach(x=>window.__radarEngines.add(x));
    (base.failoverPaths||[]).forEach(x=>window.__radarFailovers.add(x));
    googleUsed+=Number(base.googleUsed||0);
    scanUpdate(22,t('candidatesFound'),t('verifyContacts'),{candidates:candidates.length,checked:0,contacts:0,google:googleUsed});
    $('#count').textContent=candidates.length+' '+t('candidates');
    if(payload.objective!=='contact'){
      render(candidates);
      scanFinish(t('discoveryComplete'),candidates.length+' '+t('playlistsFound'),{candidates:candidates.length,checked:candidates.length,contacts:0,google:googleUsed});
      $('#status').textContent='Brave '+(base.providers?.brave?.ready?'ON':base.braveConfigured?'LIMIT':'OFF')+' · Tavily '+(base.providers?.tavily?.ready?'ON':base.tavilyConfigured?'LIMIT':'OFF')+' · Google '+(base.providers?.serpapi?.ready?'ON':base.serpapiConfigured?'LIMIT':'OFF')+' · '+candidates.length+' playlist';
      return;
    }
    if(!candidates.length){
      render([]);
      scanFinish(t('scanComplete'),t('noCandidates'),{candidates:0,checked:0,contacts:0,google:googleUsed});
      $('#status').textContent=t('zeroCandidates');
      return;
    }
    const final=[];
    const chunkSize=3;
    for(let i=0;i<candidates.length;i+=chunkSize){
      const chunk=candidates.slice(i,i+chunkSize);
      const done=Math.min(i+chunk.length,candidates.length);
      const remainingGoogle=Math.max(0,googleMax-googleUsed);
      $('#results').innerHTML='<div class="empty">'+t('phase2a')+' '+i+'/'+candidates.length+'<br><br>'+t('phase2b')+'</div>';
      $('#status').textContent=t('contactSearch')+' · '+i+'/'+candidates.length+' · Google fallback '+googleUsed+'/'+googleMax;
      const er=await fetch('/api/contact-enrich',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...payload,candidates:chunk,googleSlots:remainingGoogle})});
      const ed=await er.json();
      if(!er.ok)throw new Error(ed.error||t('contactError'));
      googleUsed+=Number(ed.googleUsed||0);
      final.push(...(ed.results||[]));
      const contactCount=final.filter(r=>r.contactability>=30&&(r.email||r.instagram||r.submission||r.site)).length;
      const pct=22+Math.round((done/candidates.length)*68);
      scanUpdate(pct,t('contactScan'),t('checked')+' '+done+' '+t('of')+' '+candidates.length+'. '+t('usefulContacts')+' '+contactCount+'.',{candidates:candidates.length,checked:done,contacts:contactCount,google:googleUsed});
    }
    scanUpdate(94,t('finalVerification'),t('cleanMerge'),{candidates:candidates.length,checked:candidates.length,contacts:final.filter(r=>r.contactability>=30&&(r.email||r.instagram||r.submission||r.site)).length,google:googleUsed});
    const useful=final.filter(r=>r.contactability>=30&&(r.email||r.instagram||r.submission||r.site)).sort((a,b)=>b.radarScore-a.radarScore);
    render(useful);
    scanFinish(t('scanComplete'),useful.length+' '+t('contactableFound'),{candidates:candidates.length,checked:candidates.length,contacts:useful.length,google:googleUsed});
    const engineText=[...window.__radarEngines].join(' + ')||'—';
    const failText=[...window.__radarFailovers][0]||'';
    $('#status').textContent=useful.length+' '+t('contactable')+' · Motori: '+engineText+(failText?' · Failover '+failText:'')+' · Google '+googleUsed+'/'+googleMax;
  }catch(e){
    scanError(e.message);
    $('#results').innerHTML='<div class="empty error">'+esc(e.message)+'</div>';
    $('#status').textContent=t('error')+': '+e.message;
  }finally{b.disabled=false}
}

$('#discover').addEventListener('click',discover);
$('#health').addEventListener('click',async()=>{try{const d=await fetch('/api/health').then(r=>r.json());$('#status').textContent=d.version+' · Brave '+(d.providers?.brave?.ready?'ON':d.braveConfigured?'LIMIT':'OFF')+' · Tavily '+(d.providers?.tavily?.ready?'ON':d.tavilyConfigured?'LIMIT':'OFF')+' · Google '+(d.providers?.serpapi?.ready?'ON':d.serpapiConfigured?'LIMIT':'OFF')+' · DB '+(d.dbConfigured?'ON':'OFF')}catch(e){$('#status').textContent=t('healthFailed')}});

const I18N={
it:{
 subtitle:'Playlist Intelligence',email:'Email',submission:'Submission',site:'Website',spotify:'Spotify',followers:'followers',saves:'saves',tracks:'tracks',verifiedLink:'Verified link',email:'Email',submission:'Submission',site:'Sito',spotify:'Spotify',followers:'follower',saves:'salvataggi',tracks:'brani',verifiedLink:'Link verificato',genreLabel:'Genere principale',artistsLabel:'Artisti simili',modeLabel:'Modalità',strategyLabel:'Strategia',objectiveLabel:'Obiettivo',quick:'Ricerca Rapida',complete:'Analisi Completa',balanced:'Bilanciata',audience:'Audience reale',coverage:'Massima copertura',newCurators:'Nuovi curatori',scan:'Scansiona playlist',health:'Test sistema',ready:'Pronto.',resultsTitle:'Playlist contattabili',sortContactDesc:'Contattabilità ↓',sortContactAsc:'Contattabilità ↑',sortMatchDesc:'Match ↓',sortMatchAsc:'Match ↑',sortConfDesc:'Confidenza ↓',sortConfAsc:'Confidenza ↑',results:'risultati',noFilteredResults:'Nessun risultato con i filtri selezionati.',publicSignal:'Segnale web pubblico',strongMatch:'Strong Match',worthChecking:'Worth Checking',weakMatch:'Weak Match',publicContacts:'Contatti pubblici trovati',noPublicContacts:'Nessun canale pubblico verificato per questa playlist.',submissionAvailable:'Invio disponibile',site:'Sito',curatorSite:'Sito curatore',copy:'Copia',open:'Apri',emailOpen:'✉ Email',addToList:'Aggiungi alla lista',openSpotify:'Apri su Spotify',selected:'selezionati',outreachMini:'Crea un unico format e personalizzalo per ogni curatore.',prepareOutreach:'Prepara outreach',composerTitle:'Outreach Builder',composerSub:'Un template, email individuali e personalizzate.',subjectLabel:'Oggetto',messageLabel:'Messaggio',variables:'Variabili rapide',artistLabel:'Artista',trackLabel:'Brano',trackLinkLabel:'Link brano',clear:'Svuota lista',sendHint:'RADAR prepara email separate: nessun destinatario vede gli altri. In questa versione l’invio finale si apre nel client email del dispositivo; l’invio diretto batch verrà collegato a un provider email autorizzato.',remove:'Rimuovi',curatorFallback:'Curator',time:'Tempo',scanStartTitle:'Avvio scansione',scanStartMsg:'Interrogo i motori e costruisco la lista iniziale.',scanInterrupted:'Scansione interrotta',checkEngines:'Controlla lo stato dei motori e riprova',phase1:'Fase 1/3 · Cerco playlist candidate su Brave e, se serve, Google…',discoveryStatus:'Discovery playlist…',discoveryError:'Errore discovery',candidatesFound:'Candidate individuate',verifyContacts:'Ora verifico quali playlist hanno contatti pubblici realmente associati.',candidates:'candidate',discoveryComplete:'Discovery completata',playlistsFound:'playlist trovate.',scanComplete:'Scansione completata',noCandidates:'Nessuna playlist candidata trovata.',zeroCandidates:'0 candidate · controlla genere o motori di ricerca',phase2a:'Fase 2/3 · Ricerca contatti',phase2b:'Brave scandaglia per primo. Google interviene solo dove mancano contatti utili.',contactSearch:'Ricerca contatti',contactError:'Errore ricerca contatti',contactScan:'Scansione contatti',checked:'Analizzate',of:'di',usefulContacts:'Contatti utili:',finalVerification:'Verifica finale',cleanMerge:'Pulisco duplicati e associo i segnali migliori.',contactableFound:'playlist contattabili trovate.',contactable:'contattabili',error:'Errore',healthFailed:'Health check fallito',
 legal:'<strong>RADAR</strong> utilizza informazioni disponibili pubblicamente sul web per aiutare a individuare playlist e canali di contatto. I dati possono essere incompleti, non aggiornati o attribuiti in modo errato: verifica sempre le informazioni prima di utilizzarle. RADAR non è affiliato a Spotify, Google, Brave o alle piattaforme mostrate.'
},
en:{
 subtitle:'Playlist Intelligence',genreLabel:'Primary genre',artistsLabel:'Similar artists',modeLabel:'Mode',strategyLabel:'Strategy',objectiveLabel:'Goal',quick:'Quick Search',complete:'Full Analysis',balanced:'Balanced',audience:'Real audience',coverage:'Maximum coverage',newCurators:'New curators',scan:'Scan playlists',health:'System test',ready:'Ready.',resultsTitle:'Contactable playlists',sortContactDesc:'Contactability ↓',sortContactAsc:'Contactability ↑',sortMatchDesc:'Match ↓',sortMatchAsc:'Match ↑',sortConfDesc:'Confidence ↓',sortConfAsc:'Confidence ↑',results:'results',noFilteredResults:'No results match the selected filters.',publicSignal:'Public web signal',strongMatch:'Strong Match',worthChecking:'Worth Checking',weakMatch:'Weak Match',publicContacts:'Public contacts found',noPublicContacts:'No verified public contact channel found for this playlist.',submissionAvailable:'Submission available',site:'Website',curatorSite:'Curator website',copy:'Copy',open:'Open',emailOpen:'✉ Email',addToList:'Add to list',openSpotify:'Open on Spotify',selected:'selected',outreachMini:'Create one template and personalize it for every curator.',prepareOutreach:'Prepare outreach',composerTitle:'Outreach Builder',composerSub:'One template, separate personalized emails.',subjectLabel:'Subject',messageLabel:'Message',variables:'Quick variables',artistLabel:'Artist',trackLabel:'Track',trackLinkLabel:'Track link',clear:'Clear list',sendHint:'RADAR prepares separate emails so recipients never see each other. In this version final sending opens in your device email client; direct batch sending will require an authorized email provider.',remove:'Remove',curatorFallback:'Curator',time:'Time',scanStartTitle:'Starting scan',scanStartMsg:'Querying search engines and building the initial list.',scanInterrupted:'Scan interrupted',checkEngines:'Check engine status and try again',phase1:'Phase 1/3 · Finding playlist candidates on Brave and Google when needed…',discoveryStatus:'Playlist discovery…',discoveryError:'Discovery error',candidatesFound:'Candidates found',verifyContacts:'Now checking which playlists have genuinely associated public contacts.',candidates:'candidates',discoveryComplete:'Discovery complete',playlistsFound:'playlists found.',scanComplete:'Scan complete',noCandidates:'No playlist candidates found.',zeroCandidates:'0 candidates · check genre or search engines',phase2a:'Phase 2/3 · Contact search',phase2b:'Brave scans first. Google steps in only when useful contacts are missing.',contactSearch:'Contact search',contactError:'Contact search error',contactScan:'Contact scan',checked:'Checked',of:'of',usefulContacts:'Useful contacts:',finalVerification:'Final verification',cleanMerge:'Removing duplicates and matching the best signals.',contactableFound:'contactable playlists found.',contactable:'contactable',error:'Error',healthFailed:'Health check failed',
 legal:'<strong>RADAR</strong> uses publicly available web information to help identify playlists and contact channels. Data may be incomplete, outdated or incorrectly attributed: always verify information before use. RADAR is not affiliated with Spotify, Google, Brave or the platforms shown.'
},
es:{
 subtitle:'Inteligencia de Playlists',email:'Email',submission:'Envío',site:'Sitio',spotify:'Spotify',followers:'seguidores',saves:'guardados',tracks:'temas',verifiedLink:'Enlace verificado',genreLabel:'Género principal',artistsLabel:'Artistas similares',modeLabel:'Modo',strategyLabel:'Estrategia',objectiveLabel:'Objetivo',quick:'Búsqueda rápida',complete:'Análisis completo',balanced:'Equilibrada',audience:'Audiencia real',coverage:'Máxima cobertura',newCurators:'Nuevos curadores',scan:'Escanear playlists',health:'Probar sistema',ready:'Listo.',resultsTitle:'Playlists contactables',sortContactDesc:'Contactabilidad ↓',sortContactAsc:'Contactabilidad ↑',sortMatchDesc:'Match ↓',sortMatchAsc:'Match ↑',sortConfDesc:'Confianza ↓',sortConfAsc:'Confianza ↑',results:'resultados',noFilteredResults:'Ningún resultado coincide con los filtros.',publicSignal:'Señal web pública',strongMatch:'Match fuerte',worthChecking:'Vale la pena revisar',weakMatch:'Match débil',publicContacts:'Contactos públicos encontrados',noPublicContacts:'No se encontró un canal público verificado.',submissionAvailable:'Envío disponible',site:'Sitio',curatorSite:'Sitio del curador',copy:'Copiar',open:'Abrir',emailOpen:'✉ Email',addToList:'Añadir a la lista',openSpotify:'Abrir en Spotify',selected:'seleccionados',outreachMini:'Crea un solo formato y personalízalo para cada curador.',prepareOutreach:'Preparar outreach',composerTitle:'Outreach Builder',composerSub:'Una plantilla, emails individuales y personalizados.',subjectLabel:'Asunto',messageLabel:'Mensaje',variables:'Variables rápidas',artistLabel:'Artista',trackLabel:'Tema',trackLinkLabel:'Enlace del tema',clear:'Vaciar lista',sendHint:'RADAR prepara emails separados: ningún destinatario ve a los demás. En esta versión el envío final se abre en el cliente de email del dispositivo; el envío directo por lotes requerirá un proveedor autorizado.',remove:'Quitar',curatorFallback:'Curador',time:'Tiempo',scanStartTitle:'Iniciando escaneo',scanStartMsg:'Consultando motores y creando la lista inicial.',scanInterrupted:'Escaneo interrumpido',checkEngines:'Comprueba los motores e inténtalo de nuevo',phase1:'Fase 1/3 · Buscando playlists candidatas en Brave y Google cuando sea necesario…',discoveryStatus:'Buscando playlists…',discoveryError:'Error de búsqueda',candidatesFound:'Candidatas encontradas',verifyContacts:'Ahora verifico qué playlists tienen contactos públicos realmente asociados.',candidates:'candidatas',discoveryComplete:'Búsqueda completada',playlistsFound:'playlists encontradas.',scanComplete:'Escaneo completado',noCandidates:'No se encontraron playlists candidatas.',zeroCandidates:'0 candidatas · revisa género o motores',phase2a:'Fase 2/3 · Búsqueda de contactos',phase2b:'Brave busca primero. Google interviene solo cuando faltan contactos útiles.',contactSearch:'Búsqueda de contactos',contactError:'Error buscando contactos',contactScan:'Escaneo de contactos',checked:'Analizadas',of:'de',usefulContacts:'Contactos útiles:',finalVerification:'Verificación final',cleanMerge:'Eliminando duplicados y asociando las mejores señales.',contactableFound:'playlists contactables encontradas.',contactable:'contactables',error:'Error',healthFailed:'Falló la prueba del sistema',
 legal:'<strong>RADAR</strong> utiliza información disponible públicamente en la web para ayudar a identificar playlists y canales de contacto. Los datos pueden estar incompletos, desactualizados o atribuidos incorrectamente: verifica siempre la información antes de usarla. RADAR no está afiliado con Spotify, Google, Brave ni con las plataformas mostradas.'
},
fr:{
 subtitle:'Intelligence Playlists',email:'Email',submission:'Soumission',site:'Site',spotify:'Spotify',followers:'abonnés',saves:'sauvegardes',tracks:'titres',verifiedLink:'Lien vérifié',genreLabel:'Genre principal',artistsLabel:'Artistes similaires',modeLabel:'Mode',strategyLabel:'Stratégie',objectiveLabel:'Objectif',quick:'Recherche rapide',complete:'Analyse complète',balanced:'Équilibrée',audience:'Audience réelle',coverage:'Couverture maximale',newCurators:'Nouveaux curateurs',scan:'Scanner les playlists',health:'Tester le système',ready:'Prêt.',resultsTitle:'Playlists contactables',sortContactDesc:'Contactabilité ↓',sortContactAsc:'Contactabilité ↑',sortMatchDesc:'Match ↓',sortMatchAsc:'Match ↑',sortConfDesc:'Confiance ↓',sortConfAsc:'Confiance ↑',results:'résultats',noFilteredResults:'Aucun résultat avec les filtres sélectionnés.',publicSignal:'Signal web public',strongMatch:'Match fort',worthChecking:'À vérifier',weakMatch:'Match faible',publicContacts:'Contacts publics trouvés',noPublicContacts:'Aucun canal public vérifié trouvé pour cette playlist.',submissionAvailable:'Soumission disponible',site:'Site',curatorSite:'Site du curateur',copy:'Copier',open:'Ouvrir',emailOpen:'✉ Email',addToList:'Ajouter à la liste',openSpotify:'Ouvrir sur Spotify',selected:'sélectionnés',outreachMini:'Créez un seul modèle et personnalisez-le pour chaque curateur.',prepareOutreach:'Préparer l’outreach',composerTitle:'Outreach Builder',composerSub:'Un modèle, des emails séparés et personnalisés.',subjectLabel:'Objet',messageLabel:'Message',variables:'Variables rapides',artistLabel:'Artiste',trackLabel:'Titre',trackLinkLabel:'Lien du titre',clear:'Vider la liste',sendHint:'RADAR prépare des emails séparés : aucun destinataire ne voit les autres. Dans cette version, l’envoi final s’ouvre dans le client email de l’appareil ; l’envoi direct en lot nécessitera un fournisseur email autorisé.',remove:'Retirer',curatorFallback:'Curateur',time:'Temps',scanStartTitle:'Démarrage du scan',scanStartMsg:'Interrogation des moteurs et création de la liste initiale.',scanInterrupted:'Scan interrompu',checkEngines:'Vérifiez les moteurs et réessayez',phase1:'Phase 1/3 · Recherche de playlists candidates sur Brave et Google si nécessaire…',discoveryStatus:'Recherche de playlists…',discoveryError:'Erreur de recherche',candidatesFound:'Candidates trouvées',verifyContacts:'Je vérifie maintenant quelles playlists ont des contacts publics réellement associés.',candidates:'candidates',discoveryComplete:'Recherche terminée',playlistsFound:'playlists trouvées.',scanComplete:'Scan terminé',noCandidates:'Aucune playlist candidate trouvée.',zeroCandidates:'0 candidate · vérifiez le genre ou les moteurs',phase2a:'Phase 2/3 · Recherche de contacts',phase2b:'Brave analyse en premier. Google intervient seulement si des contacts utiles manquent.',contactSearch:'Recherche de contacts',contactError:'Erreur de recherche de contacts',contactScan:'Scan des contacts',checked:'Analysées',of:'sur',usefulContacts:'Contacts utiles :',finalVerification:'Vérification finale',cleanMerge:'Suppression des doublons et association des meilleurs signaux.',contactableFound:'playlists contactables trouvées.',contactable:'contactables',error:'Erreur',healthFailed:'Échec du test système',
 legal:'<strong>RADAR</strong> utilise des informations publiquement disponibles sur le web pour aider à identifier des playlists et des canaux de contact. Les données peuvent être incomplètes, obsolètes ou mal attribuées : vérifiez toujours les informations avant utilisation. RADAR n’est affilié ni à Spotify, ni à Google, ni à Brave, ni aux plateformes affichées.'
}};
function applyLanguage(){
  const l=$('#language')?.value||'it';
  document.documentElement.lang=l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(I18N[l]?.[k])el.textContent=I18N[l][k]});
  if($('#legalText'))$('#legalText').innerHTML=t('legal');
  if(radarResults.length)paintResults(sortedFilteredResults());
  renderRecipients();
}
$('#language')?.addEventListener('change',applyLanguage);
$('#sortResults')?.addEventListener('change',()=>paintResults(sortedFilteredResults()));
document.querySelectorAll('.filterChip').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.filter;if(activeFilters.has(f))activeFilters.delete(f);else activeFilters.add(f);b.classList.toggle('active',activeFilters.has(f));paintResults(sortedFilteredResults())}));
document.addEventListener('click',e=>{
  const add=e.target.closest('[data-select-email]'); if(add){toggleRecipient(add.dataset.selectEmail);return}
  const rm=e.target.closest('[data-remove-email]'); if(rm){selectedOutreach.delete(String(rm.dataset.removeEmail).toLowerCase());paintResults(sortedFilteredResults());updateOutreachBar();return}
});
$('#openComposer').addEventListener('click',()=>{$('#composerOverlay').classList.add('open');renderRecipients()});
$('#closeComposer').addEventListener('click',()=>$('#composerOverlay').classList.remove('open'));
$('#composerOverlay').addEventListener('click',e=>{if(e.target.id==='composerOverlay')$('#composerOverlay').classList.remove('open')});
$('#clearSelection').addEventListener('click',()=>{selectedOutreach.clear();paintResults(sortedFilteredResults());updateOutreachBar();$('#composerOverlay').classList.remove('open')});
document.querySelectorAll('.token').forEach(b=>b.addEventListener('click',()=>{const ta=$('#mailBody'),tok=b.dataset.token;const a=ta.selectionStart||ta.value.length,c=ta.selectionEnd||a;ta.value=ta.value.slice(0,a)+tok+ta.value.slice(c);ta.focus();ta.selectionStart=ta.selectionEnd=a+tok.length}));
['mailSubject','mailBody','senderArtist','senderTrack','senderTrackLink'].forEach(id=>$('#'+id)?.addEventListener('input',renderRecipients));
applyLanguage();updateClock();setInterval(updateClock,30000);

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
function guessCuratorName(playlistName,results,spotifyUrl){
  const p=normalize(playlistName),rows=Array.isArray(results)?results:[],hits=[];
  const spotifyId=(String(spotifyUrl||'').match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/i)||[])[1]||'';
  const rejectExact=/^(spotify|playlist|playlists|curator|music|official|contact|submit|submission|instagram|facebook|youtube|tiktok|soundcloud|various artists)$/i;
  const rejectWords=/\b(playlist|playli\s*t|spotify|curator|submission|submit|contact|official|followers?|tracks?|songs?|updated|listen|music)\b/i;
  const rejectDate=/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+\d{1,2}\b|\b\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{2,4})?\b|\b20\d{2}\b/i;
  const clean=v=>String(v||'').replace(/<[^>]*>/g,' ').replace(/^[\s:|·–—-]+|[\s:|·–—-]+$/g,'').replace(/\s+/g,' ').trim();
  const valid=name=>{
    const n=normalize(name),words=name.split(/\s+/).filter(Boolean);
    if(name.length<2||name.length>48||words.length>5)return false;
    if(rejectExact.test(name)||rejectWords.test(name)||rejectDate.test(name))return false;
    if(n===p||/@|https?:|www\./i.test(name)||/^\d+$/.test(name))return false;
    if(/[|·;] | [-–—] /.test(name))return false;
    if(words.length>=3&&/^(of|the|a|an|and|for|to|in|on|with|from)$/i.test(words[0]))return false;
    if(words.length>=2&&words.some(w=>w.length===1))return false;
    return true;
  };
  const sourceKey=r=>{
    const h=hostOf(r.url||'');
    return h||String(r.url||'')||normalize(r.title||'');
  };
  const exactSpotifyRow=r=>!!spotifyId&&new RegExp('open\\.spotify\\.com/playlist/'+spotifyId,'i').test(String(r.url||''));
  const add=(name,row,strongTitle)=>{name=clean(name);if(valid(name))hits.push({name,row,strongTitle:!!strongTitle,source:sourceKey(row),spotifyExact:exactSpotifyRow(row)})};
  for(const r of rows){
    const title=String(r.title||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
    const desc=String(r.description||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
    let m;
    const titlePatterns=[/(?:playlist\s+)?curated\s+by\s+([A-Za-z0-9_.'’& ]{2,48})(?=\s*(?:[|·;,.()–—-]|$))/i,/playlist\s+by\s+([A-Za-z0-9_.'’& ]{2,48})(?=\s*(?:[|·;,.()–—-]|$))/i,/(?:playlist\s+)?curator\s*[:·–—-]\s*([A-Za-z0-9_.'’& ]{2,48})(?=\s*(?:[|·;,.()–—-]|$))/i,/(?:owner|created\s+by)\s*[:·–—-]?\s*([A-Za-z0-9_.'’& ]{2,48})(?=\s*(?:[|·;,.()–—-]|$))/i];
    for(const rx of titlePatterns)if((m=title.match(rx)))add(m[1],r,true);
    if((m=title.match(/^([A-Za-z0-9_.'’& ]{2,48}?)\s*[-–—|:]\s*(?:spotify\s+)?playlist\s+curator\b/i)))add(m[1],r,true);
    if((m=title.match(/^([A-Za-z0-9_.'’& ]{2,48}?)\s*[-–—|:]\s*(?:playlist\s+)?curator\b/i)))add(m[1],r,true);
    for(const rx of titlePatterns)if((m=desc.match(rx)))add(m[1],r,false);
  }
  if(!hits.length)return'';
  const groups=new Map();
  for(const h of hits){
    const key=normalize(h.name);
    if(!groups.has(key))groups.set(key,{name:h.name,strongTitle:false,spotifyExact:false,sources:new Set(),playlistSources:new Set()});
    const g=groups.get(key);g.strongTitle=g.strongTitle||h.strongTitle;g.spotifyExact=g.spotifyExact||h.spotifyExact;g.sources.add(h.source);
    const txt=normalize((h.row.title||'')+' '+(h.row.description||'')+' '+(h.row.url||''));
    if(p&&txt.includes(p))g.playlistSources.add(h.source);
  }
  const ranked=[...groups.values()].map(g=>({
    ...g,
    independent:g.sources.size>=2,
    associated:g.playlistSources.size>=1,
    score:(g.spotifyExact?220:0)+(g.strongTitle?100:0)+(g.sources.size*30)+(g.playlistSources.size*20)
  })).filter(g=>(g.spotifyExact&&g.strongTitle)||(g.strongTitle&&g.associated)||(g.independent&&g.associated)).sort((a,b)=>b.score-a.score||a.name.length-b.name.length);
  return ranked.length?ranked[0].name:'';
}
function confidenceFromScore(n){return clamp(n,0,100)}
function hostOf(url){try{return new URL(url).hostname.replace(/^www\./,'')}catch{return''}}
function isGenericHost(h){return /^(open\.spotify\.com|spotify\.com|instagram\.com|facebook\.com|x\.com|twitter\.com|youtube\.com|tiktok\.com|soundcloud\.com)$/i.test(h)}
function contactEvidence(results,primaryName,playlistName=''){
  const name=normalize(primaryName), playlist=normalize(playlistName), words=name.split(/\s+/).filter(w=>w.length>=4), playlistWords=playlist.split(/\s+/).filter(w=>w.length>=4);
  const rows=results.map(r=>{
    const text=normalize((r.title||'')+' '+(r.description||'')+' '+(r.url||''));
    let assoc=0;
    const ownerExact=!!name&&text.includes(name);
    const playlistExact=!!playlist&&text.includes(playlist);
    if(ownerExact)assoc+=45;
    const hits=words.filter(w=>text.includes(w)).length;
    assoc+=Math.min(30,hits*10);
    if(playlistExact)assoc+=25;
    const playlistHits=playlistWords.filter(w=>text.includes(w)).length;
    assoc+=Math.min(20,playlistHits*5);
    if(ownerExact&&playlistExact)assoc+=20;
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

const providerDownUntil=new Map();

function nextMonthEpoch(){
  const d=new Date();
  return Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1,0,5,0);
}
function markProviderDown(name,until){providerDownUntil.set(name,until)}
function providerReady(name){return !providerDownUntil.has(name)||Date.now()>=providerDownUntil.get(name)}

async function braveSearch(query,env,count=10){
  if(!env.BRAVE_API_KEY||!providerReady('brave'))return[];
  const u=new URL(BRAVE_API);
  u.searchParams.set('q',query);u.searchParams.set('count',String(Math.min(20,count)));u.searchParams.set('safesearch','moderate');
  const r=await fetch(u,{headers:{Accept:'application/json','Accept-Encoding':'gzip','X-Subscription-Token':env.BRAVE_API_KEY}});
  if(!r.ok){
    let body='';try{body=await r.text()}catch(e){}
    const quota=r.status===402||r.status===429||/quota|limit|usage|subscription|credit/i.test(body);
    if(quota)markProviderDown('brave',r.status===429?Date.now()+60*60*1000:nextMonthEpoch());
    const e=new Error('Brave API HTTP '+r.status);e.provider='brave';e.quota=quota;throw e;
  }
  const d=await r.json();return (d.web&&d.web.results)||[];
}

async function tavilySearch(query,env,count=10){
  if(!env.TAVILY_API_KEY||!providerReady('tavily'))return[];
  const r=await fetch(TAVILY_API,{
    method:'POST',
    headers:{Accept:'application/json','Content-Type':'application/json','Authorization':'Bearer '+env.TAVILY_API_KEY},
    body:JSON.stringify({query,search_depth:'basic',max_results:Math.min(20,count),topic:'general',include_answer:false,include_raw_content:false,include_images:false,safe_search:true})
  });
  if(!r.ok){
    let body='';try{body=await r.text()}catch(e){}
    const quota=r.status===432||r.status===433||/usage limit|pay-as-you-go limit|credit|quota/i.test(body);
    if(quota)markProviderDown('tavily',nextMonthEpoch());
    else if(r.status===429)markProviderDown('tavily',Date.now()+15*60*1000);
    const e=new Error('Tavily API HTTP '+r.status);e.provider='tavily';e.quota=quota;throw e;
  }
  const d=await r.json();
  return (d.results||[]).map(x=>({title:x.title||'',description:x.content||'',url:x.url||''}));
}

async function serpSearch(query,env,count=10){
  if(!env.SERPAPI_KEY||!providerReady('serpapi'))return[];
  const u=new URL(SERPAPI_API);
  u.searchParams.set('engine','google');u.searchParams.set('q',query);u.searchParams.set('api_key',env.SERPAPI_KEY);
  u.searchParams.set('num',String(Math.min(10,count)));u.searchParams.set('hl','en');u.searchParams.set('safe','active');
  const r=await fetch(u,{headers:{Accept:'application/json'}});
  if(!r.ok){
    let body='';try{body=await r.text()}catch(e){}
    const quota=r.status===429||/credits|quota|limit|plan/i.test(body);
    if(quota)markProviderDown('serpapi',nextMonthEpoch());
    const e=new Error('SerpAPI HTTP '+r.status);e.provider='serpapi';e.quota=quota;throw e;
  }
  const d=await r.json();
  if(d.error){
    if(/credits|quota|limit|plan/i.test(d.error))markProviderDown('serpapi',nextMonthEpoch());
    throw new Error('SerpAPI: '+d.error);
  }
  return (d.organic_results||[]).map(x=>({title:x.title||'',description:x.snippet||'',url:x.link||''}));
}

async function smartSearch(query,env,count=10){
  const tried=[];
  if(env.BRAVE_API_KEY&&providerReady('brave')){
    tried.push('Brave');
    try{const results=await braveSearch(query,env,count);if(results.length)return{results,provider:'Brave',tried}}catch(e){}
  }
  if(env.TAVILY_API_KEY&&providerReady('tavily')){
    tried.push('Tavily');
    try{const results=await tavilySearch(query,env,count);if(results.length)return{results,provider:'Tavily',tried}}catch(e){}
  }
  if(env.SERPAPI_KEY&&providerReady('serpapi')){
    tried.push('Google');
    try{const results=await serpSearch(query,env,count);if(results.length)return{results,provider:'Google',tried}}catch(e){}
  }
  return{results:[],provider:'None',tried};
}

function providerStatus(env){
  return{
    brave:{configured:!!env.BRAVE_API_KEY,ready:!!env.BRAVE_API_KEY&&providerReady('brave')},
    tavily:{configured:!!env.TAVILY_API_KEY,ready:!!env.TAVILY_API_KEY&&providerReady('tavily')},
    serpapi:{configured:!!env.SERPAPI_KEY,ready:!!env.SERPAPI_KEY&&providerReady('serpapi')}
  };
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
  const bestContactConfidence=Math.max(Number(r.emailConfidence||0),Number(r.instagramConfidence||0),Number(r.submissionConfidence||0),Number(r.siteConfidence||0));
  const opportunityScore=clamp(Math.round(Number(r.match||0)*.30+Number(r.contactability||0)*.25+bestContactConfidence*.25+(r.spotifyOwnerVerified?15:0)+(r.spotifyPrimary?5:0)));
  let score=clamp(r.match*.32+r.contactability*.40+r.activity*.10+r.confidence*.18);
  if(r.contactability<30)score=clamp(score-28);
  const badge=score>=74&&r.contactability>=55?'Strong Match':score>=56&&r.contactability>=30?'Worth Checking':'Weak Match';
  const why=[];
  if(r.contactability>=70)why.push('contatto pubblico forte verificato sul web');
  else if(r.contactability>=30)why.push('almeno un canale pubblico utile associato');
  if(r.match>=65)why.push('buona coerenza con genere/artisti');
  if(r.activity>=60)why.push('segnali web di attività recente');
  return{...r,score,opportunityScore,badge,why:(why.length?why:['contatto pubblico da verificare']).join('; ')+'.'};
}

let spotifyTokenCache={token:'',expiresAt:0};

async function spotifyAccessToken(env){
  if(!env.SPOTIFY_CLIENT_ID||!env.SPOTIFY_CLIENT_SECRET)return'';
  if(spotifyTokenCache.token&&Date.now()<spotifyTokenCache.expiresAt-60000)return spotifyTokenCache.token;
  const basic=btoa(env.SPOTIFY_CLIENT_ID+':'+env.SPOTIFY_CLIENT_SECRET);
  const r=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Authorization':'Basic '+basic,'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials'});
  if(!r.ok)return'';
  const d=await r.json();
  const token=String(d.access_token||'');
  if(token)spotifyTokenCache={token,expiresAt:Date.now()+Math.max(60,Number(d.expires_in||3600))*1000};
  return token;
}

async function spotifyPlaylistIdentity(spotifyUrl,env){
  const m=String(spotifyUrl||'').match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/i);
  if(!m)return null;
  const token=await spotifyAccessToken(env);
  if(!token)return null;
  const u='https://api.spotify.com/v1/playlists/'+encodeURIComponent(m[1])+'?fields=id,name,owner(display_name,id,external_urls),external_urls';
  const r=await fetch(u,{headers:{'Authorization':'Bearer '+token,'Accept':'application/json'}});
  if(!r.ok)return null;
  const d=await r.json();
  return{playlistId:String(d.id||m[1]),name:String(d.name||''),owner:String(d.owner?.display_name||''),ownerId:String(d.owner?.id||''),ownerUrl:String(d.owner?.external_urls?.spotify||''),spotifyVerified:true};
}

async function spotifySearchPlaylists(input,env){
  const genre=String(input.genre||'').trim();
  if(!genre)return[];
  const token=await spotifyAccessToken(env);
  if(!token)return[];
  const market=String(env.SPOTIFY_MARKET||'IT').toUpperCase();
  const artists=String(input.artists||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,2);
  const queries=input.mode==='complete'?unique([genre,...artists.map(a=>genre+' '+a)]).slice(0,3):[genre];
  const pages=input.mode==='complete'?2:1;
  const found=new Map();
  for(const q of queries){
    for(let page=0;page<pages;page++){
      const u=new URL('https://api.spotify.com/v1/search');
      u.searchParams.set('q',q);
      u.searchParams.set('type','playlist');
      u.searchParams.set('market',market);
      u.searchParams.set('limit','10');
      u.searchParams.set('offset',String(page*10));
      const r=await fetch(u,{headers:{'Authorization':'Bearer '+token,'Accept':'application/json'}}).catch(()=>null);
      if(!r||!r.ok){if(r&&r.status===429)break;continue}
      const d=await r.json().catch(()=>({}));
      for(const x of d.playlists?.items||[]){
        if(!x?.id||!x?.name)continue;
        const url=String(x.external_urls?.spotify||('https://open.spotify.com/playlist/'+x.id));
        if(found.has(url))continue;
        found.set(url,{title:String(x.name||''),description:String(x.description||''),url,spotifyPrimary:true});
      }
    }
  }
  return [...found.values()];
}

async function deepContactForCandidate(c,input,env,allowGoogle=false){
  const raw=String(c.name||'').replace(/"/g,'').trim();
  const genre=String(input.genre||'').replace(/"/g,'').trim();
  const spotify=await spotifyPlaylistIdentity(c.spotifyUrl,env).catch(()=>null);
  const owner=String(spotify?.owner||'').replace(/"/g,'').trim();
  const queries=owner?[
    '"'+owner+'" "'+raw+'" Spotify playlist contact email Instagram',
    '"'+owner+'" playlist submit music submission contact',
    '"'+owner+'" "'+raw+'" website Instagram',
    '"'+raw+'" Spotify playlist curator contact email submission'
  ]:[
    '"'+raw+'" Spotify playlist curator contact email Instagram',
    '"'+raw+'" playlist submit music submission contact',
    '"'+raw+'" playlist website curator '+(genre?'"'+genre+'"':'')
  ];
  const firstQueries=input.mode==='complete'?queries:queries.slice(0,2);
  let smartBatches=await Promise.all(firstQueries.map(q=>smartSearch(q,env,input.mode==='complete'?12:10)));
  let results=smartBatches.flatMap(x=>x.results);
  let primaryProviders=unique(smartBatches.map(x=>x.provider).filter(x=>x&&x!=='None'));
  let ev=contactEvidence(results,owner||c.name,c.name);
  let ct=contactabilityFromEvidence(ev);
  const firstStrongest=Math.max(Number(ct.emailConfidence||0),Number(ct.instagramConfidence||0),Number(ct.submissionConfidence||0),Number(ct.siteConfidence||0));
  if(input.mode!=='complete' && ct.contactability<55 && firstStrongest<75 && queries.length>firstQueries.length){
    const extraBatches=await Promise.all(queries.slice(firstQueries.length).map(q=>smartSearch(q,env,10)));
    smartBatches=smartBatches.concat(extraBatches);
    results=results.concat(extraBatches.flatMap(x=>x.results));
    primaryProviders=unique(smartBatches.map(x=>x.provider).filter(x=>x&&x!=='None'));
    ev=contactEvidence(results,owner||c.name,c.name);
    ct=contactabilityFromEvidence(ev);
  }
  let googleUsed=0;
  if(allowGoogle && env.SERPAPI_KEY && ct.contactability<30){
    const googleQuery=owner?'"'+owner+'" "'+raw+'" playlist email Instagram submit music contact':'"'+raw+'" Spotify playlist curator email Instagram submit music contact';
    const googleResults=await serpSearch(googleQuery,env,10).catch(()=>[]);
    if(googleResults.length){
      results=results.concat(googleResults);
      ev=contactEvidence(results,owner||c.name,c.name);
      ct=contactabilityFromEvidence(ev);
    }
    googleUsed=1;
  }
  const webCurator=guessCuratorName(c.name,results,c.spotifyUrl);
  const curator=owner||webCurator;
  const contactTarget=owner?'Spotify owner':'Playlist';
  return{result:rescoreContactFirst({...c,...ct,curator,curatorSource:owner?'Spotify':'Web',contactTarget,spotifyOwnerVerified:!!owner,spotifyOwnerId:spotify?.ownerId||'',spotifyOwnerUrl:spotify?.ownerUrl||'',spotifyCanonicalName:spotify?.name||'',searchSources:unique(primaryProviders.concat(googleUsed?['Google']:[])).join(' + ')||'Search'},input),googleUsed};
}

async function discoverBase(input,env){
  const genre=String(input.genre||'').trim();
  if(!genre)return{braveConfigured:!!env.BRAVE_API_KEY,tavilyConfigured:!!env.TAVILY_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,googleUsed:0,candidates:[]};
  if(!env.BRAVE_API_KEY&&!env.TAVILY_API_KEY&&!env.SERPAPI_KEY&&(!env.SPOTIFY_CLIENT_ID||!env.SPOTIFY_CLIENT_SECRET))return{braveConfigured:false,tavilyConfigured:false,serpapiConfigured:false,spotifyConfigured:false,googleUsed:0,candidates:[]};
  const spotifyPrimary=await spotifySearchPlaylists(input,env).catch(()=>[]);
  const queries=buildQueries(input);
  const smartBatches=await Promise.all(queries.map(q=>smartSearch(q,env,input.mode==='complete'?12:10)));
  let rawResults=spotifyPrimary.concat(smartBatches.flatMap(x=>x.results));
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
    map.set(spotifyUrl,{name:cleanTitle(r.title),spotifyUrl,snippet:r.description||'',sourceTitle:r.title||'',contactability:0,email:'',instagram:'',submission:'',site:'',discoverySource:r.spotifyPrimary?'Spotify':'Web',spotifyPrimary:!!r.spotifyPrimary,...base,score:clamp(base.score+(r.spotifyPrimary?8:0)),confidence:clamp(base.confidence+(r.spotifyPrimary?8:0))});
  }
  let candidates=[...map.values()].sort((a,b)=>b.score-a.score);
  const cap=input.mode==='complete'?18:9;
  candidates=candidates.slice(0,cap);
  const enginesUsed=unique((spotifyPrimary.length?['Spotify']:[]).concat(smartBatches.map(x=>x.provider).filter(x=>x&&x!=='None')).concat(googleUsed?['Google']:[]));
  const failoverPaths=unique(smartBatches.map(x=>x.tried&&x.tried.length>1?x.tried.join(' → '):'').filter(Boolean));
  return{braveConfigured:!!env.BRAVE_API_KEY,tavilyConfigured:!!env.TAVILY_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,spotifyConfigured:!!env.SPOTIFY_CLIENT_ID&&!!env.SPOTIFY_CLIENT_SECRET,spotifyPrimaryCount:spotifyPrimary.length,googleUsed,candidates,providers:providerStatus(env),enginesUsed,failoverPaths};
}

async function enrichContactBatch(input,env){
  if(!env.BRAVE_API_KEY&&!env.TAVILY_API_KEY&&!env.SERPAPI_KEY)return{braveConfigured:false,tavilyConfigured:false,serpapiConfigured:false,googleUsed:0,results:[]};
  const candidates=Array.isArray(input.candidates)?input.candidates.slice(0,3):[];
  const slots=Math.max(0,Math.min(3,Number(input.googleSlots||0)));
  const packs=await Promise.all(candidates.map((c,i)=>deepContactForCandidate(c,input,env,i<slots)));
  const results=packs.map(pack=>pack.result);
  const googleUsed=packs.reduce((n,pack)=>n+Number(pack.googleUsed||0),0);
  return{braveConfigured:!!env.BRAVE_API_KEY,tavilyConfigured:!!env.TAVILY_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,googleUsed,results,providers:providerStatus(env)};
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
  if(!env.BRAVE_API_KEY&&!env.TAVILY_API_KEY&&!env.SERPAPI_KEY)return{curator:'',email:'',instagram:'',instagramHandle:'',submission:'',site:'',curatorMatch:0,curatorConfidence:0,emailConfidence:0,instagramConfidence:0,submissionConfidence:0,siteConfidence:0,reason:'Nessun motore di ricerca configurato.'};
  const name=String(input.playlistName||'').trim();
  if(!name)throw new Error('Nome playlist mancante');
  const queries=[
    '"'+name+'" Spotify playlist curator email Instagram',
    '"'+name+'" submit music playlist',
    '"'+name+'" curator contact official',
    '"'+name+'" playlist website'
  ];
  const batches=await Promise.all(queries.map(q=>smartSearch(q,env,10)));
  let results=batches.flatMap(x=>x.results);
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


function isPublicHttpUrl(raw){
  try{
    const u=new URL(String(raw||''));
    if(!/^https?:$/.test(u.protocol))return null;
    const h=u.hostname.toLowerCase();
    if(h==='localhost'||h.endsWith('.local')||h==='0.0.0.0'||h==='127.0.0.1'||h==='::1')return null;
    if(/^10\./.test(h)||/^192\.168\./.test(h)||/^169\.254\./.test(h))return null;
    const m=h.match(/^172\.(\d+)\./); if(m&&Number(m[1])>=16&&Number(m[1])<=31)return null;
    return u;
  }catch(e){return null}
}
function looksLikeSubmission(u){
  const s=(u.hostname+u.pathname+u.search).toLowerCase();
  const known=['soundplate.com','submithub.com','groover.co','dailyplaylists.com','playlistpush.com','musosoup.com','for-the-love-of-bands.com'];
  return known.some(d=>u.hostname===d||u.hostname.endsWith('.'+d)) || /(submit|submission|pitch|send[-_]?music|demo|playlist[-_]?submission|music[-_]?submission|apply)/i.test(s);
}
async function validateOneLink(entry){
  const u=isPublicHttpUrl(entry.url);
  if(!u)return {id:entry.id,ok:false};
  if(entry.kind==='submission'&&!looksLikeSubmission(u))return {id:entry.id,ok:false};
  try{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),4500);
    const r=await fetch(u.toString(),{method:'GET',redirect:'follow',signal:controller.signal,headers:{'user-agent':'RADAR-LinkVerifier/1.0'}});
    clearTimeout(timer);
    const finalUrl=r.url||u.toString();
    const fu=isPublicHttpUrl(finalUrl);
    if(!fu||r.status>=400)return {id:entry.id,ok:false};
    if(entry.kind==='submission'&&!looksLikeSubmission(fu))return {id:entry.id,ok:false};
    return {id:entry.id,ok:true,finalUrl:fu.toString(),status:r.status};
  }catch(e){return {id:entry.id,ok:false}}
}
async function validateLinks(input){
  const entries=Array.isArray(input?.entries)?input.entries.slice(0,40):[];
  const results=await Promise.all(entries.map(validateOneLink));
  return {results};
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
if(url.pathname==='/api/validate-links'&&request.method==='POST'){try{return json(await validateLinks(await request.json()))}catch(e){return json({error:'Link validation failed'},500)}}
if(url.pathname==='/api/health')return json({ok:true,version:VERSION,braveConfigured:!!env.BRAVE_API_KEY,tavilyConfigured:!!env.TAVILY_API_KEY,serpapiConfigured:!!env.SERPAPI_KEY,providers:providerStatus(env),dbConfigured:!!env.DB});
if(url.pathname==='/api/discover-base'&&request.method==='POST'){try{return json(await discoverBase(await request.json(),env))}catch(e){return json({error:e.message||'Errore discovery base'},500)}}
if(url.pathname==='/api/contact-enrich'&&request.method==='POST'){try{return json(await enrichContactBatch(await request.json(),env))}catch(e){return json({error:e.message||'Errore contact enrich'},500)}}
if(url.pathname==='/api/discover'&&request.method==='POST'){try{return json(await discover(await request.json(),env))}catch(e){return json({error:e.message||'Errore discovery'},500)}}if(url.pathname==='/api/curator'&&request.method==='POST'){try{return json(await discoverCurator(await request.json(),env))}catch(e){return json({error:e.message||'Errore curator discovery'},500)}}if(url.pathname==='/'||url.pathname==='/index.html')return new Response(HTML,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});return new Response('Not Found',{status:404})}};
