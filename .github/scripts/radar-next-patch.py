from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.55 Cloud';" in s

# 1) Keep Artist Radar fast: return verified playlists immediately, without waiting for contact enrichment.
old="verified.sort((a,b)=>b.verificationScore-a.verificationScore||b.trackCount-a.trackCount||String(a.name).localeCompare(String(b.name)));const enrichedContacts=await Promise.all(verified.map((x,i)=>i<6?artistRadarEnrichContact(x,env):Promise.resolve({...x,contact:{email:'',instagram:'',submission:'',website:'',evidence:[],score:0,contactable:false}})));const contactable=enrichedContacts.filter(x=>x.contact&&x.contact.contactable).length;return {artist:cat.artist,artistId:cat.artistId||'',catalogSource:cat.catalogSource||'',tracks:cat.tracks,playlists:enrichedContacts,mode:'verified-contact',build:VERSION,deepTracks:missing.map(x=>x.name),contactSummary:{contactable},verificationSummary:"
assert old in s
new="verified.sort((a,b)=>b.verificationScore-a.verificationScore||b.trackCount-a.trackCount||String(a.name).localeCompare(String(b.name)));return {artist:cat.artist,artistId:cat.artistId||'',catalogSource:cat.catalogSource||'',tracks:cat.tracks,playlists:verified,mode:'verified-fast',build:VERSION,deepTracks:missing.map(x=>x.name),contactSummary:{contactable:0,pending:Math.min(6,verified.length)},verificationSummary:"
s=s.replace(old,new,1)

# 2) Add isolated per-playlist contact lookup endpoint helper.
marker='function trackRadarAlgorithmic(name)'
assert marker in s
helper=r'''async function artistRadarContactLookup(input,env){
  const p=input&&input.playlist||{};
  const x={name:String(p.name||'').trim(),owner:String(p.owner||'').trim(),spotifyUrl:String(p.spotifyUrl||'').trim(),playlistId:String(p.playlistId||'').trim()};
  if(!x.name&&!x.spotifyUrl)throw new Error('Playlist mancante');
  const out=await artistRadarEnrichContact(x,env);
  return {playlistId:x.playlistId||'',spotifyUrl:x.spotifyUrl||'',contact:out.contact||{email:'',instagram:'',submission:'',website:'',evidence:[],score:0,contactable:false}};
}
'''
s=s.replace(marker,helper+marker,1)

# 3) Add API route before the main Artist Radar route.
route="if(url.pathname==='/api/artist-radar'&&request.method==='POST'){try{return json(await artistRadarScan(await request.json(),env))}catch(e){return json({error:e.message||'Errore Artist Radar'},500)}}"
assert route in s
s=s.replace(route,"if(url.pathname==='/api/artist-radar/contact'&&request.method==='POST'){try{return json(await artistRadarContactLookup(await request.json(),env))}catch(e){return json({error:e.message||'Errore contatti Artist Radar'},500)}}"+route,1)

