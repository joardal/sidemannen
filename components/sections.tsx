import Link from '@/components/site-link';
import {site} from '@/lib/site';

export function Pricing(){
 return <section className="pricing" id="pris">
  <div className="pricing-heading"><div><span className="mono">Tydelig pris. Ingen overraskelser.</span><h2>Nettside fra<br/><em>2 000 kr</em></h2></div><p>For nyetablerte og små bedrifter som vil raskt og ordentlig på nett. Du vet hva du får, hva det koster og når det er klart.</p></div>
  <div className="pricing-grid">
   <article className="price-main"><span className="mono">Dette er med</span><ul><li>Én profesjonell side med inntil fem innholdsseksjoner</li><li>Tilpasset mobil, nettbrett og desktop</li><li>Kontaktskjema og tydelige kontaktpunkter</li><li>Grunnleggende teknisk SEO</li><li>Hjelp med domene og publisering</li><li>Én korrekturrunde før lansering</li></ul><div className="delivery"><strong>5–7 dager</strong><span>fra tekst, logo og bilder er mottatt</span></div></article>
   <article className="price-side"><span className="mono">Etter lansering</span><div className="cost-row"><strong>0 kr<small>/mnd</small></strong><p>Ingen oppfølging. Du betaler bare eventuelle direkte kostnader til domene og hosting.</p></div><div className="cost-row active"><strong>200 kr<small>/mnd</small></strong><p>Jevnlig oppfølging, små tekst- og bildeendringer og hjelp når du trenger det.</p></div></article>
  </div>
  <div className="pricing-extras"><span className="mono">Trenger du mer?</span><p>Ekstra undersider, nettbutikk, booking og andre funksjoner får en avtalt fastpris før vi starter. Domene, firma-e-post og Google-bedriftsprofil kan ordnes som en samlet tilleggspakke; eksterne leverandørkostnader kommer tydelig frem i tilbudet.</p><Link className="button big" href="/kontakt">Få et konkret tilbud <span>↗</span></Link></div>
  <div className="seo-answer"><h3>Hva koster en nettside for bedrift?</h3><p>Hos Sidemannen starter prisen på en profesjonell nettside på 2 000 kr. Det gjør det forutsigbart å kjøpe nettside til en liten bedrift, uten skjulte månedsutgifter. Større omfang prises fast før arbeidet begynner.</p></div>
 </section>;
}

const projects=[
 {className:'radar',label:'01 / PRISSAMMENLIGNING',name:<><span>tannlege</span>radar</>,url:'https://tannlegeradar.no',domain:'tannlegeradar.no',body:'Gjør publiserte tannlegepriser enklere å finne og sammenligne.',quote:'«Thomas tok en krevende idé og gjorde den tydelig, rask og overraskende enkel å bruke.»'},
 {className:'charging',label:'02 / LADEPRISER',name:<>lade<span>prisen</span></>,url:'https://ladeprisen.no',domain:'ladeprisen.no',body:'Hjelper elbilister å finne og sammenligne priser på lading.',quote:'«Sidemannen leverte et produkt som føles mye større enn budsjettet — sylskarpt på mobil og enkelt fra første klikk.»'}
];

export function ProjectSection(){return <section className="projects"><div className="section-heading"><div><span className="mono">Fra idé til noe folk bruker</span><h2>Ekte. Og<br/><em>ute i verden.</em></h2></div><Link className="text-link" href="/prosjekter">Se prosjektene ↗</Link></div><div className="project-grid">{projects.map(project=><a className={`project-card ${project.className}`} href={project.url} target="_blank" rel="noopener noreferrer" key={project.domain}><div className="project-label"><span><i/>I produksjon</span><span>{project.label}</span></div><div className="project-name">{project.name}<b>↗</b></div><p>{project.body}</p><blockquote>{project.quote}</blockquote><div className="project-domain">{project.domain} ↗</div></a>)}</div><p className="section-note">Tannlegeradar og Ladeprisen er lanserte produksjonsprosjekter. Designene i biblioteket er konsepter.</p></section>}

