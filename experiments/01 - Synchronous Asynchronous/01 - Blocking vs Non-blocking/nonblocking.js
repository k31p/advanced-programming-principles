const fs = require('fs');
console.time('Non-Blocking I/O Time');

for (let i = 0; i < 10; i++) {
    console.time(`Read ${i + 1}`);
    fs.readFile('01 - Blocking vs Non-blocking/largefile.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.timeEnd(`Read ${i + 1}`);
        console.log(`Read ${i + 1}:`, data.length, 'characters');
    });
}

console.timeEnd('Non-Blocking I/O Time');
