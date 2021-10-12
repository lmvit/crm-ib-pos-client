import React from 'react';
import { Input, DateField } from '../helper/Input';

function ModeOfPayment(value) {
    switch (value) {
        case "Cheque":
            return <>
                <Input name="cheque_number" label="Cheque Number" required/>
                <Input name="cheque_account" label="Cheque Account" required/>
                <DateField name="cheque_date" label="Cheque Date" required/>
                <Input name="bank_name" label="Bank Name" required/>
            </>
        case "DD":
            return <>
                <Input name="account_number" label="Account Number" required/>
                <Input name="cheque_number" label="Cheque Number" required/>
                <Input name="cheque_account" label="Cheque Account" required/>
                <DateField name="cheque_date" label="Cheque Date" required/>
                <Input name="bank_name" label="Bank Name" required/>
            </>
        case "Online":
            return <>
                <Input name="account_number" label="Account Number" required/>
                <Input name="reference_number" label="Reference Number" required/>
            </>
        case "Cash":
            break;
        default:
            break;
    }
}

export default ModeOfPayment
