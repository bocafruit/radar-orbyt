from pathlib import Path
import re, sys

s = Path('worker.js').read_text()

m = re.search(r"const VERSION = '([^']+)';", s)
assert m, 'VERSION missing'
version = m.group(1)
assert version.startswith('RADAR v'), version

# Core product/runtime canaries. These catch accidental frontend/bootstrap regressions.
checks = [
    'id="dateClock"',
    'function updateClock',
    'id="discoveryRadarTab"',
    'id="trackRadarTab"',
    'id="trackRadarShell"',
    'id="artistRadarInput"',
    'id="artistRadarScan"',
    'async function scanArtistRadar()',
    'async function artistRadarCatalog(raw,env)',
    'async function artistRadarScan(input,env)',
    'function trackRadarAlgorithmic(name)',
    'id="stopScan" type="button" disabled',
    '/api/health',
    '/api/artist-radar',
    '/api/discover-base',
    '/api/contact-enrich',
]
missing = [x for x in checks if x not in s]
assert not missing, 'Missing canaries: ' + ', '.join(missing)

# IDs that must stay unique in the rendered app shell.
for marker in ['id="dateClock"','id="artistRadarInput"','id="artistRadarScan"','id="stopScan"']:
    assert s.count(marker) == 1, f'Duplicate/missing DOM marker: {marker} -> {s.count(marker)}'

# Protect the stable Discovery Radar bootstrap from accidental deletion.
for marker in [
    "$('#discover').addEventListener('click',discover)",
    "$('#stopScan').addEventListener('click'",
    'async function discover()',
    'function paintResults(items)',
    'function sortedFilteredResults()',
]:
    assert marker in s, f'Discovery Radar regression: {marker}'

# Artist Radar verification contract introduced in .52+.
if 'artistRadarVerifyCandidate' in s:
    for marker in ['verificationSummary','CONFERMATO PUBBLICAMENTE','PROBABILE','SOLO EVIDENZA WEB']:
        assert marker in s, f'Artist verification contract missing: {marker}'

# Ensure HTML response remains explicitly non-cached so production deploy checks are meaningful.
assert "'cache-control':'no-store'" in s, 'Homepage must remain no-store'

print('RADAR CI PASS:', version)
