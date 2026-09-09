/* Pre-generated founder portrait placeholder. */
/* oxlint-disable next/no-img-element */
import Link from '@/components/site-link';
import {site} from '@/lib/site';
import {paymentOffer} from '@/lib/payment';

export function Pricing(){
 return <section className="pricing" id="pris">
  <div className="pricing-heading"><div><span className="mono">Tydelig pris. Ingen overraskelser.</span><h2>Nettside fra<br/><em>2 000 kr</em></h2></div><p>For nyetablerte og små bedrifter som vil raskt og ordentlig på nett. Du vet hva du får, hva det koster og når det er klart.</p></div>
  <div className="payment-promise"><span className="mono">Først utkast. Så bestemmer du deg.</span><h3>{paymentOffer.title}</h3><p>{paymentOffer.description}</p><p className="payment-scope">{paymentOffer.scope}</p></div>
  <div className="pricing-grid">
   <article className="price-main"><span className="mono">Dette er med</span><ul><li>Én profesjonell side med inntil fem innholdsseksjoner</li><li>Tilpasset mobil, nettbrett og desktop</li><li>Kontaktskjema og tydelige kontaktpunkter</li><li>Grunnleggende teknisk SEO</li><li>Hjelp med domene og publisering</li><li>Én korrekturrunde før lansering</li></ul><div className="delivery"><strong>5–7 dager</strong><span>fra innhold, tilganger og omfang er avklart</span></div></article>
   <article className="price-side"><span className="mono">Etter lansering</span><div className="cost-row"><strong>0 kr<small>/mnd</small></strong><p>Ingen løpende avtale med Sidemannen. Hosting, domene og nødvendige tilganger avklares før lansering. Senere endringer prises separat.</p></div><div className="cost-row active"><strong>200 kr<small>/mnd</small></strong><p>Én mindre tekst- eller bildeendring per måned, prioritert hjelp og svar normalt innen tre virkedager. Større arbeid avtales separat, og ubrukte endringer overføres ikke.</p></div></article>
  </div>
  <div className="pricing-extras"><span className="mono">Trenger du mer?</span><p>Ekstra undersider, nettbutikk, booking, integrasjoner, logoarbeid og omfattende tekstproduksjon er ikke en del av basispakken. Slike behov får en avtalt fastpris før vi starter. Eksterne leverandørkostnader spesifiseres tydelig i tilbudet.</p><Link className="button big" href="/kontakt">Få fast pris <span>→</span></Link></div>
  <div className="seo-answer"><h3>Hvorfor kan prisen være så lav?</h3><p>Fordi vi ikke starter med ukesvis av workshops og design fra blankt ark. Du velger blant gjennomarbeidede designretninger, og vi tilpasser uttrykk, tekst og bilder til bedriften din. Mindre prosjektledelse og et stramt omfang gjør en enkel nettside mulig fra 2 000 kr.</p></div>
  <div className="seo-answer"><h3>Hva koster en nettside for bedrift?</h3><p>En enkel presentasjonsside hos Sidemannen starter på 2 000 kr. Større omfang prises fast før arbeidet begynner. <Link className="text-link" href="/nettside-pris">Les hele prisguiden →</Link></p></div>
 </section>;
}

const projects=[
 {className:'radar',label:'01 / PRISSAMMENLIGNING',name:<><span>tannlege</span>radar</>,url:'https://tannlegeradar.no',domain:'tannlegeradar.no',image:'/projects/tannlegeradar.webp',imageAlt:'Skjermbilde av forsiden til Tannlegeradar',body:'Gjør publiserte tannlegepriser enklere å finne og sammenligne.',proof:'Et produksjonsprosjekt med søk, prisdata, strukturert innhold og mange landingssider.'},
 {className:'charging',label:'02 / LADEPRISER',name:<>lade<span>prisen</span></>,url:'https://ladeprisen.no',domain:'ladeprisen.no',image:'/projects/ladeprisen.webp',imageAlt:'Skjermbilde av forsiden til Ladeprisen',body:'Hjelper elbilister å finne og sammenligne priser på lading.',proof:'Et mobilrettet produksjonsprosjekt bygget rundt kart, ladestasjoner og prisinformasjon.'}
];

export function ProjectSection({showHeading=true}:{showHeading?:boolean}={}){return <section className={`projects${showHeading?'':' projects-compact'}`}>{showHeading&&<div className="section-heading"><div><span className="mono">Fra idé til noe folk bruker</span><h2>Ekte. Og<br/><em>ute i verden.</em></h2></div><Link className="text-link" href="/prosjekter">Se prosjektene →</Link></div>}<div className="project-grid">{projects.map(project=><a className={`project-card ${project.className}`} href={project.url} target="_blank" rel="noopener noreferrer" key={project.domain}><div className="project-label"><span><i/>I produksjon</span><span>{project.label}</span></div><figure className="project-shot"><img src={project.image} alt={project.imageAlt} width="1200" height="750" loading="lazy" decoding="async"/></figure><div className="project-name">{project.name}<b>↗</b></div><p>{project.body}</p><p className="project-proof">{project.proof}</p><div className="project-domain">{project.domain} ↗</div></a>)}</div><p className="section-note">Tannlegeradar og Ladeprisen er lanserte produksjonsprosjekter. Designene i biblioteket er konsepter.</p></section>}

export function ProofStrip(){return <section className="proof-strip" aria-label="Produksjonsprosjekter"><div><span className="mono">Ikke bare konsepter</span><strong>To egne tjenester er allerede ute i produksjon.</strong></div><div className="proof-links"><a href="https://tannlegeradar.no" target="_blank" rel="noopener noreferrer">tannlegeradar.no ↗</a><a href="https://ladeprisen.no" target="_blank" rel="noopener noreferrer">ladeprisen.no ↗</a><Link href="/prosjekter">Se hva de viser →</Link></div></section>}

