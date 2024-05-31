import { MyFormData } from "./types";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateData(data: MyFormData){
    const errors: {field: string, message: string}[] = [];

    const {firstName, lastName, email, queryType, message, consent} = data;
    const requiredMessage = 'This field is required';

    if(!firstName){
        errors.push({
            field: 'firstName',
            message: requiredMessage
        });
    }

    if(!lastName){
        errors.push({
            field: 'lastName',
            message: requiredMessage
        });
    }

    const isSubmittedEmailValid = isValidEmail(email);

    if(!email || !isSubmittedEmailValid){
        errors.push({
            field: 'email',
            message: 'Please enter a valid email address'
        });
    }

    if(!queryType){
        errors.push({
            field: 'queryType',
            message: 'Please select a query type'
        });
    }

    if(!message){
        errors.push({
            field: 'message',
            message: requiredMessage
        });
    }

    if(!consent){
        errors.push({
            field: 'consent',
            message: 'To submit this form, please consent to be contacted'
        });
    }

    return errors;
}