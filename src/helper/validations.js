import * as yup from 'yup';



export const existingCustomerValidation = yup.object({
    title : yup.string().required("Please select the title"),
    first_name : yup.string().required("Please enter customer name").matches(/^[a-zA-z_ ]*$/, { message: "Please enter only letters", excludeEmptyString: false }).min(2, "Please enter atleast 2 characters").max(20, "Please enter only 10 characters"),
    last_name : yup.string().required("Please enter customer name").matches(/^[a-zA-z_ ]+$/, "Please enter only letters").min(2, "Please enter atleast 2 characters").max(20, "Please enter only 10 characters"),
    mobile : yup.string().required("Please enter mobile number").length(10, "Please enter 10 digits mobile number"),
    email : yup.string().required("Please enter email name").min(6, "Please enter atleast 6 characters"),
    gender : yup.string().required("Please select the gender"),
    dob : yup.date().required("Please select date").nullable(),
    pan_number :yup.string().required("Please enter mobile number").length(10, "Please enter 10 digits pan number").matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Please Enter a Valid Pancard Number'),
    aadhar_number : yup.string().required("Please enter mobile number").length(12, "Please enter 12 digits aadhar number"),
    location : yup.string().required("Please select location"),
    branch : yup.string().required("Please select branch"),
    present_line1 : yup.string().required("Please enter present address").min(10, "Please enter atleast 10 characters"),
    present_line2 : yup.string().min(5, "Please enter atleast 5 characters"),
    present_city : yup.string().required("Please enter present city").min(5, "Please enter atleast 5 characters"),
    present_district : yup.string().required("Please enter present city").min(5, "Please enter atleast 5 characters"),
    present_state : yup.string().required("Please enter present state"),
    present_country : yup.string().required("Please enter present country"),
    present_pincode : yup.string().required("Please enter present pincode"),
   permanent_line1 : yup.string().required("Please enter permanent address").min(10, "Please enter atleast 10 characters"),
   permanent_line2 : yup.string().min(5, "Please enter atleast 5 characters"),
   permanent_city : yup.string().required("Please enter permanent city").min(5, "Please enter atleast 5 characters"),
   permanent_district : yup.string().required("Please enter permanent city").min(5, "Please enter atleast 5 characters"),
   permanent_state : yup.string().required("Please enter permanent state"),
   permanent_country : yup.string().required("Please enter permanent country"),
    permanent_pincode : yup.string().required("Please enterpermanent pincode"),
    employee_id : yup.string().nullable()
})


export const addCustomerValidation = yup.object({
    title : yup.string().required("Please select the title"),
    first_name : yup.string().required("Please enter customer name").matches(/^[a-zA-z_ ]*$/, { message: "Please enter only letters", excludeEmptyString: false }).min(2, "Please enter atleast 2 characters").max(20, "Please enter only 10 characters"),
    last_name : yup.string().required("Please enter customer name").matches(/^[a-zA-z_ ]+$/, "Please enter only letters").min(2, "Please enter atleast 2 characters").max(20, "Please enter only 10 characters"),
    mobile : yup.string().required("Please enter mobile number").matches(/^[0-9_]*$/, { message: "Please enter only numbers", excludeEmptyString: false }).length(10, "Please enter 10 digits mobile number"),
    email : yup.string().required("Please enter email name").min(6, "Please enter atleast 6 characters"),
    gender : yup.string().required("Please select the gender"),
    dob : yup.date().required("Please select date").nullable(),
    pan_number :yup.string().required("Please enter pan number").matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Please Enter a Valid Pancard Number').length(10, "Please enter 10 digits pan number"),
    aadhar_number : yup.string().required("Please enter aadhar number").matches(/^[0-9_]*$/, { message: "Please enter only numbers", excludeEmptyString: false }).length(12, "Please enter 12 digits aadhar number"),
    location : yup.string().required("Please select location"),
    branch : yup.string().required("Please select branch"),
    present_line1 : yup.string().required("Please enter present address").min(10, "Please enter atleast 10 characters"),
    present_line2 : yup.string().min(5, "Please enter atleast 5 characters"),
    present_city : yup.string().required("Please enter present city").min(5, "Please enter atleast 5 characters"),
    present_district : yup.string().required("Please enter present city").min(5, "Please enter atleast 5 characters"),
    present_state : yup.string().required("Please enter present state"),
    present_country : yup.string().required("Please enter present country"),
    present_pincode : yup.string().required("Please enter present pincode").matches(/^[0-9_]*$/, { message: "Please enter only numbers", excludeEmptyString: false }),
   permanent_line1 : yup.string().required("Please enter permanent address").min(10, "Please enter atleast 10 characters"),
   permanent_line2 : yup.string().min(5, "Please enter atleast 5 characters"),
   permanent_city : yup.string().required("Please enter permanent city").min(5, "Please enter atleast 5 characters"),
   permanent_district : yup.string().required("Please enter permanent city").min(5, "Please enter atleast 5 characters"),
   permanent_state : yup.string().required("Please enter permanent state"),
   permanent_country : yup.string().required("Please enter permanent country"),
    permanent_pincode : yup.string().required("Please enterpermanent pincode").matches(/^[0-9_]*$/, { message: "Please enter only numbers", excludeEmptyString: false }),
    
})

