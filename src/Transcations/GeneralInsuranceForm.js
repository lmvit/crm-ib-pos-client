/*eslint-disable */
import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { Formik, Form } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import { Input, Select, DateField, DefaultInput, OptionsSelect } from '../helper/Input';
import { GeneralValidationFunction } from '../helper/validations';
import { customerInitialValue, GeneralInitialValueFunction, TransactionCustomerFunction } from '../helper/initialValues';
import AlertDialog from './components/Dailog';
import axios from 'axios';
import CrmforPosService from '../config/index';
import {UserContext} from '../pos/posHome'; 
import CustomerData from './CustomerData'; 
import ModeOfPayment from './ModeOfPayment';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

const GeneralInsuranceTransaction = () => {
    const [data, setData] = useState({ ...customerInitialValue });
    const [customerData, setCustomerData] = useState({ ...customerInitialValue });
    const [rmi, setRmi] = useState([]);
    const [telecallers, setTelecallers] = useState([]);
    const [files, setFiles] = useState({});
    const [agents, setAgents] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [products, setProduct] = useState([]);
    const [insuranceType, setInsuranceType] = useState([]);
    const [planType, setPlanType] = useState([])
    const [planName, setPlanName] = useState([])
    const [subType, setSubType] = useState([])
    const [filesInput, setFilesInput] = useState(false)
    const [revenueDetails, setRevenueDetails] = useState([]);
    const [saveTransactionsDailog, setSaveTransactionsDailog] = useState({ open: false, message: "saveTransactions", id: null, pending: false });

    const [revenue, setRevenue] = useState("")
    const [netPremium, setNetPremium] = useState("")
    const [mop, setMop] = useState('');
    const location = useLocation();
    const history = useHistory();

    const pdfRef1 = useRef(null);
    const pdfRef2 = useRef(null);
    const posId = useContext(UserContext);


    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const token = sessionStorage.getItem('token');
            let companiesArray = [];
            const fetchCompanies = await axios.get(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/companies',{headers:{Authorization : token}});
            if (fetchCompanies.status === 200) {
                // eslint-disable-next-line array-callback-return
                fetchCompanies.data.data.map((item, index) => {
                    companiesArray.push(item.company_name);
                })
            }
            setCompanies([...new Set(companiesArray)]);
        } catch (e) {
            alert(e)
        }
    }, [])

    const TravelMode = function () {
        const obj = [
            {
                mode: "TP without OD",
                // revenue: "2.6"
            },
            {
                mode: "TP with OD",
                // revenue: "1.4"
            },
            {
                mode: "Comprehensive",
                // revenue: "1.7"
            }
        ]

        return obj;
    }

    const HealthMode = function () {
        const obj = [
            {
                mode: "Premium",
                // revenue: "1.7"
            },
        ]

        return obj;
    }

    let companyFunction = async (value) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/products', { company_name: value },{headers:{Authorization:token}});
        if (response.status === 200) {
            setProduct(response.data.data)
        }
    }

    let productFunction = async (value, formikValues) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/type-of-insurance', { company_name: formikValues.company_name, product_name: value },{headers:{Authorization:token}});
        if (response.status === 200) {
            setInsuranceType(response.data.data)
        }
    }

    let typeOfInsurance = async (value, formikValues) => {
        const token = sessionStorage.getItem('token');
        switch (value.toLowerCase()) {
            case "travel":
                setSubType(TravelMode());
                break;
                
            case "health":
                setSubType(HealthMode());
                break;
        }

        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/plan-type', { company_name: formikValues.company_name, product_name: formikValues.product_name, type_of_insurance: value },{headers:{Authorization:token}});
        if (response.status === 200) {
            setPlanType(response.data.data)
        }
    }

    let planTypeHandler = async (value, formikValues) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/plan-name', { company_name: formikValues.company_name, product_name: formikValues.product_name, type_of_insurance: formikValues.type_of_insurance, plan_type: value },{headers:{Authorization:token}});
        if (response.status === 200) {
            setPlanName(response.data.data)
        }
    }

    let planNameHandler = async (value, formikValues) => {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/revenue', { company_name: formikValues.company_name, product_name: formikValues.product_name, type_of_insurance: formikValues.type_of_insurance, plan_type: formikValues.plan_type, plan_name: value },{headers:{Authorization:token}});
        if (response.status === 200) {
            setRevenueDetails(response.data.data)
        }
    }

    const grossFunction = (e, formikValues) => {
        if (!formikValues.company_name || !formikValues.product_name || !formikValues.type_of_insurance || !formikValues.plan_type || !formikValues.plan_name ) {
            alert('Please select company, product, type of insurance, plan name, plan type');
            return;
        }
    
        setNetPremium(((Number(e) / 1.18)).toFixed(0));
        setRevenue(Number(((Number(e)/1.18) * Number(revenueDetails[0].revenue) / 100).toFixed(0)));
    }

    const uploadFile = (e) => {
        const { name } = e.target;
        const selected = e.target.files[0].size
        if (e.target.files[0].type !== "application/pdf") {
            e.target.value = null
            alert("Please upload only pdf files");
            return false;
        }
        if (selected >= 2000000) {
            window.alert(`${name} File too big max 200KB`);
            e.target.value = null
            return false;
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
        history.push({ pathname: '/home/business-transaction/general-insurance-transaction' });
    }


    const onSubmit = async (values) => {
        const token = sessionStorage.getItem('token');
        const premium = {
            net_premium  : netPremium,
            revenue : revenue
        }
        const extraInformation = {
            customer_mobile: customerData.mobile,
            customer_aadhar: customerData.aadhar_number,
            customer_pan: customerData.pan_number,
            customer_name: `${customerData.first_name} ${customerData.last_name}`,
            submitted_pos_id: posId
        }
        const transactionDetails = { ...values, ...files, ...extraInformation,...premium};
        console.log(transactionDetails);

        const { data: { transaction_id } } = await axios.post(CrmforPosService.CrmforPosService.baseURL + '/api/general-transactions/add-transaction', transactionDetails,{headers:{Authorization:token}});
        console.log(transaction_id)
        if (transaction_id && transactionDetails.policy_form && transactionDetails.policy_number  && transactionDetails.stage) {
            setSaveTransactionsDailog({ open: true, id: transaction_id, pending: false });
        } else {
            setSaveTransactionsDailog({ open: true, id: transaction_id, pending: true });
        }
    }

    return (
        <Fragment>
            <Formik enableReinitialize initialValues={customerData} >
                <div className='px-2'>
                    <Form>
                        <div className="d-flex flex-wrap pt-3">
                            <CustomerData/>
                        </div>
                    </Form>
                </div>
            </Formik>
            <Formik
                enableReinitialize
                initialValues={GeneralInitialValueFunction()}
                validationSchema={GeneralValidationFunction(mop, filesInput)}
                onSubmit={onSubmit}
            >
                {
                    formikProps => {
                        // console.log(formikProps)
                        return <div className='px-2'>
                            <Form>
                                <div className="d-flex flex-wrap pt-3">
                                    <div className="col-12 py-3">
                                        <h5 className="text-center">Please fill busineess entry details</h5>
                                    </div>
                                    <OptionsSelect name="company_name" label="Company Name" required handler={companyFunction} options={companies} />
                                    <OptionsSelect name="product_name" label="Product Name" required handler={(value) => productFunction(value, formikProps.values)} options={products} key1="product_name" key2="product_name" />
                                    <OptionsSelect name="type_of_insurance" label="Type of Insurance" required handler={(value) => typeOfInsurance(value, formikProps.values)} options={insuranceType} key1="type_of_insurance" key2="type_of_insurance" />
                                    <OptionsSelect name="sub_type" label="Sub Type" required options={subType} key1="mode" key2="mode" />
                                    <OptionsSelect name="plan_type" label="Plan Type" required handler={(e) => planTypeHandler(e, formikProps.values)} options={planType} key1="plan_type" key2="plan_type" />
                                    <OptionsSelect name="plan_name" label="Plan Name" required handler={(e) => planNameHandler(e, formikProps.values)} options={planName} key1="plan_name" key2="plan_name" />
                                    <Input name="gross_premium" label="Gross Premium" required handler={(e) => grossFunction(e, formikProps.values)} />
                                    <Input name="net_premium" label="Net Premium" required value={netPremium} readOnly />
                                    <Input name="policy_type" label="Policy Type" required />
                                    <Input name="policy_tenure" label="Policy Tenure" required />
                                    <DateField name="date_of_policy_login" label="Date of Policy Logins" required />
                                    <Select name="premium_payment_mode" label="Premium Payment Mode" required>
                                        <option value="">Select</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quaterly">Quaterly</option>
                                        <option value="Half Yearly">Half Yearly</option>
                                        <option value="Annually">Annually</option>
                                    </Select>
                                    <Select name="type_of_business" label="Type of Business" required>
                                        <option value="">Select</option>
                                        <option value="New Business">New Business</option>
                                        <option value="Renewal">Renewal</option>
                                    </Select>
                                    <Select name="mode_of_payment" label="Mode of Payment" required handler={setMop}  >
                                        <option >Select</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="DD">DD</option>
                                        <option value="Online">Online</option>
                                        <option value="Cash">Cash</option>
                                    </Select>
                                    {
                                        formikProps.values.mode_of_payment ? ModeOfPayment(formikProps.values.mode_of_payment) : null
                                    }
                                    <Input name="policy_number" label="Policy Number" />
                                    <Select name="stage" label="Stage" >
                                        <option value="">Select</option>
                                        <option value="Login">Login</option>
                                        <option value="Issued">Issued</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Select>
                                    <DateField name="date_of_entry" label="Date of Entry" required />
                                    <Input name="revenue" label="Revenue" required value={revenue} readOnly />
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="submit" className="btn btn-secondary" >Submit</button>
                                </div>
                            </Form>
                        </div>
                    }
                }
            </Formik>
            <div className="d-flex flex-wrap justify-content-center py-3">
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label className="h6">Policy Form</label><br />
                    <input id="file" ref={pdfRef1} name="policy_form" type="file" accept="pdf" onChange={(e) => uploadFile(e)} />
                </div>
            </div>
            {saveTransactionsDailog ? <AlertDialog dailog={saveTransactionsDailog} close={dailogClose} /> : null}
        </Fragment>
    )
}


export default GeneralInsuranceTransaction;