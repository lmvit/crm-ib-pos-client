/*eslint-disable*/
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { CustomerValidation, ValidationWithPermanentAddress } from '../pos/validation';
import { DefaultInput, Select, PermanentInput } from '../pos/input';
import { AiFillStar } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { PresentCustomerAddress, PermanentCustomerAddress, CustomerDetails, CustomerIdentity } from './helpers';
import axios from 'axios';
import CrmforPosService from '../../src/config/index';
import FormatDate from '../FormatDate';
import { UserContext } from '../pos/posHome';

function EditCustomerDetails() {
    const imageRef = useRef(null);
    const user = useContext(UserContext);
    const history = useLocation();
    const redirectHomePage = useHistory();
    const [checked, setChecked] = useState(false);
    const [location, setLocation] = useState([]);
    const [branch, setBranches] = useState([]);
    const [uploadAadhar, setUploadAadhar] = useState(true);
    const [uploadPan, setUploadPan] = useState(true);
    const [uploadPhoto, setUploadPhoto] = useState(true);
    const [uploadPassbook, setUploadPassbook] = useState(true);
    const [files,setFiles] = useState({});
    const checkRef = useRef();

    useEffect(async () => {
        await axios.get(CrmforPosService.CrmforPosService.baseURL + '/api/get-location')
            .then(res => setLocation(res.data))
            .catch(err => console.log(err))
    }, [history])

    // console.log(history.state)
    const initialValues = {
        custId: history.state[0].customer_id,
        title: history.state[0].title,
        first_name: history.state[0].first_name,
        last_name: history.state[0].last_name,
        mobile_number: history.state[0].mobile_number,
        email: history.state[0].email,
        dob: FormatDate(history.state[0].dob),
        pancard: history.state[0].pancard,
        gender: history.state[0].gender,
        locations: history.state[0].locations,
        branch: history.state[0].branch,
        aadhar_number: history.state[0].aadhar_number,
        present_address1: history.state[0].present_address1,
        present_address2: history.state[0].present_address2,
        present_country: history.state[0].present_country,
        present_states: history.state[0].present_states,
        present_city: history.state[0].present_city,
        present_district: history.state[0].present_district,
        present_pincode: history.state[0].present_pincode,
        permanent_address1: history.state[0].permanent_address1,
        permanent_address2: history.state[0].permanent_address2,
        permanent_country: history.state[0].permanent_country,
        permanent_states: history.state[0].permanent_states,
        permanent_city: history.state[0].permanent_city,
        permanent_district: history.state[0].permanent_distric,
        permanent_pincode: history.state[0].permanent_pincode
    }
    useEffect(() => {
        // console.log('Do something after counter has changed', uploadAadhar);
    }, [uploadAadhar,uploadPan,uploadPassbook,uploadPhoto])

    const onSubmit = (values) => {
        const customerExists = {
            posId : user,
            aadhar : values.aadhar_number,
            customerId : values.custId
        }
        axios.post(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer/update-customer-details/exists`,customerExists)
        .then(res=>{
            if(res.data === 'not found'){
                axios.put(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer/update-customer-details/${initialValues.custId}/${user}`,values)
                .then(res=>{
                    if(res.data === 'updated successfully'){
                        window.alert('customer details updated successfully');
                        redirectHomePage.push('/home')
                    }
                });
            }else{
                window.alert('Customer details already exists')
                return false;
            }
        })
    }

    const classes = "col-12 col-md-6 col-lg-4"
    const options = ['mr', 'miss', 'mrs'];
    const gender = ['male', 'female'];

    const presentCustomerAddress = PresentCustomerAddress();

    const permanentCustomerAddress = PermanentCustomerAddress();

    const customerDetails = CustomerDetails();

    const customerIdentity = CustomerIdentity();

    const selectBranchHandler = async (e, formik) => {
        formik.handleChange(e);
        await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/get-branches/${e.target.value}`)
            .then(res => setBranches(res.data))
            .catch(err => console.log(err))
    }

    const checkSelectorHandler = () => {
        setChecked(value => !value);
    }
    

    useEffect(async () => {
        if (initialValues.branch !== '') {
            await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/customer/get-branches/${initialValues.locations}`)
                .then(res => {
                    // console.log(res.data)
                    setBranches(res.data);
                })
                .catch(err => console.log(err))
        }
    }, [initialValues.locations])

    useEffect(async () => {
        if (initialValues.permanent_address1 === '') {
            checkRef.current.checked = true
            setChecked(value => !value)
        }
    }, [initialValues.locations]);

    const deleteCustomerAadhar =() => {
        setUploadAadhar(value=>!value);
    }

    const deleteCustomerPan = () => {
        setUploadPan(value=>!value);
    }

    const deleteCustomerPhoto = () => {
        setUploadPhoto(value=>!value);
    }

    const deleteCustomerPassBook = () => {
        setUploadPassbook(value=>!value);
    }

    function uploadFile(e){
        const {name} = e.target;
        const selected = e.target.files[0].size;
        let image;
        if (selected >= 100000) {
            window.alert(`${name} File too big max 100KB`);
            e.target.value = null
        }else{
            let file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (e)=>{
                image = window.btoa(e.target.result);
            }
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(image);
                }, 2000);
              });
        }
    }
    const uploadAadharFile=async(e)=>{
        const result = await uploadFile(e);
       const aadhar ={
           aadhar : result
       }
        setUploadAadhar(value=>!value);
        axios.put(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer/update-aadhar/${initialValues.custId}/${user}`,aadhar)
        .then(res=>{
            if(res.data === 'successfull'){
                // window.alert('updated Successfully');
            }else{
                window.alert('failed');
            }
        })
    }
  
    const uploadPanFile=async(e)=>{
        const result =await uploadFile(e);
        const pan ={
            pan : result
        }
        setUploadPan(value=>!value);
        axios.put(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer/update-pan/${initialValues.custId}/${user}`,pan)
        .then(res=>{
            if(res.data === 'successfull'){
                return true;
            }else{
                window.alert('failed');
            }
        })
    }
    const uploadPhotoFile=async(e)=>{
        const result =await uploadFile(e);
        const photo ={
            photo : result
        }
        setUploadPhoto(value=>!value);
        axios.put(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer/update-photo/${initialValues.custId}/${user}`,photo)
        .then(res=>{
            if(res.data === 'successfull'){
                return true;
            }else{
                window.alert('failed');
            }
        })
    }
    const uploadPassbookFile=async(e)=>{
        const result =await uploadFile(e);
        const passbook ={
            passbook : result
        }
        setUploadPassbook(value=>!value);
        axios.put(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer/update-passbook/${initialValues.custId}/${user}`,passbook)
        .then(res=>{
            if(res.data === 'successfull'){
                return true;
            }else{
                window.alert('failed');
            }
        })
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={checked ? CustomerValidation : ValidationWithPermanentAddress}
            >
                {formik => {
                    return (
                        <Form>
                            <div className="d-flex align-items-center justify-content-center my-2"><h4>Update Customer Details</h4></div>
                            <div className="d-flex flex-wrap col-12">
                                <Select name="title" label="Title" options={options} classes={classes} required
                                    className={formik.touched.title && formik.errors.title ? "is-invalid form-control" : "form-control text-capitalize"}
                                />
                                {customerDetails.map((element, index) => {
                                    return <DefaultInput key={index} type={element.type} name={element.name} label={element.label} classes={classes} required
                                        className={formik.touched[element.name] && formik.errors[element.name] ? "is-invalid form-control" : "form-control"} />
                                })}
                                <Select name="gender" label="Gender" options={gender} classes={classes} required
                                    className={formik.touched.gender && formik.errors.gender ? "is-invalid form-control" : "form-control text-capitalize"}
                                />
                                {customerIdentity.map((element, index) => {
                                    return <DefaultInput key={index} type={element.type} name={element.name} label={element.label} classes={classes} required
                                        className={formik.touched[element.name] && formik.errors[element.name] ? "is-invalid form-control" : "form-control"} />
                                })}
                                <div className="form-group p-1" className={classes}>
                                    <label htmlFor="location" className="h6">Location<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label>
                                    <Field as="select" name="locations" className={formik.touched.locations && formik.errors.locations ? "is-invalid form-control" : "text-capitalize form-control"} onChange={(e) => selectBranchHandler(e, formik)}>
                                        <option value="">Select</option>
                                        {location.map((element, index) => {
                                            return (
                                                <option className="text-uppercase" key={index} value={element.location}>{element.location}</option>
                                            )
                                        })}
                                    </Field>
                                    <div className="help-text">
                                        {formik.touched.locations && formik.errors.locations ? <div className="text-danger">{formik.errors.locations}
                                        </div> : null}
                                    </div>
                                </div>
                                <div className="form-group p-1" className={classes}>
                                    <label htmlFor="location" className="h6">Branch<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label>
                                    <Field as="select" name="branch" className={formik.touched.branch && formik.errors.branch ? "is-invalid form-control" : "text-capitalize form-control"}>
                                        <option value="">Select</option>
                                        {branch && branch.length > 0 ? branch.map((element, index) => {
                                            return (
                                                <option value={element.branch} className="text-uppercase" key={index}>{element.branch}</option>
                                            )
                                        }) : null}
                                    </Field>
                                    <div className="help-text">
                                        {formik.touched.branch && formik.errors.branch ? <div className="text-danger">{formik.errors.branch}
                                        </div> : null}
                                    </div>
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                    <label htmlFor="customerId">Customer Id</label>
                                    <input type="text" value={initialValues.custId} className="form-control" readOnly />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center my-2"><h5>Present Address</h5></div>
                            <div className="d-flex flex-wrap col-12">
                                {presentCustomerAddress.map((element, index) => {
                                    return <DefaultInput key={index} type={element.type} name={element.name} label={element.label} classes={classes} required={element.required}
                                        className={formik.touched[element.name] && formik.errors[element.name] ? "is-invalid form-control" : "form-control"} />
                                })}
                            </div>
                            <div className="form-check">
                                <input ref={checkRef} type="checkbox" className="form-check-input ml-lg-3" id="input_checkbox" value={checked} onChange={checkSelectorHandler} />
                                <label htmlFor="input_checkbox" className="ml-lg-5">Check if your present address is your permanent address</label>
                            </div>
                            <div className="d-flex justify-content-center my-2"><h5>Permanent Address</h5></div>
                            <div className="d-flex flex-wrap col-12">
                                {checked ? permanentCustomerAddress.map((element, index) => {
                                    return <PermanentInput key={index} type={element.type} name={element.name} label={element.label} classes={classes} className="form-control" value={formik.values[element.presentName]} readOnly />
                                }) : permanentCustomerAddress.map((element, index) => {
                                    return <DefaultInput key={index} type={element.type} name={element.name} label={element.label} classes={classes} required={element.required}
                                        className={formik.touched[element.name] && formik.errors[element.name] ? "is-invalid form-control" : "form-control"} />
                                })}
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="form-group  col-12 col-md-6 col-lg-3">{uploadAadhar ?
                                    <div>
                                        <label className="h6">Aadhar<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <p>Aadhar Card<span><MdEdit style={{cursor:'pointer'}} size="1.2em" onClick={() => deleteCustomerAadhar(initialValues.custId, user)} /></span></p>
                                    </div> :
                                    <div>
                                        <label className="h6">Aadhar Card<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <input id="file" ref={imageRef} name="aadhar" type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e) => uploadAadharFile(e)} />
                                    </div>
                                }</div>
                                <div className="form-group col-12 col-md-6 col-lg-3">{uploadPan ?
                                    <div><label className="h6">Pancard<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <p>Pan Card<span><MdEdit style={{cursor:'pointer'}} size="1.2em" onClick={() => deleteCustomerPan(initialValues.custId, user)} /></span></p></div> :
                                    <div>
                                        <label className="h6">Pan Card<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <input id="file" ref={imageRef} name="pan"  type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e) => uploadPanFile(e)} />
                                    </div>
                                }</div>
                                <div className="form-group col-12 col-md-6 col-lg-3">{uploadPhoto ?
                                    <div><label className="h6">Photo<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <p>Photo<span><MdEdit style={{cursor:'pointer'}} size="1.2em" onClick={() => deleteCustomerPhoto(initialValues.custId, user)} /></span></p></div> :
                                    <div>
                                        <label className="h6">Photo<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <input id="file" ref={imageRef} name="photo" type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e) => uploadPhotoFile(e)} />
                                    </div>
                                }</div>
                                <div className="form-group col-12 col-md-6 col-lg-3">{uploadPassbook ?
                                    <div><label className="h6">Bank PassBook<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <p>Bank Pass Book<span><MdEdit style={{cursor:'pointer'}} size="1.2em" onClick={() => deleteCustomerPassBook(initialValues.custId, user)} /></span></p></div> :
                                    <div>
                                        <label className="h6">Pass Book<sup><AiFillStar style={{ color: "red", width: "8px" }} /></sup></label><br />
                                        <input id="file" ref={imageRef} name="passbook" type="file"  accept="image/png,image/jpeg,image/jpg" onChange={(e) => uploadPassbookFile(e)} />
                                    </div>
                                }</div>
                            </div>
                            <div>
                                <input type="submit" value="update" className="btn btn-dark ml-md-4 mb-2"/>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default EditCustomerDetails
