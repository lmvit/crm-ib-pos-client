import React,{useState, useEffect} from "react";
import { DefaultInputWithoutLabel } from "../pos/input";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import {FcClock} from 'react-icons/fc';
import {useHistory,useLocation} from 'react-router-dom';
import axios from "axios";
import CrmforPosService from '../config/index';

function Otp() {
  const [counter,setCounter] = useState(120);
  const history = useHistory();
  const location = useLocation();
  const number = location.state.phone.slice(-4);

  useEffect(() => {
    const timer = counter > 0 && setInterval(()=>setCounter(counter - 1),1000)
    return () => {
      clearInterval(timer);
    }
  }, [counter]);

  window.onload = function(e) {
    e.preventDefault();
    history.push('/');
    delete e['returnValue'];
  };

  const initialValues = {
      otp : '',
  };

  const onSubmit = (values,onSubmitProps) =>{
    // console.log(values);
    const obj = {
      phone : location.state.phone,
      hash : location.state.hash,
      otp : values.otp
    }
    // console.log(obj)
    const token = sessionStorage.getItem('token');
    axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/otp-auth/verify-otp`,{obj},{headers:{Authorization : token}})
    .then(res=>{
      if(res.data.message === 'Timeout Please try again'){
          history.replace('/');
      }else if(res.data.message === 'Success'){
          history.push('/home/reports-count');
      }else{
        alert(res.data.message);
      }
    })
    .catch(err=>console.log(err))
  }

  const resetCounter = () =>{
    setCounter(120);
  }

  const validation = yup.object({
      otp : yup.string().required('Please Enter OTP').max(6,'Please Enter Valid OTP')
  })
  return (
    <>
      <Formik initialValues={initialValues}
      onSubmit = {onSubmit}
      validationSchema ={validation}>
        {(formik) => {
          return (
            <Form>
              <div className="otp-background">
                <div className="otp-login-form col-11 col-md-6 col-lg-4">
                    <h4 className="text-center py-3" aria-label="OTP Verification" style={{color:'#001f60'}}>OTP Verification</h4>
                    <h6 className="text-center">An OTP has been sent to <br/> xxx xxx {number}</h6>
                    <p></p>
                    <DefaultInputWithoutLabel
                      type="number"
                      className="col-12 input_otp mt-3"
                      name="otp"
                      label="Enter your 6 digit OTP"
                    />
                    {/* {counter > 0 ? <p className="text-center"><FcClock size="1.2em"/>Time Left : {counter}</p> : <p onClick={resetCounter} className="text-center" style={{cursor:'pointer'}}>Resend OTP</p>} */}
                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                </div>
               
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Otp;
