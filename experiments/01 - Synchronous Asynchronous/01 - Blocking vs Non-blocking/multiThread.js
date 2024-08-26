// multiThread.js
const { Worker } = require('worker_threads');

console.time('multiThread');

// Fungsi untuk membuat dan menjalankan worker thread dengan index
function runWorker(index) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: { index }  // Mengirimkan index ke worker
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function runAllTasks() {
  const workers = [];
  for (let i = 0; i < 10; i++) {  // Membuat 4 worker thread dengan index yang berbeda
    workers.push(runWorker(i+1));
  }
  
  const results = await Promise.all(workers);
  results.forEach((result, index) => {
    console.log(`Result of task ${index + 1}:`, result);
  });
}

runAllTasks().then(() => {
  console.timeEnd('multiThread');
});
