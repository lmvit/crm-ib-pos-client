import { DateFunction } from './helper';
import { format } from 'date-fns';

export const customerInitialValue = {
  title : "",
  first_name : "",
  last_name : '',
  mobile : "" ,
  email : '',
  gender : '',
  dob : null,
  pan_number : '',
  aadhar_number : '',
  location : '',
  branch : '',
  present_line1 : '',
  present_line2 : '',
  present_city : '',
  present_district : '',
  present_state : '',
  present_country : '',
  present_pincode : '',
  permanent_line1 : '',
  permanent_line2 : '',
  permanent_city : '',
  permanent_district : '',
  permanent_state : '',
  permanent_country : '',
  permanent_pincode : '',
}


export const customerInitialValueTest = {
  title : "Mr",
  first_name : "Sai Bhargav",
  last_name : 'Sankoji',
  mobile : "9666606228",
  email : 'Saibhargav@gmail.com',
  gender : 'Male',
  dob : "2021-07-29",
  // dob :  format(new Date(), "MM-dd-yyyy"),
  pan_number : 'ABCDE1234A',
  aadhar_number : '966660622800',
  location : 'hyderabad',
  branch : 'somajiguda',
  present_line1 : '2-5-169, Puranipet, Jagtial',
  present_line2 : '2-5-169, Puranipet, Jagtial',
  present_city : 'Jagtial',
  present_district : 'Jagtial',
  present_state : 'Telangana',
  present_country : 'India',
  present_pincode : '505327',
  permanent_line1 : '2-5-169, Puranipet, Jagtial',
  permanent_line2 : '2-5-169, Puranipet, Jagtial',
  permanent_city : 'Jagtial',
  permanent_district : 'Jagtial',
  permanent_state : 'Telangana',
  permanent_country : 'India',
  permanent_pincode : '505327',
}

export const customerInitialValueFunction = (customer) => {
  let returnInitialValues;

  returnInitialValues = {
    title : customer ? customer.title : "",
    first_name : customer ? customer.first_name : "", 
    last_name : customer ? customer.last_name : "",
    mobile : customer ? customer.mobile : "",
    email : customer ? customer.email : "",
    gender : customer ? customer.gender : "",
    // dob : customer ? "2021-07-06" : "",
    dob : customer ? format(new Date(customer.dob), 'yyyy-MM-dd') : "",
    pan_number : customer ? customer.pan_number : "",
    aadhar_number : customer ? customer.aadhar_number : "",
    location : customer ? customer.location : "",
    branch : customer ? customer.branch : "",
    present_line1 : customer ? customer.present_line1 : "",
    present_line2 : customer ? customer.present_line2 : "",
    present_city : customer ? customer.present_city : "",
    present_district : customer ? customer.present_district : "",
    present_state : customer ? customer.present_state : "",
    present_country : customer ? customer.present_country : "",
    present_pincode : customer ? customer.present_pincode : "",
    permanent_line1 : customer ? customer.permanent_line1 : "",
    permanent_line2 : customer ? customer.permanent_line2 : "",
    permanent_city : customer ? customer.permanent_city : "",
    permanent_district : customer ? customer.permanent_district : "",
    permanent_state : customer ? customer.permanent_state : "",
    permanent_country : customer ? customer.permanent_country : "",
    permanent_pincode : customer ? customer.permanent_pincode : "",
  }

  return returnInitialValues
}


