const cache_name = "v1_cache_appPWA";
const urlsToCache = [
  "./",
  "https://fonts.gstatic.com",
  "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap",
  "css/general.css",
  "js/main.js",
  "img/logoPWA.svg",
  "img/logoPWA.png",
  "img/logoPWA(1).png",
  "img/logoPWA(2).png",
  "img/logoPWA(3).png"
];


self.addEventListener("install" , (e)=>{
    e.waitUntil(
        caches.open(cache_name)
        .then( cache => {
            return cache.addAll(urlsToCache)
            .then(()=> self.skipWaiting())
        })
        .catch( err => console.log("Error registro de cache", err))
    )
});

self.addEventListener("activate", (e)=>{
    
    const copyCache = [cache_name] ;

     e.waitUntil(
         caches.keys()
         .then(cachesNames=> {
            cachesNames.map(cacheName=>{
               if(copyCache.indexOf(cacheName) === -1){
                   return caches.delete(cacheName);
               }
            }) 
         })

         .then(()=> self.clients.claim())
     )
});


self.addEventListener("fetch", (e)=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }

            return fetch(e.request)
        })
    )
});