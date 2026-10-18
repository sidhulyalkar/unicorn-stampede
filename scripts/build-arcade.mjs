// Host-independent Arcade ZIP: root index.html plus exactly the game's local resources.
// Stable entry ordering/timestamps; no js13k byte pruning or CDN dependency at build time.
import fs from 'node:fs';
import path from 'node:path';
import {deflateRawSync,inflateRawSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=process.cwd(),out=path.join(root,'dist/arcade/unicorn-stampede-arcade.zip');
const names=new Set(['index.html']);
const safeName=(s,owner='index.html')=>{
  const raw=s.split(/[?#]/)[0].replaceAll(String.fromCharCode(92),'/');
  if(!raw||/^(?:https?:|data:|blob:|\/|#)/i.test(raw))return null;
  const name=path.posix.normalize(path.posix.join(path.posix.dirname(owner),raw));
  if(name==='..'||name.startsWith('../')||name.startsWith('/'))throw Error('unsafe Arcade resource path: '+s);
  return name;
};
function addResource(s,owner){const n=safeName(s,owner);if(n)names.add(n)}
const html=fs.readFileSync('index.html','utf8');
for(const m of html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)\s*=\s*["']([^"']+)["']/gi))addResource(m[1]);
for(const name of [...names]){
  if(!name.endsWith('.css'))continue;
  const css=fs.readFileSync(path.join(root,name),'utf8');
  for(const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi))addResource(m[1].trim(),name);
}
const files=[...names].sort(),MB=1024*1024;
if(files.length>160)throw Error('Arcade file-count cap exceeded: '+files.length);
let total=0;const entries=[];
let crcTable=Array.from({length:256},(_,n)=>{for(let j=0;j<8;j++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0});
function crc32(b){let x=0xffffffff;for(const v of b)x=crcTable[(x^v)&255]^(x>>>8);return (x^0xffffffff)>>>0}
for(const name of files){
  const abs=path.join(root,name),stat=fs.statSync(abs);
  if(!stat.isFile())throw Error('Arcade resource is not a file: '+name);
  if(stat.size>64*MB)throw Error('Arcade per-file cap exceeded: '+name);
  total+=stat.size;if(total>250*MB)throw Error('Arcade total cap exceeded');
  const data=fs.readFileSync(abs);
  entries.push({name,data,packed:deflateRawSync(data,{level:9}),crc:crc32(data)});
}
const chunks=[],central=[];let offset=0;
for(const f of entries){
  const filename=Buffer.from(f.name,'utf8'),local=Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);
  local.writeUInt16LE(8,8);local.writeUInt16LE(33,12); // Deflate; 1980-01-01
  local.writeUInt32LE(f.crc,14);local.writeUInt32LE(f.packed.length,18);local.writeUInt32LE(f.data.length,22);
  local.writeUInt16LE(filename.length,26);
  const c=Buffer.alloc(46);
  c.writeUInt32LE(0x02014b50,0);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);
  c.writeUInt16LE(8,10);c.writeUInt16LE(33,14);
  c.writeUInt32LE(f.crc,16);c.writeUInt32LE(f.packed.length,20);c.writeUInt32LE(f.data.length,24);
  c.writeUInt16LE(filename.length,28);c.writeUInt32LE(offset,42);
  chunks.push(local,filename,f.packed);central.push(c,filename);
  offset+=local.length+filename.length+f.packed.length;
}
const cd=Buffer.concat(central),end=Buffer.alloc(22);
end.writeUInt32LE(0x06054b50,0);
end.writeUInt16LE(files.length,8);end.writeUInt16LE(files.length,10);
end.writeUInt32LE(cd.length,12);end.writeUInt32LE(offset,16);
const zip=Buffer.concat([...chunks,cd,end]);
// Verify the actual ZIP bytes, not merely the buffer source used to create them.
let p=offset;
for(const f of entries){
  if(zip.readUInt32LE(p)!==0x02014b50)throw Error('invalid central directory');
  const n=zip.readUInt16LE(p+28),stored=zip.subarray(p+46,p+46+n).toString();
  const at=zip.readUInt32LE(p+42),start=at+30+zip.readUInt16LE(at+26);
  const inflated=inflateRawSync(zip.subarray(start,start+zip.readUInt32LE(at+18)));
  if(stored!==f.name||crc32(inflated)!==f.crc||!inflated.equals(f.data))throw Error('bad ZIP member '+f.name);
  p+=46+n;
}
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,zip);
const digest=createHash('sha256').update(zip).digest('hex');
fs.writeFileSync(path.join(path.dirname(out),'manifest.json'),JSON.stringify({
  product:'Unicorn Stampede post-js13k Arcade showcase',files,uncompressedBytes:total,
  archiveBytes:zip.length,sha256:digest
},null,2)+'\n');
console.log('Arcade ZIP:',out,'| files:',files.length,'| bytes:',zip.length,'| SHA-256:',digest);
