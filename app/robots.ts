import {site} from '@/lib/site';
export default function robots(){return site.publicLaunch?{rules:{userAgent:'*',allow:'/',disallow:['/demos/','/api/']},sitemap:site.origin+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}}}
