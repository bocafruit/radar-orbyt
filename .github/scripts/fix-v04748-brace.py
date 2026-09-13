from pathlib import Path
p=Path('worker.js')
s=p.read_text()
old="if(x.evidence.length<3)x.evidence.push(String((r.title||'')+' — '+(r.description||'')).slice(0,240))}}}const out=[];"
new="if(x.evidence.length<3)x.evidence.push(String((r.title||'')+' — '+(r.description||'')).slice(0,240))}}const out=[];"
assert old in s
p.write_text(s.replace(old,new,1))
