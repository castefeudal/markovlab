const pages=new Set(['home','calculators','profile','insights','evidence','about']);
export const route=()=>{const hash=(location.hash||'#home').slice(1),parts=hash.split('/').filter(Boolean),page=parts[0]||'home';if(page==='calc'&&parts[1])return{page:'calc',id:decodeURIComponent(parts[1])};if(page==='category'&&parts[1])return{page:'category',category:decodeURIComponent(parts[1])};if(pages.has(page))return{page};return{page:'not-found',requested:hash}};
export const go=path=>{location.hash=path.startsWith('#')?path:'#'+path};
