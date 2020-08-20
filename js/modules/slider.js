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


// module.exports = slider;
export default slider;