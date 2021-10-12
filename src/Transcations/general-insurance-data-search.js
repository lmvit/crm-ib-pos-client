import React, { useRef, useContext, useState, useEffect } from 'react'
import axios from 'axios';
import CrmforPosService from '../config/index';
import { UserContext } from '../pos/posHome';
import { useHistory } from 'react-router-dom';
import GeneralInsuranceTransactions from './general-insurance-transactions';

function GeneralInsuranceDataSearch() {
    const history = useHistory();
    const [customerData, setCustomerData] = useState([]);
    const [active, setActive] = useState(false);
    const [data, setData] = useState([]);
    const inputValue = useRef(null);
    const posId = useContext(UserContext);

    useEffect(() => {
        const searchInput = inputValue.current.value;
        callbacks();
    }, [customerData]);

    function callbacks() {
        const token = sessionStorage.getItem('token');
        // console.log(customerData);
        if (customerData.length > 0) {
            axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/get-policy-count-by-pan/${customerData[0].pancard}`, { headers: { Authorization: token } })
                .then(res => {
                    if (res.data[0].count === '0') {
                        history.push({
                            pathname: `/home/general-insurance-transactions-data`,
                            state: customerData
                        })
                    } else {
                        axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/get-general-last-transaction/${customerData[0].pancard}`, { headers: { Authorization: token } })
                            .then(res => {
                                if (res.data[0].type_of_business === 'rollover' || res.data[0].type_of_business === 'cancelled') {
                                    history.push({
                                        pathname: `/home/general-insurance-transactions-data`,
                                        state: customerData
                                    })
                                } else {
                                    axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/get-customer-policies/${customerData[0].pancard}`, { headers: { Authorization: token } })
                                        .then(res => {
                                            if (res.data.length > 0) {
                                                setActive(true);
                                                setData(res.data);
                                                // console.log(res.data);
                                            } else {
                                                history.push({
                                                    pathname: `/home/general-insurance-transactions-data`,
                                                    state: customerData
                                                })
                                            }
                                        })
                                        .catch(err => console.log(err))
                                }
                            })
                    }
                })
                .catch(err => console.log(err))
        }
    }


    const onSubmitHandler = () => {
        if (inputValue.current.value.length <= 0) {
            window.alert('Please Enter Mobie Number or Aadhar Number or Pan Number');
            return false;
        } else {
            const token = sessionStorage.getItem('token');
            const searchInput = inputValue.current.value;
            axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/life-transactions/customer-details/${searchInput}`, { headers: { Authorization: token } })
                .then(res => {
                    if (res.data.message === 'customer exists') {
                        const result = window.alert(res.data.message + ' ' + `please wait redirecting`);
                        setCustomerData(res.data.data)
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
                            <input type="button" className="btn btn-dark ml-2" value="submit" onClick={onSubmitHandler} />
                        </div>
                    </form>
                </div>
            </div>
            {active && <GeneralInsuranceTransactions data={data} customerData={customerData} />}
        </>
    )
}

export default GeneralInsuranceDataSearch;
