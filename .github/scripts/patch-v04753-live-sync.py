from pathlib import Path
p=Path('worker.js'); s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.52 Cloud';" in s
assert "verificationSummary" in s and "CONFERMATO PUBBLICAMENTE" in s
old="return {artist:cat.artist,tracks:cat.tracks,playlists:verified,mode:'verified',deepTracks:missing.map(x=>x.name),verificationSummary:{confirmed:verified.filter(x=>x.verification==='CONFIRMED').length,probable:verified.filter(x=>x.verification==='PROBABLE').length,web:verified.filter(x=>x.verification==='WEB_EVIDENCE').length}}"
new="return {artist:cat.artist,tracks:cat.tracks,playlists:verified,mode:'verified',build:VERSION,deepTracks:missing.map(x=>x.name),verificationSummary:{confirmed:verified.filter(x=>x.verification==='CONFIRMED').length,probable:verified.filter(x=>x.verification==='PROBABLE').length,web:verified.filter(x=>x.verification==='WEB_EVIDENCE').length}}"
assert old in s
s=s.replace(old,new,1)
old2="sum.textContent=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili';"
new2="sum.textContent=(d.artist||artist)+' · '+tracks.length+' tracce · '+rows.length+' playlist · '+(vs.confirmed||0)+' confermate · '+(vs.probable||0)+' probabili · '+String(d.build||'RADAR');"
assert old2 in s
s=s.replace(old2,new2,1)
s=s.replace("const VERSION = 'RADAR v0.4.7.52 Cloud';","const VERSION = 'RADAR v0.4.7.53 Cloud';",1)
s=s.replace('<div class=\"version\">v0.4.7.52</div>','<div class=\"version\">v0.4.7.53</div>',1)
p.write_text(s)
