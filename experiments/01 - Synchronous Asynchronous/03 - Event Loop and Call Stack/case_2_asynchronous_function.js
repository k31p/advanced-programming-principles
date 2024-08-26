'use strict';

console.time('Asynchronous setTimeout');

function first() {
    console.log('First');
}

function second() {
    console.log('Second');
}

function third() {
    console.log('Third');
}

first();
setTimeout(() => {
    console.time('setTimeout Callback');
    second();
    console.timeEnd('setTimeout Callback');
}, 0);
third();

console.timeEnd('Asynchronous setTimeout');
