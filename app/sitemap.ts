import {industries} from '@/lib/industries';import {site} from '@/lib/site';
export default function sitemap(){return ['','portfolio','bransjer','prosjekter','tjenester','kontakt','personvern',...industries.map(i=>`nettside-${i.slug}`)].map(path=>({url:site.origin+'/'+path,changeFrequency:'monthly' as const,priority:path===''?1:path.startsWith('nettside-')?.8:.6}))}
