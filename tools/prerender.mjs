// site/index.html の #app に、DEFAULT_DATA から組み立てた初期マークアップを書き出す。
// app-code を編集したら node tools/prerender.mjs を実行する。
import fs from 'fs';
const p = 'site/index.html';
let s = fs.readFileSync(p, 'utf8');
const m = s.match(/<script id="app-code">\n([\s\S]*?)\n<\/script>/);
if (!m) { console.error('app-code not found'); process.exit(1); }
const html = new Function(m[1] + '\nreturn globalThis.__PRERENDER__;')()();
const before = s;
s = s.replace(/<div id="app">[\s\S]*?<\/div>\n<noscript>/, '<div id="app">' + html + '</div>\n<noscript>');
if (s === before) { console.error('#app block not found'); process.exit(1); }
fs.writeFileSync(p, s);
console.log('prerendered', html.length, 'chars');
