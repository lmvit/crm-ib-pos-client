/*eslint-disable*/
import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { Formik, Form } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import { Input, Select, DateField, DefaultInput, OptionsSelect } from '../helper/Input';
import { LifeValidationFunction } from '../helper/validations';
import PopUp from './components/PopUp';
import AlertDialog from './components/Dailog';
import { customerInitialValue, LifeInitialValueFunction, TransactionCustomerFunction } from '../helper/initialValues';
import axios from 'axios';
import CrmforPosService from '../config/index';
import { UserContext } from '../pos/posHome';

const LifeInsuranceTransaction = () => {
    const [customerData, setCustomerData] = useState({ ...customerInitialValue });
    const [mop, setMop] = useState('');
    const [companies, setCompanies] = useState([]);
    const [products, setProduct] = useState([]);
    const [planType, setPlanType] = useState([]);
    const [planName, setPlanName] = useState([])
    const [pptRevenue, setPptRevenue] = useState([])
    const [ppt, setPpt] = useState('')
    const [revenue, setRevenue] = useState('')
    const [netPremium, setNetPremium] = useState('')
    const [filesInput, setFilesInput] = useState(false)
    const location = useLocation();
    const [files, setFiles] = useState({});
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ open: false, message: "", color: "info" }); /////Color : warning, success, error, info
    const [saveTransactionsDailog, setSaveTransactionsDailog] = useState({ open: false, message: "saveTransactions", id: null, pending: false });

    const pdfRef1 = useRef(null);
    const pdfRef2 = useRef(null);
    const posId = useContext(UserContext);

    useEffect(async () => {
        const token = sessionStorage.getItem('token');
        if (posId) {
            !location.state[0].pancard && alert("Please go back and select transaction again.");
            axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/pan-number`, { pan_number: location.state[0].pancard, pos_id: posId },{headers:{Authorization:token}})
            .then(res=>setCustomerData(TransactionCustomerFunction(res.data.data)))
            .catch(error=>console.log(error))
        }
    }, [location.state, posId])

    useEffect(async () => {
        try {
            let companiesArray = [];
            const fetchProduct = await axios.get(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/companies');
            if (fetchProduct.data.status === 200) {
                fetchProduct.data.data.map((item, index) => {
                    companiesArray.push(item.company_name);
                })
            }
            setCompanies([...new Set(companiesArray)]);
        } catch (e) {
            alert("Something went wrong. Please try again!!!")
        }
    }, [])


    const mopHandler = (value) => {
        switch (value) {
            case "Cheque":
                return <Fragment>
                    <Input name="cheque_number" label="Cheque Number" required />
                    <Input name="cheque_account" label="Cheque Account" required />
                    <DateField name="cheque_date" label="Cheque Date" required />
                    <Input name="bank_name" label="Bank Name" required />
                </Fragment>
            case "DD":
                return <Fragment>
                    <Input name="account_number" label="Account Number" required />
                    <Input name="cheque_number" label="Cheque Number" required />
                    <Input name="cheque_account" label="Cheque Account" required />
                    <DateField name="cheque_date" label="Cheque Date" required />
                    <Input name="bank_name" label="Bank Name" required />
                </Fragment>
            case "Online":
                return <Fragment>
                    <Input name="account_number" label="Account Number" required />
                    <Input name="reference_number" label="Reference Number" required />
                </Fragment>
            case "Cash":
                break;
            default:
                break;
        }
    }

    let companyFunction = async (value) => {
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/products', { company_name: value });
        if (response.status === 200) {
            setProduct(response.data.data)
        }
    }

    let productFunction = async (value, formikValues) => {
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/plan-type', { company_name: formikValues.company_name, product_name: value });
        if (response.status === 200) {
            setPlanType(response.data.data)
        }
    }

    let planTypeFunction = async (value, formikValues) => {
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/plan-name', { company_name: formikValues.company_name, product_name: formikValues.product_name, plan_type: value });
        if (response.status === 200) {
            setPlanName(response.data.data)
        }
    }

    let planNameFunction = async (value, formikValues) => {
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/ppt-revenue', { company_name: formikValues.company_name, product_name: formikValues.product_name, plan_type: formikValues.plan_type, plan_name: value });
        if (response.status === 200) {
            // console.log(response.data.data)
            setPptRevenue(response.data.data)
        }
    }

    const grossFunction = (e, formikValues) => {
        if (!formikValues.company_name || !formikValues.product_name || !formikValues.plan_name || !formikValues.premium_payment_term || !formikValues.plan_type) {
            alert('Please select company, product, plan name, premium payment term, plan type');
            return;
        }

        // eslint-disable-next-line default-case
        // console.log(formikValues.plan_type)
        switch (formikValues.plan_type.toLocaleLowerCase()) {
                case "ULIP".toLocaleLowerCase(): // 18
                case "Term Plan".toLocaleLowerCase(): // 18
                    setNetPremium(((Number(e) / 1.18)).toFixed(0));
                    setRevenue(Number(((Number(e)/1.18) * Number(pptRevenue[0].revenue) / 100).toFixed(0)));
                    break;
                case "Traditional Plan".toLocaleLowerCase(): // 4.5
                    setNetPremium((Number(e)/1.045).toFixed(0));
                    setRevenue(Number(((Number(e)/1.045) * Number(pptRevenue[0].revenue) / 100).toFixed(0)));
                    break;
        }
    }

    const uploadFile = (e) => {
        const { name } = e.target;
        const selected = e.target.files[0].size
        if (e.target.files[0].type !== "application/pdf") {
            e.target.value = null
            alert("Please upload only pdf files");
            return;
        }
        if (selected >= 200000) {
            window.alert(`${name} File too big max 200KB`);
            e.target.value = null
            return;
        }

        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            setFiles(preValue => ({
                ...preValue,
                [name]: window.btoa(e.target.result)
            }))
        }
    }

    const dailogClose = () => {
        setSaveTransactionsDailog({ open: false });
        history.push({ pathname: '/home/business-transaction/life-insurance-transaction' });
    }


    const onSubmit = async (values, onSubmitProps) => {
        const extraInformation = {
            customer_mobile: customerData.mobile,
            customer_aadhar: customerData.aadhar_number,
            customer_pan: customerData.pan_number,
            customer_name: `${customerData.first_name} ${customerData.last_name}`,
            submitted_pos_id: posId
        }
        const premium = {
            net_premium : netPremium,
            revenue : revenue
        }
        const transactionDetails = { ...values, ...files, ...premium, ...extraInformation };
        // console.log(transactionDetails);
        const { data: { transaction_id } } = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/life-transactions/add-transaction', transactionDetails);
        if (transaction_id && transactionDetails.policy_form && transactionDetails.policy_number && transactionDetails.application_form && transactionDetails.stage) {
            setSaveTransactionsDailog({ open: true, id: transaction_id, pending: false });
        } else {
            setSaveTransactionsDailog({ open: true, id: transaction_id, pending: true });
        }
    }


    return (
        <Fragment>
            <div className="col-12 py-3"><h5 className="text-center">Customer Details</h5></div>
            <Formik enableReinitialize initialValues={customerData} >
                <div className='px-3'>
                    <Form>
                        <div className="d-flex flex-wrap pt-3">
                            <DefaultInput name="title" label="Title" />
                            <DefaultInput name="first_name" label="First Name" />
                            <DefaultInput name="last_name" label="Last Name" />
                            <DefaultInput name="mobile" label="Mobile" />
                            <DefaultInput name="email" label="Email" />
                            <DefaultInput name="gender" label="Gender" />
                            <DefaultInput name="pan_number" label="Pan Card Number" />
                            <DefaultInput name="aadhar_number" label="Aadhar Card Number" />
                            <DefaultInput name="location" label="Location" />
                            <DefaultInput name="branch" label="Branch" />
                            <DefaultInput name="present_line1" label="Line 1" />
                            <DefaultInput name="present_line2" label="Line 2" />
                            <DefaultInput name="present_city" label="City" />
                            <DefaultInput name="present_district" label="District" />
                            <DefaultInput name="present_state" label="State" />
                            <DefaultInput name="present_country" label="Country" />
                            <DefaultInput name="present_pincode" label="Pincode" />
                        </div>
                    </Form>
                </div>
            </Formik>
            <Formik
                enableReinitialize
                initialValues={LifeInitialValueFunction()}
                validationSchema={LifeValidationFunction(mop, filesInput)}
                onSubmit={onSubmit}
            >
                {
                    formikProps => {
                        // console.log(formikProps.values)
                        return <div className='px-3'>

                            <Form>
                                <div className="d-flex flex-wrap pt-3">
                                    <div className="col-12 py-3">
                                        <h5 className="text-center">Please fill busineess entry details</h5>
                                    </div>
                                    <Input name="application_number" label="Application Number" required />
                                    <OptionsSelect name="company_name" label="Company Name" required handler={companyFunction} options={companies} />
                                    <OptionsSelect name="product_name" label="Product Name" required handler={(value) => productFunction(value, formikProps.values)} options={products} key1="product_name" key2="product_name" />
                                    <OptionsSelect name="plan_type" label="Plan Type" required handler={(value) => planTypeFunction(value, formikProps.values)} options={planType} key1="plan_type" key2="plan_type" />
                                    <OptionsSelect name="plan_name" label="Plan Name" required handler={(value) => planNameFunction(value, formikProps.values)} options={planName} key1="plan_name" key2="plan_name" />
                                    <OptionsSelect name="premium_payment_term" label="Premium Payment Term" required handler={setPpt} options={pptRevenue} key1="premium_payment_term" key2='premium_payment_term' />
                                    <Input name="policy_term" label="Policy Term" required />
                                    <Input name="gross_premium" label="Gross Premium" required handler={(value) => grossFunction(value, formikProps.values)} />
                                    <Input name="net_premium" label="Net Premium" required value={netPremium} readOnly />
                                    <DateField name="date_of_entry" label="Date of Entry" required />
                                    <Select name="premium_payment_mode" label="Premium Payment Mode" required>
                                        <option value=""></option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quaterly">Quaterly</option>
                                        <option value="Half Yearly">Half Yearly</option>
                                        <option value="Annually">Annually</option>
                                    </Select>
                                    <Select name="type_of_business" label="Type of Business" required>
                                        <option value=""></option>
                                        <option value="New Business">New Business</option>
                                        <option value="Renewel">Renewel</option>
                                    </Select>
                                    <Select name="mode_of_payment" label="Mode of Payment" required handler={setMop} >
                                        <option ></option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="DD">DD</option>
                                        <option value="Online">Online</option>
                                        <option value="Cash">Cash</option>
                                    </Select>
                                    <Input name="policy_number" label="Policy Number" required={filesInput} />
                                    {
                                        formikProps.values.mode_of_payment && mopHandler(formikProps.values.mode_of_payment)
                                    }
                                    <Select name="stage" label="Stage" required={filesInput}>
                                        <option value=""></option>
                                        <option value="Login">Login</option>
                                        <option value="Issued">Issued</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Select>
                                    <DateField name="policy_issue_date" label="Policy Issue Date" required />
                                    <Input name="revenue" label="Revenue" required value={revenue} readOnly />
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="submit" className="btn btn-secondary">Submit</button>
                                </div>
                            </Form>
                        </div>
                    }
                }
            </Formik>
            <div className="d-flex flex-wrap justify-content-center py-3">
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label className="h6">Application Form</label><br />
                    <input id="file" ref={pdfRef1} name="application_form" type="file" accept="pdf" onChange={(e) => uploadFile(e)} />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label className="h6">Policy Form</label><br />
                    <input id="file" ref={pdfRef2} name="policy_form" type="file" accept="pdf" onChange={(e) => uploadFile(e)} />
                </div>
            </div>
            <PopUp popup={popup} />
            {saveTransactionsDailog ? <AlertDialog dailog={saveTransactionsDailog} close={dailogClose} /> : null}

        </Fragment>
    )
}


export default LifeInsuranceTransaction;

// setPopup({ open: true, message: 'Files are not added but the transaction is saved with id : 90001', color: "error" });/
// setSaveTransactionsDailog({open: true, id: 9000})