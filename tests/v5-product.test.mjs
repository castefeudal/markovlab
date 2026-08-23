import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { shell, home, calculatorsPage } from '../assets/js/renderers-v3.js';

const state={lang:'ru',theme:'light',profile:{},favorites:[],recents:[],history:[],snapshots:[]};

test('v5 shell removes the permanent admin sidebar and prioritizes four mobile actions',()=>{
  const html=shell('<p>content</p>',state,{page:'home'});
  assert.doesNotMatch(html,/class="sidebar"/);
  assert.match(html,/class="topbar topbar-v5"/);
  assert.equal((html.match(/mobile-nav-v5[\s\S]*?<\/nav>/)?.[0].match(/<(?:a|button)\b/g)||[]).length,4);
});

test('first visit is search-first and exposes product meaning without a profile gate',()=>{
  const html=home(state);
  assert.match(html,/data-action="palette"/);
  assert.match(html,/Данные остаются в браузере/);
  assert.match(html,/число → смысл → граница → действие/i);
  assert.doesNotMatch(html,/fillProfile/);
});

test('library renders real entry points and all nine laboratory links',()=>{
  const html=calculatorsPage(state);
  assert.match(html,/85 ИНСТРУМЕНТОВ/);
  assert.equal((html.match(/href="#category\//g)||[]).length,9);
  for(const id of ['bmi','tdee','navy-body-fat','e1rm','pace','real-return'])assert.match(html,new RegExp(`#calc/${id}`));
});

test('natural-language library results stay focused',()=>{
  const html=calculatorsPage(state,'сколько калорий мне есть');
  assert.match(html,/#calc\/(?:calorie-target|tdee)/);
  assert.ok((html.match(/class="tool-row"/g)||[]).length<=12);
});

test('v5 density overrides remove the old tall empty result and dark result tower',async()=>{
  const css=await readFile(new URL('../assets/css/styles-v5.css',import.meta.url),'utf8');
  assert.match(css,/result-panel\.empty-result\{[^}]*min-height:0/);
  assert.match(css,/background:var\(--v5-paper\)/);
  assert.match(css,/result-sections\{grid-template-columns:1fr 1fr/);
  assert.match(css,/data-route="insights"[^}]*empty-state\{min-height:138px/);
});

test('first launch does not open blocking onboarding automatically',async()=>{
  const app=await readFile(new URL('../assets/js/app.js',import.meta.url),'utf8');
  assert.doesNotMatch(app,/setTimeout\(showOnboarding/);
  assert.match(app,/action==='onboarding'/);
});

test('shortcut label is platform-aware',async()=>{
  const renderer=await readFile(new URL('../assets/js/renderers-v3.js',import.meta.url),'utf8');
  assert.match(renderer,/Mac\|iPhone\|iPad/);
  assert.match(renderer,/'Ctrl K'/);
});
