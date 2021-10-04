import React,{useEffect,useContext,useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CrmforPosService from '../config/index';
import { UserContext } from '../pos/posHome';
import ReportsTable from './ReportsTable';

function LifeInsurance() {
   const user = useContext(UserContext);
   const history = useHistory();
   // console.log(user)
   const [data,setData] = useState([]);
   const currentDate = new Date().toLocaleDateString('en-CA');
   const name = 'pos_life_insurance_transactions';
   const name1= 'pos_life_transactions';
   useEffect(() => {
      const token = sessionStorage.getItem('token');
    if(user){
      axios.get(CrmforPosService.CrmforPosService.baseURL+`/api/pos/renewal/get-records/${name}/${name1}/${user}`,{headers:{Authorization:token}})
      .then(res=>setData(res.data))
    }else{
       return false;
    }
   }, [user])
   const redirectToLifeInsuranceTxn = async (id,posId) => {
      const token = sessionStorage.getItem('token');
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/life-transactions/customer-details/${id}/${posId}`,{headers:{Authorization:token}})
      .then(res=>{
         if(res.data.message === 'customer exists'){
            history.push({
               pathname:`/home/life-insurance-transactions-data`,
               state: res.data.data
           })
         }
      })
      .catch(err=>console.log(err))
  }
   return (
      <>
         <ReportsTable data={data} date={currentDate} redirect={redirectToLifeInsuranceTxn} user={user} title='Life'/>
      </>
   )
}

export default LifeInsurance
