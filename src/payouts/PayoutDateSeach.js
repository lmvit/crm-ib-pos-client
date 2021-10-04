import React,{useState,useEffect} from 'react'
import {DefaultInput} from '../pos/input';
import {Formik,Form} from 'formik';
import * as yup from 'yup';
import { fetchLifeReportsForPayouts,getPOSPersonType,fetchGeneralReportsForPayouts} from '../helper/api';
import InsurancePayoutsDetails from './InsurancePayoutsDetails';
import GeneralInsurancePayouts from './GeneralPayoutDataSearch';


function PayoutDateSeach() {

    const pathName = window.location.pathname.split('/');
    const activePath = pathName[pathName.length - 1];
    const [PayoutData,setPayoutsData] = useState([]);
    const [personType,setPersonType] = useState('');
    const [posAccount,setPosAccount] = useState('');
    const [dates,setDates] = useState([]);

    useEffect(async() => {
      await getPOSPersonType().then(res=>{setPosAccount(res);setPersonType(res[0].person_type)}).catch(err=>console.log(err))
    }, [activePath,PayoutData])
    
    const initialValues = {
        from_date : '',
        to_date : ''
    }
   //  console.log('pos',posAccount);

    const validationSchema = yup.object({
        from_date : yup.string().required('Please enter from date'),
        to_date  : yup.string().required('Please enter to date')
    })

    const inputFields = [
        {type : "date", label : "From Date", required : true, name :'from_date'},
        {type : "date", label : "To Date", required : true, name : 'to_date'}
    ]

    const onSubmit = async(values,onSubmitProps) =>{
      setDates(values);
       await fetchLifeReportsForPayouts(values.from_date,values.to_date).then(res=>{if(res.length>0){setPayoutsData(res)}else{alert('No data found')}}).catch(err=>console.log(err))
       onSubmitProps.resetForm();
       onSubmitProps.setSubmitting(false); 
    }

    const classes = "col-12 col-md-6 col-lg-4";

    return (
        <>
            <Formik
            initialValues = {initialValues}
            onSubmit = {onSubmit}
            validationSchema = {validationSchema}>
            {formik => {
               return(
                  <Form>
                     <h4 className="text-center my-3">Life Insurance Payouts</h4>
                     <div className="col-12 d-flex flex-wrap justify-content-center">
                        {inputFields.map((element,index)=>{
                           return(
                              <DefaultInput key={index} 
                              classes={classes} 
                              name={element.name} 
                              label={element.label} 
                              type={element.type} 
                              required={element.required}
                              className="form-control"/>
                           )
                        })}
                     </div>
                     
                     <div className="d-flex justify-content-center">
                        <input type="submit" className="btn btn-dark mt-4" value="submit"/>
                     </div>
                  </Form>
               )
            }}
         </Formik>
         <InsurancePayoutsDetails data={PayoutData} personType={personType} account={posAccount} dates={dates} path={activePath}/>
        </>
    )
}
export default PayoutDateSeach
