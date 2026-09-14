from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.56 Cloud';" in s
old="""  const contact={email,instagram,submission,website,evidence};
  contact.score=artistRadarContactScore(contact);
  contact.contactable=contact.score>=25;
  return {...x,contact};"""
assert old in s
new="""  const contact={email,instagram,submission,website,evidence};
  contact.score=artistRadarContactScore(contact);
  const normOwner=normalize(owner),normName=normalize(name);let identity=25;
  for(const ev of evidence){const ne=normalize(ev);if(normOwner&&ne.includes(normOwner))identity+=25;if(normName&&artistRadarNameMatch(name,ev))identity+=15}
  if(email&&owner&&normalize(email).includes(normOwner.replace(/\\s+/g,'')))identity+=10;
  contact.identityConfidence=Math.min(100,identity);
  contact.contactable=contact.score>=25;
  return {...x,contact};"""
s=s.replace(old,new,1)
old="""  const out=await artistRadarEnrichContact(x,env);
  return {playlistId:x.playlistId||'',spotifyUrl:x.spotifyUrl||'',contact:out.contact||{email:'',instagram:'',submission:'',website:'',evidence:[],score:0,contactable:false}};"""
assert old in s
new="""  const timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error('Contact timeout')),9500));
  const out=await Promise.race([artistRadarEnrichContact(x,env),timeout]);
  return {playlistId:x.playlistId||'',spotifyUrl:x.spotifyUrl||'',contact:out.contact||{email:'',instagram:'',submission:'',website:'',evidence:[],score:0,identityConfidence:0,contactable:false}};"""
s=s.replace(old,new,1)
start=s.index('async function artistRadarFetchContact(')
end=s.index('\nasync function scanArtistRadar()',start)
new_block=r'''function artistRadarToContactResult(x,c){return {name:x.name||'Spotify playlist',sourceTitle:x.name||'',curator:x.owner||'',spotifyUrl:x.spotifyUrl||'',email:c.email||'',instagram:c.instagram||'',instagramHandle:c.instagram||'',submission:c.submission||'',site:c.website||'',emailConfidence:c.identityConfidence||0,instagramConfidence:c.identityConfidence||0,submissionConfidence:c.identityConfidence||0,siteConfidence:c.identityConfidence||0,contactability:c.score||0,opportunityScore:Math.round(((c.score||0)*0.6)+((c.identityConfidence||0)*0.4)),match:x.verificationScore||0,confidence:c.identityConfidence||0,badge:(c.identityConfidence||0)>=75?'Strong Match':(c.identityConfidence||0)>=50?'Worth Checking':'Weak Match'};}
function artistRadarPublishContactables(found){
  radarResults=found.slice();
  paintResults(sortedFilteredResults());
}
async function artistRadarFetchContact(x,slot,token){
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),11000);
  try{
    const r=await fetch('/api/artist-radar/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({playlist:{playlistId:x.playlistId||'',spotifyUrl:x.spotifyUrl||'',name:x.name||'',owner:x.owner||''}}),signal:ctrl.signal});
    const d=await r.json();
    if(token!==artistRadarScanToken)return null;
    if(!r.ok||d.error)throw new Error(d.error||'Contatti non disponibili');
    const c=d.contact||{},bits=[];
    if(c.email)bits.push('✉ '+c.email);if(c.instagram)bits.push('Instagram');if(c.submission)bits.push('Submission');if(c.website)bits.push('Sito');
    const identity=Number(c.identityConfidence||0);
    if(c.contactable){slot.textContent='CONTATTABILE '+(c.score||0)+'/100 · IDENTITÀ '+identity+'/100 · '+bits.join(' · ');slot.style.borderColor='#315f58';return artistRadarToContactResult(x,c)}
    slot.textContent='Nessun contatto pubblico trovato. · IDENTITÀ '+identity+'/100';return null;
  }catch(e){if(token===artistRadarScanToken)slot.textContent=e&&e.name==='AbortError'?'Ricerca contatti scaduta.':'Nessun contatto pubblico trovato.';return null}finally{clearTimeout(timer)}
}
async function artistRadarRunContactQueue(rows,slots,sum,baseText,token){
  const jobs=rows.map((x,i)=>({x,slot:slots[i]})).filter(j=>j.slot),state={next:0,done:0,found:[]};
  const work=async()=>{while(state.next<jobs.length&&token===artistRadarScanToken){const j=jobs[state.next++];const hit=await artistRadarFetchContact(j.x,j.slot,token);if(hit)state.found.push(hit);state.done++;if(token===artistRadarScanToken){artistRadarPublishContactables(state.found);sum.textContent=baseText+' · '+state.found.length+' contattabili · contatti '+state.done+'/'+jobs.length}}};
  await Promise.all([work(),work()]);
  if(token===artistRadarScanToken){for(let i=0;i<slots.length;i++){if(slots[i]&&slots[i].textContent==='🔎 Cerco contatti…')slots[i].textContent='Ricerca contatti terminata.'}artistRadarPublishContactables(state.found);sum.textContent=baseText+' · '+state.found.length+' contattabili · contatti completati';}
}
'''
s=s[:start]+new_block+s[end:]
old="""const token=++artistRadarScanToken;btn.disabled=true;st.textContent='Analizzo catalogo, placement e verifiche pubbliche…';sum.style.display='none';box.innerHTML='';try{"""
assert old in s
new="""const token=++artistRadarScanToken;radarResults=[];paintResults([]);btn.disabled=true;st.textContent='Analizzo catalogo, placement e verifiche pubbliche…';sum.style.display='none';box.innerHTML='';try{"""
s=s.replace(old,new,1)
s=s.replace("const VERSION = 'RADAR v0.4.7.56 Cloud';","const VERSION = 'RADAR v0.4.7.57 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.56</div>','<div class="version">v0.4.7.57</div>',1)
for needle in ["RADAR v0.4.7.57 Cloud","identityConfidence","artistRadarPublishContactables","rows.map((x,i)","Promise.race([artistRadarEnrichContact","contatti completati"]:
    assert needle in s, needle
p.write_text(s)
