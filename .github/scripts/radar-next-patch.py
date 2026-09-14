from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.62 Cloud';" in s

# RADAR .63: make Spotify public-embed parsing resilient and expose diagnostics.
# This is intentionally isolated to Artist Radar direct verification + its card diagnostics.
start=s.index('function artistRadarEmbedEntity(html){')
end=s.index('\nasync function artistRadarVerifyCandidate(', start)
new=r'''function artistRadarFindTrackEntity(root){
  const seen=new Set(),q=[{v:root,path:'root',depth:0}];
  while(q.length){
    const n=q.shift(),v=n.v;
    if(!v||typeof v!=='object'||seen.has(v)||n.depth>10)continue;
    seen.add(v);
    if(Array.isArray(v.trackList))return {entity:v,path:n.path+'.trackList',strategy:'recursive-trackList'};
    for(const [k,x] of Object.entries(v)){
      if(x&&typeof x==='object')q.push({v:x,path:n.path+'.'+k,depth:n.depth+1});
    }
  }
  return null;
}
function artistRadarEmbedEntity(html){
  const raw=String(html||''),scripts=[];
  const next=raw.match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if(next)scripts.push({json:next[1],strategy:'next-data'});
  const re=/<script[^>]+type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/ig;let m;
  while((m=re.exec(raw))&&scripts.length<12)scripts.push({json:m[1],strategy:'application-json'});
  let parsed=0;
  for(const src of scripts){
    try{
      const root=JSON.parse(src.json);parsed++;
      const hit=artistRadarFindTrackEntity(root);
      if(hit)return {entity:hit.entity,strategy:src.strategy+'>'+hit.strategy,path:hit.path,scriptCount:scripts.length,parsedCount:parsed};
    }catch(e){}
  }
  return {entity:null,strategy:scripts.length?'json-no-tracklist':'no-json-script',path:'',scriptCount:scripts.length,parsedCount:parsed};
}
async function artistRadarDirectPlaylistCheck(x,cat){
  const playlistId=String(x.playlistId||'').trim()||(()=>{try{const u=new URL(x.spotifyUrl);const p=u.pathname.split('/').filter(Boolean);return p[0]==='playlist'&&p[1]?p[1]:''}catch(e){return''}})();
  if(!playlistId)return {available:false,reason:'playlist-id-missing',matches:[],parser:'none'};
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),6500);
  try{
    const r=await fetch('https://open.spotify.com/embed/playlist/'+encodeURIComponent(playlistId),{headers:{'Accept':'text/html,application/xhtml+xml','User-Agent':'Mozilla/5.0 (compatible; RADAR/1.0)'},signal:controller.signal});
    const ctype=String(r.headers.get('content-type')||'');
    if(!r.ok)return {available:false,reason:'embed-http-'+r.status,matches:[],parser:'http',httpStatus:r.status,contentType:ctype};
    const html=await r.text(),parsed=artistRadarEmbedEntity(html),entity=parsed.entity;
    if(!entity)return {available:false,reason:'embed-parse-'+parsed.strategy,matches:[],parser:parsed.strategy,parserPath:parsed.path||'',scriptCount:parsed.scriptCount||0,parsedCount:parsed.parsedCount||0,httpStatus:r.status,contentType:ctype,htmlBytes:html.length};
    const list=Array.isArray(entity.trackList)?entity.trackList:[],total=Number(entity.trackCount||entity.totalTracks||entity.total||0)||0,byId=new Map(),byName=new Map();
    for(const t of cat.tracks||[]){const id=artistRadarTrackId(t.spotifyUrl);if(id)byId.set(id,t.name);byName.set(normalize(t.name),t.name)}
    const matches=[];
    for(const t of list){
      const uri=String(t?.uri||t?.track?.uri||''),id=uri.startsWith('spotify:track:')?uri.split(':').pop():String(t?.id||t?.track?.id||''),title=String(t?.title||t?.name||t?.track?.name||'').trim(),subtitle=String(t?.subtitle||t?.artist||((t?.track?.artists||[]).map(a=>a?.name).filter(Boolean).join(', '))||'').trim();
      let hit=id&&byId.get(id);if(!hit&&title&&normalize(subtitle).includes(normalize(cat.artist)))hit=byName.get(normalize(title));if(hit&&!matches.includes(hit))matches.push(hit)
    }
    const complete=total>0&&list.length>=total,partial=total>0?list.length<total:list.length>=95;
    return {available:true,reason:matches.length?'direct-match':(partial?'visible-no-match-partial':'visible-no-match'),source:'spotify-embed',playlistId,visibleTracks:list.length,totalTracks:total||null,complete,partial,matches,parser:parsed.strategy,parserPath:parsed.path||'',scriptCount:parsed.scriptCount||0,parsedCount:parsed.parsedCount||0,httpStatus:r.status,contentType:ctype,htmlBytes:html.length};
  }catch(e){return {available:false,reason:e&&e.name==='AbortError'?'embed-timeout':'embed-error',matches:[],parser:'exception'}}finally{clearTimeout(timer)}
}'''
s=s[:start]+new+s[end:]

