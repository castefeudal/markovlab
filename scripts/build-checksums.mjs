import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root=new URL('../',import.meta.url);
const excluded=new Set(['.git','node_modules','.DS_Store']);
const output='docs/FILE_CHECKSUMS.sha256';

async function walk(dir){
 const entries=await readdir(dir,{withFileTypes:true});
 const files=[];
 for(const entry of entries){
  if(excluded.has(entry.name))continue;
  const path=join(dir,entry.name),name=relative(root.pathname,path).replaceAll('\\','/');
  if(name===output)continue;
  if(entry.isDirectory())files.push(...await walk(path));
  else if(entry.isFile())files.push(path);
 }
 return files;
}

const files=(await walk(root.pathname)).sort();
const lines=[];
for(const file of files){
 const hash=createHash('sha256').update(await readFile(file)).digest('hex');
 lines.push(`${hash}  ./${relative(root.pathname,file).replaceAll('\\','/')}`);
}
await writeFile(new URL(`../${output}`,import.meta.url),`${lines.join('\n')}\n`);