export function Process(){
 const steps=[
  ['Velg en retning','Finn et design i biblioteket, eller send et par eksempler på uttrykk du liker.'],
  ['Send materialet','Del logo, bilder, kontaktinformasjon og noen enkle punkter om bedriften. Sidemannen hjelper deg å spisse teksten.'],
  ['Se siden bli ferdig','Du får en lenke til gjennomgang, én korrekturrunde og en publisert nettside — normalt innen 5–7 dager.']
 ];
 return <section className="process"><div className="section-heading"><div><span className="mono">Velg → send → ferdig</span><h2>Uvanlig<br/><em>enkelt.</em></h2></div><Link className="text-link" href="/kontakt">Start nå ↗</Link></div><ol>{steps.map(([title,text],i)=><li key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>;
}

export function About(){return <section className="about"><div><span className="mono">Hvem står bak?</span><h2>Én sidemann.<br/><em>Hele veien.</em></h2></div><div><p>Sidemannen er Thomas Kokkim i Fetsund. Du får én person å forholde deg til — fra første designvalg til nettsiden er ute.</p><p>Jeg lager nettsider for nyetablerte og små bedrifter i hele Norge. Målet er enkelt: et profesjonelt resultat, en ryddig prosess og en pris det går an å forstå.</p><a className="text-link" href={`mailto:${site.email}`}>{site.email} ↗</a></div></section>}

const faqs=[
 ['Hva koster en nettside?','En profesjonell nettside starter på 2 000 kr. Det inkluderer én side med inntil fem innholdsseksjoner, mobiltilpasning, kontaktskjema, grunnleggende SEO, publiseringshjelp og én korrekturrunde. Alt utover dette avtales og prises før start.'],
 ['Kommer det løpende kostnader?','Du kan velge 0 kr per måned uten oppfølging, eller 200 kr per måned for jevnlig oppfølging og små endringer. Kostnader til domene, e-post eller annen ekstern tjeneste betales til leverandøren og vises tydelig før bestilling.'],
 ['Hvor raskt kan siden være klar?','Normal leveringstid er 5–7 dager fra jeg har mottatt tekst, logo, bilder og nødvendige tilganger. Større løsninger kan ta lenger tid, men du får en tydelig tidsplan på forhånd.'],
 ['Er designene ferdige nettsider jeg kjøper?','Designbiblioteket viser retninger du kan velge mellom. Farger, tekst, bilder og innhold tilpasses bedriften din, slik at sluttresultatet ikke føles som en generisk mal.'],
 ['Må jeg ha tekst og bilder klare?','Nei. Noen enkle punkter om bedriften er nok til å begynne. Jeg hjelper deg å strukturere og spisse teksten. Egne bilder er best, men vi finner en løsning hvis du mangler dem.'],
 ['Er mobil og søkemotorer tenkt på?','Ja. Alle sider mobiltilpasses og får tydelig innholdsstruktur, god ytelse og grunnleggende teknisk SEO. Ingen kan love en bestemt plassering i Google; rangering avhenger også av innhold, konkurranse og arbeid over tid.'],
 ['Kan dere ordne domene, e-post og Google-oppføring?','Ja. Domene, firma-e-post og Google-bedriftsprofil kan leveres som en tilleggspakke. Du får oversikt over arbeidet og eventuelle leverandørkostnader før du bestemmer deg.']
];

export function FAQ(){return <section className="faq"><div><span className="mono">Før du bestemmer deg</span><h2>Godt å<br/><em>vite.</em></h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>}

export function ContactBand(){return <section className="contact-band"><div className="contact-badge" aria-hidden="true">✳</div><span className="mono">En god nettside kan begynne med én melding</span><h2>Få en side som<br/>jobber <em>for deg.</em></h2><div className="contact-row"><a className="contact-mail" href={`mailto:${site.email}`}>{site.email}</a><Link className="button dark big" href="/kontakt">La oss snakke <span>↗</span></Link></div></section>}
