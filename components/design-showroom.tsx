'use client';

import {useEffect, useRef, useState} from 'react';
import Link from '@/components/site-link';
import styles from './design-showroom.module.css';

type Design = {id: string; title: string; industryName: string; image: string};

function MobilePreview({id}: {id: string}) {
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!screen.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        (entry.target as HTMLElement).style.setProperty('--phone-scale', String(entry.contentRect.width / 390));
      }
    });
    observer.observe(screen.current);
    return () => observer.disconnect();
  }, []);

  return <div className={styles.phone} aria-hidden="true">
    <div className={styles.phoneScreen} ref={screen}>
      <iframe src={`/demos/${id}/index.html`} title="Arkitektnettsiden i mobilformat" width="390" height="844" loading="lazy" tabIndex={-1} sandbox="allow-scripts" referrerPolicy="no-referrer"/>
    </div>
    <div className={styles.speaker}/><div className={styles.homeIndicator}/>
  </div>;
}

export default function DesignShowroom({designs, total}: {designs: Design[]; total: number}) {
  const stage = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setEntered(true);
        observer.disconnect();
      }
    }, {threshold: 0.15});
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.showroom} aria-label="Utvalgte designretninger">
      <div className={styles.top}><span>Et lite utvalg av mulighetene</span><span>Designbibliotek / 01—03</span></div>
      <div className={styles.heading}>
        <h2>Bla i<br/><em>biblioteket.</em></h2>
        <Link className="text-link" href="/portfolio">Se alle {total} design →</Link>
      </div>
      <div className={styles.stage} ref={stage} data-entered={entered || undefined}>
        {designs.map((design, index) => (
          <Link href={`/portfolio?demo=${design.id}`} className={styles.item} key={design.id} aria-label={`Se designet ${design.title}`}>
            <div className={styles.exhibit}>
              <div className={styles.shadow} aria-hidden="true"/>
              <div className={styles.device}>
                <div className={styles.monitor}>
                  <div className={styles.camera} aria-hidden="true"/>
                  <div className={styles.display}>
                    {/* The optimized preview is taller than the screen, revealing more on hover. */}
                    {/* oxlint-disable-next-line next/no-img-element */}
                    <img src={design.image} alt={`Forhåndsvisning av ${design.title}`} width="1200" height="850" loading="lazy"/>
                    <span className={styles.open} aria-hidden="true">Se designet →</span>
                  </div>
                  <div className={styles.chin} aria-hidden="true"><span>✳</span><i/></div>
                </div>
                <div className={styles.stand} aria-hidden="true"/>
                <div className={styles.foot} aria-hidden="true"/>
              </div>
              {index === 1 && <MobilePreview id={design.id}/>}
            </div>
            {index === 1 && <span className={styles.responsiveNote}>↳ Like gjennomtenkt på mobil.</span>}
            <div className={styles.caption}><span className={styles.index}>0{index + 1}</span><div><span>{design.industryName}</span><h3>{design.title}</h3></div><b aria-hidden="true">→</b></div>
          </Link>
        ))}
      </div>
      <div className={styles.bottom}>
        <span className={styles.desktopHint}>Pek på en skjerm. Finn ditt uttrykk.</span>
        <span className={styles.mobileHint}>Sveip og finn ditt uttrykk →</span>
        <Link href="/portfolio">+ {Math.max(0, total - designs.length)} flere design venter på deg →</Link>
      </div>
    </section>
  );
}
