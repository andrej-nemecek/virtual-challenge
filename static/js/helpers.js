export function makeLoadingButton(submitButton) {
    let loadingIcon = document.createElement('span');
    submitButton.disabled = true;
    loadingIcon.className = 'fas fa-spinner fa-spin fa-lg ml-05';
    submitButton.append(loadingIcon);
}

export function makeActiveButton(submitButton) {
    let loadingIcon = submitButton.querySelector('.fa-spinner');
    submitButton.disabled = false;
    loadingIcon.remove();
}

function clearOldErrorAlerts() {
    const errorAlerts = document.querySelectorAll('.alert--error');

    for (const errorAlert of errorAlerts) {
        errorAlert.remove();
    }
}

export function makeFormErrorMessage(submitButton, errorResponse) {
    clearOldErrorAlerts();

    for (const errorMessage of errorResponse.statusMessages) {
        let errorElement = document.createElement('div');
        errorElement.className = 'alert alert--error mb-05';
        errorElement.innerHTML = `<span class="fas fa-times fa-lg mr-05"></span>${errorMessage}`;
        submitButton.before(errorElement);
    }
}

export function redirectAfterLogin() {
    const urlQuery = new URLSearchParams(window.location.search);
    const returnTo = urlQuery.get('returnTo');

    if (returnTo) {
        window.location.href = returnTo;
    } else {
        window.location.href = '/ucet/vyzvy';
    }
}

export function appendReturnToQuery(linkElement) {
    const urlQuery = new URLSearchParams(window.location.search);
    const returnTo = urlQuery.get('returnTo');

    if (returnTo) {
        let hrefUrl = new URL(linkElement.href);
        hrefUrl.searchParams.set('returnTo', returnTo);
        linkElement.href = hrefUrl.href;
    }
}