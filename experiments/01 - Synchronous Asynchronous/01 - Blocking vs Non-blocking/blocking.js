const fs = require('fs');
console.time('Blocking I/O Time');

for (let i = 0; i < 10; i++) {
    console.time(`Read ${i + 1}`);
    const data = fs.readFileSync('largefile.txt', 'utf8');
    console.timeEnd(`Read ${i + 1}`);
    console.log(`Read ${i + 1}:`, data.length, 'characters');
}

console.timeEnd('Blocking I/O Time');
