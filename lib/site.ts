const productionOrigin='https://sidemannen.no';
const publicLaunch=process.env.PUBLIC_LAUNCH==='true';
const configuredOrigin=(process.env.SITE_URL||'https://dev.sidemannen.pages.dev').replace(/\/$/,'');
if(publicLaunch&&configuredOrigin!==productionOrigin)throw new Error(`PUBLIC_LAUNCH=true requires SITE_URL=${productionOrigin}; received ${configuredOrigin}`);
const socialImage=process.env.SOCIAL_IMAGE_URL?.trim()||'/og.png';

export const site={
 name:'Sidemannen',
 owner:'Thomas Kokkim',
 place:'1900 Fetsund',
 email:'kontakt@sidemannen.no',
 phone:'934 75 284',
 phoneHref:'tel:+4793475284',
 legalName:'Sidemannen',
 organizationNumber:process.env.ORG_NUMBER?.trim()||'979 618 409',
 origin:configuredOrigin,
 productionOrigin,
 publicLaunch,
 socialImage:new URL(socialImage,configuredOrigin).href
};

export function seo(title:string,description:string,path:string){
 const url=new URL(path==='/'?path:path.replace(/\/$/,''),site.origin).href;
 const images=[{url:site.socialImage,alt:'Sidemannen — nettsider for små bedrifter'}];
 return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website' as const,locale:'nb_NO',siteName:site.name,images},twitter:{card:'summary_large_image' as const,title,description,images:[site.socialImage]}};
}
