// request permission
Notification.requestPermission((status)=>{
    console.log('Notification permission : ',status);
});


// ketika klik button show notification
document.getElementById('show-notification')
    .addEventListener('click', showNotification);

function showNotification() {
    if (Notification.permission === 'granted'){
        navigator.serviceWorker.getRegistration()
            .then((reg) => {
                var options = {
                    body : 'Ini body notifikasi',
                    vibrate : [100,50,100],
                    data: {
                        dateOfArrival : Date.now(),
                        primaryKey : 1,
                    },actions: [
                        {action : 'explore',title: 'Kunjungi Situs'},
                        {action: 'close',title: 'Tutup'}
                    ]
                };
                reg.showNotification('Ini Notif',options);
            })
    }
}

// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg)=>{
                return navigator.serviceWorker.ready;
            }).then((reg)=>{
                document.getElementById('load-in-bg')
                    .addEventListener('click',()=>{
                        reg.sync.register('image-fetch').then(()=>{
                            console.log('sync registered');
                        }).catch((err) => {
                            console.log('fetch Error : ', err);
                        })
                    })
        }).catch((err) => {
            console.log('unable to register service worker',err);
        })
    })
}
