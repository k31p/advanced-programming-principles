// worker.js
const { parentPort, workerData } = require('worker_threads');

function heavyComputation(index) {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }
  return sum * index;
}

// workerData berisi nilai index yang dikirim dari main thread
parentPort.postMessage(heavyComputation(workerData.index));
