import Swiper from './swiper-bundle.esm.browser.min.js';

const swiper = new Swiper('.swiper-container', {
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});