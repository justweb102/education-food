import {getResource} from '../services/services';

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


// module.exports = cards;
export default cards;