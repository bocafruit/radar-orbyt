from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.54 Cloud';" in s

# Add isolated curator/contact enrichment helper before Artist Radar scan.
marker='async function artistRadarScan(input,env)'
assert marker in s
helper=r'''function artistRadarContactScore(c){let n=0;if(c.email)n+=45;if(c.instagram)n+=25;if(c.submission)n+=25;if(c.website)n+=10;return Math.min(100,n)}
async function artistRadarEnrichContact(x,env){
  const owner=String(x.owner||'').trim(),name=String(x.name||'').trim();
  const q='"'+name.replace(/"/g,'')+'" '+(owner?'"'+owner.replace(/"/g,'')+'" ':'')+'playlist curator contact Instagram email submit';
  const b=await smartSearch(q,env,10).catch(()=>({results:[]}));
  let email='',instagram='',submission='',website='',evidence=[];
  const blocked=/open\.spotify\.com|spotify\.com/i;
  for(const r of b.results||[]){
    const blob=String((r.title||'')+' '+(r.description||'')+' '+(r.url||''));
    if(!artistRadarNameMatch(name,blob)&&owner&&!normalize(blob).includes(normalize(owner)))continue;
    if(!email){const m=blob.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);if(m)email=m[0]}
    if(!instagram){const m=blob.match(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?/i);if(m)instagram=m[0]}
    const url=String(r.url||'');
    if(!submission&&/submit|submission|playlistpush|soundplate|dailyplaylists|groover|submithub/i.test(blob)&&/^https?:/i.test(url)&&!blocked.test(url))submission=url;
    if(!website&&/^https?:/i.test(url)&&!blocked.test(url)&&!/instagram\.com|facebook\.com|tiktok\.com|x\.com|twitter\.com/i.test(url))website=url;
    if(evidence.length<3)evidence.push(blob.slice(0,220));
  }
  const contact={email,instagram,submission,website,evidence};
  contact.score=artistRadarContactScore(contact);
  contact.contactable=contact.score>=25;
  return {...x,contact};
}
'''
s=s.replace(marker,helper+marker,1)

# Enrich only the best verified candidates, in parallel, before returning.
old="verified.sort((a,b)=>b.verificationScore-a.verificationScore||b.trackCount-a.trackCount||String(a.name).localeCompare(String(b.name)));return {artist:cat.artist,artistId:cat.artistId||'',catalogSource:cat.catalogSource||'',tracks:cat.tracks,playlists:verified,mode:'verified',build:VERSION,deepTracks:missing.map(x=>x.name),verificationSummary:"
assert old in s
new="verified.sort((a,b)=>b.verificationScore-a.verificationScore||b.trackCount-a.trackCount||String(a.name).localeCompare(String(b.name)));const enrichedContacts=await Promise.all(verified.map((x,i)=>i<6?artistRadarEnrichContact(x,env):Promise.resolve({...x,contact:{email:'',instagram:'',submission:'',website:'',evidence:[],score:0,contactable:false}})));const contactable=enrichedContacts.filter(x=>x.contact&&x.contact.contactable).length;return {artist:cat.artist,artistId:cat.artistId||'',catalogSource:cat.catalogSource||'',tracks:cat.tracks,playlists:enrichedContacts,mode:'verified-contact',build:VERSION,deepTracks:missing.map(x=>x.name),contactSummary:{contactable},verificationSummary:"
s=s.replace(old,new,1)

# Frontend: show contactability directly inside Artist Radar cards.
old_ui="card.append(h,verify,meta,names);if(x.spotifyUrl){"
assert old_ui in s
new_ui="card.append(h,verify,meta,names);const c=x.contact||{};if(c.contactable){const cp=document.createElement('div');cp.className='muted';cp.style.cssText='margin-top:9px;padding:9px;border:1px solid #263052;border-radius:11px';const bits=[];if(c.email)bits.push('✉ '+c.email);if(c.instagram)bits.push('Instagram');if(c.submission)bits.push('Submission');if(c.website)bits.push('Sito');cp.textContent='CONTATTABILE '+(c.score||0)+'/100 · '+bits.join(' · ');card.appendChild(cp)}card.appendChild(document.createTextNode(''));if(x.spotifyUrl){"
s=s.replace(old_ui,new_ui,1)
old_sum="sum.textContent=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili · '+String(d.build||'RADAR')+(d.catalogSource?' · catalogo '+d.catalogSource:'');"
assert old_sum in s
new_sum="const cs=d.contactSummary||{};sum.textContent=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili · '+(cs.contactable||0)+' contattabili · '+String(d.build||'RADAR')+(d.catalogSource?' · catalogo '+d.catalogSource:'');"
s=s.replace(old_sum,new_sum,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.54 Cloud';","const VERSION = 'RADAR v0.4.7.55 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.54</div>','<div class="version">v0.4.7.55</div>',1)
p.write_text(s)
