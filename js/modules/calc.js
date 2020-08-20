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