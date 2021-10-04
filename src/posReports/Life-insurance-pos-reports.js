import React from 'react';
import {Formik,Form} from 'formik';
import {DefaultInput} from '../pos/input'
import * as yup from 'yup';
import axios from 'axios';
import CrmforPosService from '../config/index';
import {useHistory} from 'react-router-dom';

function LifeInsurancePosReports() {
   const history = useHistory();
   const urlactive = window.location.pathname.slice(6);
   const initialValues = {
      from_date : '',
      to_date : ''
   }
   const onSubmitLifeReports = (values)=>{
      const token = sessionStorage.getItem('token');
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/get-life-insurance-pos-reports/${values.from_date}/${values.to_date}`,{headers:{Authorization:token}})
      .then(res=>{
         // console.log(res.data)
         if(res.data.responseData){
            history.push({
               pathname : '/pos-life-reports',
               state : res.data
            })
         }else if(res.data.status === 200 && res.data.message === 'no data found'){
            window.alert('No results Found');
         }
      })
      .catch(err=>console.log(err))
   }
   const onSubmitGeneralReports = (values)=>{
      const token = sessionStorage.getItem('token');
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/get-general-insurance-pos-reports/${values.from_date}/${values.to_date}`,{headers:{Authorization:token}})
      .then(res=>{
         // console.log(res.data)
         if(res.data.responseData){
            history.push({
               pathname : '/pos-general-reports',
               state : res.data
            })
         }else if(res.data.status === 200 && res.data.message === 'no data found'){
            window.alert('No results Found');
         }
      })
      .catch(err=>console.log(err))
   }
   const lifePosReportsValidation = yup.object({
      from_date : yup.string().required('Please Select From Date'),
      to_date : yup.string().required('Please Select To Date')
   });

   const inputFields = [
      {type : "date", label : "From Date", required : true, name :'from_date'},
      {type : "date", label : "To Date", required : true, name : 'to_date'}
   ]

   const classes = "col-12 col-md-6 col-lg-4"
   return (
      <>
         <div className="d-flex justify-content-center my-3">
            {urlactive === 'life-transactions-pos-reports' ? <h5>Life Insurance POS Reports</h5> : <h5>General Insurance POS Reports</h5>}
         </div>
         <Formik
            initialValues = {initialValues}
            onSubmit = {urlactive === 'life-transactions-pos-reports' ? onSubmitLifeReports : onSubmitGeneralReports}
            validationSchema = {lifePosReportsValidation}
         >
            {formik => {
               return(
                  <Form>
                     <div className="col-12 d-flex flex-wrap justify-content-center">
                        {inputFields.map((element,index)=>{
                           return(
                              <DefaultInput key={index} classes={classes} name={element.name} label={element.label} type={element.type} required={element.required}
                              className={formik.touched[element.name] && formik.errors[element.name] ? "is-invalid form-control":"form-control"}/>
                           )
                        })}
                     </div>
                     <div className="d-flex justify-content-center">
                        <input type="submit" className="btn btn-dark mt-2" value="submit"/>
                     </div>
                  </Form>
               )
            }}
            
         </Formik>
      </>
   )
}

export default LifeInsurancePosReports;
