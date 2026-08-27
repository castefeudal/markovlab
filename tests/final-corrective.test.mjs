import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CALCULATORS, calculatorMap } from '../assets/js/calculators.js';
import { calculatorPage } from '../assets/js/renderers-v3.js';

const state={lang:'ru',theme:'light',profile:{},favorites:[],recents:[],history:[],snapshots:[]};

test('Pro controls use one delegated pointer path with an inspectable event trace',async()=>{
  const app=await readFile(new URL('../assets/js/app.js',import.meta.url),'utf8');
  assert.match(app,/window\.__MARKOVLAB_PRO_EVENT_TRACE__=proEventTrace/);
  assert.match(app,/app\.addEventListener\('pointerdown',event=>traceProEvent/);
  assert.match(app,/app\.addEventListener\('pointerup',event=>traceProEvent/);
  assert.match(app,/const scenario=e\.target\.closest\('button\[data-pro-delta\]'\)/);
  assert.match(app,/runProScenarioReliable\(scenario,'pointer-click'\)/);
  assert.doesNotMatch(app,/bindProControls|document\.addEventListener\('click',e=>\{const button=e\.target\.closest/);
  assert.match(app,/console\.error\('MARKOVLAB Pro scenario failed'/);
});

test('every numeric calculator renders a pointer-addressable Pro Scenario B',()=>{
  for(const calc of CALCULATORS){
    const html=calculatorPage(calc,state,null,null,{});
    if(calc.fields.some(field=>field.type==='number')){
      assert.match(html,/data-pro-delta="5"/,`${calc.id}: +5% control`);
      assert.match(html,/role="status" tabindex="-1" aria-live="polite"/,`${calc.id}: live scenario output`);
    }
  }
});

test('Russian worked examples and print inputs use localized option labels',()=>{
  const calc=calculatorMap.get('fat-gain-surplus');
  const html=calculatorPage(calc,state,null,null,{});
  assert.match(html,/Пол: <b>Мужской<\/b>/);
  assert.match(html,/<dt>Уровень силовой подготовки<\/dt><dd>Средний<\/dd>/);
  assert.match(html,/<dt>Повседневная активность<\/dt><dd>Сидячая<\/dd>/);
  assert.doesNotMatch(html,/<dd>male<\/dd>|<dd>intermediate<\/dd>|<dd>sedentary<\/dd>/);
});

test('theme contract defines distinct safe foreground tokens for inverse surfaces',async()=>{
  const css=await readFile(new URL('../assets/css/styles-v5.css',import.meta.url),'utf8');
  for(const token of ['--surface-page','--surface-recessed','--surface-elevated','--surface-inverse','--text-primary','--text-secondary','--text-tertiary','--text-on-inverse','--border-soft','--border-strong','--accent','--accent-on-dark','--accent-on-light','--focus','--overlay-backdrop','--overlay-shadow'])assert.match(css,new RegExp(token.replaceAll('-','\\-')));
  assert.match(css,/\.author-note \.eyebrow,.about-author \.eyebrow,.trust-system \.eyebrow,.trust-system \.text-action\{color:var\(--accent-on-inverse\)\}/);
});
