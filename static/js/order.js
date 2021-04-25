import { makeActiveButton, makeLoadingButton, makeFormErrorMessage } from './helpers.js';

const submitButton = document.querySelector('#submit-order');
submitButton.addEventListener('click', submitOrder);

async function submitOrder(event) {
    makeLoadingButton(submitButton);

    let response = await fetch(`/objednavka/vyzva/${submitButton.dataset.challengeId}`, {
        method: 'POST',
    });

    if (response.ok) {
        let responseBody = await response.json();
        window.location.href = responseBody.redirect;
        makeActiveButton(submitButton);
    } else {
        const errorResponse = await response.json();
        makeActiveButton(submitButton);
        makeFormErrorMessage(submitButton, errorResponse);
    }
}