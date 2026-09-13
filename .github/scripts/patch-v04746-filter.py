from pathlib import Path
p=Path('worker.js'); s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.45 Cloud';" in s
assert 'id="dateClock"' in s and 'id="trackRadarTab"' in s and 'id="trackRadarScan"' in s
old="async function trackRadarScan(input,env){const track=String(input?.track||'').trim(),artist=String(input?.artist||'').trim();"
assert old in s
helper="function trackRadarAlgorithmic(name){const n=normalize(name).replace(/[^a-z0-9 ]/g,' ').replace(/\\s+/g,' ').trim();return /^(release radar|discover weekly|daylist|on repeat|repeat rewind|smart shuffle|dj|radio)(?: |$)/.test(n)||/^daily mix(?: \\d+)?(?: |$)/.test(n)}\n"
s=s.replace(old,helper+old,1)
old2="const placements=[];for(const item of [...map.values()].slice(0,20)){try{const ident=await spotifyPlaylistIdentity(item.spotifyUrl,env);if(ident){item.name=ident.name||item.name;item.owner=ident.owner||''}}catch(e){}placements.push(item)}"
assert old2 in s
new2="const placements=[];for(const item of [...map.values()].slice(0,20)){try{const ident=await spotifyPlaylistIdentity(item.spotifyUrl,env);if(ident){item.name=ident.name||item.name;item.owner=ident.owner||''}}catch(e){}if(trackRadarAlgorithmic(item.name))continue;placements.push(item)}"
s=s.replace(old2,new2,1)
s=s.replace("const VERSION = 'RADAR v0.4.7.45 Cloud';","const VERSION = 'RADAR v0.4.7.46 Cloud';",1)
s=s.replace('<div class="version">v0.4.7.45</div>','<div class="version">v0.4.7.46</div>',1)
p.write_text(s)