export function Process(){
 const steps=[
  ['Velg en retning','Finn et design i biblioteket, eller send et par eksempler på uttrykk du liker.'],
  ['Send materialet','Del logo, bilder, kontaktinformasjon og noen enkle punkter om bedriften. Vi hjelper deg å strukturere og lett redigere teksten. Omfattende tekstproduksjon prises separat.'],
  ['Se utkastet. Bestem deg.','I basispakken får du et førsteutkast og én justeringsrunde før betaling. Godkjenner du, betaler du avtalt pris, og vi gjør siden klar for publisering. Takker du nei før godkjenning, betaler du ingenting. Større oppdrag avtales separat.']
 ];
 return <section className="process"><div className="section-heading"><div><span className="mono">Velg → send → ferdig</span><h2>Fra første idé<br/><em>til ferdig side.</em></h2></div><Link className="text-link" href="/kontakt">Få fast pris →</Link></div><ol>{steps.map(([title,text],i)=><li key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>;
}

export function About(){return <section className="about"><div><span className="mono">Hvem står bak?</span><h2>Én sidemann.<br/><em>Hele veien.</em></h2><figure className="about-portrait"><img src="/thomas-placeholder.webp" alt="Thomas Kokkim" width="300" height="375"/></figure></div><div><p>Thomas Kokkim er grunnlegger av Sidemannen i Fetsund. Du får en fast kontaktperson — fra første samtale til nettsiden er ute.</p><p>Vi lager nettsider for nyetablerte og små bedrifter i hele Norge. Målet er enkelt: et profesjonelt resultat, en ryddig prosess og en pris det går an å forstå.</p><p>Vi tar gjerne en prat på telefon for å forstå bedriften og det du trenger. Du får råd og oppfølging tilpasset deg, med en tydelig avtale om hjelpen etter lansering.</p><div className="contact-details"><a className="text-link" href={site.phoneHref}>Ring oss på {site.phone}</a><a className="text-link" href={`mailto:${site.email}`}>{site.email} →</a></div></div></section>}

const faqs=[
 ['Hva koster en nettside?','En profesjonell nettside starter på 2 000 kr. Det inkluderer én side med inntil fem innholdsseksjoner, mobiltilpasning, kontaktskjema, grunnleggende SEO, publiseringshjelp og én korrekturrunde. Alt utover dette avtales og prises før start.'],
 ['Kommer det løpende kostnader?','Du kan velge 0 kr per måned uten løpende avtale, eller 200 kr per måned for én mindre tekst- eller bildeendring og prioritert hjelp. Kostnader til domene, e-post, hosting eller andre eksterne tjenester vises tydelig før bestilling.'],
 ['Hvor raskt kan siden være klar?','Normal leveringstid er 5–7 dager fra innhold, nødvendige tilganger og omfang er avklart. Større løsninger kan ta lenger tid, men du får en tydelig tidsplan på forhånd.'],
 ['Er designene ferdige nettsider jeg kjøper?','Designbiblioteket viser retninger du kan velge mellom. Farger, tekst, bilder og innhold tilpasses bedriften din, slik at sluttresultatet ikke føles som en generisk mal.'],
 ['Må jeg ha tekst og bilder klare?','Nei. Noen enkle punkter om bedriften er nok til å begynne. Vi hjelper deg å strukturere og lett redigere teksten. Egne bilder er best, men vi finner en løsning hvis du mangler dem. Omfattende tekstskriving eller bildearbeid avtales separat.'],
 ['Er mobil og søkemotorer tenkt på?','Ja. Alle sider mobiltilpasses og får tydelig innholdsstruktur, god ytelse og grunnleggende teknisk SEO. Ingen kan love en bestemt plassering i Google; rangering avhenger også av innhold, konkurranse og arbeid over tid.'],
 ['Kan dere ordne domene, e-post og Google-oppføring?','Ja. Domene, firma-e-post og Google-bedriftsprofil kan leveres som en tilleggspakke. Du får oversikt over arbeidet og eventuelle leverandørkostnader før du bestemmer deg.'],
 ['Blir jeg låst til Sidemannen?','Målet er nei. Domene skal registreres på deg eller bedriften din når vi hjelper med det, og nødvendige tilganger og hosting avklares før lansering. Eventuelle løpende tjenester skal være tydelige og kunne avsluttes uten lang binding.'],
 ['Når og hvordan betaler jeg?',paymentOffer.description+' '+paymentOffer.scope],
 ['Hva om jeg ikke ønsker å gå videre med utkastet?','For basispakken kan du takke nei før du godkjenner utkastet, uten å betale. Tilbudet omfatter ett førsteutkast og én justeringsrunde. Hvis du ikke går videre, avsluttes arbeidet, og utkastet publiseres eller overleveres ikke.']
];

export function FAQ(){return <section className="faq"><div><span className="mono">Før du bestemmer deg</span><h2>Godt å<br/><em>vite.</em></h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>}

export function ContactBand(){return <section className="contact-band"><div className="contact-badge" aria-hidden="true">✳</div><span className="mono">En god nettside kan begynne med én melding</span><h2>Få en side som<br/>jobber <em>for deg.</em></h2><div className="contact-row"><a className="contact-mail" href={`mailto:${site.email}`}>{site.email}</a><Link className="button dark big" href="/kontakt">Få fast pris <span>→</span></Link></div></section>}
