import axios from 'axios';
import CrmforPosService from '../config/index';

const defaultRouter = CrmforPosService.CrmforPosService.baseURL;

const headersFunction = () => {
    const token = sessionStorage.getItem('token');
    const headers = {
        headers: { 'Authorization': token}
    }
    return headers;
}
  

export const fetchLocations = async () => {
    const { data } = await axios.get(defaultRouter+ `/api/life-insurance-reports/locations`,  headersFunction());
    return data;
}

export const zonalReports = async ( values ) => {
    const { data } = await axios.post(defaultRouter+ `/api/life-insurance-reports/zonal-reports`, values, headersFunction());
    return data;
}

export const fetchLifeReportsForPayouts =async(from_date,to_date)=>{
    const {data} = await axios.get(defaultRouter + `/api/payouts/get-life-payouts/${from_date}/${to_date}`,headersFunction())
    return data;
}

export const fetchGeneralReportsForPayouts =async(from_date,to_date)=>{
    const {data} = await axios.get(defaultRouter + `/api/payouts/get-general-payouts/${from_date}/${to_date}`,headersFunction())
    return data;
}

export const fetchLifePptRevenue = async (value, formikValues) => {
    const obj = {
        company_name: formikValues.company_name,
        product_name: formikValues.product_name,
        plan_type: formikValues.plan_type,
        plan_name: formikValues.plan_name,
        premium_payment_term: value
    }
    const { data } = await axios.post(defaultRouter + `/api/life-transactions/get-ppt-revenue`, { obj }, headersFunction());
    return data;
}

export const getPOSPersonType = async()=>{
    const { data } = await axios.get(defaultRouter + `/api/payouts/get-person-type`, headersFunction());
    return data;
}