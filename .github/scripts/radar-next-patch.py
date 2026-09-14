from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.58 Cloud';" in s

# Precision pass: placement confidence must stay independent from contact richness.
start=s.index('async function artistRadarVerifyCandidate(x,cat,env){')
end=s.index('\nasync function artistRadarEnrichContact(',start)
old=s[start:end]
new=r'''async function artistRadarVerifyCandidate(x,cat,env){
  const tracks=[...x.tracks].slice(0,3),domains=new Set(),evidence=[],exactSpotify=new Set(),independentTracks=new Set();
  for(const track of tracks){
    const q='"'+track+'" "'+cat.artist+'" "'+String(x.name||'').replace(/"/g,'')+'"';
    const b=await smartSearch(q,env,10);
    for(const r of b.results||[]){
      const blob=String((r.title||'')+' '+(r.description||'')+' '+(r.url||'')),text=normalize(blob);
      if(!text.includes(normalize(track))||!text.includes(normalize(cat.artist)))continue;
      const host=(()=>{try{return new URL(r.url||'').hostname.replace(/^www\./,'')}catch(e){return''}})();
      const pu=cleanPlaylistUrl(r.url||'')||cleanPlaylistUrl(blob);
      const samePlaylist=(pu&&cleanPlaylistUrl(x.spotifyUrl)===pu)||artistRadarNameMatch(x.name,(r.title||'')+' '+(r.description||''));
      if(!samePlaylist)continue;
      if(host)domains.add(host);
      if(pu&&cleanPlaylistUrl(x.spotifyUrl)===pu)exactSpotify.add(track);
      if(host&&host!=='open.spotify.com'&&host!=='spotify.com')independentTracks.add(track);
      if(evidence.length<5)evidence.push(blob.slice(0,260));
    }
  }
  const independent=[...domains].filter(d=>d&&d!=='open.spotify.com'&&d!=='spotify.com'),exactCount=exactSpotify.size,independentCount=independentTracks.size,trackCount=Number(x.trackCount||x.tracks?.size||tracks.length||0);
  let verification='WEB_EVIDENCE',verificationLabel='SOLO EVIDENZA WEB',verificationScore=30,placementReason='Segnale pubblico non sufficiente per confermare il placement.';
  if(exactCount>=1&&independentCount>=1){verification='CONFIRMED';verificationLabel='CONFERMATO PUBBLICAMENTE';verificationScore=Math.min(98,88+Math.min(6,independentCount*3)+Math.min(4,exactCount*2));placementReason='URL Spotify coerente + evidenza pubblica indipendente su traccia, artista e playlist.'}
  else if(independentCount>=1||(exactCount>=1&&trackCount>=2)){verification='PROBABLE';verificationLabel='PROBABILE';verificationScore=independentCount?70:62;placementReason=independentCount?'Evidenza indipendente coerente, ma conferma Spotify incompleta.':'URL Spotify coerente su più tracce, senza seconda fonte indipendente.'}
  return {...x,verification,verificationLabel,verificationScore,placementConfidence:verificationScore,placementReason,verificationDomains:[...domains],verificationEvidence:evidence,exactTrackEvidence:exactCount,independentTrackEvidence:independentCount};
}'''
s=s[:start]+new+s[end:]

# Only qualified placements enter the actionable contact list. Inline contact discovery remains visible.
old="function artistRadarToContactResult(x,c){return {name:x.name||'Spotify playlist',sourceTitle:x.name||'',curator:x.owner||'',spotifyUrl:x.spotifyUrl||'',email:c.email||'',instagram:c.instagram||'',instagramHandle:c.instagram||'',submission:c.submission||'',site:c.website||'',emailConfidence:c.identityConfidence||0,instagramConfidence:c.identityConfidence||0,submissionConfidence:c.identityConfidence||0,siteConfidence:c.identityConfidence||0,contactability:c.score||0,opportunityScore:Math.round(((c.score||0)*0.6)+((c.identityConfidence||0)*0.4)),match:x.verificationScore||0,confidence:c.identityConfidence||0,badge:(c.identityConfidence||0)>=75?'Strong Match':(c.identityConfidence||0)>=50?'Worth Checking':'Weak Match'};}"
assert old in s
new="function artistRadarToContactResult(x,c){const qualified=x.verification==='CONFIRMED'||x.verification==='PROBABLE';if(!qualified)return null;return {name:x.name||'Spotify playlist',sourceTitle:x.name||'',curator:x.owner||'',spotifyUrl:x.spotifyUrl||'',email:c.email||'',instagram:c.instagram||'',instagramHandle:c.instagram||'',submission:c.submission||'',site:c.website||'',emailConfidence:c.identityConfidence||0,instagramConfidence:c.identityConfidence||0,submissionConfidence:c.identityConfidence||0,siteConfidence:c.identityConfidence||0,contactability:c.score||0,opportunityScore:Math.round(((c.score||0)*0.45)+((c.identityConfidence||0)*0.25)+((x.verificationScore||0)*0.30)),match:x.verificationScore||0,confidence:c.identityConfidence||0,badge:x.verification==='CONFIRMED'?'Verified Placement':'Probable Placement'};}"
s=s.replace(old,new,1)

# If contact exists on a weak placement, say clearly that it is not yet actionable.
old="if(c.contactable){slot.textContent='CONTATTABILE '+(c.score||0)+'/100 · IDENTITÀ '+identity+'/100 · '+bits.join(' · ');slot.style.borderColor='#315f58';return artistRadarToContactResult(x,c)}"
assert old in s
new="if(c.contactable){const qualified=x.verification==='CONFIRMED'||x.verification==='PROBABLE';slot.textContent=(qualified?'CONTATTABILE ':'CONTATTO TROVATO · PLACEMENT DA VERIFICARE · ')+(c.score||0)+'/100 · IDENTITÀ '+identity+'/100 · '+bits.join(' · ');slot.style.borderColor=qualified?'#315f58':'#4a4f68';return artistRadarToContactResult(x,c)}"
s=s.replace(old,new,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.58 Cloud';","const VERSION = 'RADAR v0.4.7.59 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.58</div>','<div class="version">v0.4.7.59</div>',1)
for needle in ['RADAR v0.4.7.59 Cloud','placementConfidence','placementReason','independentTrackEvidence','PLACEMENT DA VERIFICARE','Verified Placement']:
    assert needle in s, needle
p.write_text(s)
