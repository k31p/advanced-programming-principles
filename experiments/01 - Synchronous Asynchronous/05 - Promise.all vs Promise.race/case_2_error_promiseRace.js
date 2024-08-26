const myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 1 rejected');
    }, 250);
});

const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    }, 500);
});

const myPromise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 3 resolved');
    }, 1000);
});

const myPromises = [myPromise1, myPromise2, myPromise3];

Promise.race(myPromises)
    .then((res) => {console.log(res);})
    .catch((err) => {console.log("Error!");});