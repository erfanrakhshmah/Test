const C='nk2-v4';
const PRE=['./','index.html','manifest.json','core.js','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png','vazirmatn.woff2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  const q=e.request,u=new URL(q.url);
  if(q.method!=='GET'||q.headers.has('range'))return;
  if(u.origin!==location.origin&&!/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))return;
  e.respondWith((async()=>{
    const c=await caches.open(C),hit=await c.match(q,{ignoreSearch:true});
    try{
      const r=await (hit?Promise.race([fetch(q),new Promise((_,j)=>setTimeout(j,5000))]):fetch(q));
      if(r&&(r.ok||r.type==='opaque'))e.waitUntil(c.put(q,r.clone()).catch(()=>{}));
      return r;
    }catch(_){
      return hit||(q.mode==='navigate'&&await c.match('index.html'))||Response.error();
    }
  })());
});