export const GeneralValidationFunction = (value, files) => {

    let returnValidation;

    let cashObject = {
        company_name : yup.string().required("Please select company name"),
        product_name : yup.string().required("Please select product name"),
        type_of_insurance : yup.string().required("Please select type of insurance"),
        sub_type : yup.string().required("Please select sub type"),
        plan_type : yup.string().required("Please select plan type"),
        plan_name : yup.string().required("Please select plan name"),
        // select_mode : yup.string().required("Please select select mode"),
        gross_premium : yup.string().required("Please select gross permium"),
        net_premium : yup.string(),
        policy_type : yup.string().required("Please select policy type"),
        policy_tenure : yup.string().required("Please select policy tenure"),
        date_of_policy_login : yup.date().required("Please select date").nullable(),
        premium_payment_mode : yup.string().required("Please select permium payment mode"),
        type_of_business : yup.string().required("Please select type of business"),
        mode_of_payment : yup.string().required("Please select mode of payment"),
        date_of_entry : yup.date().required("Please select date").nullable(),
        revenue : yup.string(),
        policy_number : yup.string().required("Please enter policy number"),
        stage : yup.string().required("Please enter stage"),
        account_number : yup.string(),
        cheque_number : yup.string(), 
        cheque_account : yup.string(),
        cheque_date : null,
        bank_name : yup.string(),
        reference_number : yup.string(),
    }

    const checkObject =  {
            cheque_number : yup.string().required("Please enter cheque number"), 
            cheque_account : yup.string().required("Please enter cheque account"),
            cheque_date : yup.date().required("Please select cheque date").nullable(),
            bank_name : yup.string().required("Please enter bank name"),
    }

    const ddObject = {
        account_number : yup.string().required("Please enter account number"),   
        cheque_number : yup.string().required("Please enter cheque number"), 
        cheque_account : yup.string().required("Please enter cheque account"),
        cheque_date : yup.date().required("Please select cheque date").nullable(),
        bank_name : yup.string().required("Please enter bank name"),
    }
    
    const onlineObject = {
        account_number : yup.string().required("Please enter account number"),
        reference_number : yup.string().required("Please enter reference number"),
    }

    const filesObject = {
        policy_number : yup.string().required("Please enter policy number"),
        stage : yup.string().required("Please enter stage"),
    }

    if(files){
        Object.assign(cashObject, filesObject)
    }

    switch (value) {
        case "Cheque":
                return  returnValidation = yup.object({ ...cashObject, ...checkObject })
        case "DD":
                return  returnValidation = yup.object({ ...cashObject, ...ddObject })
        case "Online":
                return  returnValidation = yup.object({ ...cashObject, ...onlineObject })
        default:
                return returnValidation = yup.object({...cashObject})
    }
    
}
export const LifeValidationFunction = (value, files) => {

    let returnValidation;

    let cashObject = {
        application_number :  yup.string().required("Please select application number"),
        company_name : yup.string().required("Please select company name"),
        plan_type : yup.string().required("Please select plan type"),
        plan_name : yup.string().required("Please select plan name"),
        premium_payment_term : yup.string().required("Please select permium payment term"),
        policy_term : yup.string().required("Please select policy term").length(2, "Please enter only 2 numbers"),
        product_name : yup.string().required("Please select product name"),
        gross_premium : yup.string().required("Please select gross permium"),
        net_premium : yup.string(),
        date_of_entry : yup.date().required("Please select date").nullable(),
        premium_payment_mode : yup.string().required("Please select permium payment mode"),
        type_of_business : yup.string().required("Please select type of business"),
        mode_of_payment : yup.string().required("Please select mode of payment"),
        policy_number : yup.string().required("Please enter policy number"),
        stage : yup.string().required("Please enter stage"),
        policy_issue_date : yup.date().required("Please select date").nullable(),
        revenue : yup.string(),
        account_number : yup.string(),
        reference_number : yup.string(),
    }

    const checkObject =  {
            cheque_number : yup.string().required("Please enter cheque number"), 
            cheque_account : yup.string().required("Please enter cheque account"),
            cheque_date : yup.date().required("Please select cheque date").nullable(),
            bank_name : yup.string().required("Please enter bank name"),
    }

    const ddObject = {
        account_number : yup.string().required("Please enter account number"),   
        cheque_number : yup.string().required("Please enter cheque number"), 
        cheque_account : yup.string().required("Please enter cheque account"),
        cheque_date : yup.date().required("Please select cheque date").nullable(),
        bank_name : yup.string().required("Please enter bank name"),
    }
    
    const onlineObject = {
        account_number : yup.string().required("Please enter account number"),
        reference_number : yup.string().required("Please enter reference number"),
    }

    const filesObject = {
        policy_number : yup.string().required("Please enter policy number"),
        stage : yup.string().required("Please enter stage"),
    }

    if(files){
        Object.assign(cashObject, filesObject)
    }

    switch (value) {
        case "Cheque":
                return  returnValidation = yup.object({ ...cashObject, ...checkObject })
        case "DD":
                return  returnValidation = yup.object({ ...cashObject, ...ddObject })
        case "Online":
                return  returnValidation = yup.object({ ...cashObject, ...onlineObject })
        default:
                return returnValidation = yup.object({...cashObject})
    }
    
}

