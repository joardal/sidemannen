export const site={
 name:'Sidemannen',
 owner:'Thomas Kokkim',
 place:'1900 Fetsund',
 email:'kontakt@sidemannen.no',
 origin:process.env.SITE_URL||'https://sidekick-studio.pages.dev',
 publicLaunch:process.env.PUBLIC_LAUNCH==='true'
};

const keywords=[
 'lage nettside småbedrift',
 'kjøpe nettside til bedrift',
 'hva koster en nettside for bedrift',
 'pris profesjonell nettside',
 'lage nettside pris'
];

export function seo(title:string,description:string,path:string){
 const url=new URL(path==='/'?path:path.replace(/\/$/,''),site.origin).href;
 return {title,description,keywords,alternates:{canonical:url},openGraph:{title,description,url,type:'website' as const,locale:'nb_NO',siteName:site.name},twitter:{card:'summary' as const,title,description}};
}
