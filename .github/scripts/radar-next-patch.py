from pathlib import Path
p=Path('worker.js')
s=p.read_text()
assert "const VERSION = 'RADAR v0.4.7.64 Cloud';" in s
print('RADAR .64 candidate already built')
