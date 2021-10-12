import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form } from 'formik';
import { Input, Select, DateField, DefaultInput,PermanentInput } from '../helper/Input';
import { useLocation,useHistory } from 'react-router-dom';
import CrmforPosService from '../config/index';
import  {RenewalLifeValidationFunction} from '../helper/validations';
import CustomerData from './CustomerData';
import axios from 'axios';
import { UserContext } from '../pos/posHome';
import { customerInitialValue, TransactionCustomerFunction } from '../helper/initialValues';
import PopUp from './components/PopUp';
import AlertDialog from './components/Dailog';
import ModeOfPayment from './ModeOfPayment';

function RenewalLifeInsuranceTransaction() {
    const [customerData, setCustomerData] = useState({ ...customerInitialValue });
    const location = useLocation();
    const [mop, setMop] = useState('');
    const [data, setData] = useState([]);
    const posId = useContext(UserContext);
    const [popup, setPopup] = useState({ open: false, message: "", color: "info" }); /////Color : warning, success, error, info
    const [saveTransactionsDailog, setSaveTransactionsDailog] = useState({ open: false, message: "saveTransactions", id: null, pending: false });
    const history = useHistory();

    useEffect(async () => {
        const token = sessionStorage.getItem('token');
        if (posId) {
            !location.state[0].pancard && alert("Please go back and select transaction again.");
            axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/pan-number`, { pan_number: location.state[0].pancard, pos_id: posId },{headers:{Authorization:token}})
            .then(res=>setCustomerData(TransactionCustomerFunction(res.data.data)))
            .catch(error=>console.log(error))
        }
    }, [location.state, posId])

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/life-transactions/get-life-insurance-policy-details/${location.state[0].pancard}`, { headers: { Authorization: token } })
            .then(res => {
                setData({
                    application_number : res.data[0].application_number,
                    company_name: res.data[0].company_name,
                    product_name: res.data[0].product_name,
                    plan_type: res.data[0].plan_type,
                    plan_name: res.data[0].plan_name,
                    premium_payment_term: Number(res.data[0].premium_payment_term),
                    policy_term: res.data[0].policy_term,
                    gross_premium: res.data[0].gross_premium,
                    net_premium: res.data[0].net_premium,
                    date_of_entry: '',
                    premium_payment_mode: res.data[0].premium_payment_mode,
                    type_of_business: res.data[0].type_of_business,
                    mode_of_payment: '',
                    policy_number: res.data[0].policy_number,
                    stage: '',
                    policy_issue_date: new Date(res.data[0].policy_issue_date).toLocaleDateString('en-GB'),
                    revenue: res.data[0].revenue,
                    account_number: "",
                    cheque_number: "",
                    cheque_account: "",
                    cheque_date: null,
                    bank_name: "",
                    reference_number: ""
                })
            })
            .catch(err => console.log(err))
    }, []);

    const initialValues = {
        application_number : '',
        company_name: data.company_name,
        product_name: data.product_name,
        plan_type: data.plan_type,
        plan_name: data.plan_name,
        premium_payment_term: data.premium_payment_term,
        policy_term: data.policy_term,
        gross_premium: data.gross_premium,
        net_premium: data.net_premium,
        date_of_entry: '',
        premium_payment_mode: data.premium_payment_mode,
        type_of_business: data.type_of_business,
        mode_of_payment: '',
        policy_number: data.policy_number,
        stage: '',
        policy_issue_date: data.policy_issue_date,
        revenue: data.revenue,
        account_number: "",
        cheque_number: "",
        cheque_account: "",
        cheque_date: null,
        bank_name: "",
        reference_number: ""
    }

    const onSubmit = async(values) => {
        console.log(values);
        const token = sessionStorage.getItem('token');
        const extraInformation = {
            customer_mobile: customerData.mobile,
            customer_aadhar: customerData.aadhar_number,
            customer_pan: customerData.pan_number,
            customer_name: `${customerData.first_name} ${customerData.last_name}`,
            submitted_pos_id: posId
        }
        const transactionDetails = { ...values, ...extraInformation };
        
        const { data: { transaction_id } } = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/add-transaction', transactionDetails,{headers:{Authorization:token}});
        if (transaction_id  && transactionDetails.policy_number && transactionDetails.stage) {
            setSaveTransactionsDailog({ open: true, id: transaction_id, pending: false });
        } else {
            setSaveTransactionsDailog({ open: true, id: transaction_id, pending: true });
        }
    }

   
    const dailogClose = () => {
        setSaveTransactionsDailog({ open: false });
        history.push({ pathname: '/home/business-transaction/life-insurance-transaction' });
    }
    
    return (
        <div>
            <h4 className="text-center pt-2">Customer Details</h4>
            <Formik enableReinitialize initialValues={customerData} >
                <div className='px-3'>
                    <Form>
                        <CustomerData/>
                    </Form>
                </div>
            </Formik>
            <h4 className="text-center py-2">Renewal Life Insurance Transaction</h4>
            <Formik 
            initialValues={initialValues}
            onSubmit = {onSubmit}
            validationSchema={RenewalLifeValidationFunction(mop)}
            enableReinitialize
            >
                {formik => {
                    return (
                        <Form>
                            <div className="d-flex flex-wrap">
                                <PermanentInput type="text" name="application_number" label ="Application Number" classes="col-12 col-md-6 col-lg-4"/>
                                <DefaultInput name="company_name" label="Company Name" />
                                <DefaultInput name="product_name" label="Product Name" />
                                <DefaultInput name="plan_type" label="Plan Type" />
                                <DefaultInput name="plan_name" label="Plan Name" />
                                <DefaultInput name="premium_payment_term" label="Premium Payment Term" />
                                <DefaultInput name="policy_term" label="Policy  Term" />
                                <DefaultInput name="gross_premium" label="Gross Premium" />
                                <DefaultInput name="net_premium" label="Net Premium" />
                                <DefaultInput name="premium_payment_mode" label="Premium Payment Mode" />
                                <Select name="type_of_business" label="Type of Business" required>
                                    <option value="">select</option>
                                    {new Array(initialValues.premium_payment_term).fill(0).map((element,index)=>{
                                        return(
                                            <option value={index+1+" "+"year"} key={index}>{index+1} year</option>
                                        )
                                    })}
                                </Select>
                                <DefaultInput name="policy_number" label="Policy Number" />
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
                                    <option value="lapse">Lapse</option>
                                </Select>
                                <DefaultInput name="policy_issue_date" label="Policy Issue Date" />
                                <DefaultInput name="revenue" label="Revenue" />
                            </div>
                            <input type="submit" className="btn btn-dark ml-lg-3 mb-5"/>
                        </Form>
                    )
                }}
            </Formik>
            <PopUp popup={popup} />
            {saveTransactionsDailog ? <AlertDialog dailog={saveTransactionsDailog} close={dailogClose} /> : null}
        </div>
    )
}

export default RenewalLifeInsuranceTransaction;
