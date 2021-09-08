import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import CrmforPosService from '../config/index';
import BarChart from '../graphs/BarChart';
import { UserContext } from '../pos/posHome';

function Home() {
   const user = useContext(UserContext);
   const [lifeTxnCount, setLifeTxnCount] = useState(0);
   const [generalTxnCount, setGeneralTxnCount] = useState(0);
   const [lifeRevenueData,setLifeRevenueData] = useState([]);
   const [generalRevenueData,setGeneralRevenueData] = useState([]);
   let chartLifeInput =  new Array(12).fill(0);
   let chartGeneralInput =  new Array(12).fill(0);

   useEffect(() => {
      const token = sessionStorage.getItem('token');
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/life-reports-count/${user}`,{headers:{Authorization:token}})
         .then(res => {
            // console.log(res.data)
            if (res.data.responseData) {
               setLifeTxnCount(res.data.responseData[0].count)
            }
         }).catch(err => console.log(err))
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/general-reports-count/${user}`,{headers:{Authorization:token}})
         .then(res => {
            if (res.data.responseData) {
               setGeneralTxnCount(res.data.responseData[0].count)
            }
         }).catch(err => console.log(err))
      axios.get(CrmforPosService.CrmforPosService.baseURL+`/api/pos/reports/monthly-life-revenue-data`,{headers:{Authorization:token}})
      .then(res=>{
         if(res.data.responseData){
            setLifeRevenueData(res.data.responseData);
         }
      }).catch(err=>console.log(err))
      axios.get(CrmforPosService.CrmforPosService.baseURL+`/api/pos/reports/monthly-general-revenue-data`,{headers:{Authorization:token}})
      .then(res=>{
         if(res.data.responseData){
            setGeneralRevenueData(res.data.responseData);
         }
      }).then(err=>console.log(err))
   }, [user])
   // console.log(lifeRevenueData);
   // console.log(lifeTxnCount,generalTxnCount)
   useEffect(() => {
     lifeRevenueData.map((arr,index)=>{
        return(
         chartLifeInput[arr.month-1] = Number(arr.total).toFixed(2)
        )
     });
     generalRevenueData.map((arr,index)=>{
      return(
       chartGeneralInput[arr.month-1] = Number(arr.total).toFixed(2)
      )
   })
   }, [chartGeneralInput, chartLifeInput, generalRevenueData, lifeRevenueData])
   return (
      <div style={{minHeight:'100vh'}}>
         <div className="d-flex justify-content-center"><h4 className="my-4">Monthly Reports</h4></div>
         <div className="d-flex justify-content-center">
            <div className="block col-3 mr-3">
               <div className="text-center mt-4">
                  <p className="h6 home_reports_title">Life Insurance Transactions</p>
                  <h1>{lifeTxnCount}</h1>
               </div>
            </div>
            <div className="block col-3">
               <div className="text-center mt-4">
                  <p className="h6 home_reports_title">General Insurance Transactions</p>
                  <h1>{generalTxnCount}</h1>
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-center"><h4 className="my-4">Annual Reports</h4></div>
         <div className="chart mb-4">
            <div><BarChart lifeData = {chartLifeInput} title="Life Insurance Revenue in Lakhs" bg="#1c78e2"/></div>
            <h4 className="my-1 text-center">Life Insurance Revenue</h4>
            <div className="mt-5"><BarChart lifeData = {chartGeneralInput} title = "General Insurance Revenue in Lakhs" bg="#044896"/></div>
            <h4 className="my-1 text-center">General Insurance Revenue</h4>
         </div>
      </div>
   )
}

export default Home
