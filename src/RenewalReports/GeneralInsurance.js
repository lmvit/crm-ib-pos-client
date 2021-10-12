import React,{useEffect,useContext,useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CrmforPosService from '../config/index';
import { UserContext } from '../pos/posHome';
import ReportsTable from './ReportsTable';
import {getLifeRenewalReportCount} from '../helper/api';
import { date } from 'yup/lib/locale';

function LifeInsurance() {
   const user = useContext(UserContext);
   const history = useHistory();
   // console.log(user)
   const [data,setData] = useState([]);
   const currentDate = new Date().toLocaleDateString('en-CA');
   const name = 'pos_general_insurance_transactions';
   const name1 = 'pos_general_transactions';
   useEffect(() => {
      const token = sessionStorage.getItem('token');
    if(user){
      getLifeRenewalReportCount(name,name1,user).then(res=>  setData(
         res.filter(element => element.type_of_business !== 'rollover' && element.type_of_business !== 'cancelled'))).catch(err=>console.log(err))
    }else{
       return false;
    }
   }, [user])
   const redirectToLifeInsuranceTxn = async (data,id) => {
      console.log(data,id);
      const obj = {
         customerData: data,
         policyNumber: id,
         business : 'renewal'
     }
       const token = sessionStorage.getItem('token');
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/life-transactions/customer-details/${data.customer_pan}`,{headers:{Authorization:token}})
       .then(res=>{
          console.log(res.data)
          if(res.data.message === 'customer exists'){
            history.push({
               pathname:`/home/business-transaction/renewal-general-insurance-transaction`,
               state: obj
           })
         }else{
            alert(res.data)
         }
      }).catch(err=>console.log(err))
  }

   return (
      <>
         <ReportsTable data={data} date={currentDate} redirect={redirectToLifeInsuranceTxn} user={user} title='General'/>
      </>
   )
}

export default LifeInsurance
