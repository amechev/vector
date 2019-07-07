"use strict";

(function () {
    const SCROLL_BTN = document.querySelector('.scroll-down');
    const SCROLL_BTN_MOB = document.querySelector('.scroll-down-mobile');
    const MAIN = document.querySelector('.main');
    const HEADER = document.querySelector('.global-header');
    const OPEN_MENU = document.querySelector('.open-menu');
    const CLOSE_MENU = document.querySelector('.close-menu');
    const MOBILE_NAV = document.querySelector('.mobile-nav');
    const OVERLAY = document.querySelector('.overlay');

    const HIDDEN = 'hidden';

    if (SCROLL_BTN) {
        SCROLL_BTN.addEventListener('click', onScrollHeader);
    }

    if (SCROLL_BTN_MOB) {
        SCROLL_BTN_MOB.addEventListener('click', onScrollMain);
    }

    OPEN_MENU.addEventListener('click', onMenuOpen);
    CLOSE_MENU.addEventListener('click', onMenuClose);
    OVERLAY.addEventListener('click', onMenuClose);

    function onScrollHeader () {
        HEADER.scrollIntoView({block: "start", behavior: "smooth"});
    }

    function onScrollMain () {
        MAIN.scrollIntoView({block: "start", behavior: "smooth"});
    }

    function onMenuOpen () {
        OPEN_MENU.classList.add(HIDDEN);
        CLOSE_MENU.classList.remove(HIDDEN);
        MOBILE_NAV.classList.remove(HIDDEN);
    }

    function onMenuClose () {
        OPEN_MENU.classList.remove(HIDDEN);
        CLOSE_MENU.classList.add(HIDDEN);
        MOBILE_NAV.classList.add(HIDDEN);
    }

    let gallery = document.getElementById('gallery');
    if (gallery) {
        lightGallery(document.getElementById('gallery'), {
            thumbnail: true,
            animateThumb: false,
            showThumbByDefault: false
        });
    }

})();
