import { makeActiveButton, makeLoadingButton, redirectAfterLogin, appendReturnToQuery, makeFormErrorMessage } from './helpers.js';

const registrationForm = document.querySelector('#registration-form');
registrationForm.addEventListener('submit', createAccount);

async function createAccount(event) {
    event.preventDefault();

    let submitButton = document.querySelector('#registration-form button');
    makeLoadingButton(submitButton);

    let response = await fetch('/registracia', {
        method: 'POST',
        body: new FormData(registrationForm),
    });

    if (response.ok) {
        redirectAfterLogin();
    } else {
        const errorResponse = await response.json();
        makeActiveButton(submitButton);
        makeFormErrorMessage(submitButton, errorResponse);
    }
}

const linkToLogin = document.querySelector('#login-link');
if (linkToLogin) {
    appendReturnToQuery(linkToLogin);
}
