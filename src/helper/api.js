import axios from 'axios';
import CrmforInsuranceService from '../config/index';

const defaultRouter = CrmforInsuranceService.CrmforInsuranceService.baseURL;

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