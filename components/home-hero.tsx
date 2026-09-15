'use client';

import {useEffect, useRef, useState, type PointerEvent} from 'react';
import Link from '@/components/site-link';
import styles from './home-hero.module.css';

export default function HomeHero() {
  const [started, setStarted] = useState(false);
  const [sceneStarted, setSceneStarted] = useState(false);
  const [take, setTake] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    // The server renders the finished composition, including when JS is unavailable.
    const start = requestAnimationFrame(() => setStarted(true));
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setSceneStarted(true);
        observer.disconnect();
      }
    }, {threshold: 0.25});
    if (scene.current) observer.observe(scene.current);
    return () => {observer.disconnect(); cancelAnimationFrame(start); cancelAnimationFrame(frame.current);};
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      tilt.current?.style.setProperty('--tilt-x', `${-y * 7}deg`);
      tilt.current?.style.setProperty('--tilt-y', `${x * 9}deg`);
    });
  }

  function resetTilt() {
    cancelAnimationFrame(frame.current);
    tilt.current?.style.setProperty('--tilt-x', '0deg');
    tilt.current?.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <section className={styles.hero} data-animate={started || undefined}>
      <div className={styles.top}>
        <span><i className="signal"/>Tar imot nye prosjekter</span>
        <span>Webdesign &amp; utvikling, Lillestrøm / hele Norge</span>
      </div>
      <div className={styles.main}>
        <h1 className={styles.headline} key={`headline-${take}`}>
          <span>Uvanlig</span><span className={styles.outline}>gode sider.</span><span>Uvanlig</span>
          <span><em>enkelt.</em><b aria-hidden="true">✳</b></span>
        </h1>
        <div className={styles.visual} onPointerMove={move} onPointerLeave={resetTilt}>
          <div className={styles.scene} ref={scene} key={`scene-${take}`} data-play={sceneStarted || undefined} aria-hidden="true">
            <div className={styles.orbit}/><div className={styles.ground}/>
            <div className={styles.tilt} ref={tilt}>
              <div className={styles.website}>
                <div className={styles.sheet}/>
                <div className={`${styles.piece} ${styles.chrome}`}>
                  <span><i/><i/><i/></span><span>dinbedrift.no</span><span>↗</span>
                </div>
                <div className={`${styles.piece} ${styles.navigation}`}>
                  <strong>form<span>®</span></strong><span>Prosjekter&nbsp;&nbsp; Om oss&nbsp;&nbsp; Kontakt ↗</span>
                </div>
                <div className={`${styles.piece} ${styles.photo}`}>
                  {/* Existing optimized portfolio asset, used as a decorative example. */}
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img src="/demos/arkitekter-arkitek3/assets/img/opt/hero.jpg" alt="" width="1586" height="992" fetchPriority="high"/>
                  <span>01 / Ved vannet</span>
                </div>
                <div className={`${styles.piece} ${styles.copy}`}>
                  <span>ARKITEKTUR MED OMTANKE</span><strong>Rom for<br/><em>noe nytt.</em></strong>
                  <p>Gode rom begynner med en idé.<br/>Vi hjelper deg å finne formen.</p>
                </div>
                <div className={`${styles.piece} ${styles.action}`}>Se prosjektene <span>↗</span></div>
                <div className={`${styles.piece} ${styles.siteFooter}`}>
                  <span>Gjennomtenkt. Fra første strek.</span><span>FORM / 2026</span>
                </div>
              </div>
            </div>
            <div className={styles.stamp}><span>Din idé.</span><strong>På plass.</strong><b>↗</b></div>
          </div>
          <div className={styles.sceneFooter}>
            <span className={styles.sceneCaption}><i/>Fra idé til ferdig nettside</span>
            <button type="button" className={styles.replay} onClick={() => {resetTilt(); setTake(value => value + 1);}} aria-label="Spill animasjonen av nettsiden på nytt"><span aria-hidden="true">↻</span> Se igjen</button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>Profesjonelle nettsider for nyetablerte og små bedrifter. Velg en retning, send innholdet, så tar vi resten. Fra 2 000 kr.</p>
        <Link className="button dark big" href="/kontakt">Få fast pris <span>→</span></Link>
        <div className={styles.note}><strong>5–7</strong><span>dager når innhold<br/>og omfang er klart</span></div>
      </div>
    </section>
  );
}
