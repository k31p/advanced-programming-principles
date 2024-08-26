const fs = require('fs');

console.log('Initial Memory Usage:', process.memoryUsage());

console.time('Stream Time');

const readableStream = fs.createReadStream('dummyfile.txt');
const writableStream = fs.createWriteStream('outputFile_stream.txt');

readableStream.on('data', (chunk) => {
    writableStream.write(chunk);
});

readableStream.on('end', () => {
    console.log('Final Memory Usage:', process.memoryUsage());
    console.timeEnd('Stream Time');
    writableStream.end();
});