# Carry direct diagnostics through every verification outcome.
s=s.replace("directPartial:direct.partial,verificationDomains:['open.spotify.com']","directPartial:direct.partial,directReason:direct.reason||'',directParser:direct.parser||'',directParserPath:direct.parserPath||'',directVisibleTracks:direct.visibleTracks||0,directTotalTracks:direct.totalTracks||null,verificationDomains:['open.spotify.com']",1)
s=s.replace("directPartial:false,verificationDomains:['open.spotify.com']","directPartial:false,directReason:direct.reason||'',directParser:direct.parser||'',directParserPath:direct.parserPath||'',directVisibleTracks:direct.visibleTracks||0,directTotalTracks:direct.totalTracks||null,verificationDomains:['open.spotify.com']",1)
old="directPartial:partial,verificationDomains:[...domains]"
assert old in s
s=s.replace(old,"directPartial:partial,directReason:direct.reason||'',directParser:direct.parser||'',directParserPath:direct.parserPath||'',directVisibleTracks:direct.visibleTracks||0,directTotalTracks:direct.totalTracks||null,verificationDomains:[...domains]",1)

# Show compact diagnostic only on non-direct results so the next real scan tells us why.
old="const names=document.createElement('div');names.className='muted';names.style.marginTop='6px';names.textContent=((x.directMatchedTracks&&x.directMatchedTracks.length)?x.directMatchedTracks:(x.tracks||[])).slice(0,8).join(' · ');const cp=document.createElement('div');"
assert old in s
new="const names=document.createElement('div');names.className='muted';names.style.marginTop='6px';names.textContent=((x.directMatchedTracks&&x.directMatchedTracks.length)?x.directMatchedTracks:(x.tracks||[])).slice(0,8).join(' · ');if(!x.directVerified){const dg=document.createElement('div');dg.className='muted';dg.style.cssText='margin-top:6px;font-size:10px;opacity:.82';dg.textContent='Spotify check: '+String(x.directReason||'n/a')+' · '+Number(x.directVisibleTracks||0)+(x.directTotalTracks?'/'+Number(x.directTotalTracks):'')+' tracce · '+String(x.directParser||'n/a');card.appendChild(dg)}const cp=document.createElement('div');"
s=s.replace(old,new,1)

# Add aggregate direct diagnostics to the Artist Radar summary payload.
old="directVerification:{checked:checked.length,rejected:rejected.length,verified:verified.filter(x=>x.directVerified).length,partial:verified.filter(x=>x.directPartial).length}"
assert old in s
new="directVerification:{checked:checked.length,rejected:rejected.length,verified:verified.filter(x=>x.directVerified).length,partial:verified.filter(x=>x.directPartial).length,reasons:checked.reduce((a,x)=>{const k=x.directReason||'unknown';a[k]=(a[k]||0)+1;return a}, {})}"
s=s.replace(old,new,1)

s=s.replace("const VERSION = 'RADAR v0.4.7.62 Cloud';","const VERSION = 'RADAR v0.4.7.63 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.62</div>','<div class="version">v0.4.7.63</div>',1)
for needle in ['RADAR v0.4.7.63 Cloud','artistRadarFindTrackEntity','recursive-trackList','directReason','directParser','Spotify check:','reasons:checked.reduce']:
    assert needle in s, needle
p.write_text(s)
