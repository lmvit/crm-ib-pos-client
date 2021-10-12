import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CrmforPosService from '../config/index';
import BarChart from '../graphs/BarChart';
import { UserContext } from '../pos/posHome';
import { getLifeRenewalReportCount } from '../helper/api';
import {useHistory} from 'react-router-dom';

function Home() {
   const user = useContext(UserContext);
   const history = useHistory();
   const [lifeTxnCount, setLifeTxnCount] = useState(0);
   const [generalTxnCount, setGeneralTxnCount] = useState(0);
   const [lifeRevenueData, setLifeRevenueData] = useState([]);
   const [generalRevenueData, setGeneralRevenueData] = useState([]);
   const [lifeComissionData, setLifeCommissionData] = useState([]);
   const [generalCommissionData, setGeneralCommissionData] = useState([]);
   const [lifeRenewalCount, setLifeRenewalCount] = useState([]);
   const [generalRenewalCount, setGeneralRenewalCount] = useState([]);
   let chartLifeInput = new Array(12).fill(0);
   let chartGeneralInput = new Array(12).fill(0);

   useEffect(async () => {
      const token = sessionStorage.getItem('token');
      await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/life-reports-count`, { headers: { Authorization: token } })
         .then(res => {
            if (res.data.responseData) {
               setLifeTxnCount(res.data.responseData[0].count)
            }
         }).catch(err => console.log(err))
      await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/general-reports-count`, { headers: { Authorization: token } })
         .then(res => {
            if (res.data.responseData) {
               setGeneralTxnCount(res.data.responseData[0].count)
            }
         }).catch(err => console.log(err))
      await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/monthly-life-revenue-data`, { headers: { Authorization: token } })
         .then(res => {
            if (res.data.responseData) {
               setLifeRevenueData(res.data.responseData);
            }
         }).catch(err => console.log(err))
      await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/reports/monthly-general-revenue-data`, { headers: { Authorization: token } })
         .then(res => {
            if (res.data.responseData) {
               setGeneralRevenueData(res.data.responseData);
            }
         }).catch(err => console.log(err))
      axios.get(CrmforPosService.CrmforPosService.baseURL+`/api/pos/reports/monthly-life-revenue-payouts`,{headers:{Authorization:token}})
      .then(res=>{
         if(res.data){
            setLifeCommissionData(res.data);
         }
      }).catch(err=>console.log(err))
      axios.get(CrmforPosService.CrmforPosService.baseURL+`/api/pos/reports/monthly-general-revenue-payouts`,{headers:{Authorization:token}})
      .then(res=>{
         if(res.data){
            setGeneralCommissionData(res.data);
         }
      }).catch(err=>console.log(err))
   }, [])

   useEffect(() => {
      lifeRevenueData.map((arr, index) => {
         return (
            chartLifeInput[arr.month - 1] = Number(arr.total).toFixed(2)
         )
      });
      generalRevenueData.map((arr, index) => {
         return (
            chartGeneralInput[arr.month - 1] = Number(arr.total).toFixed(2)
         )
      })

   }, [chartGeneralInput, chartLifeInput, generalRevenueData, lifeRevenueData])

   useEffect(() => {
      const name = 'pos_life_insurance_transactions';
      const name1 = 'pos_life_transactions';
      const name2 = 'pos_general_insurance_transactions';
      const name3 = 'pos_general_transactions';
      getLifeRenewalReportCount(name, name1).then(res => setLifeRenewalCount(res)).catch(err => console.log(err))
      getLifeRenewalReportCount(name2, name3).then(res => setGeneralRenewalCount(res.filter(element=>element.type_of_business !== 'rollover' && element.type_of_business !== 'cancelled'))).catch(err => console.log(err))
   }, [])

   const redirectToLifeRenewalReports = ()=>{
      history.push('/home/renewal-reports/life-insurance')
   }

   const redirectToGeneralRenewalReports = ()=>{
      history.push('/home/renewal-reports/general-insurance');
   }
   return (
      <div style={{ minHeight: '100vh' }}>
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
         <div className="d-flex justify-content-center mt-4">
            <div className="block col-3 mr-3" onClick={redirectToLifeRenewalReports}>
               <div className="text-center mt-4">
                  <p className="h6 home_reports_title">Life Insurance Renewal Transactions</p>
                  <h1>{lifeRenewalCount.length}</h1>
               </div>
            </div>
            <div className="block col-3 pl-0" onClick={redirectToGeneralRenewalReports}>
               <div className="text-center mt-4">
                  <p className="h6 home_reports_title">General Insurance Renewal Transactions</p>
                  <h1>{generalRenewalCount.length}</h1>
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-center"><h4 className="my-4">Annual Reports</h4></div>
         <div className="chart mb-4">
            <div><BarChart lifeData={chartLifeInput} title="Life Insurance Revenue in Lakhs" bg="#1c78e2" /></div>
            <h4 className="my-1 text-center">Life Insurance Revenue</h4>
            <div className="mt-5"><BarChart lifeData={chartGeneralInput} title="General Insurance Revenue in Lakhs" bg="#044896" /></div>
            <h4 className="my-1 text-center">General Insurance Revenue</h4>
            <div className="mt-5"><BarChart lifeData={lifeComissionData} title="commission earned in Lakhs" bg="#1c78e2" /></div>
            <h4 className="my-1 text-center">Life Insurance Payouts</h4>
            <div className="mt-5"><BarChart lifeData={generalCommissionData} title="commission earned in Lakhs" bg="#044896" /></div>
            <h4 className="my-1 text-center">General Insurance Payouts</h4>
         </div>
      </div>
   )
}

export default Home
