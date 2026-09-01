const C='ah-lights-v5-ocr';
const CORE=['./','./index.html','./manifest.webmanifest','./ah-lights-logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
   if(resp.ok){const copy=resp.clone();caches.open(C).then(c=>c.put(e.request,copy)).catch(()=>{});} return resp;
 }).catch(()=>caches.match('./index.html'))));
});
