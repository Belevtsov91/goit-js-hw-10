

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');


form.addEventListener('submit', (event) => {
    event.preventDefault(); 


    const delay = parseInt(delayInput.value);
    const state = Array.from(stateRadios).find(radio => radio.checked)?.value;

    if (!delay || !state) {
        iziToast.error({
            title: 'Error',
            message: 'Please fill all fields correctly!',
        });
        return;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay); 
            } else {
                reject(delay); 
            }
        }, delay); 
    });

    promise
        .then((resolvedDelay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
            });
        })
        .catch((rejectedDelay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${rejectedDelay}ms`,
            });
        });
});

