import { makeActiveButton, makeLoadingButton } from './helpers.js';

const uploadForms = document.querySelectorAll('.file-upload');
for (const uploadForm of uploadForms) {
    uploadForm.addEventListener('submit', uploadImage);
}

async function uploadImage(event) {
    event.preventDefault();

    let submitButton = this.querySelector('button');
    makeLoadingButton(submitButton);

    let response = await fetch('/ucet/aktivity', {
        method: 'PUT',
        body: new FormData(this),
    });

    if (response.ok) {
        let data = await response.json();
        const imageToChange = document.querySelector(`#activity-${data.activityEvidence.activityId} .activity-card__image`);
        imageToChange.src = data.secure_url;
        imageToChange.classList.remove('activity-card__image--empty');

        const stateToChange = document.querySelector(`#activity-${data.activityEvidence.activityId}-state`);
        stateToChange.innerHTML = '<span style="color: orange; font-weight: 700;">Čaká na kontrolu</span>';

        const fileLabel = this.querySelector('.file-upload__label');
        fileLabel.innerHTML = '<span class="fas fa-edit mr-05"></span>Uprav fotku';
        makeActiveButton(submitButton);
        submitButton.classList.add('file-upload__button--hidden');
    } else {
        makeActiveButton(submitButton);
    }

}

const fileInputs = document.querySelectorAll('.file-upload__input');

for (const fileInput of fileInputs) {
    fileInput.addEventListener('change', showFileDetails);
}

function showFileDetails(event) {
    const fileLabel = this.form.querySelector('.file-upload__label');
    fileLabel.textContent = this.files[0].name;
    const submitButton = this.form.querySelector('button');
    submitButton.classList.remove('file-upload__button--hidden');
}