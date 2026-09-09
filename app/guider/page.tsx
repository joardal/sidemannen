import Link from '@/components/site-link';
import {seo} from '@/lib/site';

export const metadata=seo('Guider for deg som skal lage nettside','Praktiske guider om pris, nettside for ENK, én side eller flere, innhold og eierskap til domene og nettside.','/guider/');

const guides=[
 ['Hva koster en nettside?','/nettside-pris','Hva som faktisk driver prisen, hva 2 000-kronerspakken dekker og hvilke kostnader du bør spørre om.'],
 ['Nettside for enkeltpersonforetak','/nettside-for-enk','Hva en ny eller liten virksomhet trenger for å se troverdig ut og være enkel å kontakte.'],
 ['Én side eller flere?','/en-side-eller-flere','Når en ryddig one-page er nok, og når egne undersider gir mer verdi.'],
 ['Hva trenger en bedriftsnettside?','/hva-trenger-en-bedriftsnettside','En konkret sjekkliste for innhold, kontaktpunkter, mobil, fart og grunnleggende SEO.'],
 ['Domene, hosting og eierskap','/domene-hosting-og-eierskap','Hvem bør eie domenet, hva hosting egentlig er og hvilke tilganger du bør ha etter lansering.']
];

export default function Guides(){return <main id="main" className="wrap"><section className="page-heading"><div className="eyebrow">PRAKTISK. UTEN WEBBYRÅSPRÅK.</div><h1>Bedre valg<br/><em>før du bestiller.</em></h1><p>Du trenger ikke kunne web for å kjøpe en god nettside. Disse guidene forklarer de vanligste valgene og kostnadene før du bestemmer deg.</p></section><section className="service-list">{guides.map(([title,href,text],i)=><article key={href}><span>0{i+1}</span><h2><Link href={href}>{title}</Link></h2><p>{text} <Link className="text-link" href={href}>Les guiden ↗</Link></p></article>)}</section></main>}
