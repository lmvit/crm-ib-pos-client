import React, { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import 'jspdf-autotable';
import jspdf from 'jspdf';
import logo from './logo';
import {HiOutlineDocumentDownload} from 'react-icons/hi';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function InsuranceReportsTable() {
   const urlActive = window.location.pathname.slice(1);
   const [data,setData] = useState([]);
   const history = useLocation();
   useEffect(() => {
     setData(history.state.responseData);
   }, [data, history.state.responseData]);
   
   const exportPDF = async() => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "landscape"; // portrait or landscape

      const doc = new jspdf(orientation, unit, size);
      doc.addImage(logo(), 630, 0, 200, 100);
      doc.setFont('helvetica');
      doc.setFontSize(13)
     urlActive==='pos-life-reports'? doc.text('Life Insurance Reports',350,85):doc.text('General Insurance Reports',350,85)
      doc.autoTable({ 
         html: '#reports-table',
         theme: 'grid',
         useCss : true,
         startY : 100,
         margin : {left : 4,right:4},
      });
      
      doc.save(urlActive==='pos-life-reports' ? 'Life Insurance Reports.pdf' : 'General Insurance Reports.pdf')
   }

   const downloadPdf = ()=>{
      exportPDF();
   }
  
   return (
      <>
         <div className="icon-pdf d-flex justify-content-left"></div>
         <div className="d-flex justify-content-center mb-2">
            {urlActive === "pos-life-reports" ? <h3>Life Insurance POS Reports</h3>:<h3>General Insurance POS Reports</h3>}
         </div>
         <div className="table-responsive">
            <table id="reports-table" className="table table-striped p-0" style={{ borderCollapse: 'initial',fontSize:'12px' }}>
               <thead className="text-white p-0">
                  <tr>
                     <td className="p-1">Tran&nbsp;ID</td>
                     <td className="p-1">Tran&nbsp;Date</td>
                     <td className="p-1">POS&nbsp;ID</td>
                     <td className="p-1">Cust&nbsp;ID</td>
                     <td className="p-1">Cust&nbsp;Name</td>
                     <td className="p-1">Plan</td>
                     <td className="p-1">Premium</td>
                     {urlActive==='pos-life-reports'?<td className="p-1">Premium Frequency</td>:<td className="p-1">Sub&nbsp;Type</td>}
                     <td className="p-1">Payment</td>
                     {/* <td className="p-1">Reference</td> */}
                     {urlActive==='pos-life-reports' ?<td className="p-1">Appilication</td>:null}
                     <td className="p-1">Account</td>
                     <td className="p-1">Cheque Number</td>
                     <td className="p-1">Cheque Account</td>
                     {urlActive==='pos-life-reports' ?<td className="p-1">Policy Term</td>:<td className="p-1">Policy Tenure</td>}
                     <td className="p-1">Policy Number</td>
                     
                  </tr>
               </thead>
               <tbody className="p-0">
                  {data.map((obj,index)=>{
                     return(
                        <tr key={index}>
                           {urlActive==='pos-life-reports'?<td className="p-1">{`POSL${obj.id}`}</td>:<td className="p-1">{`POSG${obj.id}`}</td>}
                           <td className="p-1">{new Date(obj.date_of_entry).toLocaleDateString('en-GB')}</td>
                           <td className="text-uppercase p-1">{obj.submitted_pos_id.toLocaleUpperCase()}</td>
                           <td className="p-1 text-uppercase">{obj.customer_id}</td>
                           <td className="text-capitalize p-1">{obj.customer_name}</td>
                           <td className="p-1">{obj.plan_name.toLocaleUpperCase()}</td>
                           <td className="p-1">{obj.net_premium}</td>
                           {urlActive==='pos-life-reports'?<td className="text-center p-1">{obj.premium_payment_mode}</td>:<td className="p-1">{obj.sub_type}</td>}
                           <td className="text-center p-1">{obj.mode_of_payment}</td>
                           {/* {obj.reference_number === "" ? <td className="text-center p-1">&mdash;</td> : <td>{obj.reference_number}</td>} */}
                           { urlActive==='pos-life-reports'?<td className="text-center p-1">{obj.application_number}</td>:null}
                           {obj.account_number === "" ? <td className="text-center p-1">&mdash;</td> : <td>{obj.account_number}</td>}
                           {obj.cheque_number === "" ? <td className="text-center p-1">&mdash;</td> : <td>{obj.cheque_number}</td>}
                           {obj.cheque_account === "" ? <td className="text-center p-1">&mdash;</td> : <td>{obj.cheque_account}</td>}
                           { urlActive==='pos-life-reports'?<td className="text-center p-1">{obj.policy_term}</td>:<td className="text-center p-1">{obj.policy_tenure}</td>}
                           <td className="text-center p-1">{obj.policy_number}</td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
         <div className="d-flex justify-content-center">
            <button onClick={downloadPdf}  className="btn btn-primary mr-2">Download as PDF<HiOutlineDocumentDownload size="1.2em"/></button>
            <ReactHTMLTableToExcel
               id="reports-table"
               className="btn btn-success"
               table="reports-table"
               filename="reportsxls"
               sheet="reports"
               buttonText='Download as Excel'
            />
         </div>
         
      </>
   )
}

export default InsuranceReportsTable
