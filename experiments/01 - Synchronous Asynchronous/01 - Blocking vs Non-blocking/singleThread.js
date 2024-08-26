// singleThread.js
console.time('singleThread');

// Fungsi CPU-bound, seperti perhitungan besar
function heavyComputation(index) {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }
  return sum*index;
}

function runAllTasks() {
  for (let i = 0; i < 10; i++) {  // Menjalankan 4 tugas secara berurutan
    console.log(`Result of task ${i + 1}:`, heavyComputation(i+1));
  }
}

runAllTasks();
console.timeEnd('singleThread');
