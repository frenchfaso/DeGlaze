function deglaze() {
    var netWeight = document.getElementById('netWeight').value;
    var glazePercent = document.getElementById('glazePercent').value;
    var grossWeight = netWeight / (1 - glazePercent / 100);
    document.getElementById('grossWeight').textContent = Math.round(grossWeight);
    console.log("DeGlazed!");
}

document.getElementById('mainForm').addEventListener('submit', function (event) {
    event.preventDefault();
    deglaze();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // Registration failed
            console.log('ServiceWorker registration failed: ', err);
        });
    });
} else {
    console.log('ServiceWorker not available.');
}