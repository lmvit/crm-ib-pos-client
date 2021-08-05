import React,{useContext,useState} from 'react';
import {Formik,Form} from 'formik';
import { DefaultInput } from '../pos/input';
import {LifeInsuranceTransactionValidation} from '../pos/validation';
import {UserContext} from '../pos/posHome';
import CustomerDetails from './CustomerDetails';
import CrmforPosService from '../../src/config/index';
import axios from 'axios';


function LifeInsuranceTransaction() {

    const user = useContext(UserContext);
    const [customers,setCustomers] = useState([]);
  
    const fields =[
        {type:'date',name:'from_date', label:'From Date',required:true},
        {type:'date',name:'to_date', label:'To Date',required:true}
    ]

    const initialValues ={
        from_date : '',
        to_date : ''
    }

    const onSubmit = (values,onSubmitProps)=>{
        console.log(values)
        axios.post(CrmforPosService.CrmforPosService.baseURL+`/api/pos/get-customers-by-date/${user}`,values)
        .then(res=>setCustomers(res.data))
        .catch(err=>console.log(err)) 
    }

    const classes = "col-12 col-md-6 col-lg-4"
    return (
        <>
            <div className="d-flex justify-content-center my-3"><h5>Life insurance Transaction</h5></div>
            <Formik
                initialValues = {initialValues}
                onSubmit={onSubmit}
                validationSchema = {LifeInsuranceTransactionValidation}
            >
                    {formik=>{
                        return(
                            <Form>
                                <div className="d-flex justify-content-center col-12 flex-wrap">
                                   {fields.map((element,index)=>{
                                        return <DefaultInput type={element.type} name={element.name} classes={classes} label={element.label} required={element.required}
                                        className={formik.touched[element.name] && formik.errors[element.name] ? "is-invalid form-control":"form-control"}/>
                                    })}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type="submit" className="btn btn-dark"/>
                                </div>
                            </Form>
                        )
                    }
                    }
            </Formik>
            <div>
                <CustomerDetails customersData = {customers}/>
            </div>
        </>
    )
}

export default LifeInsuranceTransaction;
