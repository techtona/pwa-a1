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
                        {action : 'explore',title: 'Kunjungi'},
                        {action: 'close',title: 'Tutup'}
                    ]
                };
                reg.showNotification('Ini Notif',options);
            })
    }
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            (reg) => {
                console.log('SW registration success');
            }, (err) => {
                console.log('SW registration failed');
            }
        )
    })
}
