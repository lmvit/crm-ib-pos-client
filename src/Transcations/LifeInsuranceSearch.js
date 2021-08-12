import React,{useRef,useContext,useState} from 'react'
import axios from 'axios';
import CrmforPosService from '../config/index';
import { UserContext } from '../pos/posHome';
import {useHistory} from 'react-router-dom';

function LifeInsuranceSearch() {
   const history = useHistory();
   const inputValue = useRef(null);
   const posId = useContext(UserContext);
   const urlActive = window.location.pathname.slice(27);
   // console.log(urlActive)
   const onSubmitHandler = () =>{
      if(inputValue.current.value.length <= 0){
         window.alert('Please Enter Mobie Number or Aadhar Number or Pan Number');
         return false;
      }else{
         const searchInput = inputValue.current.value;
         let path;
         if (urlActive === 'life-insurance-transaction') {
            path = '/home/life-insurance-transactions-data'
         } else {
            path ='/home/general-insurance-transactions-data'
         }
         axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/life-transactions/customer-details/${searchInput}/${posId}`)
         .then(res=>{
            if(res.data.message === 'customer exists'){
               window.alert(res.data.message);
               console.log(path)
               history.push({
                  pathname:`${path}`,
                  state: res.data.data
              })
            }else if(res.data.message === 'customer aadhar number not exists'){
               window.alert(res.data.message)
            }else if(res.data.message === 'customer mobile number not exists'){
               window.alert(res.data.message);
            }else if(res.data.message === 'customer pancard number not exists'){
               window.alert(res.data.message);
            }else if(res.data === 'details not found'){
               window.alert('Please Enter Valid Mobie Number or Aadhar Number or Pan Number')
            }
         })
         .catch(err=>console.log(err))
      }
   }
   return (
      <>
         <div className="container">
            {urlActive === 'life-insurance-transaction' ? <h5 className="text-center my-4">Life Insurance Transction</h5>:<h5 className="text-center my-4">General Insurance Transction</h5>}
            <div>
               <form>
                  <input type="text" ref={inputValue} className="form-control col-12" placeholder="Search by Mobile Number or Aadhar Number or Pan Number"/>
                  <div className="d-flex justify-content-center mt-3">
                     <input type="button" className="btn btn-dark" value="submit" onClick={onSubmitHandler}/>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

export default LifeInsuranceSearch;
