import axios from 'axios';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import CrmforPosService from '../config/index';
import { useHistory } from 'react-router-dom';

function GeneralInsuranceTransactions(props) {

    const history = useHistory();
    const redirectPolicy = (number,mobile) => {
        const token = sessionStorage.getItem('token');
        
        const obj = {
            customerData: props.customerData,
            policyNumber: number
        }

        axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/get-policy-count/${number}`, { headers: { Authorization: token } })
            .then(res => {
                if (res.data[0].count >= '1') {
                    axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/check-transaction-dues/${number}`, { headers: { Authorization: token } })
                        .then(res => {
                            if (res) {
                                const date = new Date(res.data.renewalDate);
                                const currentDate = new Date();
                                if (date >= currentDate) {
                                    alert('No pending dues till ' + new Date(res.data.renewalDate).toLocaleDateString('en-GB', { dateStyle: 'long' }));
                                    // setActive(true);
                                } else {
                                    const result = window.confirm('Click ok to submit your renewal transaction details');
                                    if (result) {
                                        history.push({
                                            pathname: `/home/business-transaction/renewal-general-insurance-transaction`,
                                            state: obj
                                        })
                                    }
                                }
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
    }

    return (
        <>
            <h5 className="text-center mt-5">Customer Policy Details</h5>
            <div className="table-responsive p-1">
                <table className="table table-striped table-hover" style={{ borderCollapse: 'initial' }}>
                    <thead className="text-white">
                        <tr>
                            <th>S.no</th>
                            <th>Customer&nbsp;Name</th>
                            <th>Mobile&nbsp;Number</th>
                            <th>Policy&nbsp;Number</th>
                            <th>Date&nbsp;of&nbsp;Policy&nbsp;Login</th>
                            <th>Plan&nbsp;Name</th>
                            <th>Type&nbsp;of&nbsp;Business</th>
                            <th>Txn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((element, index) => {
                            return (
                                <tr key={index + 'ab'}>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">{element.customer_name}</td>
                                    <td>{element.customer_mobile}</td>
                                    <td>{element.policy_number}</td>
                                    <td>{new Date(element.date_of_policy_login).toLocaleDateString('en-GB')}</td>
                                    <td className="text-uppercase">{element.plan_name}</td>
                                    <td>{element.type_of_business}</td>
                                    <td><BsArrowRight size="2em" onClick={() => redirectPolicy(element.policy_number,element.customer_mobile)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GeneralInsuranceTransactions;
