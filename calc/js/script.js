'use strict';

// window.addEventListener('DOMContentLoaded', () => {
let inputRub = document.querySelector('#rub'),
inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    
    request.open(
        'GET',
        'js/current.json',
        // async,
        // login,
        // pass
    );
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    // request.addEventListener('readystatechange', () => {
    request.addEventListener('load', () => {
        // if(request.readyState === 4 && request.status === 200){
        if(request.status === 200){
            console.log(request.response);
            let data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / +data.current.usd).toFixed(2);
        } else {
            inputUsd.value = 'Что-то пошло не так';
        }
    });




});
// });


