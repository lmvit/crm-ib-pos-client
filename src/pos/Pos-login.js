import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { DefaultInput } from '../pos/input';
import { PosValidationSchema } from '../pos/validation';
import axios from 'axios';
import CrmforPosService from '../config/index';

import '../App.css';

function Poslogin() {
    const history = useHistory();
    const registerPosDetails = () => {
        history.push('/register-pos-details')
    }

    const initialValues = {
        posId: '',
        password: ''
    }

    const onSubmit = async (value,onSubmitProps) => {
        axios.post(CrmforPosService.CrmforPosService.baseURL+'/api/pos/login/pos-login',value)
        .then(res=>{
            if(res.data.message === 'failed'){
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false);
                return window.alert('Invalid POS ID or Passsword')
            }else{
                // console.log(res.data);
                sessionStorage.setItem('token',res.data.accessToken)
                history.push('/home/reports-count');
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false);
                return window.alert('Login Successfully');
            }
        })
        .catch(err=>console.log(err))
    }

    const posLoginForm = [
        { type: "text", name: "posId", label: "POS ID or Email Address" },
        { type: "password", name: "password", label: "Password" },
    ]

    const classes = "";

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={PosValidationSchema}
                onSubmit={onSubmit}
            >
                {formik => {
                    return (
                        <Form>
                            <div className="background">
                                <div className="login-form col-11 col-md-8 col-lg-6 col-xl-4 py-3 my-3" style={{ height: 'auto', backgroundColor: '#fff', borderRadius: '10px' }}>
                                    <h4 className="text-left my-2">Login as POS</h4>
                                    <div className="icon"></div>
                                    <div className="justify-content-center col-12 m-auto">
                                        {posLoginForm.map((obj,index)=>{
                                            return(
                                                <DefaultInput key={index} type={obj.type} classes={classes} name={obj.name} label={obj.label} required
                                                className={formik.touched[obj.name] && formik.errors[obj.name] ? "is-invalid form-control":"form-control"}/>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-4">
                                        <input type="submit" value="Log in" style={{ fontSize: '20px' }} className="col-10 m-auto btn btn-primary btn-block p-2" />
                                    </div>
                                    <hr className="p-0" />
                                    <div className="text-center font-weight-bold">
                                        <p className="mt-2" style={{ cursor: 'pointer' }} onClick={registerPosDetails}>Register here if you don't have an account?</p>
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
export default Poslogin;
