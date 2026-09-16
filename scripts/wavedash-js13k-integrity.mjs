import {execFileSync} from 'node:child_process';
import {statSync} from 'node:fs';

const BASE='ddfc0ec6fa516f3af3dc519355863c8051614fdb';
const ZIP_BLOB='c4bb95f3790bb7757c045e93ca6d6e194a551f9b';
const ZIP_BYTES=13203;
const protectedPaths=['src','index.html','dist/index.html','dist/unicorn-stampede.zip'];

execFileSync('git',['merge-base','--is-ancestor',BASE,'HEAD'],{stdio:'inherit'});
execFileSync('git',['diff','--exit-code',BASE,'--',...protectedPaths],{stdio:'inherit'});
const blob=execFileSync('git',['hash-object','dist/unicorn-stampede.zip'],{encoding:'utf8'}).trim();
if(blob!==ZIP_BLOB)throw new Error(`Competition ZIP blob changed: ${blob}`);
const bytes=statSync('dist/unicorn-stampede.zip').size;
if(bytes!==ZIP_BYTES)throw new Error(`Competition ZIP size changed: ${bytes}`);
console.log(`Competition integrity PASS: ${BASE}; ZIP ${bytes} bytes; protected gameplay/artifact paths unchanged.`);
