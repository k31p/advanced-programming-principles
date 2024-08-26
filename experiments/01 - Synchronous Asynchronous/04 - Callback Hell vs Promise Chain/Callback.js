function fetchData(callback) {
    setTimeout(() => {
        console.log('Data fetched');
        callback();
    }, 1000);
}

function processData(callback) {
    setTimeout(() => {
        console.log('Data processed');
        callback();
    }, 1000);
}

function displayData(callback) {
    setTimeout(() => {
        console.log('Data displayed');
        callback();
    }, 1000);
}

// Menjalankan fungsi secara berurutan
fetchData(() => {
    processData(() => {
        displayData(() => {
            console.log('All done!');
        });
    });
});