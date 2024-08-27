const { Worker } = require('worker_threads');

function runWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');
        worker.on('message', (message) => {
            resolve(message);
        });
        worker.on('error', (error) => {
            reject(error);
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

console.log('Starting Worker...');
runWorker()
    .then(result => {
        console.log('Worker finished with result:', result);
    })
    .catch(err => {
        console.error('Worker failed:', err);
    });

// Event loop check to demonstrate it's not blocked
setInterval(() => {
    console.log('Main thread is still running...');
}, 1000);
