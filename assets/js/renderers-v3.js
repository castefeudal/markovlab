import * as legacy from './renderers.js?v=5.0.0';
import { CALCULATORS, calculatorMap } from './calculators.js?v=5.0.0';
import { REFERENCES } from './references.js?v=5.0.0';
import { categories, evidenceLabels, methodLabels, l, t, formatNumber, formatUnit } from './i18n.js?v=5.0.0';
import { icon, logo } from './icons.js?v=5.0.0';
import { DOMAIN_CONTENT, WHEN_USEFUL, applyResultGuidance, confidenceFor, fieldHelp, relatedFor, visualizationType } from './content.js?v=5.0.0';
import { searchCalculators as legacySearchFn } from './search.js?v=5.0.0';

const bi=(ru,en,lang)=>lang==='ru'?ru:en;
const esc=legacy.esc;
const platformShortcut=()=>typeof navigator!=='undefined'&&/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)?'⌘K':'Ctrl K';
const badge=(calc,lang)=>`<span class="badge method">${esc(l(methodLabels[calc.methodType],lang))}</span><span class="badge evidence-${calc.evidenceStrength}">${esc(l(evidenceLabels[calc.evidenceStrength],lang))}</span>`;
const sectionHead=(eyebrow,title,text='')=>`<header class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${text?`<p>${text}</p>`:''}</header>`;

const count=id=>CALCULATORS.filter(calc=>calc.category===id).length;

export function shell(content,state,r){
  const lang=state.lang;
  const nav=[['home','home','overview'],['calculators','calculators','calculators'],['insights','insights','insights'],['profile','profile','profile']];
  const secondary=[['evidence','evidence','evidence'],['about','about','about']];
  const active=page=>r.page===page?'active':'';
  const shortcut=platformShortcut();
  return `<div class="shell shell-v5" data-route="${esc(r.page)}">
  <header class="topbar topbar-v5">
    <a class="brand brand-v5" href="#home" aria-label="MARKOVLAB">${logo(false,bi('ИЗМЕРИМЫЙ ПРОГРЕСС','MEASURABLE PROGRESS',lang))}</a>
    <nav class="nav nav-v5" aria-label="${bi('Основная навигация','Primary navigation',lang)}">${nav.map(([page,name,key])=>`<a class="${active(page)}" href="#${page}" ${r.page===page?'aria-current="page"':''}>${icon(name)}<span>${t(key,lang)}</span></a>`).join('')}</nav>
    <div class="connection" id="connection" hidden>${t('offline',lang)}</div>
    <div class="top-actions">
      <button class="search-trigger btn" data-action="palette" aria-label="${t('search',lang)}">${icon('search')}<span>${t('search',lang)}</span><kbd>${shortcut}</kbd></button>
      <div class="locale-switcher" role="group" aria-label="${t('language',lang)}"><button data-lang="ru" aria-pressed="${lang==='ru'}">RU</button><span aria-hidden="true">/</span><button data-lang="en" aria-pressed="${lang==='en'}">EN</button></div>
      <div class="settings-menu"><button class="icon-btn" data-action="settings-menu" aria-expanded="false" aria-controls="settings-popover" aria-label="${t('theme',lang)}">${icon('theme')}</button><div class="data-popover settings-popover" id="settings-popover"><div class="popover-copy"><strong>${t('theme',lang)}</strong><span>${bi('Применяется сразу и сохраняется локально.','Applied immediately and saved locally.',lang)}</span></div>${[['system','system'],['light','light'],['dark','dark'],['midnight','midnight']].map(([value,key])=>`<button data-theme="${value}" aria-pressed="${state.theme===value}">${state.theme===value?icon('check'):icon('theme')} ${t(key,lang)}</button>`).join('')}</div></div>
      <div class="data-menu"><button class="icon-btn" data-action="data-menu" aria-expanded="false" aria-controls="data-popover" aria-label="${t('data',lang)}">${icon('data')}</button><div class="data-popover" id="data-popover"><div class="popover-copy"><strong>${t('data',lang)}</strong><span>${t('privacyNote',lang)}</span></div>${secondary.map(([page,name,key])=>`<a href="#${page}">${icon(name)} ${t(key,lang)}</a>`).join('')}<button data-action="export">${icon('data')} ${t('export',lang)}</button><button data-action="import">${icon('calculators')} ${t('import',lang)}</button><button data-action="print">${icon('print')} ${t('print',lang)}</button><button class="danger" data-action="clear-data">${icon('close')} ${t('clear',lang)}</button></div></div>
    </div>
  </header>
  <main class="main main-v5" id="main" tabindex="-1">${content}</main>
  <nav class="mobile-nav mobile-nav-v5" aria-label="${bi('Мобильная навигация','Mobile navigation',lang)}">${nav.slice(0,3).map(([page,name,key])=>`<a class="${active(page)}" href="#${page}" ${r.page===page?'aria-current="page"':''}>${icon(name)}<span>${t(key,lang)}</span></a>`).join('')}<button data-action="data-menu" aria-label="${bi('Ещё','More',lang)}">${icon('data')}<span>${bi('Ещё','More',lang)}</span></button></nav>
  </div>`;
}

