/*eslint-disable*/
import React from 'react';
import { Form, Formik} from 'formik';
import { DefaultInput,Select } from '../pos/input';
import ValidationSchema from '../pos/validation';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CrmforPosService from '../config/index';

function PosRegisterDetails() {
    const history = useHistory();
    const initialValues = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        aadhar_number: '',
        pancard: '',
        bank_name: '',
        ifsc_code: '',
        branch_name: '',
        account_number: '',
        person_type : ''
    }
    const validateRows = ['Mobile Number Already exists','Email Already exists','Aadhar Number Already exists','Pancard Number Already exists','Account Number Already exists'];

    const onSubmit = async (values) => {
        const obj = {
            first_name : values.first_name.toLowerCase(),
            last_name : values.last_name.toLowerCase(),
            mobile_number: values.mobile_number,
            email: values.email.toLowerCase(),
            aadhar_number: values.aadhar_number,
            pancard: values.pancard.toLowerCase(),
            bank_name: values.bank_name.toLowerCase(),
            ifsc_code: values.ifsc_code.toLowerCase(),
            branch_name: values.branch_name.toLowerCase(),
            account_number: values.account_number
        }
        axios.post(CrmforPosService.CrmforPosService.baseURL+`/api/pos/login/validate-details`,obj)
        .then(res=>{
            if(res.data === validateRows[0]){
                return window.alert(validateRows[0]);
            }else if(res.data === validateRows[1]){
                return window.alert(validateRows[1]);
            }else if(res.data === validateRows[2]){
                return window.alert(validateRows[2])
            }else if(res.data === validateRows[3]){
                return window.alert(validateRows[3])
            }else if(res.data === validateRows[4]){
                return window.alert(validateRows[4])
            }else if(res.data === 'No Duplicate Values Found'){
                history.push({
                    pathname : '/pos-terms-and-conditions',
                    state : obj
                })
            }
        })
    }
    const redirectPosLogin = () => {
        history.push('/')
    }

    const posForm = [
        { type: "text", name: "first_name", label: "First Name" },
        { type: "text", name: "last_name", label: "Last Name" },
        { type: "number", name: "mobile_number", label: "Mobile Number" },
        { type: "email", name: "email", label: "Email" },
        { type: "number", name: "aadhar_number", label: "Aadhar Number" },
        { type: "text", name: "pancard", label: "Pancard" },
        { type: "text", name: "bank_name", label: "Bank Name" },
        { type: "text", name: "account_number", label: "Account Number" },
        { type: "text", name: "ifsc_code", label: "IFSC Code" },
        { type: "text", name: "branch_name", label: "Branch Name" }
    ];

    const options = ['Individual','non-individual']

    const formContainer = {
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: '10px'
    }
  
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={onSubmit}
            >
                {formik => {
                    return (
                        <Form>
                            <div className="background">
                                <div className="register-form col-11 col-md-8 col-lg-6 col-xl-4 py-3 my-3" style={formContainer}>
                                    <h4 className="text-center">Register</h4>
                                    <div className="justify-content-center col-12 m-auto">
                                        {posForm.map((obj, index) => {
                                            return (
                                                <DefaultInput name={obj.name} type={obj.type} label={obj.label} required
                                                    className={formik.touched[obj.name] && formik.errors[obj.name] ? "is-invalid form-control" : "form-control text-uppercase"} />
                                            )
                                        })}
                                    </div>
                                    <div className="justify-content-center col-12 m-auto">
                                        <Select options={options} label="Person Type" required name="person_type"
                                         className={formik.touched.person_type && formik.errors.person_type ? "is-invalid form-control" : "form-control text-uppercase"}/>  
                                    </div>

                                    <div className="container p-2 mt-3">
                                        <button  className="btn btn-primary btn-block col-10 m-auto">Next</button>
                                    </div>
                                    <hr className="p-0" />
                                    <div className="d-flex justify-content-center">
                                        <span className="font-weight-bold" style={{ cursor: 'pointer' }} onClick={redirectPosLogin}>POS Login</span>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}
export default PosRegisterDetails;