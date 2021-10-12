import React from 'react';
import {BsArrowRight} from  'react-icons/bs'

function ReportsTable(props) {
   console.log(props.data)
   return (
      <>
          <div className="container-fluid p-0">
         <h4 className="text-center m-3">{props.title} Insurance Reports</h4>
         <div className="table-responsive p-1">
            <table className="table table-striped text-white c0l-12 p-0" style={{borderCollapse:"initial"}}>
               <thead>
                  <tr>
                     <th>S.no</th>
                     <th>Customer&nbsp;ID</th>
                     <th>Customer&nbsp;Name</th>
                     <th>Date Of Birth</th>
                     <th>Mobile&nbsp;Number</th>
                     <th>Policy&nbsp;Number</th>
                     <th>Premium&nbsp;Payment&nbsp;Mode</th>
                     <th>Renewal&nbsp;Date</th>
                     <th>Txn</th>
                  </tr>
               </thead>
               <tbody className="text-dark">
                  {props.data.map((obj,index)=>{
                     return(
                        <tr className={props.date > obj.renewal_date ? "table-warning": "table-success"} key={index}>
                           <td className="text-center">{index+1}<sub>&#8226;</sub></td>
                           <td className="text-uppercase">{obj.customer_id}</td>
                           <td className="text-capitalize">{obj.customer_name}</td>
                           <td>{new Date(obj.dob).toLocaleDateString('en-GB')}</td>
                           <td>{obj.customer_mobile}</td>
                           <td>{obj.policy_number}</td>
                           <td className="text-center">{obj.premium_payment_mode}</td>
                           <td>{new Date(obj.renewal_date).toLocaleDateString('en-GB')}</td>
                           <td><BsArrowRight size="1.3em"  onClick={() => props.redirect(obj,obj.policy_number)}/></td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>

      </div>

      </>
   )
}

export default ReportsTable
