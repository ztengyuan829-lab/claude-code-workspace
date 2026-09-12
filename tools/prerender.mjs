// index.html の #app に、DEFAULT_DATA から組み立てた初期マークアップを書き出す。
// app-code を編集したら node tools/prerender.mjs を実行する。
import fs from 'fs';
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
const m = s.match(/<script id="app-code">\n([\s\S]*?)\n<\/script>/);
if (!m) { console.error('app-code not found'); process.exit(1); }
// ページ上で保存された内容(#site-data)があればそれを、なければコード内の既定値を使う。
const data = s.match(/<script id="site-data" type="application\/json">([\s\S]*?)<\/script>/);
const render = new Function(m[1] + '\nreturn globalThis.__PRERENDER__;')();
const html = data ? render(JSON.parse(data[1].replace(/\\u003c/g, '<'))) : render();
const slot = /<div id="app">[\s\S]*?<\/div>\n<noscript>/;
if (!slot.test(s)) { console.error('#app block not found'); process.exit(1); }
s = s.replace(slot, '<div id="app">' + html + '</div>\n<noscript>');
fs.writeFileSync(p, s);
console.log('prerendered', html.length, 'chars');
