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