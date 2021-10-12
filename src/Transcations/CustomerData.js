import React from 'react';
import { DefaultInput } from '../helper/Input';

function CustomerData() {
    return (
        <div className="d-flex flex-wrap pt-3">
            <DefaultInput name="title" label="Title" />
            <DefaultInput name="first_name" label="First Name" />
            <DefaultInput name="last_name" label="Last Name" />
            <DefaultInput name="mobile" label="Mobile" />
            <DefaultInput name="email" label="Email" />
            <DefaultInput name="gender" label="Gender" />
            <DefaultInput name="pan_number" label="Pan Card Number" />
            <DefaultInput name="aadhar_number" label="Aadhar Card Number" />
            <DefaultInput name="location" label="Location" />
            <DefaultInput name="branch" label="Branch" />
            <DefaultInput name="present_line1" label="Line 1" />
            <DefaultInput name="present_line2" label="Line 2" />
            <DefaultInput name="present_city" label="City" />
            <DefaultInput name="present_district" label="District" />
            <DefaultInput name="present_state" label="State" />
            <DefaultInput name="present_country" label="Country" />
            <DefaultInput name="present_pincode" label="Pincode" />
        </div>
    )
}

export default CustomerData;
