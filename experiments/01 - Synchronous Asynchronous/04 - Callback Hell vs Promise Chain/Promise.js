function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Data fetched');
            resolve();
        }, 1000);
    });
}

function processData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Data error');
            resolve();
        }, 1000);
    });
}

function displayData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Data displayed');
            resolve();
        }, 1000);
    });
}

// Menjalankan fungsi secara berurutan dengan promise chain
fetchData()
    .then(() => processData())
    .then(() => displayData())
    .then(() => {
        console.log('All done!');
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });

// Menjalankan fungsi sesuai promise states
// fetchData()
//     .then(() => processData())
//     .then(() => displayData())
//     .then(data => {
//         console.log('Data:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     })
//     .finally(() => {
//         console.log('Operation complete');
//     });

