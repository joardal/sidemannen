import type {Metadata} from 'next';
import Link from '@/components/site-link';
import './globals.css';
import {site} from '@/lib/site';
/* The single App Router root layout owns this font link for every route. */
/* oxlint-disable next/no-page-custom-font */
export const metadata:Metadata={
 metadataBase:new URL(site.origin),
 robots:{index:site.publicLaunch,follow:site.publicLaunch},
 icons:{icon:'/favicon.svg'},
 title:{default:'Sidemannen — Uvanlig gode sider. Uvanlig enkelt.',template:'%s | Sidemannen'},
 description:'Profesjonelle nettsider for nyetablerte og små bedrifter. Nettside fra 2000 kr, levert på 5–7 dager.',
 openGraph:{type:'website',locale:'nb_NO',siteName:site.name,title:'Sidemannen — Uvanlig gode sider. Uvanlig enkelt.',description:'Nettside fra 2000 kr for nyetablerte og små bedrifter.',images:[{url:site.socialImage,alt:'Sidemannen — nettsider for små bedrifter'}]},
 twitter:{card:'summary_large_image',title:'Sidemannen — Uvanlig gode sider. Uvanlig enkelt.',description:'Nettside fra 2000 kr for nyetablerte og små bedrifter.',images:[site.socialImage]}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 const structuredData={'@context':'https://schema.org','@graph':[
  {'@type':'ProfessionalService','@id':site.origin+'/#business',name:site.name,url:site.origin,image:site.socialImage,email:site.email,telephone:site.phoneHref.slice(4),...(site.legalName?{legalName:site.legalName}:{}),...(site.organizationNumber?{identifier:site.organizationNumber}:{}),founder:{'@type':'Person',name:site.owner},address:{'@type':'PostalAddress',addressLocality:'Fetsund',addressCountry:'NO'},areaServed:'NO',priceRange:'fra 2000 NOK',description:'Design og utvikling av profesjonelle nettsider for nyetablerte og små bedrifter',offers:{'@type':'Offer',name:'Nettside for småbedrift',price:'2000',priceCurrency:'NOK'}},
  {'@type':'WebSite','@id':site.origin+'/#website',name:site.name,url:site.origin,publisher:{'@id':site.origin+'/#business'}}
 ]};
 const legalLabel=site.legalName?[site.legalName,site.organizationNumber&&`org.nr. ${site.organizationNumber}`].filter(Boolean).join(' · '):site.owner;
 return <html lang="nb"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><div className="grain" aria-hidden="true"/><a className="skip" href="#main">Hopp til innhold</a><header className="site-header"><Link href="/" className="brand" aria-label="Sidemannen hjem">sidemannen<span className="brand-dot" aria-hidden="true">✳</span></Link><nav className="mono" aria-label="Hovedmeny"><Link href="/portfolio">Designbibliotek</Link><Link href="/#pris">Pris</Link><Link href="/prosjekter">Prosjekter</Link><Link href="/tjenester">Slik fungerer det</Link></nav><div className="location mono"><i/>Lillestrøm</div><Link className="button header-button" href="/kontakt">Få fast pris <span>→</span></Link></header>{children}<footer className="footer"><div className="footer-top"><Link className="brand" href="/">sidemannen<span aria-hidden="true">✳</span></Link><p>Uvanlig gode sider.<br/>Uvanlig enkelt.</p><nav aria-label="Bunnmeny"><Link href="/portfolio">Designbibliotek</Link><Link href="/#pris">Pris</Link><Link href="/prosjekter">Prosjekter</Link><Link href="/tjenester">Slik fungerer det</Link><Link href="/wordpress-til-nextjs">Fra WordPress til Next.js</Link><Link href="/guider">Guider</Link><Link href="/personvern">Personvern</Link></nav></div><div className="footer-word" aria-hidden="true">sidemannen</div><div className="footer-bottom"><span>{legalLabel} · {site.place}</span><span className="footer-contact"><a href={site.phoneHref}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a></span><span>© {new Date().getFullYear()} Sidemannen</span></div></footer></body></html>;
}
