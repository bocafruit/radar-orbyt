from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.57 Cloud';" in s

# 1) Upgrade Spotify playlist identity with short-lived cache + description/followers.
old=r'''async function spotifyPlaylistIdentity(spotifyUrl,env){
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
'''
assert old in s
new=r'''const spotifyPlaylistIdentityCache=new Map();
async function spotifyPlaylistIdentity(spotifyUrl,env){
  const m=String(spotifyUrl||'').match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/i);
  if(!m)return null;
  const id=m[1],cached=spotifyPlaylistIdentityCache.get(id);
  if(cached&&Date.now()-cached.at<12*60*60*1000)return cached.value;
  const token=await spotifyAccessToken(env);
  if(!token)return null;
  const u='https://api.spotify.com/v1/playlists/'+encodeURIComponent(id)+'?fields=id,name,description,followers(total),owner(display_name,id,external_urls),external_urls';
  const r=await fetch(u,{headers:{'Authorization':'Bearer '+token,'Accept':'application/json'}});
  if(!r.ok)return null;
  const d=await r.json();
  const value={playlistId:String(d.id||id),name:String(d.name||''),description:String(d.description||''),followers:Number(d.followers?.total||0),owner:String(d.owner?.display_name||''),ownerId:String(d.owner?.id||''),ownerUrl:String(d.owner?.external_urls?.spotify||''),spotifyVerified:true};
  spotifyPlaylistIdentityCache.set(id,{at:Date.now(),value});
  return value;
}
'''
s=s.replace(old,new,1)

# 2) Direct-contact parser: use Spotify description before expensive web enrichment.
marker='function artistRadarContactScore(c){'
assert marker in s
helper=r'''function artistRadarSpotifyDirectContact(description){
  const raw=String(description||'').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/g,"'");
  const urls=[...raw.matchAll(/https?:\/\/[^\s<>"']+/gi)].map(m=>m[0].replace(/[),.;]+$/,''));
  const email=(raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)||[])[0]||'';
  const instagram=urls.find(u=>/instagram\.com\/[A-Za-z0-9._-]+/i.test(u))||'';
  const submission=urls.find(u=>/submit|submission|playlistpush|soundplate|dailyplaylists|groover|submithub|musosoup|pitch|send[-_]?music/i.test(u))||'';
  const website=urls.find(u=>!/(?:open\.)?spotify\.com|instagram\.com|facebook\.com|tiktok\.com|x\.com|twitter\.com|youtube\.com/i.test(u))||'';
  return {email,instagram,submission,website,raw};
}
'''
s=s.replace(marker,helper+marker,1)

# 3) Contact enrichment now prioritizes direct Spotify description evidence.
start=s.index('async function artistRadarEnrichContact(x,env){')
end=s.index('\nasync function artistRadarScan(',start)
old_block=s[start:end]
new_block=r'''async function artistRadarEnrichContact(x,env){
  const owner=String(x.owner||'').trim(),name=String(x.name||'').trim();
  let spotify=null;try{spotify=await spotifyPlaylistIdentity(x.spotifyUrl,env)}catch(e){}
  const direct=artistRadarSpotifyDirectContact(spotify?.description||'');
  let email=direct.email||'',instagram=direct.instagram||'',submission=direct.submission||'',website=direct.website||'',evidence=[];
  const directFound=!!(email||instagram||submission||website);
  if(directFound)evidence.push('SPOTIFY DESCRIPTION · '+String(spotify?.description||'').slice(0,260));
  const initial={email,instagram,submission,website};
  const needWeb=artistRadarContactScore(initial)<70;
  if(needWeb){
    const q='"'+name.replace(/"/g,'')+'" '+(owner?'"'+owner.replace(/"/g,'')+'" ':'')+'playlist curator contact Instagram email submit';
    const b=await smartSearch(q,env,10).catch(()=>({results:[]}));
    const blocked=/open\.spotify\.com|spotify\.com/i;
    for(const r of b.results||[]){
      const blob=String((r.title||'')+' '+(r.description||'')+' '+(r.url||''));
      if(!artistRadarNameMatch(name,blob)&&owner&&!normalize(blob).includes(normalize(owner)))continue;
      if(!email){const m=blob.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);if(m)email=m[0]}
      if(!instagram){const m=blob.match(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?/i);if(m)instagram=m[0]}
      const url=String(r.url||'');
      if(!submission&&/submit|submission|playlistpush|soundplate|dailyplaylists|groover|submithub/i.test(blob)&&/^https?:/i.test(url)&&!blocked.test(url))submission=url;
      if(!website&&/^https?:/i.test(url)&&!blocked.test(url)&&!/instagram\.com|facebook\.com|tiktok\.com|x\.com|twitter\.com/i.test(url))website=url;
      if(evidence.length<4)evidence.push(blob.slice(0,220));
    }
  }
  const contact={email,instagram,submission,website,evidence,directSpotify:directFound,source:directFound?'Spotify description':'Web',followers:Number(spotify?.followers||0)};
  contact.score=artistRadarContactScore(contact);
  const normOwner=normalize(owner),normName=normalize(name);let identity=directFound?70:25;
  if(directFound&&spotify?.spotifyVerified)identity+=10;
  if(directFound&&owner&&spotify?.owner&&normalize(owner)===normalize(spotify.owner))identity+=10;
  for(const ev of evidence){const ne=normalize(ev);if(normOwner&&ne.includes(normOwner))identity+=15;if(normName&&artistRadarNameMatch(name,ev))identity+=10}
  if(email&&owner&&normalize(email).includes(normOwner.replace(/\s+/g,'')))identity+=10;
  contact.identityConfidence=Math.min(100,identity);
  contact.contactable=contact.score>=25;
  return {...x,contact};
}
'''
s=s[:start]+new_block+s[end:]

# 4) Surface the high-value direct source in the progressive Artist Radar result.
old="if(c.email)bits.push('✉ '+c.email);if(c.instagram)bits.push('Instagram');if(c.submission)bits.push('Submission');if(c.website)bits.push('Sito');"
assert old in s
new="if(c.email)bits.push('✉ '+c.email);if(c.instagram)bits.push('Instagram');if(c.submission)bits.push('Submission');if(c.website)bits.push('Sito');if(c.directSpotify)bits.push('Spotify description');"
s=s.replace(old,new,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.57 Cloud';","const VERSION = 'RADAR v0.4.7.58 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.57</div>','<div class="version">v0.4.7.58</div>',1)

for needle in ["RADAR v0.4.7.58 Cloud","spotifyPlaylistIdentityCache","description,followers(total)","artistRadarSpotifyDirectContact","directSpotify","Spotify description","needWeb=artistRadarContactScore(initial)<70"]:
    assert needle in s, needle
p.write_text(s)