export function calculatorsPage(state,query='',favoritesOnly=false){
  const lang=state.lang,q=query.trim(),favoriteSet=favoritesOnly?new Set(state.favorites):null,list=legacySearch(query,favoriteSet).slice(0,q?12:85);
  const recent=state.recents.map(id=>calculatorMap.get(id)).filter(Boolean).slice(0,4);
  const essentials=['bmi','tdee','navy-body-fat','e1rm','pace','real-return'].map(id=>calculatorMap.get(id)).filter(Boolean);
  const results=q||favoritesOnly?list:essentials;
  return `<header class="library-intro"><div><span class="eyebrow">${bi('85 ИНСТРУМЕНТОВ · 9 ЛАБОРАТОРИЙ','85 TOOLS · 9 LABORATORIES',lang)}</span><h1>${bi('Что вы хотите узнать?','What do you want to find out?',lang)}</h1><p>${bi('Опишите задачу своими словами. Название формулы знать не нужно.','Describe the outcome in your own words. You do not need the formula name.',lang)}</p></div><div class="library-count"><strong>85</strong><span>${t('tools',lang)}</span></div></header>
  <div class="search-panel search-panel-v5">${icon('search')}<input class="library-search" id="library-search" type="search" value="${esc(query)}" placeholder="${t('searchPlaceholder',lang)}" aria-label="${t('search',lang)}"><kbd>${platformShortcut()}</kbd><button class="icon-btn" data-action="clear-library-search" aria-label="${t('clearSearch',lang)}">${icon('close')}</button></div>
  <div class="intent-examples" aria-label="${bi('Примеры запросов','Example searches',lang)}">${(lang==='ru'?['сколько калорий мне есть','процент жира','максимум в жиме','темп бега']:['how many calories should I eat','body fat','one rep max','running pace']).map(value=>`<button data-action="intent-search" data-search-query="${esc(value)}">${esc(value)}</button>`).join('')}</div>
  <div class="library-layout"><aside class="lab-index"><div class="lab-index-head"><strong>${bi('Лаборатории','Laboratories',lang)}</strong><button class="text-action ${favoritesOnly?'':'active'}" data-filter="all">${t('all',lang)}</button><button class="text-action ${favoritesOnly?'active':''}" data-filter="favorites">${icon('star')} ${t('favorites',lang)} · ${state.favorites.length}</button></div>${Object.entries(categories).map(([id,category])=>`<a href="#category/${id}"><span>${icon(id)}</span><div><strong>${esc(l(category,lang))}</strong><small>${esc(l(category.question,lang))}</small></div><b>${count(id)}</b></a>`).join('')}</aside><section class="library-results-v5" id="library-results"><header><div><span class="eyebrow">${q?bi('РЕЗУЛЬТАТЫ ПОИСКА','SEARCH RESULTS',lang):favoritesOnly?bi('СОХРАНЕНО','SAVED',lang):bi('НАЧНИТЕ ЗДЕСЬ','START HERE',lang)}</span><h2>${q?`${list.length} ${bi('подходящих инструментов','matching tools',lang)}`:favoritesOnly?t('favorites',lang):bi('Полезные отправные точки','Useful starting points',lang)}</h2></div>${recent.length&&!q&&!favoritesOnly?`<span class="recent-note">${bi('Недавние доступны в поиске','Recents are available in search',lang)}</span>`:''}</header>${results.length?`<div class="tool-list">${results.map(calc=>toolRow(calc,state)).join('')}</div>`:`<div class="empty-state"><h2>${favoritesOnly?t('noFavorites',lang):t('noResults',lang)}</h2><p>${bi('Попробуйте описать цель иначе или откройте лабораторию.','Try describing the outcome differently or open a laboratory.',lang)}</p><button class="btn" data-filter="all">${t('all',lang)}</button></div>`}</section></div>`;
}

