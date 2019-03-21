self.addEventListener('notificationclick', (e) => {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
    console.log('notification Primary key : '+primaryKey+' was clicked');
    if (action === 'close'){
        notification.close();
    } else{
        clients.openWindow('http://google.com');
        notification.close();
    }
});

self.addEventListener('install', (event) => {
    self.skipWaiting();
})

self.addEventListener('activate',(event) => {
    if (self.clients && clients.claim){
        clients.claim();
    }
})

self.addEventListener('sync',  (event) => {
    console.log('firing sync');
    if (event.tag === 'image-fetch'){
        console.log('sync event fired');
        event.waitUntil(fetchImage());
    }
});

function fetchImage() {
    console.log('firing : fetch images');
    fetch('/images/ugm.png').then((res) => {
        return res;
    }).then( (text) => {
        console.log('request success ', text);
    }).catch((err) => {
        console.log('request failed', err);
    })
}