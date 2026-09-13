from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.53 Cloud';" in s
start=s.index('async function artistRadarCatalog(raw,env)')
end=s.index('\nfunction artistRadarNameMatch',start)
new=r'''async function artistRadarCatalog(raw,env){
  const q=artistRadarInputName(raw),token=await spotifyAccessToken(env);
  if(!token)throw new Error('Spotify non disponibile');
  const market=String(env.SPOTIFY_MARKET||'IT').toUpperCase();
  let artistName=q.name,artistId=q.artistId;
  if(artistId&&!artistName){
    const ar=await fetch('https://api.spotify.com/v1/artists/'+encodeURIComponent(artistId),{headers:{Authorization:'Bearer '+token}});
    if(ar.ok){const ad=await ar.json();artistName=String(ad.name||'').trim()}
  }
  if(!artistId&&artistName){
    const u=new URL('https://api.spotify.com/v1/search');
    u.searchParams.set('q',artistName);u.searchParams.set('type','artist');u.searchParams.set('limit','10');
    const r=await fetch(u,{headers:{Authorization:'Bearer '+token}}).catch(()=>null);
    if(r&&r.ok){const d=await r.json();const items=d.artists?.items||[];const exact=items.find(a=>normalize(a.name)===normalize(artistName))||items[0];if(exact){artistId=String(exact.id||'');artistName=String(exact.name||artistName).trim()}}
  }
  if(!artistName)throw new Error('Artista non riconosciuto');
  const seen=new Set(),tracks=[];
  const pushTrack=(t,releaseDate='')=>{const arts=(t.artists||[]).map(a=>String(a.name||'').trim());if(!arts.some(a=>normalize(a)===normalize(artistName)))return;const name=String(t.name||'').trim(),k=normalize(name);if(!name||seen.has(k))return;seen.add(k);tracks.push({name,spotifyUrl:String(t.external_urls?.spotify||''),releaseDate})};
  let catalogSource='search';
  if(artistId){
    try{
      const albums=[];
      for(const offset of [0,10]){
        const u=new URL('https://api.spotify.com/v1/artists/'+encodeURIComponent(artistId)+'/albums');
        u.searchParams.set('include_groups','album,single');u.searchParams.set('market',market);u.searchParams.set('limit','10');u.searchParams.set('offset',String(offset));
        const r=await fetch(u,{headers:{Authorization:'Bearer '+token}});if(!r.ok)break;
        const d=await r.json();const items=d.items||[];for(const a of items){if(a?.id&&!albums.some(x=>x.id===a.id))albums.push({id:a.id,releaseDate:String(a.release_date||'')})}if(items.length<10)break;
      }
      if(albums.length){
        const batches=await Promise.all(albums.slice(0,20).map(async a=>{const u=new URL('https://api.spotify.com/v1/albums/'+encodeURIComponent(a.id)+'/tracks');u.searchParams.set('market',market);u.searchParams.set('limit','10');const r=await fetch(u,{headers:{Authorization:'Bearer '+token}}).catch(()=>null);if(!r||!r.ok)return[];const d=await r.json();return (d.items||[]).map(t=>({t,releaseDate:a.releaseDate}))}));
        for(const batch of batches){for(const x of batch){pushTrack(x.t,x.releaseDate);if(tracks.length>=16)break}if(tracks.length>=16)break}
        if(tracks.length)catalogSource='artist-releases';
      }
    }catch(e){}
  }
  if(tracks.length<8){
    for(const offset of [0,10,20]){
      const u=new URL('https://api.spotify.com/v1/search');u.searchParams.set('q','artist:'+artistName);u.searchParams.set('type','track');u.searchParams.set('limit','10');u.searchParams.set('offset',String(offset));
      const r=await fetch(u,{headers:{Authorization:'Bearer '+token}});if(!r.ok)break;
      const d=await r.json();const items=d.tracks?.items||[];for(const t of items){pushTrack(t,String(t.album?.release_date||''));if(tracks.length>=16)break}if(tracks.length>=16||items.length<10)break;
    }
  }
  if(!tracks.length)throw new Error('Nessuna traccia Spotify trovata per '+artistName);
  tracks.sort((a,b)=>String(b.releaseDate||'').localeCompare(String(a.releaseDate||''))||String(a.name).localeCompare(String(b.name)));
  return {artist:artistName,artistId,tracks:tracks.slice(0,12),catalogSource};
}'''
s=s[:start]+new+s[end:]
old="return {artist:cat.artist,tracks:cat.tracks,playlists:verified,mode:'verified',build:VERSION,deepTracks:missing.map(x=>x.name),verificationSummary:"
assert old in s
s=s.replace(old,"return {artist:cat.artist,artistId:cat.artistId||'',catalogSource:cat.catalogSource||'',tracks:cat.tracks,playlists:verified,mode:'verified',build:VERSION,deepTracks:missing.map(x=>x.name),verificationSummary:",1)
s=s.replace("const VERSION = 'RADAR v0.4.7.53 Cloud';","const VERSION = 'RADAR v0.4.7.54 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.53</div>','<div class="version">v0.4.7.54</div>',1)
old_ui="sum.textContent=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili · '+String(d.build||'RADAR');"
assert old_ui in s
new_ui="sum.textContent=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili · '+String(d.build||'RADAR')+(d.catalogSource?' · catalogo '+d.catalogSource:'');"
s=s.replace(old_ui,new_ui,1)
p.write_text(s)
