import * as legacy from './renderers.js?v=4.0.0';
import { CALCULATORS, calculatorMap } from './calculators.js?v=4.0.0';
import { REFERENCES } from './references.js?v=4.0.0';
import { categories, evidenceLabels, methodLabels, l, t, formatNumber, formatUnit } from './i18n.js?v=4.0.0';
import { icon } from './icons.js?v=4.0.0';
import { DOMAIN_CONTENT, WHEN_USEFUL, applyResultGuidance, confidenceFor, fieldHelp, relatedFor, visualizationType } from './content.js?v=4.0.0';

const bi=(ru,en,lang)=>lang==='ru'?ru:en;
const esc=legacy.esc;
const badge=(calc,lang)=>`<span class="badge method">${esc(l(methodLabels[calc.methodType],lang))}</span><span class="badge evidence-${calc.evidenceStrength}">${esc(l(evidenceLabels[calc.evidenceStrength],lang))}</span>`;
const sectionHead=(eyebrow,title,text='')=>`<header class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${text?`<p>${text}</p>`:''}</header>`;

export const shell=legacy.shell;
export const calculatorsPage=legacy.calculatorsPage;
export const notFoundPage=legacy.notFoundPage;
export const paletteHtml=legacy.paletteHtml;
export const toolCard=legacy.toolCard;

export function evidencePage(state,query=''){
  const lang=state.lang;
  return legacy.evidencePage(state,query).replace(/<\/header><div class="evidence-axis">/,`</header><figure class="evidence-hero-visual"><img src="./assets/images/core/evidence-method.webp" width="1400" height="1050" loading="eager" alt=""><figcaption>${bi('Тип метода и сила основания — независимые оси, а не единая оценка.','Method type and evidence strength are independent axes, not a combined score.',lang)}</figcaption></figure><div class="evidence-axis">`);
}

export function onboarding(state){
  const lang=state.lang;
  return legacy.onboarding(state).replace(/<div class="onboarding-visual">[\s\S]*?<\/div>/,`<figure class="onboarding-visual onboarding-image"><img src="./assets/images/core/onboarding-local.webp" width="1400" height="1050" alt=""><figcaption>${bi('Профиль остаётся внутри этого браузера; расчёты и основания видимы.','The profile stays inside this browser; calculations and evidence remain visible.',lang)}</figcaption></figure>`);
}

export function home(state){
  const lang=state.lang;
  return legacy.home(state)
    .replace(/<div class="hero-visual"[\s\S]*?<\/div><\/section>/,`<figure class="hero-visual hero-image"><img src="./assets/images/core/hero-laboratory-v4.webp" width="1586" height="992" fetchpriority="high" alt=""><figcaption>${bi('Профиль превращается в прозрачный расчёт, основание и наблюдаемую динамику.','Profile data becomes a transparent calculation, evidence context and observable trend.',lang)}</figcaption></figure></section>`)
    .replace(/<div class="privacy-orbit">[\s\S]*?<\/div><div>/,`<figure class="privacy-orbit"><img src="./assets/images/core/privacy-local-v4.webp" width="1448" height="1086" loading="lazy" alt=""></figure><div>`)
    .replace(/<div class="completion-ring" style="--value:[^"]+"><b>[^<]*<\/b><span>[^<]*<\/span><\/div>/,`<div class="profile-sample"><img src="./assets/images/core/profile-once.webp" width="720" height="540" loading="lazy" alt=""><dl><div><dt>${bi('Рост','Height',lang)}</dt><dd>180 cm</dd></div><div><dt>${bi('Вес','Weight',lang)}</dt><dd>80 kg</dd></div><div><dt>${bi('Талия','Waist',lang)}</dt><dd>90 cm</dd></div><div><dt>${bi('Сон','Sleep',lang)}</dt><dd>7.4 h</dd></div></dl></div>`);
}

