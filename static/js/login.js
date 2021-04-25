import { makeActiveButton, makeFormErrorMessage, makeLoadingButton, redirectAfterLogin, appendReturnToQuery } from './helpers.js';

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', createAccount);

async function createAccount(event) {
    event.preventDefault();

    let submitButton = document.querySelector('#login-form button');
    makeLoadingButton(submitButton);

    let response = await fetch('/prihlasenie', {
        method: 'POST',
        body: new FormData(loginForm),
    });

    if (response.ok) {
        redirectAfterLogin();
    } else {
        const errorResponse = await response.json();
        makeActiveButton(submitButton);
        makeFormErrorMessage(submitButton, errorResponse);
    }
}

const linkToRegistation = document.querySelector('#registration-link');
if (linkToRegistation) {
    appendReturnToQuery(linkToRegistation);
}