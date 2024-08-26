'use strict';

console.time('Synchronous');

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
second();
third();

console.timeEnd('Synchronous');