# 4) Progressive frontend: render playlist results first, then enrich contacts with 2 concurrent workers.
start=s.index('async function scanArtistRadar()')
end=s.index("\ndocument.addEventListener('click',function(e){if(e.target&&e.target.id==='artistRadarScan')scanArtistRadar()});",start)
old_front=s[start:end]
new_front=r'''let artistRadarScanToken=0;
async function artistRadarFetchContact(x,slot,token){
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),12000);
  try{
    const r=await fetch('/api/artist-radar/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({playlist:{playlistId:x.playlistId||'',spotifyUrl:x.spotifyUrl||'',name:x.name||'',owner:x.owner||''}}),signal:ctrl.signal});
    const d=await r.json();
    if(token!==artistRadarScanToken)return false;
    if(!r.ok||d.error)throw new Error(d.error||'Contatti non disponibili');
    const c=d.contact||{},bits=[];
    if(c.email)bits.push('✉ '+c.email);if(c.instagram)bits.push('Instagram');if(c.submission)bits.push('Submission');if(c.website)bits.push('Sito');
    if(c.contactable){slot.textContent='CONTATTABILE '+(c.score||0)+'/100 · '+bits.join(' · ');slot.style.borderColor='#315f58';return true}
    slot.textContent='Nessun contatto pubblico trovato.';return false;
  }catch(e){if(token===artistRadarScanToken)slot.textContent=e&&e.name==='AbortError'?'Ricerca contatti scaduta.':'Nessun contatto pubblico trovato.';return false}finally{clearTimeout(timer)}
}
async function artistRadarRunContactQueue(rows,slots,sum,baseText,token){
  const jobs=rows.slice(0,6).map((x,i)=>({x,slot:slots[i]})).filter(j=>j.slot),state={next:0,done:0,found:0};
  const work=async()=>{while(state.next<jobs.length&&token===artistRadarScanToken){const j=jobs[state.next++];if(await artistRadarFetchContact(j.x,j.slot,token))state.found++;state.done++;if(token===artistRadarScanToken)sum.textContent=baseText+' · '+state.found+' contattabili · contatti '+state.done+'/'+jobs.length}};
  await Promise.all([work(),work()]);
  if(token===artistRadarScanToken)sum.textContent=baseText+' · '+state.found+' contattabili · contatti completati';
}
async function scanArtistRadar(){const input=document.getElementById('artistRadarInput'),btn=document.getElementById('artistRadarScan'),st=document.getElementById('artistRadarStatus'),sum=document.getElementById('artistRadarSummary'),box=document.getElementById('artistRadarResults');if(!input||!btn||!st||!sum||!box)return;const artist=input.value.trim();if(!artist){st.textContent='Inserisci il nome artista o il link Spotify.';return}const token=++artistRadarScanToken;btn.disabled=true;st.textContent='Analizzo catalogo, placement e verifiche pubbliche…';sum.style.display='none';box.innerHTML='';try{const r=await fetch('/api/artist-radar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({artist:artist})});const d=await r.json();if(token!==artistRadarScanToken)return;if(!r.ok||d.error)throw new Error(d.error||'Errore Artist Radar');const tracks=Array.isArray(d.tracks)?d.tracks:[],rows=Array.isArray(d.playlists)?d.playlists:[],vs=d.verificationSummary||{};sum.style.display='block';const baseText=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili · '+String(d.build||'RADAR')+(d.catalogSource?' · catalogo '+d.catalogSource:'');sum.textContent=baseText+(rows.length?' · contatti in ricerca…':'');st.textContent=rows.length?'Playlist pronte. Ricerca contatti avviata in parallelo.':'Nessuna playlist pubblicamente rilevabile.';const slots=[];for(const x of rows){const card=document.createElement('div');card.className='result';const h=document.createElement('h3');h.textContent=x.name||'Spotify playlist';const verify=document.createElement('div');verify.className='muted';verify.style.cssText='margin:6px 0;font-weight:900';verify.textContent=(x.verification==='CONFIRMED'?'🟢 ':x.verification==='PROBABLE'?'🟡 ':'⚪ ')+(x.verificationLabel||'SOLO EVIDENZA WEB');const meta=document.createElement('div');meta.className='muted';meta.textContent=(x.owner?x.owner+' · ':'')+(x.trackCount||0)+' tracce dell’artista rilevate';const names=document.createElement('div');names.className='muted';names.style.marginTop='6px';names.textContent=(x.tracks||[]).slice(0,8).join(' · ');const cp=document.createElement('div');cp.className='muted';cp.style.cssText='margin-top:9px;padding:9px;border:1px solid #263052;border-radius:11px';cp.textContent='🔎 Cerco contatti…';card.append(h,verify,meta,names,cp);slots.push(cp);if(x.spotifyUrl){const a=document.createElement('a');a.href=x.spotifyUrl;a.target='_blank';a.rel='noopener';a.className='btn secondary';a.style.cssText='display:inline-block;margin-top:10px;text-decoration:none';a.textContent='Apri Spotify';card.appendChild(a)}box.appendChild(card)}btn.disabled=false;if(rows.length)artistRadarRunContactQueue(rows,slots,sum,baseText,token)}catch(e){if(token===artistRadarScanToken){st.textContent=e.message||'Errore Artist Radar';btn.disabled=false}}}
'''
s=s[:start]+new_front+s[end:]

s=s.replace("const VERSION = 'RADAR v0.4.7.55 Cloud';","const VERSION = 'RADAR v0.4.7.56 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.55</div>','<div class="version">v0.4.7.56</div>',1)

# Safety assertions specific to this release.
for needle in ["/api/artist-radar/contact","artistRadarRunContactQueue","contatti in ricerca","mode:'verified-fast'","setTimeout(()=>ctrl.abort(),12000)"]:
    assert needle in s, needle
p.write_text(s)
