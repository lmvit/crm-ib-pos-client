import React,{useState,useEffect} from 'react'
import {DefaultInput} from '../pos/input';
import {Formik,Form} from 'formik';
import * as yup from 'yup';
import { fetchLifeReportsForPayouts,getPOSPersonType,fetchGeneralReportsForPayouts} from '../helper/api';
import InsurancePayoutsDetails from './InsurancePayoutsDetails';
import GeneralInsurancePayouts from './GeneralPayoutDataSearch';
import PayoutDialog from '../Transcations/components/PayoutDialog';
import {useHistory} from 'react-router-dom';


function PayoutDateSeach() {

    const pathName = window.location.pathname.split('/');
    const activePath = pathName[pathName.length - 1];
    const [PayoutData,setPayoutsData] = useState([]);
    const [personType,setPersonType] = useState('');
    const [posAccount,setPosAccount] = useState('');
    const [dates,setDates] = useState([]);
    const [saveTransactionsDailog, setSaveTransactionsDailog] = useState({ open: false});
    const history = useHistory();

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
      //  console.log('values',values);
       const fromDateMonth = new Date(values.from_date).getMonth();
       const toDateMonth = new Date(values.to_date).getMonth();
       if(fromDateMonth === toDateMonth){
          setDates(values);
          await fetchLifeReportsForPayouts(values.from_date, values.to_date).then(res => {if (res.data.length > 0) { setPayoutsData(res.data) } else { alert('No data found');history.push('/home/life-insurance-payouts') } }).catch(err => console.log(err))
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
       }else{
          alert('Both From Date and To Date must be the same month');
       }
      
    }

    const classes = "col-12 col-md-6 col-lg-4";

    const dailogClose = () => {
      setSaveTransactionsDailog({ open: false });
  }

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
        {PayoutData.length > 0 ? <InsurancePayoutsDetails data={PayoutData} personType={personType} account={posAccount} dates={dates} path={activePath}/> : null}
         {/* {saveTransactionsDailog ? <PayoutDialog close={dailogClose}/> : null} */}
        </>
    )
}
export default PayoutDateSeach
