import React, { useState, useEffect, useContext } from 'react';
import { Input, Select, DateField, DefaultInput, PermanentInput } from '../helper/Input';
import { Formik, Form } from 'formik';
import ModeOfPayment from './ModeOfPayment';
import { useHistory, useLocation } from 'react-router-dom';
import CrmforPosService from '../config/index';
import axios from 'axios';
import { UserContext } from '../pos/posHome';
import { customerInitialValue, TransactionCustomerFunction } from '../helper/initialValues';
import CustomerData from './CustomerData';
import AlertDialog from './components/Dailog';
import { RenewalGeneralValidationFunction } from '../helper/validations';

function RenewalGeneralInsuranceTransaction() {
    const [mop, setMop] = useState('');
    const location = useLocation();
    const history = useLocation();
    const posId = useContext(UserContext);
    const [data, setData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [popup, setPopup] = useState({ open: false, message: "", color: "info" }); /////Color : warning, success, error, info
    const [saveTransactionsDailog, setSaveTransactionsDailog] = useState({ open: false, message: "saveTransactions", id: null, pending: false });
    console.log(location.state)
    useEffect(async () => {
        const token = sessionStorage.getItem('token');
        if(location.state.business === 'renewal'){
            if (posId) {
                !location.state.customerData.customer_pan  && alert("Please go back and select transaction again.");
                axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/pan-number`, { pan_number: location.state.customerData.customer_pan, pos_id: posId }, { headers: { Authorization: token } })
                    .then(res => setCustomerData(TransactionCustomerFunction(res.data.data)))
                    .catch(error => console.log(error))
            }
        }else{
            const token = sessionStorage.getItem('token');
            if (posId) {
                !location.state.customerData[0].pancard && alert("Please go back and select transaction again.");
                axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/pan-number`, { pan_number: location.state.customerData[0].pancard, pos_id: posId }, { headers: { Authorization: token } })
                    .then(res => setCustomerData(TransactionCustomerFunction(res.data.data)))
                    .catch(error => console.log(error))
            }
        }
    }, [location.state, posId]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/get-general-insurance-policy-details/${location.state.policyNumber}`, { headers: { Authorization: token } })
            .then(res => setData({
                company_name: res.data[0].company_name,
                product_name: res.data[0].product_name,
                type_of_insurance: res.data[0].type_of_insurance,
                sub_type: res.data[0].sub_type,
                plan_type: res.data[0].plan_type,
                plan_name: res.data[0].plan_name,
                gross_premium: res.data[0].gross_premium,
                net_premium: res.data[0].net_premium,
                policy_number: res.data[0].policy_number,
                policy_type: res.data[0].policy_type,
                policy_tenure: res.data[0].policy_tenure,
                date_of_policy_login: new Date(res.data[0].date_of_policy_login).toLocaleDateString('en-GB'),
                premium_payment_mode: res.data[0].premium_payment_mode,
                mode_of_payment: res.data[0].mode_of_payment,
                revenue: res.data[0].revenue
            }))
            .catch(err => console.log(err))
    }, []);

    const initialValues = {
        company_name: data.company_name,
        product_name: data.product_name,
        type_of_insurance: data.type_of_insurance,
        sub_type: data.sub_type,
        plan_type: data.plan_type,
        plan_name: data.plan_name,
        gross_premium: data.gross_premium,
        net_premium: data.net_premium,
        policy_number: data.policy_number,
        policy_type: data.policy_type,
        policy_tenure: data.policy_tenure,
        date_of_policy_login: data.date_of_policy_login,
        premium_payment_mode: data.premium_payment_mode,
        type_of_business: '',
        mode_of_payment: data.mode_of_payment,
        stage: '',
        date_of_entry: '',
        revenue: data.revenue,
        account_number: "",
        cheque_number: "",
        cheque_account: "",
        cheque_date: null,
        bank_name: "",
        reference_number: ""
    }

    const onSubmit = async (values) => {
        const token = sessionStorage.getItem('token');
        if (values.type_of_business === 'rollover' || values.type_of_business === 'cancelled') {
            const result = window.confirm(`policy number will ${values.policy_number} be a ${values.type_of_business},  Please confirm once ${values.type_of_business} cannot be updated.`)
           if(result){
            axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/update-policy-rollover-or-cancelled/${values.policy_number}/${values.type_of_business}`,{headers:{Authorization:token}})
            .then(res=>alert(res.data))
            .catch(err=>console.log(err))
           }
        } else {
            const extraInformation = {
                customer_mobile: customerData.mobile,
                customer_aadhar: customerData.aadhar_number,
                customer_pan: customerData.pan_number,
                customer_name: `${customerData.first_name} ${customerData.last_name}`,
                submitted_pos_id: posId
            }
            const transactionDetails = { ...values, ...extraInformation };

            const { data: { transaction_id } } = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/add-transaction', transactionDetails, { headers: { Authorization: token } });

            if (transaction_id && transactionDetails.policy_number && transactionDetails.stage) {
                setSaveTransactionsDailog({ open: true, id: transaction_id, pending: false });
            } else {
                setSaveTransactionsDailog({ open: true, id: transaction_id, pending: true });
            }
        }
    }

    const dailogClose = () => {
        setSaveTransactionsDailog({ open: false });
        history.push({ pathname: '/home/business-transaction/general-insurance-transaction' });
    }


    return (
        <>
            <h5 className="text-center mt-4">Customer Details</h5>
            <Formik enableReinitialize initialValues={customerData} >
                <div className='px-3'>
                    <Form>
                        <CustomerData />
                    </Form>
                </div>
            </Formik>
            <h5 className="text-center pt-2">Renewal General Insurance Transaction</h5>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={RenewalGeneralValidationFunction(mop)}
            >
                {formik => {
                    return (
                        <Form>
                            <div className="d-flex flex-wrap pt-0">
                                <DefaultInput name="company_name" label="Company Name" />
                                <DefaultInput name="product_name" label="product Name" />
                                <DefaultInput name="type_of_insurance" label="Type of Insurance" />
                                <DefaultInput name="sub_type" label="Sub Type" />
                                <DefaultInput name="plan_type" label="Plan Type" />
                                <DefaultInput name="plan_name" label="Plan Name" />
                                <DefaultInput name="gross_premium" label="Gross Premium" />
                                <DefaultInput name="net_premium" label="Net Premium" />
                                <DefaultInput name="policy_type" label="Policy Type" />
                                <DefaultInput name="policy_tenure" label="Policy Tenure" />
                                <DefaultInput name="date_of_policy_login" label="Date of Policy Login" />
                                <DefaultInput name="premium_payment_mode" label="Premium Payment Mode" />
                                {/* <DefaultInput name="type_of" label=""/> */}
                                <DefaultInput name="policy_number" label="Policy Number" />
                                <Select name="type_of_business" label="Type of Business" required>
                                    <option value="">Select</option>
                                    <option value="renewal">Renewal</option>
                                    <option value="rollover">Rollover</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                                <Select name="mode_of_payment" label="Mode of Payment" required handler={setMop} >
                                    <option value="">select</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="DD">DD</option>
                                    <option value="Online">Online</option>
                                    <option value="Cash">Cash</option>
                                </Select>
                                {
                                    formik.values.mode_of_payment && ModeOfPayment(formik.values.mode_of_payment)
                                }
                                <DateField name="date_of_entry" label="Date of Entry" required />
                                <Select name="stage" label="Stage" required>
                                    <option value="">Select</option>
                                    <option value="renewal">Renewal</option>
                                    <option value="rollover">Rollover</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                                <DefaultInput name="revenue" label="Revenue" />
                            </div>
                            <input type="submit" className="btn btn-dark ml-lg-3 mb-4" />
                        </Form>
                    )
                }}
            </Formik>
            {saveTransactionsDailog ? <AlertDialog dailog={saveTransactionsDailog} close={dailogClose} /> : null}
        </>
    )
}

export default RenewalGeneralInsuranceTransaction
