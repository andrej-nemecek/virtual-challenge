import { makeLoadingButton } from './helpers.js';

const editForm = document.querySelector('#edit-form');
editForm.addEventListener('submit', editPurchase);

async function editPurchase(event) {
    event.preventDefault();

    let submitButton = document.querySelector('#edit-form button');
    makeLoadingButton(submitButton);

    let response = await fetch(`/admin/purchase/${submitButton.dataset.purchaseId}`, {
        method: 'POST',
        body: new FormData(editForm),
    });

    if (response.ok) {
        location.reload();
    } else {
        location.reload();
    }
}

const editActivityForms = document.querySelectorAll('.edit-activity-form');

for (const editActivityForm of editActivityForms) {
    editActivityForm.addEventListener('submit', updateActivityState);
}

async function updateActivityState(event) {
    event.preventDefault();

    let submitButton = this.querySelector('button');
    makeLoadingButton(submitButton);

    let response = await fetch(`/admin/activity/${submitButton.dataset.activityId}`, {
        method: 'PUT',
        body: new FormData(this),
    });

    if (response.ok) {
        location.reload();
    } else {
        // location.reload();
    }
}