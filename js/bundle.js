/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc(){
    // Калькулятор

    let result = document.querySelector('.calculating__result span'),
        sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : ('female', localStorage.setItem('sex', 'female')),
        ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : (1.375, localStorage.setItem('ratio', 1.375)),
        height, weight, age;

    let calcTotal = () => {
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return;
        }

        result.textContent =
            (!sex === 'female') ? 
            Math.round((447.6 + (9.2 * weight) + (3.1 * height) - 4.3 * age) * ratio) :
            Math.round((88.36 + (13.4 * weight) + (4.8 * height) - 5.7 * age) * ratio);

    }


    let initLocalSettings = (selector, activeClass) => {
        let elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            
            if(item.getAttribute('id') === localStorage.getItem('sex')){
                item.classList.add(activeClass);
            }
            
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                item.classList.add(activeClass);
            }
        });
    }


    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');



    calcTotal();


    let getStaticInformation = (selector, activeClass) => {
        let elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                // console.log(ratio, sex);
    
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });

        
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    
    let getDynamicInformation = selector => {
        let input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }


    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}


module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards(){
    // Используем классы для карточек

    class MenuCard {
        constructor(imgSrc, imgAlt, title, descr, price, parentSelector, ...classes){
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            // this.classes = classes.length === 0 || ['menu__item'];
            this.classes = classes.length === 0 ? ['menu__item'] : classes;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27; // курс валюты
            this.changeToUAH();

        }

        // конвертация валюты
        changeToUAH(){
            this.price = +this.price * this.transfer;
        }

        render(){
            let element = document.createElement('div');
            // console.log(this.classes);
            // if(this.classes.length === 0){
            //     this.element = 'menu__item';
            //     element.classList.add(this.element);
            // } else {
            // }
            this.classes.forEach(item => element.classList.add(item));

            element.innerHTML = `
                    <img src="${this.imgSrc}" alt="${this.imgAlt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;

            this.parentSelector.append(element);

        }
    }



    let getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Не могу fetch по адресу ${url}, статус ${res.status}`);
        }

        return await res.json();
    }


    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    //         });
    //     });


    

    let createCard = (data) => {
        data.forEach(({img, altimg, title, descr, price}) => {
            let element = document.createElement('div');
            element.classList.add('menu__item');

            element.innerHTML = `
                <img src="${img}" alt="${altimg}">
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    axios.get('http://localhost:3000/menu')
        .then(data => createCard(data.data));


    // let div = new MenuCard();
    // div.render();
    // new MenuCard(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     550,
    //     '.menu__field .container',
    //     // 'menu__item',
    //     // 'big'
    // ).render();

    // new MenuCard(
    //     'img/tabs/elite.jpg',
    //     'elite',
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     229,
    //     '.menu__field .container',
    //     'menu__item'
    // ).render();

    // new MenuCard(
    //     'img/tabs/post.jpg',
    //     'post',
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     430,
    //     '.menu__field .container',
    //     'menu__item'
    // ).render();
}


module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms(){
    // формы


    let forms = document.querySelectorAll('form');

    let message = {
        // loading: 'Загружается',
        loading: 'img/spinner.svg',
        success: 'Готово',
        failure: 'Ошибка'
    }



    let postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };



    let sender = form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let formData = new FormData(form);
            // вручную собираем объект
            // let formDataJson = {};
            // formData.forEach((value, key) => {
            //     formDataJson[key] = value;
            // });
            // formDataJson = JSON.stringify(formDataJson);

            // 1. данные, собраные из формы с помощью FormData - превращаем в массив массивов типа [ ["a", 23], ["b", 65] ]  -  formData.entries()
            // 2. Делаем из массива массивов объект  -  Object.fromEntries(....)
            // 3. Из объекта делаем нормальный JSON  -  JSON.stringify(....)
            let formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));
            
            

            // let statusMessage = document.createElement('div');
            // statusMessage.classList.add('status');
            // statusMessage.textContent = message.loading;
            let statusMessage = document.createElement('img');
            // statusMessage.src = message.loading;
            statusMessage.setAttribute('src', message.loading);
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
    

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: formDataJson
            // })
            postData('http://localhost:3000/requests', formDataJson)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

            // let ajaxRequest = new XMLHttpRequest();
            // ajaxRequest.open(
            //     'POST',
            //     'server.php'
            // );
                // ajaxRequest.setRequestHeader('Content-type', 'multipart/form-data');
            // ajaxRequest.setRequestHeader('Content-type', 'application/json');

                // ajaxRequest.send(formData);
            // ajaxRequest.send(formDataJson);
/*
            ajaxRequest.addEventListener('load', () => {
                if(ajaxRequest.status === 200){
                    console.log(ajaxRequest.response);
                    // statusMessage.textContent = message.success;
                    showThanksModal(message.success);
                    setTimeout(() => {
                        form.reset();
                        statusMessage.remove();
                    }, 2000);
                } else {
                    // statusMessage.textContent = message.failure;
                    showThanksModal(message.failure);
                }
            });
*/

        });
    }

    forms.forEach(item => {
        sender(item);
    });




    let showThanksModal = (message) => {
        let prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        modalOpenFunc();

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalCloseFunc();
        }, 4000);
    }
}


module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal(){
    // modal

    let modal = document.querySelector('.modal'),
        modalOpenBtn = document.querySelectorAll('[data-modal]');
        // modalCloseBtn = document.querySelector('[data-close]');

    let modalOpenFunc = () => {
        // console.log(e.target.classList);
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';

        // clearTimeout(modalTimerStart);
    };

    let modalCloseFunc = () => {
        // modal.style.display = 'none';
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    };



    modalOpenBtn.forEach(item => {
        item.addEventListener('click', modalOpenFunc);
    });


    // modalCloseBtn.addEventListener('click', modalCloseFunc);
    

    modal.addEventListener('click', e => {
        // if(e.target.classList.contains('modal')){
        if(e.target.classList.contains('modal') || e.target.getAttribute('data-close') == ''){
            modalCloseFunc();
        }
    });


    document.addEventListener('keydown', e => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalCloseFunc();
        }
    });





    // let modalTimerStart = setTimeout(modalOpenFunc, 3000);
    // let modalTimerStart = setTimeout(() => {
    //     modalOpenFunc();
    // }, 3000);


    let modalShowByScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalOpenFunc();
            window.removeEventListener('scroll', modalShowByScroll);
        }
    }


    window.addEventListener('scroll', modalShowByScroll);
}


module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider(){
    // Slider

    let slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    // формат с первым нулем
    total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(item => item.style.width = width);

    slider.style.position = 'relative';

    let dots = document.createElement('ol'),
        dots_arr = [];
    dots.classList.add('dots');
    // dots.style.
    slider.append(dots);

    for(let i=0; i<slides.length; i++){
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if(i == 0){
            dot.style.opacity = 1;
        }
        
        dots.append(dot);
        dots_arr.push(dot);
    }



    let deleteNotDigits = str => +str.replace(/\D/g, '');


    next.addEventListener('click', () => {
        // offset = offset == +width.slice(0, width.length - 2) * (slides.length - 1) ? 0 : offset + +width.slice(0, width.length - 2);
        // offset = offset == +width.replace(/\D/g, '') * (slides.length - 1) ? 0 : offset + +width.replace(/\D/g, '');
        offset = offset == deleteNotDigits(width) * (slides.length - 1) ? 0 : offset + deleteNotDigits(width);
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        slideIndex = slideIndex == slides.length ? 1 : slideIndex + 1;
        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

        dots_arr.forEach(item => item.style.opacity = '.5');
        dots_arr[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        // offset = offset == 0 ? +width.slice(0, width.length - 2) * (slides.length - 1) : offset - +width.slice(0, width.length - 2);
        // offset = offset == 0 ? +width.replace(/\D/g, '') * (slides.length - 1) : offset - +width.replace(/\D/g, '');
        offset = offset == 0 ? deleteNotDigits(width) * (slides.length - 1) : offset - deleteNotDigits(width);
        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex == 1 ? slides.length : slideIndex - 1;
        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

        dots_arr.forEach(item => item.style.opacity = '.5');
        dots_arr[slideIndex - 1].style.opacity = 1;
    });


    dots_arr.forEach(item => {
        item.addEventListener('click', e => {
            let slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            // offset = +width.replace(/\D/g, '') * (slideTo - 1);
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
            
            dots_arr.forEach(item => item.style.opacity = '.5');
            dots_arr[slideIndex - 1].style.opacity = 1;
        });
    });
}


module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs(){
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    let hideTabContent = () => {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    };

    let showTabContent = (i = 0) => {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };


    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        let target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(item == target){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}


module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer(){
    // timer

    let deadline = '2020-07-15';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - new Date(),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t / (1000*60*60)) % 24),
            minutes = Math.floor((t / (1000*60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    let setClock = (selector, endtime) => {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // console.log(seconds);

        updateClock();

        function updateClock(){
            let t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }


    function getZero(num){
        if(num >= 0 && num <10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    setClock('.timer', deadline);

}


module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', () => {
    let tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
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



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map