import demos from '@/lib/demos.json';
/* Pre-generated WebP portfolio previews are already resized and compressed. */
/* oxlint-disable next/no-img-element */
import Link from '@/components/site-link';
import {ProjectSection,ProofStrip,Pricing,Process,FAQ,ContactBand,About} from '@/components/sections';
import {industries} from '@/lib/industries';
import {seo} from '@/lib/site';
import HomeHero from '@/components/home-hero';
import WordPressSection from '@/components/wordpress-section';
import DesignShowroom from '@/components/design-showroom';

export const metadata=seo('Lage nettside for småbedrift — fra 2000 kr','Uvanlig gode nettsider for nyetablerte og små bedrifter. Fast og tydelig startpris fra 2000 kr, levert på 5–7 dager.','/');

export default function Home(){
 const picks=['fotograf-fotograf2','arkitekter-arkitek1','varmepumpe-klimafirma2'];
 const featured=demos.filter(d=>picks.includes(d.id)).sort((a,b)=>picks.indexOf(a.id)-picks.indexOf(b.id));
 const selectedIndustries=industries.filter(i=>['tannlege','fotograf','renhold','arkitekter','velvaereklinikker','restauranter','elektrikere','byggmestere'].includes(i.id));
 return <main id="main">
  <HomeHero/>
  <div className="marquee" aria-hidden="true"><div><span>Nettside fra 2000 kr</span><b>✳</b><span>Mobiltilpasset</span><b>✳</b><span>Grunnleggende SEO</span><b>✳</b><span>Tydelige tilleggskostnader</span><b>✳</b><span>Normalt 5–7 dager</span><b>✳</b><span>Nettside fra 2000 kr</span><b>✳</b><span>Mobiltilpasset</span><b>✳</b><span>Grunnleggende SEO</span><b>✳</b><span>Tydelige tilleggskostnader</span><b>✳</b></div></div>
  <ProofStrip/>
  <Pricing/>
  <DesignShowroom designs={featured} total={demos.length}/>
  <section className="manifest"><span className="mono">Sidemannen / 01</span><p>En god nettside trenger ikke koste en formue. Den må være <em>tydelig</em>, se <strong>uvanlig bra</strong> ut og gjøre det enkelt for kunden å velge deg.</p></section>
  <WordPressSection/>
  <Process/>
  <section className="industry-strip"><div className="section-heading"><div><span className="mono">Sortert etter bransje</span><h2>Din bransje.<br/><em>Ditt uttrykk.</em></h2></div><Link className="text-link" href="/bransjer">Alle {industries.length} bransjer →</Link></div><div className="industry-rows">{selectedIndustries.map((i,index)=><Link key={i.id} href={`/nettside-${i.slug}`}><span className="mono">{String(index+1).padStart(2,'0')}</span><strong>{i.name}</strong><small>{i.count} design</small><b>→</b></Link>)}</div></section>
  <ProjectSection/>
  <About/>
  <FAQ/>
  <ContactBand/>
 </main>;
}
