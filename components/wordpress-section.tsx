import Link from '@/components/site-link';
import styles from './wordpress-section.module.css';

export default function WordPressSection(){
 return <section className={styles.section}>
  <div className={styles.intro}><span className="mono">Har du allerede en WordPress-side?</span><h2>Samme bedrift.<br/><em>En raskere nettside.</em></h2><p>Vi bygger om WordPress-nettsiden din til en rask, moderne Next.js-side. Vi tar med innholdet som fungerer og gir kundene dine en god opplevelse på både mobil og PC.</p><Link className="text-link" href="/wordpress-til-nextjs">Se hvordan vi flytter nettsiden din →</Link></div>
  <div className={styles.details}><div className={styles.transition} aria-hidden="true"><span>WordPress</span><b>→</b><strong>Next.js</strong></div><h3>Vi begynner med en samtale.</h3><p>Du forteller hva som fungerer i dag, og hva du vil forbedre. Vi ser på innhold, funksjoner og nettadresser før du får et tilpasset forslag og en fast pris.</p><ul><li>Innhold og søkesynlighet tas med i planen</li><li>Telefonkontakt med en fast kontaktperson</li><li>Oppfølging som passer bedriften din</li></ul><p className={styles.note}>Flytting prises etter omfang. Booking, nettbutikk og redigering av innhold avklares før vi starter.</p></div>
 </section>;
}
