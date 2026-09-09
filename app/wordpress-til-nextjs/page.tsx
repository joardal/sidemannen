import Link from '@/components/site-link';
import {ContactBand} from '@/components/sections';
import {seo} from '@/lib/site';

export const metadata=seo('Fra WordPress til Next.js — flytt nettsiden din','Vi bygger om WordPress-nettsiden din til en rask Next.js-side. Få en plan for innhold, SEO og funksjoner, fast pris og personlig oppfølging.','/wordpress-til-nextjs');

export default function WordPressMigration(){return <main id="main"><article className="wrap prose">
 <div className="eyebrow">FOR BEDRIFTER MED EN EKSISTERENDE NETTSIDE</div>
 <h1>Fra WordPress<br/>til Next.js.</h1>
 <p>Har bedriften en WordPress-side som har blitt treg, tung å vedlikeholde eller vanskelig å bruke på mobil? Vi bygger den om til en rask, moderne nettside med Next.js, med utgangspunkt i innholdet og kundene du allerede har.</p>
 <h2>Hva kan du få ut av å bytte?</h2>
 <p>For en bedriftsside med tjenester, referanser og kontaktskjema kan vi bygge en lett løsning som sender ferdige sider til nettleseren. Bilder, kode og skrifter tilpasses for rask lasting. Vi måler ytelsen før og etter, slik at du får se hva som faktisk er forbedret.</p>
 <p>Du får et uttrykk som passer bedriften, tydelige kontaktpunkter og en side tilpasset mobil. Du trenger heller ikke videreføre WordPress-temaet og alle utvidelsene fra den gamle løsningen.</p>
 <h2>Vi flytter innholdet med en plan for SEO</h2>
 <p>Vi kartlegger eksisterende sider, viktige nettadresser, titler, beskrivelser og bilder. Innhold du vil beholde tas med videre. Der nettadresser må endres, setter vi opp permanente omdirigeringer til riktig side og kontrollerer interne lenker, canonical og sitemap før lansering.</p>
 <p>Et teknologibytte gir ingen garanti for bedre plassering i Google. Målet er å bevare det som fungerer og gi nettstedet et godt teknisk utgangspunkt videre.</p>
 <h2>Hva med booking, nettbutikk og redigering?</h2>
 <p>WordPress-utvidelser kan ikke bare flyttes over til Next.js. Vi går gjennom funksjonene du bruker og avklarer hva som skal erstattes eller integreres. Har du WooCommerce, innlogging eller avansert booking, vurderer vi om en full flytting er riktig før vi anbefaler en løsning.</p>
 <p>Vil du redigere tekst og bilder selv, avtaler vi en publiseringsløsning som passer arbeidsdagen din. Du kan også velge at vi gjør endringene. Både oppsett og eventuell løpende kostnad fremgår av tilbudet.</p>
 <h2>En telefonsamtale først. Fast pris før start.</h2>
 <p>Send oss adressen til nettsiden du har i dag og noen ord om hva du vil forbedre. Vi avtaler gjerne en telefonsamtale, ser på behovene og gir deg et skriftlig omfang, en tidsplan og en fast pris. Flytting fra WordPress prises separat etter antall sider, innhold og funksjoner.</p>
 <p>Du får en fast kontaktperson og oppfølging tilpasset bedriften din. Før vi publiserer, går du gjennom den nye siden. Vi avtaler også hvem som håndterer drift og endringer etter lansering.</p>
 <p><Link className="button dark" href="/kontakt">Få fast pris <span aria-hidden="true">→</span></Link></p>
 <p><Link className="text-link" href="/nettside-pris">Les om priser og hva som inngår →</Link></p>
 </article><ContactBand/></main>}
