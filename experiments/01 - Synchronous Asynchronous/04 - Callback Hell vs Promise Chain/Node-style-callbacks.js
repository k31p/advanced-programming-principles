function fetchData(callback) {
    // Simulasi operasi asinkron
    setTimeout(() => {
        const error = null; // Atau error = 'Something went wrong';
        const data = 'Data fetched';
        callback(error, data);
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
});
