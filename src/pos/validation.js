import * as yup from 'yup';

export default function ValidationSchema() {
    return (
        yup.object({
            first_name: yup.string()
                .required('Please Enter First Name')
                .matches(/^[a-zA-Z\s]+$/, "Please Enter Only Letters")
                .min(2, 'Please Enter At least 2 Characters'),
            last_name: yup.string()
                .required('Please Enter Last Name')
                .matches(/^[a-zA-z]+$/, "Please Enter Only Letters")
                .min(2, 'Please Enter At least 2 Characters'),
            email: yup.string().required('Please Enter Email Address').email('Please Enter a valid Email Address'),
            account_number: yup.string().required('Please Enter Bank Account Number').matches(/^\d{9,18}$/, 'Please Enter at least 8 Numbers'),
            branch_name: yup.string()
                .required('Please Enter Account Branch Name')
                .matches(/^[a-zA-z]+$/, "Please Enter Only Letters")
                .min(3, 'Please Enter At least 3 Characters'),
            mobile_number: yup.string().required('Please Enter Mobile Number')
                .matches(/^[6-9]\d{9}$/, 'Please Enter a valid Mobile Number'),
            pancard: yup.string().required('Please Enter Pancard Number').matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Please Enter a Valid Pancard Number'),
            aadhar_number: yup.string().required('Please Enter Aadhaar Number').matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Please Enter 12 Digit Aadhaar Number'),
            ifsc_code: yup.string().required('Please Enter IFSC Code').matches(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/, 'Please Enter 11 digits alpha numeric code'),
            bank_name: yup.string().matches(/^[a-zA-Z\s]+$/, 'Please Enter Only Letters').required('Please Enter Bank Name'),
            person_type : yup.string().required('Please Select Person Type')
        })
    )
}

export function PosValidationSchema() {
    return (
        yup.object({
            posId: yup.string()
                .required("Please Enter POS Id or Email Address"),
            password: yup.string()
                .min(5, 'Please Enter at least 5 characters').required('Please Enter Password')
                .matches(/^[a-zA-Z0-9%*#@]+$/).trim()
        })
    )
}



export function CustomerValidation() {
    return (
        yup.object({
            title: yup.string()
                .required('Please Select Title'),
            first_name: yup.string()
                .required('Please Enter First Name')
                .matches(/^[a-zA-Z\s]+$/, "Please Enter Only Letters")
                .min(2, 'Please Enter At least 2 Characters'),
            last_name: yup.string()
                .required('Please Enter Last Name')
                .matches(/^[a-zA-z]+$/, "Please Enter Only Letters")
                .min(2, 'Please Enter At least 2 Characters'),
            email: yup.string().required('Please Enter Email Address').email('Please Enter a valid Email Address'),
            locations: yup.string()
                .required('Please Select Location'),
            branch: yup.string()
                .required('Please Select Branch'),
            mobile_number: yup.string().required('Please Enter Mobile Number')
                .matches(/^[6-9]\d{9}$/, 'Please Enter a valid Mobile Number'),
            dob: yup.string().required('Please Select Date of Birth'),
            gender: yup.string().required('Please Select Gender'),
            pancard: yup.string().required('Please Enter Pancard Number').matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Please Enter a Valid Pancard Number'),
            aadhar_number: yup.string().required('Please Enter Aadhaar Number').matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Please Enter 12 Digit Aadhaar Number'),
            present_address1: yup.string().required('Please Enter Address1'),
            present_address2: yup.string(),
            present_pincode: yup.string().required('Please Enter Pincode').matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, 'Please Enter a valid Pincode'),
            present_states: yup.string().required('Please Enter State').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            present_city: yup.string().required('Please Enter City').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            present_country: yup.string().required('Please Select Country'),
            present_district: yup.string().required('Please Enter District').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
        })
    )
}
export function ValidationWithPermanentAddress() {
    return (
        yup.object({
            title: yup.string()
                .required('Please Select Title'),
            first_name: yup.string()
                .required('Please Enter First Name')
                .matches(/^[a-zA-Z\s]+$/, "Please Enter Only Letters")
                .min(2, 'Please Enter At least 2 Characters'),
            last_name: yup.string()
                .required('Please Enter Last Name')
                .matches(/^[a-zA-z]+$/, "Please Enter Only Letters")
                .min(2, 'Please Enter At least 2 Characters'),
            email: yup.string().required('Please Enter Email Address').email('Please Enter a valid Email Address'),
            locations: yup.string()
                .required('Please Select Location'),
            branch: yup.string()
                .required('Please Select Branch'),
            mobile_number: yup.string().required('Please Enter Mobile Number')
                .matches(/^[6-9]\d{9}$/, 'Please Enter a valid Mobile Number'),
            dob: yup.string().required('Please Select Date of Birth'),
            gender: yup.string().required('Please Select Gender'),
            pancard: yup.string().required('Please Enter Pancard Number').matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Please Enter a Valid Pancard Number'),
            aadhar_number: yup.string().required('Please Enter Aadhaar Number').matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Please Enter 12 Digit Aadhaar Number'),
            present_address1: yup.string().required('Please Enter Address1'),
            present_address2: yup.string(),
            present_pincode: yup.string().required('Please Enter Pincode').matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, 'Please Enter a valid Pincode'),
            present_states: yup.string().required('Please Enter State').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            present_city: yup.string().required('Please Enter City').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            present_country: yup.string().required('Please Enter Country').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            present_district: yup.string().required('Please Enter District').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            permanent_address1: yup.string().required('Please Enter Address1'),
            permanent_address2: yup.string(),
            permanent_pincode: yup.string().required('Please Enter Pincode').matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, 'Please Enter a valid Pincode'),
            permanent_states: yup.string().required('Please Enter State').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            permanent_city: yup.string().required('Please Enter City').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters"),
            permanent_country: yup.string().required('Please Select Country'),
            permanent_district: yup.string().required('Please Enter District').matches(/^[a-zA-z\s]+$/, "Please Enter Only Letters")
        })
    )
}

export function LifeInsuranceTransactionValidation(){
    return(
        yup.object({
            from_date : yup.string().required('Please Select From Date'),
            to_date : yup.string().required('Please Select To Date')
        })
    )
}