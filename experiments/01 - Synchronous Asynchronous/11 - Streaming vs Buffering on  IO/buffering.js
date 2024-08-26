const fs = require('fs');

console.log('Initial Memory Usage:', process.memoryUsage());

console.time('Buffer Time');

fs.readFile('dummyfile.txt', (err, data) => {
    if (err) throw err;

    fs.writeFile('outputFile_buffer.txt', data, (err) => {
        if (err) throw err;
        console.log('Final Memory Usage:', process.memoryUsage());
        console.timeEnd('Buffer Time');
    });
});
