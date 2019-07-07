"use strict";

(function () {
    const FORM = document.querySelector('.form-calc');
    const INPUT = document.querySelector('.input-long');
    const BUTTON = document.querySelector('.button');
    const RESULT = document.querySelector('.result');
    const SUM = document.querySelector('.sum-num');
    const TIMEOUT = 10000;
    const SUM_URL = 'Сюда засунь урл';

    const HIDDEN = 'hidden';
    const DEBOUNCE_INTERVAL = 500;

    function debounce (callback) {
        var lastTimeout = null;

        return function () {
            var parameters = arguments;
            if (lastTimeout) {
                window.clearTimeout(lastTimeout);
            }
            lastTimeout = window.setTimeout(function () {
                callback.apply(null, parameters);
            }, DEBOUNCE_INTERVAL);
        };
    }

    FORM.addEventListener('submit', onSubmitForm);
    INPUT.addEventListener('keydown', debounce(function () {
        if (INPUT.value.length > 0) {
            BUTTON.removeAttribute('disabled');
        } else {
            BUTTON.setAttribute('disabled', true);
        }
    }));

    function onSubmitForm  (evt) {
        let formData = new FormData(evt.target);

        getSum(SUM_URL, formData, onSuccess, onError);
        evt.preventDefault();
    }

    function onSuccess (result) {
        RESULT.classList.remove(HIDDEN);
        RESULT.scrollIntoView({block: "center", behavior: "smooth"});
        SUM.innerText = result;
    }

    function onError () {
        console.log('Какая то ошибка    ')
    }

    function getSum (url, data, onLoad, onError) {
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

        xhr.open('GET', url);
        xhr.send(data);
    };
})();
