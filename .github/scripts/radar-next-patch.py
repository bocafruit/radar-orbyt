from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.60 Cloud';" in s

# Recalibrate Placement Confidence: discovery evidence is the baseline,
# verification evidence raises confidence instead of starting from zero.
start=s.index('async function artistRadarVerifyCandidate(x,cat,env){')
end=s.index('\nasync function artistRadarEnrichContact(',start)
new=r'''async function artistRadarVerifyCandidate(x,cat,env){
  const tracks=[...x.tracks].slice(0,3),domains=new Set(),evidence=[],exactSpotify=new Set(),independentTracks=new Set(),nameMatchedTracks=new Set(),ownerMatchedTracks=new Set();
  const playlistName=String(x.name||'').trim(),owner=String(x.owner||'').trim(),playlistUrl=cleanPlaylistUrl(x.spotifyUrl);
  const initialEvidence=Array.isArray(x.evidence)?x.evidence.filter(Boolean):[];
  const trackCount=Number(x.trackCount||tracks.length||0);
  let baseScore=0;
  if(playlistUrl)baseScore+=28;
  if(initialEvidence.length)baseScore+=8;
  if(playlistName&&normalize(playlistName)!=='spotify playlist')baseScore+=5;
  if(owner)baseScore+=6;
  if(trackCount>=2)baseScore+=4;
  if(x.stage==='fast')baseScore+=3;else if(x.stage==='deep')baseScore+=1;
  baseScore=Math.min(50,baseScore);

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
  const exactCount=exactSpotify.size,independentCount=independentTracks.size,nameCount=nameMatchedTracks.size,ownerCount=ownerMatchedTracks.size;
  let verificationBoost=0;
  if(exactCount)verificationBoost+=28+Math.min(8,(exactCount-1)*4);
  if(nameCount)verificationBoost+=10+Math.min(6,(nameCount-1)*3);
  if(independentCount)verificationBoost+=22+Math.min(8,(independentCount-1)*4);
  if(independentDomains.length>=2)verificationBoost+=6;
  if(ownerCount)verificationBoost+=5;

  const score=Math.min(100,baseScore+verificationBoost);
  let verification='WEB_EVIDENCE',verificationLabel='SOLO EVIDENZA WEB',placementReason='Candidato Spotify coerente emerso dalla discovery, ma senza verifica sufficiente per promuoverlo.';
  if(score>=80&&(independentCount>=1||exactCount>=2)){
    verification='CONFIRMED';verificationLabel='CONFERMATO PUBBLICAMENTE';
    placementReason='Placement forte: discovery coerente e verifica pubblica multipla su traccia, artista e playlist.';
  }else if(score>=55){
    verification='PROBABLE';verificationLabel='PROBABILE';
    placementReason='Discovery coerente più almeno un segnale di verifica aggiuntivo; placement plausibile ma non ancora pienamente confermato.';
  }
  return {...x,verification,verificationLabel,verificationScore:score,placementConfidence:score,placementBaseScore:baseScore,placementVerificationBoost:verificationBoost,placementReason,verificationDomains:[...domains],verificationEvidence:evidence,exactTrackEvidence:exactCount,independentTrackEvidence:independentCount,nameTrackEvidence:nameCount,ownerTrackEvidence:ownerCount};
}'''
s=s[:start]+new+s[end:]

old="verify.textContent=(x.verification==='CONFIRMED'?'🟢 ':x.verification==='PROBABLE'?'🟡 ':'⚪ ')+(x.verificationLabel||'SOLO EVIDENZA WEB')+' · PLACEMENT '+Number(x.placementConfidence||x.verificationScore||0)+'/100';"
assert old in s
new="verify.textContent=(x.verification==='CONFIRMED'?'🟢 ':x.verification==='PROBABLE'?'🟡 ':'⚪ ')+(x.verificationLabel||'SOLO EVIDENZA WEB')+' · PLACEMENT '+Number(x.placementConfidence||x.verificationScore||0)+'/100';verify.title='Discovery '+Number(x.placementBaseScore||0)+' + verifica '+Number(x.placementVerificationBoost||0);"
s=s.replace(old,new,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.60 Cloud';","const VERSION = 'RADAR v0.4.7.61 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.60</div>','<div class="version">v0.4.7.61</div>',1)
for needle in ['RADAR v0.4.7.61 Cloud','placementBaseScore','placementVerificationBoost','baseScore+=28','score>=55','Discovery \'']:
    assert needle in s, needle
p.write_text(s)