export function categoryPage(state,id){
  const lang=state.lang,c=categories[id],meta=DOMAIN_CONTENT[id];
  if(!c||!meta)return notFoundPage(state);
  const list=CALCULATORS.filter(x=>x.category===id);
  const workflow=meta.workflow.map(x=>calculatorMap.get(x)).filter(Boolean);
  const others=list.filter(x=>!workflow.includes(x));
  return `<header class="category-hero domain-${id}"><div><a class="back-link" href="#calculators">${icon('arrow')} ${t('calculators',lang)}</a><span class="category-symbol">${icon(id)}</span><span class="eyebrow">${list.length} ${t('tools',lang)}</span><h1>${esc(l(c,lang))}</h1><p>${esc(l(c.intro,lang))}</p></div><figure class="category-illustration"><img src="${meta.asset}" width="1200" height="900" alt=""><figcaption>${esc(l(c.question,lang))}</figcaption></figure></header>
  <section class="category-info"><article><span class="eyebrow">${t('categoryWhat',lang)}</span><h2>${esc(l(c.question,lang))}</h2><p>${esc(l(meta.workflowNote,lang))}</p></article><article><span class="eyebrow">${t('limitations',lang)}</span><h2>${bi('Главная граница метода','The method boundary',lang)}</h2><p>${esc(l(meta.limit,lang))}</p></article></section>
  <section>${sectionHead(bi('СЕМАНТИЧЕСКИЙ ПУТЬ','CURATED WORKFLOW',lang),t('workflows',lang),esc(l(meta.workflowNote,lang)))}<div class="workflow-row">${workflow.map((x,i)=>`<a href="#calc/${x.id}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(l(x.title,lang))}</span>${icon('arrow')}</a>`).join('')}</div></section>
  <section>${sectionHead(bi('ВСЕ ИНСТРУМЕНТЫ','ALL TOOLS',lang),t('categoryTools',lang),`${list.length} ${t('tools',lang)}`)}<div class="tools-grid">${others.map(x=>toolCard(x,state,WHEN_USEFUL[x.id]?.[lang])).join('')}</div></section>
  <div class="related-domains">${Object.entries(categories).filter(([key])=>key!==id).slice(0,4).map(([key,x])=>`<a href="#category/${key}">${icon(key)}<span>${esc(l(x,lang))}</span></a>`).join('')}</div>`;
}

export function calculatorPage(calc,state,session,resultData,errors={}){
  if(!calc)return notFoundPage(state);
  const lang=state.lang;
  const localizeResult=result=>result&&lang==='ru'?{...result,unit:formatUnit(result.unit,lang),secondary:result.secondary?.map(item=>({...item,unit:formatUnit(item.unit,lang)}))||[]}:result;
  resultData=resultData?localizeResult(applyResultGuidance(calc,resultData)):resultData;
  const displayCalc=lang==='ru'?{...calc,fields:calc.fields.map(field=>({...field,unit:formatUnit(field.unit,lang)})),calculate:(...args)=>localizeResult(applyResultGuidance(calc,calc.calculate(...args)))}:calc;
  let html=legacy.calculatorPage(displayCalc,state,session,resultData,errors);
  const printDate=new Intl.DateTimeFormat(lang==='ru'?'ru-RU':'en-US',{dateStyle:'long',timeStyle:'short'}).format(new Date());
  const printInputs=displayCalc.fields.map(field=>{const value=session?.[field.id]??(field.profileKey?state.profile[field.profileKey]:undefined)??field.default;return `<div><dt>${esc(l(field.label,lang))}</dt><dd>${esc(value)}${field.unit?`&nbsp;${esc(field.unit)}`:''}</dd></div>`}).join('');
  html=`<header class="print-brand"><img src="./assets/brand/logo-horizontal-dark.svg" width="220" height="48" alt="MARKOVLAB"><span>${esc(printDate)}</span></header>${html.replace('<div class="calc-grid">',`<section class="print-inputs"><h2>${bi('Исходные данные','Inputs',lang)}</h2><dl>${printInputs}</dl></section><div class="calc-grid">`)}`;
  html=html.replace('<aside class="panel result-panel" aria-live="polite">','<aside class="panel result-panel" tabindex="-1" aria-live="polite">');
  const generic=bi('Когда число способно уточнить решение или задать точку отсчёта для динамики.','When a number can clarify a decision or create a baseline for a trend.',lang);
  html=html.replace(esc(generic),esc(l(WHEN_USEFUL[calc.id],lang)));
  for(const field of displayCalc.fields){
    const id=`hint-${field.id}`;
    const re=new RegExp(`(<small class="field-hint" id="${id}">)[\\s\\S]*?(<\\/small>)`);
    const prefilled=session?.[field.id]===undefined&&field.profileKey&&state.profile[field.profileKey]!==undefined;
    const prefix=prefilled?`${t('profileOverride',lang)} `:'';
    html=html.replace(re,`$1${esc(prefix+fieldHelp(displayCalc,field,lang))}$2`);
  }
  html=html.replace(/<div class="result-viz"[\s\S]*?<\/small><\/div>/,'');
  if(resultData){
    const oldConfidence=lang==='ru'?'Смотрите тип метода и силу основания выше.':'See method type and evidence strength above.';
    html=html.replace(esc(oldConfidence),esc(l(confidenceFor(calc),lang)));
    const viz=semanticViz(calc,resultData,lang);
    if(viz)html=html.replace('<div class="result-sections">',`${viz}<div class="result-sections">`);
    const sources=sourceList(calc,lang);
    if(sources)html=html.replace(/<div class="source-list">[\s\S]*?<\/div>/,sources);
  }
  const related=relatedFor(calc,CALCULATORS).map(id=>calculatorMap.get(id)).filter(Boolean);
  html=html.replace(/<div class="tools-grid compact">[\s\S]*?<\/div><\/section>$/,`<div class="tools-grid compact">${related.map(c=>toolCard(c,state,WHEN_USEFUL[c.id]?.[lang])).join('')}</div></section>`);
  return html;
}

function sourceList(calc,lang){
  const sources=calc.sources.map(id=>REFERENCES[id]).filter(Boolean);
  if(!sources.length)return'';
  return `<div class="source-list">${sources.map(source=>`<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer"><span><b>${esc(l(source.title,lang))}</b><small>${esc(l(source.note,lang))}</small></span>${icon('external')}</a>`).join('')}</div>`;
}

function semanticViz(calc,r,lang){
  const type=visualizationType(calc.id);
  if(type==='exact')return'';
  const labels={range:['Диапазон результата','Result interval'],composition:['Состав результата','Result composition'],comparison:['Сравнение методов','Method comparison'],delta:['Изменение относительно нуля','Change from zero'],conversion:['Преобразование единиц','Unit conversion'],scenario:['Сценарный результат','Scenario output']};
  const label=bi(...labels[type],lang);
  if(type==='range'&&typeof r.primary==='string')return `<div class="semantic-viz range-viz" role="img" aria-label="${esc(label)}"><span></span><b>${esc(r.primary)} ${esc(r.unit||'')}</b></div>`;
  if(type==='composition'&&r.secondary?.length){const values=[Number(r.primary),...r.secondary.map(x=>Number(x.value))].filter(Number.isFinite),sum=values.reduce((a,b)=>a+b,0)||1;return `<div class="semantic-viz composition-viz" role="img" aria-label="${esc(label)}">${values.map((x,i)=>`<i style="--share:${x/sum*100}" data-index="${i}"></i>`).join('')}</div>`}
  if(type==='comparison'&&r.secondary?.length){const values=[Number(r.primary),...r.secondary.map(x=>Number(x.value))].filter(Number.isFinite),max=Math.max(...values,1);return `<div class="semantic-viz comparison-viz" role="img" aria-label="${esc(label)}">${values.map(x=>`<i style="--share:${x/max*100}"></i>`).join('')}</div>`}
  if(type==='delta'&&typeof r.primary==='number')return `<div class="semantic-viz delta-viz ${r.primary<0?'negative':'positive'}" role="img" aria-label="${esc(label)}"><span></span><b>${r.primary>0?'+':''}${esc(formatNumber(r.primary,lang,2))}</b></div>`;
  return `<div class="semantic-viz relation-viz" role="img" aria-label="${esc(label)}">${icon(type==='conversion'?'utility':'chart')}<span>${esc(label)}</span>${icon('arrow')}</div>`;
}

export function profilePage(state){
  const lang=state.lang;
  return legacy.profilePage(state)
    .replace(/<div class="profile-progress">[\s\S]*?<\/div><\/div><\/header>/,`<aside class="profile-payoff"><strong>${bi('Введите один раз — используйте в связанных расчётах','Enter once — reuse across related calculations',lang)}</strong><span>${bi('Заполняйте только то, что действительно сократит повторный ввод.','Only add data that meaningfully reduces repeated entry.',lang)}</span></aside></header>`)
    .replace(/<div class="privacy-callout">/,`<figure class="profile-page-visual"><img src="./assets/images/core/profile-once.webp" width="720" height="540" loading="eager" alt=""><figcaption>${bi('Заполняйте только те поля, которые хотите повторно использовать. Полный профиль не требуется.','Fill only the fields you want to reuse. A complete profile is never required.',lang)}</figcaption></figure><div class="privacy-callout">`);
}

export function insightsPage(state,historyQuery='',sort='newest'){
  const lang=state.lang;
  return legacy.insightsPage(state,historyQuery,sort)
    .replace(/ · P\d/g,'')
    .replace(/<section><header class="section-head"><div><span class="eyebrow">ДИНАМИКА|<section><header class="section-head"><div><span class="eyebrow">TRENDS/,match=>`<figure class="progress-page-visual"><img src="./assets/images/core/progress-honest-v4.webp" width="1448" height="1086" loading="lazy" alt=""></figure>${match}`);
}

export function aboutPage(state){
  const lang=state.lang;
  return legacy.aboutPage(state)
    .replace(/MARKOVLAB \/ 2\.0\.0/g,'MARKOVLAB / 4.0.0')
    .replace(/<p><strong>2\.0\.0<\/strong>/,`<p><strong>4.0.0</strong> — ${bi('новая бренд‑система, natural-language поиск, персональная главная, RU/EN, четыре темы, усиленный calculator UX и release‑контур.','new brand system, natural-language search, personalized home, RU/EN, four themes, stronger calculator UX and release quality gates.',lang)}</p><p><strong>3.1.0</strong> — ${bi('индивидуальные пояснения результата и проверяемая матрица 85 инструментов.','individual result guidance and a verifiable 85-tool matrix.',lang)}</p><p><strong>3.0.0</strong> — ${bi('единая визуальная система и семантически честные визуализации.','unified visual system and semantically honest visualizations.',lang)}</p><p><strong>2.0.0</strong>`);
}
