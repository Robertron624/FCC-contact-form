import './style.css';

import { Consent, QueryType } from './types';
import { validateData } from './utils';

function main(){
    
    const form = document.querySelector('form') as HTMLFormElement;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const queryType = formData.get('queryType') as QueryType;
        const message = formData.get('message') as string;
        const consent = formData.get('consent') as Consent;

        const data = {
            firstName,
            lastName,
            email,
            queryType,
            message,
            consent
        };

        const errors = validateData(data);

        if(errors.length == 0){
            alert('Form submitted successfully');
            return;
        }

        errors.forEach(({field, message}) => {
            const errorField = document.querySelector(`[data-error="${field}"]`);
            if(errorField){
                errorField.textContent = message;
            }
        });
    });
}

main();