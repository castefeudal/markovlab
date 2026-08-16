import test from 'node:test';
import assert from 'node:assert/strict';
import { migrateState } from '../assets/js/storage.js';
import { normalizeImport } from '../assets/js/validators.js';
const ids=new Set(['bmi']);
test('v1 state migrates to v2 without losing records',()=>{const x=migrateState({version:1,lang:'en',profile:{weight:80},favorites:['bmi'],history:[{calcId:'bmi'}],snapshots:[]});assert.equal(x.version,2);assert.equal(x.profile.weight,80);assert.deepEqual(x.recents,[])});
test('v2 import keeps structured result and rejects prototype fields',()=>{const payload=JSON.parse('{"version":2,"history":[{"calcId":"bmi","result":{"primary":24.7,"unit":"kg/m²"}}],"profile":{"weight":80,"__proto__":{"polluted":true}}}');const x=normalizeImport(payload,ids);assert.equal(x.history[0].result.primary,24.7);assert.equal(x.profile.weight,80);assert.equal({}.polluted,undefined)});
test('oversized and future-shaped arrays are bounded',()=>{const x=normalizeImport({version:2,favorites:Array(400).fill('bmi'),history:Array(400).fill({calcId:'bmi'}),snapshots:Array(400).fill({profile:{weight:80}})},ids);assert.equal(x.favorites.length,1);assert.equal(x.history.length,200);assert.equal(x.snapshots.length,200)});
