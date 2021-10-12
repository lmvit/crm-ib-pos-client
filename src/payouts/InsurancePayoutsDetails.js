import React, { useState,useEffect } from 'react';
import 'jspdf-autotable';
import jspdf from 'jspdf';
import logo from '../posReports/logo';
import {HiOutlineDocumentDownload} from 'react-icons/hi';
import {addMonths} from 'date-fns';

function LifeInsurancePayouts(props) {
    const fromDate = props.dates.from_date;
    const toDate = props.dates.to_date;

    const exportPDF = (path)=>{
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape  
        const doc = new jspdf(orientation,unit,size);
        doc.addImage(logo(), 630, 0, 200, 100);
        doc.setFont('helvetica');
        doc.setFontSize(11)
        doc.text('Dear Sir/Madam',10,45)
        doc.text('Thanking you For Supporting LMV',10,60)
        {path === 'life-insurance-payouts' ? doc.text(`Please find the below mention case done on ${new Date(props.dates.from_date).toLocaleDateString('en-GB',{dateStyle:'long'})} to ${new Date(props.dates.to_date).toLocaleDateString('en-GB',{dateStyle:'long'})} this payment Release On ${new Date(fromDate).getDate() >= 1 && new Date(toDate).getDate() <=15 ? '10' : '26'} ${addMonths(new Date(props.dates.from_date),1).toLocaleDateString('en-GB',{year:'numeric',month:'long'})}.`,10,75) : 
        doc.text(`Please find the below mention case done on ${new Date(props.dates.from_date).toLocaleDateString('en-GB',{dateStyle:'long'})} to ${new Date(props.dates.to_date).toLocaleDateString('en-GB',{dateStyle:'long'})} this payment Release On ${new Date(fromDate).getDate() === 1 && new Date(toDate).getDate() === new Date(new Date(props.dates.to_date).getFullYear(), new Date(props.dates.to_date).getMonth() + 1, 0).getDate() ? '26' : null} ${addMonths(new Date(props.dates.from_date),1).toLocaleDateString('en-GB',{year:'numeric',month:'long'})}.`,10,75)}
        doc.text('Bank Details Also Attached Please Check and Confirm Once',10,90)
        doc.autoTable({ 
            html: '#reports-table',
            theme: 'grid',
            useCss : true,
            startY : 120,
            margin : {left : 10,right:10},
         });
         let finalY = doc.lastAutoTable.finalY;
         doc.text(10,finalY+20,'Please Find the Bank Account Details')
         doc.text(10,finalY+35,'Account Holder Name:'+' '+props.account[0].first_name.toLocaleUpperCase()+" "+props.account[0].last_name.toLocaleUpperCase())
         doc.text(10,finalY+50,'Account No:'+' '+props.account[0].account_number)
         doc.text(10,finalY+65,'IFSC Code:'+' '+props.account[0].ifsc_code.toLocaleUpperCase())
         doc.text(10,finalY+80,'Pan No:'+' '+props.account[0].pancard.toLocaleUpperCase())
         doc.text(10,finalY+95,'Thanking you')
         doc.text(10,finalY+110,'Regards')
         doc.text(10,finalY+125,'LMV Insurance Broking Services')
         doc.text(10,finalY+140,'9493326920')

        {path === 'life-insurance-payouts' ? doc.save(`${props.account[0].first_name} ${props.account[0].last_name} ${new Date(fromDate).getDate() === 1 && new Date(toDate).getDate() <= 15 ? 'Start' : 'End'} of ${addMonths(new Date(props.dates.from_date),1).toLocaleDateString('en-GB',{year:'numeric',month:'long'})}`) : 
        doc.save(`${props.account[0].first_name.toLocaleUpperCase()} ${props.account[0].last_name.toLocaleUpperCase()} of ${addMonths(new Date(props.dates.from_date),1).toLocaleDateString('en-GB',{year:'numeric',month:'long'})}`)}
    }
    const downloadPdf = ()=>{
        exportPDF(props.path);
     }

     const calculateTotal=(data)=>{
        return data.reduce((accumulator,currentValue)=>{
            return currentValue.net_premium * (Number(currentValue.pos_rate)/100) + accumulator
        }, 0)
     }

     const getTds= ()=>{
        switch (props.personType) {
            case "individual":
              return 1;
              break;
            case "non-individual":
              return 2;
              break;
            default:
              break;
          }
     }
   
    return (
        <>
            <div className="table-responsive p-2">
                {props.data.length > 0 ?<table id="reports-table" className="table table-hover table-striped" style={{borderCollapse:'initial',fontSize:'12px'}}>
                    <thead className="text-white">
                        <tr>
                            <th>S.no</th>
                            <th>Customer&nbsp;Name</th>
                            <th>Policy&nbsp;Number</th>
                            <th>Plan&nbsp;Name</th>
                            <th>Mode</th>
                            {props.path === 'life-insurance-payouts'? <th>Policy&nbsp;Term</th>:<th>Policy&nbsp;Tenure</th>}
                            {props.path === 'life-insurance-payouts'? <th>PPT</th>:<th>Type&nbsp;of&nbsp;Insurance</th>}
                            <th>Premium</th>
                            <th>Rate</th>
                            <th>Date&nbsp;of&nbsp;issue</th>
                            <th>Date&nbsp;of&nbsp;Entry</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((element,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{element.customer_name.toLocaleUpperCase()}</td>
                                    <td>{element.policy_number}</td>
                                    <td>{element.plan_name.toLocaleUpperCase()}</td>
                                    <td>{element.premium_payment_mode}</td>
                                    {props.path === 'life-insurance-payouts'?<td>{element.policy_term}</td>:<td>{element.policy_tenure}</td>}
                                    {props.path === 'life-insurance-payouts'? <td>{element.premium_payment_term}</td>:<td>{element.type_of_insurance}</td>}
                                    <td>{element.net_premium}</td>
                                    <td>{element.pos_rate}</td>
                                    {props.path === 'life-insurance-payouts'? <td>{new Date(element.policy_issue_date).toLocaleDateString('en-GB')}</td>:
                                    <td>{new Date(element.date_of_policy_login).toLocaleDateString('en-GB')}</td>}
                                    <td>{new Date(element.date_of_entry).toLocaleDateString('en-GB')}</td>
                                    <td>{element.net_premium* Number(element.pos_rate/100)}</td>
                                </tr>
                            )
                        })} 
                        <tr>
                            <td colSpan="11" className="text-right">Total</td>
                            <td>{calculateTotal(props.data)}</td>
                        </tr>
                        <tr>
                            <td colSpan="11" className="text-right">TDS</td>
                            <td>{Number(calculateTotal(props.data))*Number(getTds()/100)}</td>
                        </tr>
                        <tr>
                            <td colSpan="11" className="text-right">Net Pay</td>
                            <td>{calculateTotal(props.data)-(calculateTotal(props.data))*Number(getTds()/100)}</td>
                        </tr>
                    </tbody>
                </table>:null}
            </div> 
            {props.path === 'life-insurance-payouts'? <div>
                {new Date(props.dates.from_date).getDate() === 1 && new Date(props.dates.to_date).getDate() === 15 && props.data.length > 0 || new Date(props.dates.from_date).getDate() === 16 && new Date(props.dates.to_date).getDate() === new Date(new Date(props.dates.to_date).getFullYear(), new Date(props.dates.to_date).getMonth() + 1, 0).getDate() && props.data.length > 0 ?
                    <div className="d-flex justify-content-center">
                        <button onClick={downloadPdf} className="btn btn-primary mr-2">Download as PDF<HiOutlineDocumentDownload size="1.2em" /></button>
                    </div> : null}
            </div>: 
            <div>
                {new Date(props.dates.from_date).getDate() === 1  && new Date(props.dates.to_date).getDate() === new Date(new Date(props.dates.to_date).getFullYear(), new Date(props.dates.to_date).getMonth() + 1, 0).getDate() && props.data.length > 0 ?
                    <div className="d-flex justify-content-center">
                        <button onClick={downloadPdf} className="btn btn-primary mr-2">Download as PDF<HiOutlineDocumentDownload size="1.2em" /></button>
                    </div> : null}
            </div>
            }
        </>
    )
}

export default LifeInsurancePayouts
