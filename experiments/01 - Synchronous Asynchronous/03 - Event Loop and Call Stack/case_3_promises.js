'use strict';

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
Promise.resolve().then(second);
third();
