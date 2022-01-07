importScripts('http://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')

workbox.routing.registerRoute(
    ({request}) => request.destination === "image",
    new workbox.strategies.NetworkFirst()
    
)