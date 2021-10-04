import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEdit,FaSearch } from 'react-icons/fa';
import { UserContext } from '../pos/posHome';
import axios from 'axios';
import CrmforPosService from '../config/index';

function CustomerDetails() {
    const user = useContext(UserContext);
    const redirectEditPage = useHistory();
    const [data, setData] = useState([]);
    const [searchData,setSearchData] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (user) {
            const token = sessionStorage.getItem('token');
            await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/get-customers/${user}`,{headers:{Authorization:token}})
                .then(res => {
                    if (res.data) {
                        setData(res.data);
                        setSearchData(res.data);
                    } else {
                        return null;
                    }
                })
                .catch(err => console.log(err))
        } else {
            return false;
        }
    }, [user])
   
    const getCustomerIdHandler = async (id, user) => {
        const token = sessionStorage.getItem('token');
        await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/get-customer-details/${user}/${id}`,{headers:{Authorization:token}})
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    redirectEditPage.push({
                        pathname: '/home/edit-customer-details',
                        state: res.data
                    })
                } else {
                    return false;
                }
            })
            .catch(err => console.log(err))
    }

    const onSearchHandle = async(e)=>{
        let result = [];
        console.log('target',e.target.value.length)
        if(e.target.value && data){
            result = data.filter(
                (customer) => 
            customer.customer_id && customer?.customer_id.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
            customer.mobile_number && customer?.mobile_number.toString().toLowerCase().includes(e.target.value.toLowerCase()))
        }
        // console.log('res',result);
        if(result.length === 0){
            result=['none'];
        }
        if(e.target.value.length === 0){
            result=data;
        }
        setSearchData(result);
    }
    console.log('search',searchData);

    return (
        <div className="container-fluid m-auto">
            <div className="d-flex justify-content-center my-3"><h4 className="text-dark">Customer Details</h4></div>
            <div className="d-flex flex-row justify-content-end">
                <div className="input-group-prepend">
                    <span className="input-group-text"><FaSearch/></span>
                </div>
                <input type="text" className="form-control text-capitalize col-8 col-md-6 col-lg-4 col-xl-3" autoComplete='none' placeholder="Search by customer ID or mobile number" onChange={(e)=>onSearchHandle(e)}/>
            </div>
            <div className="table-responsive mt-3">
                <table className="table table-hover table-striped col-12 p-0" style={{ borderCollapse: 'initial' }}>
                    <thead className="text-white">
                        <tr>
                            <th>S.no</th>
                            <th>Customer&nbsp;ID</th>
                            <th>Name</th>
                            <th>Mobile&nbsp;Number</th>
                            <th>Aadhar&nbsp;Number</th>
                            <th>Pan&nbsp;Number</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                        {searchData.length > 0 && searchData[0] !== 'none' ? <tbody>
                        {searchData.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-uppercase">{element.customer_id}</td>
                                    <td className="text-capitalize">{`${element.first_name} ${element.last_name}`}</td>
                                    <td>{element.mobile_number}</td>
                                    <td>{element.aadhar_number}</td>
                                    <td className="text-uppercase">{element.pancard}</td>
                                    <td className="text-center">
                                        <FaEdit onClick={() => getCustomerIdHandler(element.customer_id, user)} title="Edit" size="1.3em" style={{ color: "black" }} />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>:
                        searchData[0] === 'none' ? <tbody><tr><td colSpan="7">No data found</td></tr></tbody> : <tbody><tr><td colSpan="7" className="text-center">Loading...</td></tr></tbody>}
                </table>
            </div>
        </div>
    )
}

export default CustomerDetails
