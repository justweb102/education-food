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


// module.exports = tabs;
export default tabs;