import demos from '@/lib/demos.json';
/* Pre-generated WebP portfolio previews are already resized and compressed. */
/* oxlint-disable next/no-img-element */
import Link from '@/components/site-link';
import {ProjectSection,ProofStrip,Pricing,Process,FAQ,ContactBand,About} from '@/components/sections';
import {industries} from '@/lib/industries';
import {seo} from '@/lib/site';

export const metadata=seo('Lage nettside for småbedrift — fra 2000 kr','Uvanlig gode nettsider for nyetablerte og små bedrifter. Fast og tydelig startpris fra 2000 kr, levert på 5–7 dager.','/');

export default function Home(){
 const picks=['fotograf-fotograf2','arkitekter-arkitek1','varmepumpe-klimafirma2'];
 const featured=picks.map(id=>demos.find(d=>d.id===id)).filter(Boolean);
 const selectedIndustries=industries.filter(i=>['tannlege','fotograf','renhold','arkitekter','velvaereklinikker','restauranter','elektrikere','byggmestere'].includes(i.id));
 return <main id="main">
  <section className="hero">
   <div className="hero-star" aria-hidden="true">✳</div>
   <div className="hero-top mono"><span><i className="signal"/>Tar imot nye prosjekter</span><span>Webdesign &amp; utvikling — Fetsund / hele Norge</span></div>
   <h1><span>Uvanlig</span><span className="outline">gode sider.</span><span>Uvanlig</span><span><em>enkelt.</em></span></h1>
   <div className="hero-bottom"><p>Profesjonelle nettsider for nyetablerte og små bedrifter. Velg en retning, send innholdet — så tar jeg resten. Fra 2 000 kr.</p><Link className="button dark big" href="/kontakt">Få forslag + fast pris <span>↗</span></Link><div className="hero-note"><strong>5–7</strong>dager når innhold og omfang er klart</div></div>
  </section>
  <div className="marquee" aria-hidden="true"><div><span>Nettside fra 2000 kr</span><b>✳</b><span>Mobiltilpasset</span><b>✳</b><span>Grunnleggende SEO</span><b>✳</b><span>Tydelige tilleggskostnader</span><b>✳</b><span>Normalt 5–7 dager</span><b>✳</b><span>Nettside fra 2000 kr</span><b>✳</b><span>Mobiltilpasset</span><b>✳</b><span>Grunnleggende SEO</span><b>✳</b><span>Tydelige tilleggskostnader</span><b>✳</b></div></div>
  <ProofStrip/>
  <Pricing/>
  <section className="showcase" aria-label="Utvalgte designretninger">
   <div className="showcase-top mono"><span>Et lite utvalg av mulighetene</span><span>Designbibliotek / 01—03</span></div>
   <div className="showcase-heading"><h2>Bla i<br/><em>biblioteket.</em></h2><Link className="text-link" href="/portfolio">Se alle {demos.length} design ↗</Link></div>
   <div className="showcase-track">{featured.map((d,i)=>d&&<Link href={`/portfolio?demo=${d.id}`} className={`showcase-item item-${i}`} key={d.id}><div className="browser-frame"><div className="browser-bar"><span><i/><i/><i/></span><span>{d.industryName}</span><span>↗</span></div><img src={d.image} alt={`${d.title} – eksempel på nettside for ${d.industryName.toLowerCase()}`} width="1200" height="850" loading="lazy"/></div><div className="showcase-caption"><b>{d.title}</b><span className="mono">Konsept / {String(i+1).padStart(2,'0')}</span></div></Link>)}</div>
   <p className="showcase-more mono">+ {Math.max(0,demos.length-3)} flere venter på deg →</p>
  </section>
  <section className="manifest"><span className="mono">Sidemannen / 01</span><p>En god nettside trenger ikke koste en formue. Den må være <em>tydelig</em>, se <strong>uvanlig bra</strong> ut og gjøre det enkelt for kunden å velge deg.</p></section>
  <Process/>
  <section className="industry-strip"><div className="section-heading"><div><span className="mono">Sortert etter bransje</span><h2>Din bransje.<br/><em>Ditt uttrykk.</em></h2></div><Link className="text-link" href="/bransjer">Alle {industries.length} bransjer ↗</Link></div><div className="industry-rows">{selectedIndustries.map((i,index)=><Link key={i.id} href={`/nettside-${i.slug}`}><span className="mono">{String(index+1).padStart(2,'0')}</span><strong>{i.name}</strong><small>{i.count} design</small><b>↗</b></Link>)}</div></section>
  <ProjectSection/>
  <About/>
  <FAQ/>
  <ContactBand/>
 </main>;
}
