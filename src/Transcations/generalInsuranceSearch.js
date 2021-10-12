import React, { useRef, useContext, useState, useEffect } from 'react'
import axios from 'axios';
import CrmforPosService from '../config/index';
import { UserContext } from '../pos/posHome';
import { useHistory } from 'react-router-dom';

function LifeInsuranceSearch() {
   const history = useHistory();
   const [customerData, setCustomerData] = useState([]);
   const [active, setActive] = useState(true);
   const inputValue = useRef(null);
   const posId = useContext(UserContext);
   const urlActive = window.location.pathname.slice(27);
   useEffect(() => {
      const searchInput = inputValue.current.value;
      // callbacks(searchInput);
   }, [customerData])
   // function callbacks(searchInput) {
   //    const token = sessionStorage.getItem('token');
   //    if (customerData.length > 0) {
   //       axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/check-transaction-count/${searchInput}`, { headers: { Authorization: token } })
   //          .then(res => {
   //             if (res.data.data[0].count === '0') {
   //                history.push({
   //                   pathname: `/home/general-insurance-transactions-data`,
   //                   state: customerData
   //                })
   //             } else {
   //                axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/check-transaction-dues/${searchInput}`, { headers: { Authorization: token } })
   //                   .then(res => {
   //                      if (res) {
   //                         const date = new Date(res.data.renewalDate);
   //                         const currentDate = new Date();
   //                         if (date >= currentDate) {
   //                            alert('No pending dues till ' + new Date(res.data.renewalDate).toLocaleDateString('en-GB', { dateStyle: 'long' }));
   //                            setActive(true);
   //                         }else{
   //                            const result = window.confirm('Click ok to submit your renewal transaction details');
   //                            if(result){
   //                               history.push({
   //                                  pathname: `/home/business-transaction/renewal-general-insurance-transaction`,
   //                                  state: customerData
   //                               })
   //                            }
   //                         }
   //                      }
   //                   })
   //                   .catch(err => console.log(err))
   //             }
   //          }).catch(err => console.log(err))
   //    }
   // }
   const onSubmitHandler = () => {
      if (inputValue.current.value.length <= 0) {
         window.alert('Please Enter Mobie Number or Aadhar Number or Pan Number');
         return false;
      } else {
         const token = sessionStorage.getItem('token');
         const searchInput = inputValue.current.value;
         axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/life-transactions/customer-details/${searchInput}/${posId}`, { headers: { Authorization: token } })
            .then(res => {
               if (res.data.message === 'customer exists') {
                  const result = window.alert(res.data.message + ' ' + `please wait redirecting`);
                  setCustomerData(res.data.data)
                  // setActive(false);
               } else if (res.data.message === 'customer aadhar number not exists') {
                  window.alert(res.data.message)
               } else if (res.data.message === 'customer mobile number not exists') {
                  window.alert(res.data.message);
               } else if (res.data.message === 'customer pancard number not exists') {
                  window.alert(res.data.message);
               } else if (res.data === 'details not found') {
                  window.alert('Please Enter Valid Mobie Number or Aadhar Number or Pan Number')
               }
            }).catch(err => console.log(err))
      }
   }
   return (
      <>
         <div className="container">
            <h4 className="text-center my-5">General Insurance Transaction</h4>
            <div>
               <form>
                  <div className="d-flex justify-content-center">
                     <input type="text" ref={inputValue} className="form-control col-6" placeholder="Search by Mobile Number or Aadhar Number or Pan Number" />
                     {active && <input type="button" className="btn btn-dark ml-2" value="submit" onClick={onSubmitHandler} />}
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}
export default LifeInsuranceSearch;