export const GeneralInitialValueFunction = (data) => {

  // console.log(data)
  let returnInitialValues;

    returnInitialValues= {
    company_name : '',
    product_name : '',
    type_of_insurance : '',
    sub_type : '',
    plan_type : '',
    plan_name : '',
    // select_mode : '',
    gross_premium : '',
    net_premium : '',
    policy_number : '',
    policy_type : '',
    policy_tenure : '',
    date_of_policy_login : null,
    type_of_business : '',
    mode_of_payment : '',
    stage : '',
    date_of_entry : null,
    revenue : "",
    account_number : "",
    cheque_number : "",
    cheque_account : "",
    cheque_date : null,
    bank_name : "",
    reference_number : ""
    }
  
  return returnInitialValues;
}
export const LifeInitialValueFunction = (data) => {

  let returnInitialValues;

    returnInitialValues= {
      application_number : '',
      company_name : '',
      product_name : '',
      plan_type : '',
      plan_name : '',
      premium_payment_term : '',
      policy_term : '',
      gross_premium : '',
      net_premium : '',
      date_of_entry : null,
      premium_payment_mode : "",
      type_of_business : '',
      mode_of_payment : '',
      policy_number : "",
      stage : '',
      policy_issue_date : null,
      revenue : "",
      account_number : "",
      cheque_number : "",
      cheque_account : "",
      cheque_date : null,
      bank_name : "",
      reference_number : ""
    }
  
  return returnInitialValues;
}

export const TransactionCustomerFunction = (customer = {}) => {
  let customerInitialValue;

  customerInitialValue = { 
    title : customer.title,
    first_name : customer.first_name,
    last_name : customer.last_name,
    mobile : customer.mobile_number,
    email : customer.email,
    gender : customer.gender,
    dob : new Date(customer.dob),
    pan_number : customer.pancard,
    aadhar_number : customer.aadhar_number,
    location : customer.locations,
    branch : customer.branch,
    present_line1 : customer.present_address1,
    present_line2 : customer.present_address2,
    present_city : customer.present_city,
    present_district : customer.present_district,
    present_state : customer.present_states,
    present_country : customer.present_country,
    present_pincode : customer.present_pincode,
}

return customerInitialValue;
}



export const lifeInsuranceTransactionValues = {
  application_number : '',
  company_name : '',
  product_name : '',
  plan_type : '',
  plan_name : '',
  premium_payment_term : '',
  policy_term : '',
  gross_premium : '',
  net_premium : '',
  date_of_entry : null,
  premium_payment_mode : "",
  type_of_business : '',
  mode_of_payment : '',
  policy_number : "",
  stage : '',
  policy_issue_date : null,
  revenue : "",
  account_number : "",
  cheque_number : "",
  cheque_account : "",
  cheque_date : null,
  bank_name : "",
  reference_number : ""
}

export   const generalInsuranceTransactionValues = {
    company_name : '',
    product_name : '',
    type_of_insurance : '',
    sub_type : '',
    plan_type : '',
    plan_name : '',
    select_mode : '',
    gross_premium : '',
    net_premium : '',
    policy_number : '',
    policy_type : '',
    policy_tenure : '',
    date_of_policy_login : null,
    type_of_business : '',
    mode_of_payment : '',
    stage : '',
    date_of_entry : null,
    revenue : "",
    account_number : "",
    cheque_number : "",
    cheque_account : "",
    cheque_date : null,
    bank_name : "",
    reference_number : ""
  }

// let initialStateValues = {
//     title : "Mr",
//     first_name : "Sai Bhargav",
//     last_name : 'Sankoji  ',
//     mobile : "9666606228" ,
//     email : 'saibhargav@gmail.com',
//     gender : 'Male',
//     dob : new Date(),
//     pan_number : '9666606228',
//     aadhar_number : '966660622800',
//     location : 'Hyderabad',
//     branch : 'Somajiguda',
//     present_line1 : '2-5-169, Puranipet',
//     present_line2 : '2-5-169, Puranipet',
//     present_city : 'Jagtial',
//     present_district : 'Jagtial',
//     present_state : 'Telangana',
//     present_country : 'India',
//     present_pincode : '505327',
//     permanent_line1 : '2-5-169, Puranipet',
//     permanent_line2 : '2-5-169, Puranipet',
//     permanent_city : 'Jagtial',
//     permanent_district : 'Jagtial',
//     permanent_state : 'Telangana',
//     permanent_country : 'India',
//     permanent_pincode : '505327',
//   }


