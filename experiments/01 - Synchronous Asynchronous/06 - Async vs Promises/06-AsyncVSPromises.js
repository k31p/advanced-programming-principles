function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 1000);
    });
}

function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${data} processed`);
        }, 1000);
    });
}

function saveData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${data} saved`);
        }, 1000);
    });
}

fetchData()
    .then(data => processData(data))
    .then(processedData => saveData(processedData))
    .then(result => console.log(result))
    .catch(error => console.error(error));

async function handleData() {
    try {
        const data = await fetchData();
        const processedData = await processData(data);
        const result = await saveData(processedData);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

handleData();
