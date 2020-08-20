"use strict";

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';


window.addEventListener('DOMContentLoaded', () => {
    // let tabs = require('./modules/tabs'),
    //     modal = require('./modules/modal'),
    //     timer = require('./modules/timer'),
    //     cards = require('./modules/cards'),
    //     calc = require('./modules/calc'),
    //     forms = require('./modules/forms'),
    //     slider = require('./modules/slider');


    tabs();
    modal('[data-modal]', '.modal');
    timer();
    cards();
    calc();
    forms();
    slider();




    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    
});



// function q(name, age){
//     this.name = name;
//     this.age = age;
//     this.namesay = () => {
//         console.log(`Привет, ${this.name}`);
//     }
// }


// let ivan = new q('Иван', '28');
// q.prototype.namesay = function(){
//     console.log(`Привет!, ${this.name}`);
// }
// ivan.namesay();


// function say(age, gender){
//     console.log(this.firstname);
//     console.log(this.lastname);
//     console.log(age, gender);
// }

// say.call({firstname: 'Вася'}, {lastname: 'Пупкин'}, '321', '28', 'М');

// let obj = {
//     num: 5,
//     sayNumber: function(){
//         let say = () => {
//             console.log(this.num);
//         }
//         say();
//     }
// }

// obj.sayNumber();

