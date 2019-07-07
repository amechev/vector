"use strict";

(function () {
    const SUCCESS_DIALOG = document.querySelector('.form-success');
    const CLOSE_SUCCESS = document.querySelector('.close-success');
    const OVERLAY = document.querySelector('.overlay');
    const FORM = document.querySelector('.form-question');
    const TIMEOUT = 10000;
    const QUESTION_URL = 'Сюда засунь урл';

    const HIDDEN = 'hidden';

    OVERLAY.addEventListener('click', onSuccessClose);
    CLOSE_SUCCESS.addEventListener('click', onSuccessClose);

    FORM.addEventListener('submit', onSubmitForm);

    function onSuccessClose () {
        SUCCESS_DIALOG.classList.add(HIDDEN);
    }

    function onSubmitForm  (evt) {
        let formData = new FormData(evt.target);
        let isFormValid = validateFormData(formData);

        if (!isFormValid) {
            evt.preventDefault();
        }

        sendQuestion(QUESTION_URL, formData, onSuccess, onError);
        evt.preventDefault();
    }

    function onSuccess () {
        SUCCESS_DIALOG.classList.remove(HIDDEN);
    }

    function onError () {
        SUCCESS_DIALOG.classList.remove(HIDDEN);
        console.log('Какая то ошибка    ')
    }

    function validateFormData () {
        return true;
    }

    function sendQuestion (url, data, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = TIMEOUT;

        xhr.open('POST', url);
        xhr.send(data);
    };
})();
