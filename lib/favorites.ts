import demos from './demos.json';
export const FAVORITES_KEY='sidekick-favorites-v1';
export function readFavorites():string[]{try{const raw=JSON.parse(localStorage.getItem(FAVORITES_KEY)||'[]');return Array.isArray(raw)?raw.filter((v):v is string=>typeof v==='string'&&demos.some(d=>d.id===v)).slice(0,12):[]}catch{return []}}
export function storeFavorites(ids:string[]){try{localStorage.setItem(FAVORITES_KEY,JSON.stringify(ids))}catch{/* Selection still works in memory. */}}
