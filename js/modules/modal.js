let modalOpenFunc = (modalSelector) => {
    let modal = document.querySelector(modalSelector);
    
    // console.log(e.target.classList);
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    // clearTimeout(modalTimerStart);
};

let modalCloseFunc = (modalSelector) => {
    let modal = document.querySelector(modalSelector);
    
    // modal.style.display = 'none';
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
};


function modal(triggerSelector, modalSelector){
    // modal

    let modal = document.querySelector(modalSelector),
        modalOpenBtn = document.querySelectorAll(triggerSelector);
        // modalCloseBtn = document.querySelector('[data-close]');

    modalOpenBtn.forEach(item => {
        item.addEventListener('click', () => modalOpenFunc(modalSelector));
    });


    // modalCloseBtn.addEventListener('click', modalCloseFunc);
    

    modal.addEventListener('click', e => {
        // if(e.target.classList.contains('modal')){
        if(e.target.classList.contains('modal') || e.target.getAttribute('data-close') == ''){
            modalCloseFunc(modalSelector);
        }
    });


    document.addEventListener('keydown', e => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            modalCloseFunc(modalSelector);
        }
    });





    // let modalTimerStart = setTimeout(modalOpenFunc, 3000);
    // let modalTimerStart = setTimeout(() => {
    //     modalOpenFunc();
    // }, 3000);


    let modalShowByScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modalOpenFunc(modalSelector);
            window.removeEventListener('scroll', modalShowByScroll);
        }
    }


    window.addEventListener('scroll', modalShowByScroll);
}


// module.exports = modal;
export default modal;
export {modalOpenFunc};
export {modalCloseFunc};