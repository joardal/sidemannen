# Sidemannen

Nettsted for Sidemannen / Thomas Kokkim. Bygget i C:\Sidekick med React, Vinext og statisk HTML for Cloudflare Pages. Originalene i C:\Nettsider endres aldri.

## Kjøre og bygge

Bruk Node 22.13+ (Node 24 anbefales). `npm install`, deretter `npm run dev`. `npm run build` lager statiske sider i dist/client. `npm run typecheck` kontrollerer typer. `npm run preview:pages` kjører produksjonsfilene med lokale Pages Functions.

## Demoer

`python scripts/import-demos.py` importerer selvstendige HTML-demoer fra C:\Nettsider og lager lib/demos.json. Demoer med manglende lokale bildefiler holdes utenfor katalogen; rapport ligger i work/import-report.json. Originalene kan inneholde eksterne ressurser. Kopiene har noindex og sandbox-policy på Pages.

Kjør en lokal filserver med `python -m http.server 4311 --bind 127.0.0.1 --directory public`, deretter `node scripts/capture-previews.cjs --refresh`. Skriptet trenger Playwright, Chrome og Sharp; sett SIDEKICK_NODE_MODULES til mappen med disse pakkene om standardbanen ikke passer. Bildene er genererte skjermbilder av eksisterende demoer.

Bransjetekster og adresser ligger i lib/industries.ts. En ny bransje trenger en oppføring der for å få sin egen landingsside. Antall design oppdateres fra importen.

## Publisering

Cloudflare-prosjekt: sidekick-studio. Kjør `npm run deploy` etter vellykket bygg. Cloudflare-konfigurasjonen ligger i cloudflare/wrangler.jsonc, adskilt fra Vinext-konfigurasjonen fordi frontend er en statisk eksport. Functions ligger i cloudflare/functions.

Forhåndsvisningen har noindex. Før lansering på eget domene: bekreft eierskap til domenet, koble domenet til Pages, sett SITE_URL=https://sidemannen.no og PUBLIC_LAUNCH=true ved bygging, og bygg/publiser på nytt. Dette oppdaterer canonical, sitemap og indeksregler. Demoene beholder noindex.

## Forespørsler

Skjemaet lagrer i D1-databasen sidekick-inquiries (EU). Les og behandle nye henvendelser i Cloudflare Dashboard > Storage & databases > D1 > sidekick-inquiries. Tabellen inquiries har `state=new` for nye forespørsler. Det finnes ingen offentlig administrasjonsrute.

E-postvarsling er ikke aktivert. kontakt@sidemannen.no er ønsket kontaktadresse, men innboks og domene er ikke bekreftet. Ikke lanser kontaktskjemaet som ordinær salgsinngang uten å avtale rutine for innboksen eller oppfølging i D1. Forespørsler eldre enn 90 dager slettes ved neste innsending. Spam-tellere slettes etter ett døgn ved neste innsending.

Skjemaet har servervalidering, begrenset nyttelast, opprinnelseskontroll, honeypot, ratebegrensning og idempotent lagring. Demo-ID-er kontrolleres mot katalogen. Favoritter lagres lokalt i nettleseren og følger med i forespørselen.

## Avklaringer før ordinær lansering

- Domenet og fungerende kontaktadresse.
- Prisene og leveringstiden på nettstedet følger den avtalte basisleveransen: fra 2 000 kr, 0 eller 200 kr/mnd og normalt 5–7 dager etter mottatt materiale. Tillegg prises før start.
- Organisasjonsnummer når det foreligger.
- Kvalitetssikre beskrivelser av leveranser og personvern mot faktisk forretningsdrift.
- Full visuell nettleserkontroll og måling av Core Web Vitals på offentlig løsning. Reelle CWV-feltdata finnes først etter trafikk.

Biblioteket eksponerer et valgfritt WebMCP-filter i nettlesere som støtter det. Ordinær funksjonalitet er uavhengig av dette; WebMCP er ikke verifisert i en støttet kontekst.
