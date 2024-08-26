'use strict';

console.time('Kombinasi');

function first() {
    console.log('First');
}

function second() {
    console.log('Second');
}

function third() {
    console.log('Third');
}

function fourth() {
    console.log('Fourth');
}

first();

setTimeout(() => {
    console.time('setTimeout Callback');
    fourth();
    console.timeEnd('setTimeout Callback');
}, 0);

Promise.resolve().then(() => {
    console.time('Promise then Callback');
    second();
    console.timeEnd('Promise then Callback');
});

third();

console.timeEnd('Kombinasi');
