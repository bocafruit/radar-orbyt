from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.63 Cloud';" in s

start=s.index('async function artistRadarDirectPlaylistCheck(x,cat){')
end=s.index('\nasync function artistRadarVerifyCandidate(', start)
new=r'''function artistRadarCatalogMaps(cat){
  const byId=new Map(),byName=new Map();
  for(const t of cat.tracks||[]){const id=artistRadarTrackId(t.spotifyUrl);if(id)byId.set(id,t.name);byName.set(normalize(t.name),t.name)}
  return {byId,byName};
}
function artistRadarMatchTrack(t,cat,maps){
  const raw=t?.track||t||{},uri=String(raw?.uri||t?.uri||''),id=uri.startsWith('spotify:track:')?uri.split(':').pop():String(raw?.id||t?.id||''),title=String(raw?.name||t?.title||t?.name||'').trim(),artists=(raw?.artists||[]).map(a=>a?.name).filter(Boolean),subtitle=String(t?.subtitle||t?.artist||artists.join(', ')).trim();
  let hit=id&&maps.byId.get(id);if(!hit&&title&&normalize(subtitle).includes(normalize(cat.artist)))hit=maps.byName.get(normalize(title));return hit||'';
}
async function artistRadarOfficialPlaylistCheck(playlistId,cat,env){
  const token=await spotifyAccessToken(env).catch(()=>null);if(!token)return {available:false,reason:'api-no-token',matches:[],source:'spotify-api'};
  const maps=artistRadarCatalogMaps(cat),matches=[],controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);let offset=0,total=null,scanned=0,pages=0,lastStatus=0;
  try{
    while(pages<3){
      const r=await fetch('https://api.spotify.com/v1/playlists/'+encodeURIComponent(playlistId)+'/tracks?limit=100&offset='+offset,{headers:{Authorization:'Bearer '+token,Accept:'application/json'},signal:controller.signal});lastStatus=r.status;
      if(!r.ok)return {available:false,reason:'api-http-'+r.status,matches:[],source:'spotify-api',httpStatus:r.status};
      const j=await r.json(),items=Array.isArray(j?.items)?j.items:[];total=Number(j?.total||0)||items.length;pages++;scanned+=items.length;
      for(const item of items){const hit=artistRadarMatchTrack(item,cat,maps);if(hit&&!matches.includes(hit))matches.push(hit)}
      if(matches.length)return {available:true,reason:'api-direct-match',matches,source:'spotify-api',visibleTracks:scanned,totalTracks:total,complete:scanned>=total,partial:scanned<total,httpStatus:lastStatus,pages};
      if(!items.length||scanned>=total)break;offset+=items.length;
    }
    return {available:true,reason:scanned>=Number(total||0)?'api-complete-no-match':'api-partial-no-match',matches:[],source:'spotify-api',visibleTracks:scanned,totalTracks:total,complete:scanned>=Number(total||0),partial:scanned<Number(total||0),httpStatus:lastStatus,pages};
  }catch(e){return {available:false,reason:e&&e.name==='AbortError'?'api-timeout':'api-exception-'+String(e?.name||'Error'),matches:[],source:'spotify-api',errorMessage:String(e?.message||'').slice(0,90)}}finally{clearTimeout(timer)}
}
async function artistRadarEmbedAttempt(url,playlistId,cat,label){
  const maps=artistRadarCatalogMaps(cat),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),6500);
  try{
    const r=await fetch(url,{headers:{Accept:'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8','Accept-Language':'en-US,en;q=0.8','User-Agent':'Mozilla/5.0 (Linux; Android 16) AppleWebKit/537.36 Chrome/140 Safari/537.36'},signal:controller.signal}),ctype=String(r.headers.get('content-type')||'');
    if(!r.ok)return {available:false,reason:label+'-http-'+r.status,matches:[],parser:'http',httpStatus:r.status,contentType:ctype,source:label};
    const html=await r.text(),parsed=artistRadarEmbedEntity(html),entity=parsed.entity;
    if(!entity)return {available:false,reason:label+'-parse-'+parsed.strategy,matches:[],parser:parsed.strategy,parserPath:parsed.path||'',scriptCount:parsed.scriptCount||0,parsedCount:parsed.parsedCount||0,httpStatus:r.status,contentType:ctype,htmlBytes:html.length,source:label};
    const list=Array.isArray(entity.trackList)?entity.trackList:[],total=Number(entity.trackCount||entity.totalTracks||entity.total||0)||0,matches=[];
    for(const item of list){const hit=artistRadarMatchTrack(item,cat,maps);if(hit&&!matches.includes(hit))matches.push(hit)}
    const complete=total>0&&list.length>=total,partial=total>0?list.length<total:list.length>=95;
    return {available:true,reason:matches.length?label+'-direct-match':(partial?label+'-no-match-partial':label+'-no-match'),source:label,playlistId,visibleTracks:list.length,totalTracks:total||null,complete,partial,matches,parser:parsed.strategy,parserPath:parsed.path||'',scriptCount:parsed.scriptCount||0,parsedCount:parsed.parsedCount||0,httpStatus:r.status,contentType:ctype,htmlBytes:html.length};
  }catch(e){return {available:false,reason:e&&e.name==='AbortError'?label+'-timeout':label+'-exception-'+String(e?.name||'Error'),matches:[],parser:'exception',source:label,errorMessage:String(e?.message||'').slice(0,90)}}finally{clearTimeout(timer)}
}
async function artistRadarDirectPlaylistCheck(x,cat,env){
  const playlistId=String(x.playlistId||'').trim()||(()=>{try{const u=new URL(x.spotifyUrl);const p=u.pathname.split('/').filter(Boolean);return p[0]==='playlist'&&p[1]?p[1]:''}catch(e){return''}})();
  if(!playlistId)return {available:false,reason:'playlist-id-missing',matches:[],parser:'none',attempts:['id:missing']};
  const attempts=[];
  const api=await artistRadarOfficialPlaylistCheck(playlistId,cat,env);attempts.push(api.reason);
  if(api.matches?.length||api.available&&api.complete)return {...api,playlistId,attempts};
  const embed=await artistRadarEmbedAttempt('https://open.spotify.com/embed/playlist/'+encodeURIComponent(playlistId),playlistId,cat,'spotify-embed');attempts.push(embed.reason);
  if(embed.matches?.length||embed.available&&embed.complete)return {...embed,attempts};
  const page=await artistRadarEmbedAttempt('https://open.spotify.com/playlist/'+encodeURIComponent(playlistId),playlistId,cat,'spotify-page');attempts.push(page.reason);
  if(page.matches?.length||page.available&&page.complete)return {...page,attempts};
  const best=[api,embed,page].find(v=>v.available&&v.partial)||[api,embed,page].find(v=>v.available)||page||embed||api;
  return {...best,playlistId,attempts,reason:best?.reason||'direct-unavailable'};
}'''
s=s[:start]+new+s[end:]

