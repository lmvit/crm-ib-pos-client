import React,{useState,useEffect} from 'react';
import {FaSearch,FaEdit} from 'react-icons/fa';

function CustomerDetails(props) {

    const [searchData,setSearchData] = useState([]);
    const [data,setData] =useState([])
    useEffect(() => {
        setData(props.customersData)
        setSearchData(props.customersData)
    //   console.log(data)
    }, [data, props.customersData]);

    const onSearchHandle = (e)=>{
        let result = [];
        if(e.target.value){
                result = data.filter((customer) => (
                    customer.customer_id.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    customer.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    customer.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    customer.mobile_number.includes(e.target.value) ||
                    customer.aadhar_number.includes(e.target.value) ||
                    customer.email.toLowerCase().includes(e.target.value.toLowerCase())
                ));
        }else{
            result = data
        }
       setSearchData(result)
    }
 
    return (
        <div>
            <div className="mt-3 d-flex flex-row justify-content-center">
                <div className="input-group-prepend">
                    <span className="input-group-text"><FaSearch/></span>
                </div>
                <input type="text" className="form-control text-capitalize col-8 col-md-6 col-lg-4 col-xl-3" autoComplete='none' placeholder="Search..." onChange={(e)=>onSearchHandle(e)}/>
            </div>
            <div className="table-responsive mt-3">
                <table className="table table-hover table-striped col-12 p-1" style={{ borderCollapse: 'initial' }}>
                    <thead className="text-white">
                        <tr>
                            <th>S.no</th>
                            <th>Customer&nbsp;ID</th>
                            <th>Name</th>
                            <th>Mobile&nbsp;Number</th>
                            <th>Email</th>
                            <th>Aadhar&nbsp;Number</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchData && searchData.length>0 ? searchData.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-uppercase">{element.customer_id}</td>
                                    <td className="text-capitalize">{`${element.first_name} ${element.last_name}`}</td>
                                    <td>{element.mobile_number}</td>
                                    <td>{element.email}</td>
                                    <td>{element.aadhar_number}</td>
                                    <td className="text-center">
                                        <FaEdit title="Edit" size="1.3em" style={{ color: "black" }} />
                                    </td>
                                </tr>
                            )
                        }):searchData.length > 0 ?<span>Loading...</span>:<span>No Data Found</span>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerDetails
