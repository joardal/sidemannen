"""Import standalone demo HTML and referenced assets; never modify originals."""
from pathlib import Path
import re, json, hashlib, shutil, html, unicodedata
from urllib.parse import unquote, urlsplit

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(r'C:\Nettsider')
DEST=ROOT/'public'/'demos'
DEST.mkdir(parents=True,exist_ok=True)
def slug(s):
    s=s.lower().replace('æ','ae').replace('ø','o').replace('å','a')
    return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode()).strip('-')
names={'Tannklinikker':('tannlege','Tannleger'),'Fotografer':('fotograf','Fotografer'),'Renhold':('renhold','Renhold'),'rrørleggere':('rorlegger','Rørleggere'),'Hud og skjønnhet':('hud-og-skjonnhet','Hud og skjønnhet'),'Vaktmestertjenester og eiendomsservice':('eiendomsservice','Eiendomsservice'),'Klima og varmepumpefirmaer':('varmepumpe','Klima og varmepumper')}
rows=[]; issues=[]; seen=set()
for sector in sorted(SOURCE.iterdir()):
    if not sector.is_dir(): continue
    sid,label=names.get(sector.name,(slug(sector.name),sector.name))
    candidates=list(sector.glob('*.html'))+list(sector.glob('*/index.html'))
    for p in candidates:
        raw=p.read_text(encoding='utf-8-sig',errors='replace')
        digest=hashlib.sha256(raw.encode()).hexdigest()
        if digest in seen: continue
        seen.add(digest)
        did=sid+'-'+(slug(p.parent.name) if p.parent!=sector else 'studio')
        title=re.search(r'<title[^>]*>(.*?)</title>',raw,re.S|re.I)
        title=html.unescape(re.sub('<[^>]+>','',title.group(1))).strip() if title else label
        title=re.split(r'\s[|—–]\s',title)[0].strip()[:85]
        dest=DEST/did; dest.mkdir(exist_ok=True)
        # Local files copied only when referenced, never project configs or source.
        copied=set(); missing=[]
        def copy_refs(text,base):
            refs=re.findall(r'''(?:src|href|poster)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^\s)'";]+)''',text,re.I)
            for a,b in refs:
                ref=html.unescape(a or b).strip()
                if len(ref)>500: continue
                if ref.startswith(('http:','https:','data:','//','#','mailto:','tel:','javascript:')): continue
                rel=unquote(urlsplit(ref).path)
                if not rel: continue
                src=(base/rel.lstrip('/')).resolve()
                try: sub=src.relative_to(p.parent.resolve())
                except ValueError:
                    missing.append(rel); continue
                if src.suffix.lower() not in ('.png','.jpg','.jpeg','.webp','.avif','.gif','.svg','.woff','.woff2','.ttf','.css','.js','.ico','.mp4','.webm'): continue
                if str(sub) in copied: continue
                if not src.is_file(): missing.append(rel); continue
                copied.add(str(sub)); target=dest/sub; target.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(src,target)
                if src.suffix in ('.css','.js'): copy_refs(src.read_text(encoding='utf8',errors='replace'),src.parent)
        # Many demos assign image URLs in inline JavaScript; include asset folders too.
        for dirname in ('images','assets','img','fonts'):
            folder=p.parent/dirname
            if folder.is_dir():
                for asset in folder.rglob('*'):
                    if asset.is_file() and asset.suffix.lower() in ('.png','.jpg','.jpeg','.webp','.avif','.gif','.svg','.woff','.woff2','.ttf','.css','.js','.ico','.mp4','.webm'):
                        target=dest/asset.relative_to(p.parent); target.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(asset,target)
        # Saved Cloudflare challenge scripts are tied to their original host.
        raw=re.sub(r'<script\b[^>]*src=["\'][^"\']*/cdn-cgi/[^"\']*["\'][^>]*>.*?</script>','',raw,flags=re.I|re.S)
        copy_refs(raw,p.parent)
        # Demo links cannot pretend to send leads or navigate the parent site.
        raw=re.sub(r'<meta\b[^>]*name=["\']robots["\'][^>]*>','',raw,flags=re.I)
        raw=re.sub(r'<link\b[^>]*rel=["\']canonical["\'][^>]*>','',raw,flags=re.I)
        raw=raw.replace('</head>','<meta name="robots" content="noindex,nofollow"><base target="_self"></head>')
        raw=raw.replace('</body>','<script>document.addEventListener("submit",e=>{e.preventDefault();e.stopImmediatePropagation();alert("Dette er en design-demo. Send forespørselen din via Sidekick.")},true);</script></body>')
        (dest/'index.html').write_text(raw,encoding='utf8')
        style='Redaksjonell' if re.search('Fraunces|Cormorant|Playfair|Bodoni',raw,re.I) else 'Moderne'
        real_missing=[x for x in missing if not x.startswith('/cdn-cgi/')]
        if not real_missing:
            rows.append(dict(id=did,title=title,industry=sid,industryName=label,style=style,url=f'/demos/{did}/index.html',image=f'/previews/{did}.webp'))
        if missing: issues.append(dict(id=did,missing=sorted(set(missing))))
(ROOT/'lib'/'demos.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf8')
(ROOT/'work').mkdir(exist_ok=True)
(ROOT/'work'/'import-report.json').write_text(json.dumps(dict(count=len(rows),industries=len(set(r['industry'] for r in rows)),issues=issues),ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(dict(count=len(rows),industries=len(set(r['industry'] for r in rows)),demosWithMissingAssets=len(issues)),ensure_ascii=False))