function legacySearch(query,favoriteSet){return legacySearchFn(CALCULATORS,query,{favorites:favoriteSet})}
function toolRow(calc,state){const lang=state.lang,favorite=state.favorites.includes(calc.id);return `<article class="tool-row"><a href="#calc/${calc.id}"><span class="tool-row-icon">${icon(calc.category)}</span><span class="tool-row-copy"><small>${esc(l(categories[calc.category],lang))}</small><strong>${esc(l(calc.title,lang))}</strong><p>${esc(l(WHEN_USEFUL[calc.id]||calc.description,lang))}</p></span><span class="tool-row-meta">${esc(l(methodLabels[calc.methodType],lang))}${icon('arrow')}</span></a><button class="fav-btn ${favorite?'active':''}" data-favorite="${calc.id}" aria-label="${t('favorite',lang)}" aria-pressed="${favorite}">${icon('star')}</button></article>`}
export const notFoundPage=legacy.notFoundPage;
export const paletteHtml=legacy.paletteHtml;
export const toolCard=legacy.toolCard;

export function evidencePage(state,query=''){
  const lang=state.lang;
  return legacy.evidencePage(state,query).replace(/<\/header><div class="evidence-axis">/,`</header><figure class="evidence-hero-visual evidence-interval-v5"><img src="./assets/images/core/evidence-interval-v5.webp" width="1400" height="1050" loading="eager" alt=""><figcaption><span class="eyebrow">${bi('ДИАПАЗОН, НЕ ОБЕЩАНИЕ','A RANGE, NOT A PROMISE',lang)}</span><strong>${bi('Основание задаёт границы уверенности. Оно не превращает оценку в точное личное измерение.','Evidence defines the bounds of confidence. It does not turn an estimate into an exact personal measurement.',lang)}</strong><small>${bi('Тип метода и сила основания остаются двумя независимыми осями.','Method type and evidence strength remain two independent axes.',lang)}</small></figcaption></figure><div class="evidence-axis">`);
}

export function onboarding(state){
  const lang=state.lang;
  return legacy.onboarding(state).replace(/<div class="onboarding-visual">[\s\S]*?<\/div>/,`<figure class="onboarding-visual onboarding-image"><img src="./assets/images/core/onboarding-local.webp" width="1400" height="1050" alt=""><figcaption>${bi('Профиль остаётся внутри этого браузера; расчёты и основания видимы.','The profile stays inside this browser; calculations and evidence remain visible.',lang)}</figcaption></figure>`);
}