export const RenewalLifeValidationFunction = (value) => {
    let returnValidation;

    const cashObject = {
        application_number: yup.string().required("Please select application number"),
        date_of_entry: yup.date().required("Please select date"),
        type_of_business: yup.string().required("Please select type of business"),
        mode_of_payment: yup.string().required("Please select mode of payment"),
        stage: yup.string().required("Please Select stage"),
    }

    const checkObject = {
        cheque_number: yup.string().required("Please enter cheque number"),
        cheque_account: yup.string().required("Please enter cheque account"),
        cheque_date: yup.date().required("Please select cheque date").nullable(),
        bank_name: yup.string().required("Please enter bank name"),
    }

    const ddObject = {
        account_number: yup.string().required("Please enter account number"),
        cheque_number: yup.string().required("Please enter cheque number"),
        cheque_account: yup.string().required("Please enter cheque account"),
        cheque_date: yup.date().required("Please select cheque date").nullable(),
        bank_name: yup.string().required("Please enter bank name"),
    }

    const onlineObject = {
        account_number: yup.string().required("Please enter account number"),
        reference_number: yup.string().required("Please enter reference number"),
    }
    switch (value) {
        case "Cheque":
            return returnValidation = yup.object({ ...cashObject, ...checkObject })
        case "DD":
            return returnValidation = yup.object({ ...cashObject, ...ddObject })
        case "Online":
            return returnValidation = yup.object({ ...cashObject, ...onlineObject })
        default:
            return returnValidation = yup.object({ ...cashObject })
    }
}

export const RenewalGeneralValidationFunction = (value) => {
    let returnValidation;

    const cashObject = {
        date_of_entry: yup.string().required("Please select date"),
        type_of_business: yup.string().required("Please select type of business"),
        mode_of_payment: yup.string().required("Please select mode of payment"),
        stage: yup.string().required("Please Select stage"),
    }

    const checkObject = {
        cheque_number: yup.string().required("Please enter cheque number"),
        cheque_account: yup.string().required("Please enter cheque account"),
        cheque_date: yup.date().required("Please select cheque date").nullable(),
        bank_name: yup.string().required("Please enter bank name"),
    }

    const ddObject = {
        account_number: yup.string().required("Please enter account number"),
        cheque_number: yup.string().required("Please enter cheque number"),
        cheque_account: yup.string().required("Please enter cheque account"),
        cheque_date: yup.date().required("Please select cheque date").nullable(),
        bank_name: yup.string().required("Please enter bank name"),
    }

    const onlineObject = {
        account_number: yup.string().required("Please enter account number"),
        reference_number: yup.string().required("Please enter reference number"),
    }
    switch (value) {
        case "Cheque":
            return returnValidation = yup.object({ ...cashObject, ...checkObject })
        case "DD":
            return returnValidation = yup.object({ ...cashObject, ...ddObject })
        case "Online":
            return returnValidation = yup.object({ ...cashObject, ...onlineObject })
        default:
            return returnValidation = yup.object({ ...cashObject })
    }
}
