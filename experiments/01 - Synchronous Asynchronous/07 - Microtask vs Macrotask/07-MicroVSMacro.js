console.log("Start of Test"); // kode synchronous

setTimeout(() => {
    console.log("Macrotask - Tested")}); // Macrotask - asynchronous

let promiseTask = new Promise((resolve, reject) => {resolve();})

promiseTask.then(() => {
    console.log("Microtask - Tested")}); // Microtask - asynchronous

console.log("End of Test"); // kode synchronous