export function home(state){
  const lang=state.lang;
  const recent=state.recents.map(id=>calculatorMap.get(id)).filter(Boolean).slice(0,3);
  const latest=state.history.at(-1);
  const starts=['tdee','navy-body-fat','e1rm','pace','real-return'].map(id=>calculatorMap.get(id)).filter(Boolean);
  return `<section class="home-hero-v5">
    <div class="home-hero-copy"><span class="eyebrow">${bi('ПЕРСОНАЛЬНАЯ ЛАБОРАТОРИЯ','PERSONAL MEASUREMENT LAB',lang)}</span><h1>${bi('Измерение, которое приводит к решению.','A measurement that leads to a decision.',lang)}</h1><p>${bi('Найдите нужный расчёт обычными словами, получите понятный результат и сразу увидьте основание, ограничение и следующий шаг.','Find the right calculation in plain language, get a clear result, and immediately see its evidence, limitation and next step.',lang)}</p><button class="home-search" data-action="palette">${icon('search')}<span><strong>${bi('Что вы хотите измерить?','What do you want to measure?',lang)}</strong><small>${bi('Например: сколько калорий мне есть','For example: how many calories should I eat',lang)}</small></span><kbd>${platformShortcut()}</kbd></button><div class="hero-quick">${starts.slice(0,4).map(calc=>`<a href="#calc/${calc.id}">${esc(l(calc.title,lang))}${icon('arrow')}</a>`).join('')}</div><div class="hero-trust"><span>${icon('lock')} ${bi('Данные остаются в браузере','Data stays in your browser',lang)}</span><span>${icon('evidence')} ${bi('Формулы и ограничения открыты','Open formulas and limitations',lang)}</span><span>85 ${t('tools',lang)}</span></div></div>
    <figure class="measure-preview" aria-label="${bi('Пример пути от исходных данных к результату и действию','Example path from inputs to result and action',lang)}"><div class="preview-rail"><span>01 ${bi('ДАННЫЕ','INPUT',lang)}</span><span class="active">02 ${bi('РЕЗУЛЬТАТ','RESULT',lang)}</span><span>03 ${bi('ДЕЙСТВИЕ','ACTION',lang)}</span></div><div class="preview-question"><small>${bi('ПРИМЕР · ИНДЕКС МАССЫ ТЕЛА','EXAMPLE · BODY MASS INDEX',lang)}</small><strong>${bi('Как соотносятся вес и рост?','How do weight and height relate?',lang)}</strong></div><div class="preview-metric"><strong>24,7</strong><span>kg/m²</span><i></i></div><div class="preview-decision"><div><small>${bi('СМЫСЛ','MEANING',lang)}</small><p>${bi('Ориентир для скрининга, а не диагноз.','A screening reference, not a diagnosis.',lang)}</p></div><div><small>${bi('СЛЕДУЮЩИЙ ШАГ','NEXT STEP',lang)}</small><p>${bi('Сопоставьте с окружностью талии.','Compare with waist circumference.',lang)}</p></div></div><figcaption>${bi('Реальная структура результата MARKOVLAB: число → смысл → граница → действие.','The actual MARKOVLAB result structure: metric → meaning → boundary → action.',lang)}</figcaption></figure>
  </section>
  ${recent.length||latest?`<section class="continue-strip"><div><span class="eyebrow">${bi('ПРОДОЛЖИТЬ','CONTINUE',lang)}</span><h2>${bi('Ваше рабочее пространство','Your workspace',lang)}</h2></div>${latest?`<a class="continue-result" href="#calc/${esc(latest.calcId)}"><small>${bi('Последний результат','Latest result',lang)}</small><strong>${esc(latest.summary)}</strong><span>${esc(l(calculatorMap.get(latest.calcId)?.title,lang))}</span></a>`:''}<div class="continue-links">${recent.map(calc=>`<a href="#calc/${calc.id}">${icon(calc.category)}<span>${esc(l(calc.title,lang))}</span></a>`).join('')}</div><a class="text-action" href="#insights">${bi('История и динамика','History and progress',lang)} ${icon('arrow')}</a></section>`:''}
  <section class="home-section-v5"><header class="section-head"><div><span class="eyebrow">${bi('БЫСТРЫЙ СТАРТ','QUICK START',lang)}</span><h2>${bi('Начните с практического вопроса','Start with a practical question',lang)}</h2></div><p>${bi('Профиль не нужен. Значения можно сохранить после расчёта.','No profile required. Save values after the calculation if useful.',lang)}</p></header><div class="question-list">${starts.map((calc,index)=>`<a href="#calc/${calc.id}"><b>${String(index+1).padStart(2,'0')}</b><span><strong>${esc(l(calc.title,lang))}</strong><small>${esc(l(WHEN_USEFUL[calc.id]||calc.description,lang))}</small></span>${icon('arrow')}</a>`).join('')}</div></section>
  <section class="home-section-v5 lab-atlas"><header class="section-head"><div><span class="eyebrow">${bi('9 ЛАБОРАТОРИЙ','9 LABORATORIES',lang)}</span><h2>${bi('Одна система, разные решения','One system, different decisions',lang)}</h2></div><a class="text-action" href="#calculators">${bi('Все 85 инструментов','All 85 tools',lang)} ${icon('arrow')}</a></header><div class="lab-atlas-grid">${Object.entries(categories).map(([id,category])=>`<a href="#category/${id}" class="domain-${id}"><span>${icon(id)}</span><div><strong>${esc(l(category,lang))}</strong><small>${esc(l(category.question,lang))}</small></div><b>${count(id)}</b></a>`).join('')}</div></section>
  <section class="trust-system"><div><span class="eyebrow">${bi('ДОВЕРИЕ БЕЗ АККАУНТА','TRUST WITHOUT AN ACCOUNT',lang)}</span><h2>${bi('Прозрачность встроена в результат.','Transparency is built into every result.',lang)}</h2><p>${bi('Метод и сила основания показаны отдельно. Данные не отправляются на backend: профиль и история находятся только в этом браузере.','Method type and evidence strength are shown separately. No data is sent to a backend: profile and history stay in this browser.',lang)}</p><div class="trust-actions"><a class="btn" href="#evidence">${t('evidence',lang)} ${icon('arrow')}</a><a class="text-action" href="#about">${bi('Как устроена приватность','How privacy works',lang)}</a></div></div><div class="local-diagram" role="img" aria-label="${bi('Браузер хранит данные локально и экспортирует файл; сервер MARKOVLAB не получает данные','Browser stores data locally and exports a file; MARKOVLAB server receives no data',lang)}"><span>${icon('profile')}<b>${bi('Браузер','Browser',lang)}</b></span>${icon('arrow')}<span>${icon('lock')}<b>localStorage</b></span>${icon('arrow')}<span>${icon('data')}<b>${bi('Файл экспорта','Export file',lang)}</b></span><em>${bi('Нет передачи на сервер','No backend upload',lang)}</em></div></section>`;
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
    .replace(/MARKOVLAB \/ 2\.0\.0/g,'MARKOVLAB / 5.0.0')
    .replace(/<p><strong>2\.0\.0<\/strong>/,`<p><strong>5.0.0</strong> — ${bi('search-first оболочка без постоянного sidebar, рабочая Home, компактная система результатов, новая измерительная айдентика и смысловая evidence-визуализация.','search-first shell without a permanent sidebar, useful Home workspace, compact result system, new measurement identity and meaningful evidence visual.',lang)}</p><p><strong>4.0.0</strong> — ${bi('natural-language поиск, персональная главная, RU/EN, четыре темы и release-контур.','natural-language search, personalized home, RU/EN, four themes and release quality gates.',lang)}</p><p><strong>3.1.0</strong> — ${bi('индивидуальные пояснения результата и проверяемая матрица 85 инструментов.','individual result guidance and a verifiable 85-tool matrix.',lang)}</p><p><strong>3.0.0</strong> — ${bi('единая визуальная система и семантически честные визуализации.','unified visual system and semantically honest visualizations.',lang)}</p><p><strong>2.0.0</strong>`);
}
