from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.59 Cloud';" in s

start=s.index('async function artistRadarVerifyCandidate(x,cat,env){')
end=s.index('\nasync function artistRadarEnrichContact(',start)
new=r'''async function artistRadarVerifyCandidate(x,cat,env){
  const tracks=[...x.tracks].slice(0,3),domains=new Set(),evidence=[],exactSpotify=new Set(),independentTracks=new Set(),nameMatchedTracks=new Set(),ownerMatchedTracks=new Set();
  const playlistName=String(x.name||'').trim(),owner=String(x.owner||'').trim(),playlistUrl=cleanPlaylistUrl(x.spotifyUrl);
  const jobs=[];
  for(const track of tracks){
    const base='"'+track+'" "'+cat.artist+'"';
    jobs.push({track,p:smartSearch(base+' "'+playlistName.replace(/"/g,'')+'"',env,10)});
    jobs.push({track,p:smartSearch(base+' Spotify playlist "'+playlistName.replace(/"/g,'')+'"',env,10)});
  }
  const batches=await Promise.all(jobs.map(async j=>({track:j.track,batch:await j.p})));
  for(const j of batches){
    const track=j.track;
    for(const r of j.batch.results||[]){
      const title=String(r.title||''),desc=String(r.description||''),url=String(r.url||''),blob=title+' '+desc+' '+url,text=normalize(blob);
      if(!text.includes(normalize(track))||!text.includes(normalize(cat.artist)))continue;
      const host=(()=>{try{return new URL(url).hostname.replace(/^www\./,'')}catch(e){return''}})();
      const pu=cleanPlaylistUrl(url)||cleanPlaylistUrl(blob);
      const exactUrl=!!(pu&&playlistUrl&&pu===playlistUrl);
      const nameMatch=artistRadarNameMatch(playlistName,title+' '+desc);
      const ownerMatch=!!(owner&&normalize(blob).includes(normalize(owner)));
      if(!exactUrl&&!nameMatch)continue;
      if(host)domains.add(host);
      if(exactUrl)exactSpotify.add(track);
      if(nameMatch)nameMatchedTracks.add(track);
      if(ownerMatch)ownerMatchedTracks.add(track);
      if(host&&host!=='open.spotify.com'&&host!=='spotify.com')independentTracks.add(track);
      if(evidence.length<7)evidence.push(blob.slice(0,280));
    }
  }
  const independentDomains=[...domains].filter(d=>d&&d!=='open.spotify.com'&&d!=='spotify.com');
  const exactCount=exactSpotify.size,independentCount=independentTracks.size,nameCount=nameMatchedTracks.size,ownerCount=ownerMatchedTracks.size,trackCount=Number(x.trackCount||tracks.length||0);
  let score=0;
  if(exactCount)score+=40+Math.min(10,(exactCount-1)*5);
  if(nameCount)score+=15+Math.min(8,(nameCount-1)*4);
  if(independentCount)score+=25+Math.min(8,(independentCount-1)*4);
  if(independentDomains.length>=2)score+=7;
  if(ownerCount)score+=5;
  if(trackCount>=2)score+=5;
  if(x.stage==='deep')score+=2;
  score=Math.min(100,score);
  let verification='WEB_EVIDENCE',verificationLabel='SOLO EVIDENZA WEB',placementReason='Segnale pubblico presente, ma non abbastanza forte per promuovere il placement.';
  if(score>=80){verification='CONFIRMED';verificationLabel='CONFERMATO PUBBLICAMENTE';placementReason='Match forte: URL/nome playlist coerente con traccia e artista, supportato da evidenza indipendente.'}
  else if(score>=55){verification='PROBABLE';verificationLabel='PROBABILE';placementReason='Più segnali coerenti sul placement, ma manca ancora una conferma pubblica completa.'}
  return {...x,verification,verificationLabel,verificationScore:score,placementConfidence:score,placementReason,verificationDomains:[...domains],verificationEvidence:evidence,exactTrackEvidence:exactCount,independentTrackEvidence:independentCount,nameTrackEvidence:nameCount,ownerTrackEvidence:ownerCount};
}'''
s=s[:start]+new+s[end:]

# Show the numeric placement confidence in the Artist Radar cards.
old="verify.textContent=(x.verification==='CONFIRMED'?'🟢 ':x.verification==='PROBABLE'?'🟡 ':'⚪ ')+(x.verificationLabel||'SOLO EVIDENZA WEB');"
assert old in s
new="verify.textContent=(x.verification==='CONFIRMED'?'🟢 ':x.verification==='PROBABLE'?'🟡 ':'⚪ ')+(x.verificationLabel||'SOLO EVIDENZA WEB')+' · PLACEMENT '+Number(x.placementConfidence||x.verificationScore||0)+'/100';"
s=s.replace(old,new,1)

# Carry placement confidence into actionable contact cards without changing Contact Engine logic.
old="match:x.verificationScore||0,confidence:c.identityConfidence||0,badge:x.verification==='CONFIRMED'?'Verified Placement':'Probable Placement'"
assert old in s
new="match:x.verificationScore||0,placementConfidence:x.placementConfidence||x.verificationScore||0,confidence:c.identityConfidence||0,badge:x.verification==='CONFIRMED'?'Verified Placement':'Probable Placement'"
s=s.replace(old,new,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.59 Cloud';","const VERSION = 'RADAR v0.4.7.60 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.59</div>','<div class="version">v0.4.7.60</div>',1)
for needle in ['RADAR v0.4.7.60 Cloud','PLACEMENT \'','nameTrackEvidence','ownerTrackEvidence','score>=80','score>=55','Spotify playlist']:
    assert needle in s, needle
p.write_text(s)
