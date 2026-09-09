import Catalog from '@/components/catalog';
import Link from '@/components/site-link';
import demos from '@/lib/demos.json';
import {industries} from '@/lib/industries';
import {seo} from '@/lib/site';
export const metadata=seo('Finn ditt uttrykk — designbibliotek','Utforsk nettsidedesign for din bransje. Forhåndsvis på mobil og desktop, og lagre favorittene dine.','/portfolio/');
export default function Portfolio(){return <main id="main" className="wrap"><section className="page-heading portfolio-heading"><div className="eyebrow">{demos.length} DESIGN · {industries.length} BRANSJER · DINE MULIGHETER</div><h1>Hvilken føles<br/><em>som deg?</em></h1><p>Finn et uttrykk du liker. Vi tilpasser retningen til din bedrift, ditt innhold og dine kunder. <Link className="portfolio-assist" href="/kontakt">Usikker? Vi kan plukke ut tre retninger for deg →</Link></p></section><Catalog/></main>}
