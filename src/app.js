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
document.getElementById('netWeight').addEventListener('change', deglaze);
document.getElementById('glazePercent').addEventListener('change', deglaze);


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

            // Ensure the service worker is ready and then send a message
            navigator.serviceWorker.ready.then(function (registration) {
                // Check if there's an active service worker
                if (navigator.serviceWorker.controller) {
                    // Send a message to the service worker to get the cache name or any other info
                    navigator.serviceWorker.controller.postMessage('getCacheName');
                }

                // Listen for messages from the service worker
                navigator.serviceWorker.addEventListener('message', function (event) {
                    const version = event.data.cacheName;
                    const elVer = document.getElementById("version");
                    elVer.innerText = version
                });
            });

        }, function (err) {
            // Registration failed
            console.log('ServiceWorker registration failed: ', err);
        });
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // Notify users or reload the page
            console.log('New service worker has taken control');
            //alert('A new version of this web app is available. Please refresh the page.');
            // Reload the page automatically
            window.location.reload();
        });
    });
} else {
    console.log('ServiceWorker not available.');
}