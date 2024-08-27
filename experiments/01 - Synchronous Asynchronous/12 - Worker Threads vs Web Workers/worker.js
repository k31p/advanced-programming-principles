const { parentPort } = require('worker_threads');

let count = 0;

// Simulate heavy computation
for (let i = 0; i < 1e9; i++) {
    count += i;
}

parentPort.postMessage(count);