s=s.replace('const direct=await artistRadarDirectPlaylistCheck(x,cat);','const direct=await artistRadarDirectPlaylistCheck(x,cat,env);',1)

# Carry source/attempt/error diagnostics through fallback outcome.
old="directReason:direct.reason||'',directParser:direct.parser||'',directParserPath:direct.parserPath||'',directVisibleTracks:direct.visibleTracks||0,directTotalTracks:direct.totalTracks||null,verificationDomains:[...domains]"
assert old in s
new="directReason:direct.reason||'',directParser:direct.parser||'',directParserPath:direct.parserPath||'',directVisibleTracks:direct.visibleTracks||0,directTotalTracks:direct.totalTracks||null,directSource:direct.source||'',directAttempts:direct.attempts||[],directErrorMessage:direct.errorMessage||'',verificationDomains:[...domains]"
s=s.replace(old,new,1)

# Better visible diagnostic: expose source + attempts, not generic exception only.
old="dg.textContent='Spotify check: '+String(x.directReason||'n/a')+' · '+Number(x.directVisibleTracks||0)+(x.directTotalTracks?'/'+Number(x.directTotalTracks):'')+' tracce · '+String(x.directParser||'n/a');"
assert old in s
new="dg.textContent='Spotify check: '+String(x.directReason||'n/a')+' · '+Number(x.directVisibleTracks||0)+(x.directTotalTracks?'/'+Number(x.directTotalTracks):'')+' tracce · '+String(x.directSource||x.directParser||'n/a')+(Array.isArray(x.directAttempts)&&x.directAttempts.length?' · '+x.directAttempts.join(' > '):'');"
s=s.replace(old,new,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.63 Cloud';","const VERSION = 'RADAR v0.4.7.64 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.63</div>','<div class="version">v0.4.7.64</div>',1)
for needle in ['RADAR v0.4.7.64 Cloud','artistRadarOfficialPlaylistCheck','spotify-page','api-partial-no-match','directAttempts','Spotify check:']:
    assert needle in s,needle
p.write_text(s)
