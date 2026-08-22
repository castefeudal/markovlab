import { normalizeImport } from './validators.js?v=4.0.0';

const KEY = 'markovlab-state-v3';
const LEGACY_KEYS = ['markovlab-state-v2','markovlab-state-v1'];
const uid = () => globalThis.crypto?.randomUUID?.() || `ml-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;

export const DEFAULT_STATE = Object.freeze({version:3,lang:'en',theme:'system',profile:{},favorites:[],history:[],snapshots:[],recents:[],onboardingDismissed:false});
const preferredLanguage=()=>typeof navigator!=='undefined'&&String(navigator.language||'').toLowerCase().startsWith('ru')?'ru':'en';
const fresh = () => ({...structuredClone(DEFAULT_STATE),lang:preferredLanguage()});

export function migrateState(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || Number(raw.version || 1) > 3) return fresh();
  return {...fresh(),...raw,version:3,lang:raw.lang==='ru'?'ru':'en',profile:raw.profile&&typeof raw.profile==='object'?raw.profile:{},favorites:Array.isArray(raw.favorites)?raw.favorites:[],history:Array.isArray(raw.history)?raw.history:[],snapshots:Array.isArray(raw.snapshots)?raw.snapshots:[],recents:Array.isArray(raw.recents)?raw.recents:[],onboardingDismissed:Boolean(raw.onboardingDismissed)};
}
export function loadState(){try{const current=localStorage.getItem(KEY),legacy=LEGACY_KEYS.map(key=>localStorage.getItem(key)).find(Boolean),state=migrateState(JSON.parse(current||legacy||'null'));if(!current&&legacy)saveState(state);return state}catch{return fresh()}}
export function saveState(state){localStorage.setItem(KEY,JSON.stringify({...state,version:3}))}
export function exportState(state){return JSON.stringify({...state,version:3,exportedAt:new Date().toISOString(),product:'MARKOVLAB'},null,2)}
export function importState(text,ids){if(typeof text!=='string'||text.length>2_000_000)throw new Error('Import too large');return normalizeImport(JSON.parse(text),ids)}
export function clearState(){localStorage.removeItem(KEY);for(const key of LEGACY_KEYS)localStorage.removeItem(key)}
export function addHistory(state,record){state.history=[...state.history,{...record,id:uid(),at:new Date().toISOString()}].slice(-200);saveState(state)}
export function addSnapshot(state){state.snapshots=[...state.snapshots,{id:uid(),at:new Date().toISOString(),profile:{...state.profile}}].slice(-200);saveState(state)}
export function touchRecent(state,calcId){state.recents=[calcId,...state.recents.filter(id=>id!==calcId)].slice(0,8);saveState(state)}
