 if("serviceWorker" in navigator){
     navigator.serviceWorker.register("js/sw.js")
     .then( reg => console.log("Registrado de SW exitoso", reg))
     .catch( err => console.warn("Error ejecutando el SW",err))
 }