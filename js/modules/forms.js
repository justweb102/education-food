import {modalOpenFunc} from './modal';
import {modalCloseFunc} from './modal';

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


// module.exports = forms;
export default forms;