/*eslint-disable */
import React, { useState,useEffect,useRef,useContext } from 'react';
import { DefaultInput, Select, PermanentInput } from '../pos/input';
import { Formik, Form,Field} from 'formik';
import { CustomerValidation, ValidationWithPermanentAddress } from '../pos/validation';
import {AiFillStar} from 'react-icons/ai';
import CrmforPosService from '../../src/config/index';
import axios from 'axios';
import parseJwt from '../jwtDecode';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../pos/posHome';
import {PresentCustomerAddress,PermanentCustomerAddress,CustomerDetails,CustomerIdentity} from './helpers'

function Addcustomer() {
    const user = useContext(UserContext);
    const history = useHistory();
    const imageRef = useRef(null);
    const imageRef1 = useRef(null);
    const imageRef2 = useRef(null);
    const imageRef3 = useRef(null);
    const checkRef = useRef(null);
    const [checked, setChecked] = useState(false);
    const [location,setLocation] = useState([]);
    const [branch,setBranches] = useState([]);
    const [files,setFiles] = useState({});
    const [id,setId] = useState('');
    const [custData,setCustData] = useState([]);
    useEffect(async()=>{
        const aboutController = new AbortController()
        const token = sessionStorage.getItem('token');
        setId(await parseJwt(token))
         axios.get(CrmforPosService.CrmforPosService.baseURL + '/api/get-location')
        .then(res => setLocation(res.data))
        .catch(err=>console.log(err))
        return ()=>{
            aboutController.abort();
        }
    }, [])
    useEffect(()=>{
        const aboutController = new AbortController()
         axios.get(CrmforPosService.CrmforPosService.baseURL+`/api/pos/get-customers/${user}`)
        .then(res=>{
            if(res.data){
                setCustData(res.data)
            }
        })
        .catch(err=>console.log(err))
        return ()=>{
            aboutController.abort();
        }
    },[])
    const initialValues = {
        title: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        dob: '',
        pancard: '',
        gender: '',
        locations : '',
        branch : '',
        aadhar_number: '',
        present_address1: '',
        present_address2: '',
        present_country: '',
        present_states: '',
        present_city: '',
        present_district: '',
        present_pincode: '',
        permanent_address1: '',
        permanent_address2: '',
        permanent_country: '',
        permanent_states: '',
        permanent_city: '',
        permanent_district: '',
        permanent_pincode: ''
    }
    
    const presentCustomerAddress = PresentCustomerAddress();

    const permanentCustomerAddress = PermanentCustomerAddress();

    const customerDetails = CustomerDetails();

    const customerIdentity = CustomerIdentity();

    const selectBranchHandler=async(e,formik)=>{
        formik.handleChange(e);
        await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/get-branches/${e.target.value}`)
               .then(res => setBranches(res.data))
               .catch(err => console.log(err))
    }

    const onSubmit = async(values,onSubmitProps) => {
        const customerExists = {
            posId : user,
            aadhar : values.aadhar_number
        }
        axios.post(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer-details/exists`,customerExists)
        .then(res=>{
            if(res.data === 'not found'){
                const uploadFiles =  checkValidFiles();
                if(uploadFiles){
                    const pos_id ={
                        pos_id : id.pos_id
                    }
                    const customerDetails = {...values,...files,...pos_id};
                    axios.post(CrmforPosService.CrmforPosService.baseURL+`/api/pos/customer-details`,customerDetails)
                    .then(res=>{
                        if(res.data.status === 200){
                            alert('Customer Details Added Successfully');
                            history.push({
                                pathname : '/home/cutomer-details',
                                state : res.data
                            })
                            setChecked(false);
                            checkRef.current = true;
                            onSubmitProps.setSubmitting(false);
                            onSubmitProps.resetForm();
                        }else{
                            alert(data.status.message)
                        }
                    })
                    .catch(err=>console.log(err))
                }
            }else{
                window.alert('Customer Details already registered');
                return false;
            }
        })
       
    }

    const checkValidFiles =()=> {
        const fileInputsArr = ["aadhar", "pan", "photo", "passbook"]
        const errorArr = []
        for (let file of fileInputsArr) {
            if(files[file] === undefined){
                errorArr.push(file)
            }
        }
        if(errorArr.length > 0){
            alert(`please upload files ${errorArr}`)
            return false;
        }
        return true;
    }
    const classes = "col-12 col-md-6 col-lg-4"
    const options = ['mr', 'miss', 'mrs'];
    const gender = ['male', 'female'];
  

    const checkSelectorHandler = () => {
        setChecked(value => !value);
    }

    const uploadFile=(e)=>{
        const {name} = e.target;
        const selected = e.target.files[0].size
        if (selected >= 100000) {
            window.alert(`${name} File too big max 100KB`);
            e.target.value = null
        }else{
            let file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (e)=>{
                setFiles(preValue=>({
                    ...preValue,
                    [name] : window.btoa(e.target.result)
                }))
            }
        }
        
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={checked ? CustomerValidation : ValidationWithPermanentAddress}
            >
                {formik => {
                    return (
                        <Form autoComplete="off">
                            <div className="d-flex align-items-center justify-content-center my-2"><h4>Add Customer</h4></div>
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
                                    <label htmlFor="location" className="h6">Location<sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup></label>
                                    <Field as="select" name="locations"   className={formik.touched.locations && formik.errors.locations ? "is-invalid form-control": "text-capitalize form-control"} onChange={(e)=>selectBranchHandler(e,formik)}>
                                    <option value="">Select</option>
                                    {location.map((element,index)=>{
                                        return(
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
                                    <label htmlFor="location" className="h6">Branch<sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup></label>
                                    <Field as="select" name="branch"className={formik.touched.branch && formik.errors.branch ? "is-invalid form-control":"text-capitalize form-control"}>
                                    <option value="">Select</option>
                                    {branch&&branch.length>0 ? branch.map((element,index)=>{
                                        return(
                                            <option value={element.branch} className="text-uppercase" key={index}>{element.branch}</option>
                                        )
                                    }):null}
                                </Field>
                                    <div className="help-text">
                                        {formik.touched.branch && formik.errors.branch ? <div className="text-danger">{formik.errors.branch}
                                        </div> : null}
                                    </div>
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
                            <div className="d-flex justify-content-center my-2"><h5>File Uploads</h5></div>
                            <div className="d-flex flex-wrap">
                                <div className="form-group col-12 col-md-6 col-lg-3">
                                    <label className="h6">Aadhar Card<sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup></label><br />
                                    <input id="file" ref={imageRef} name="aadhar" type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e)=>uploadFile(e)}/>
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-3">
                                    <label className="h6">Pancard<sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup></label><br />
                                    <input id="file" ref={imageRef1} name="pan"  type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e)=>uploadFile(e)}/>
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-3">
                                    <label className="h6">Photo<sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup></label><br />
                                    <input id="file" ref={imageRef2} name="photo" type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e)=>uploadFile(e)}/>
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-3">
                                    <label className="h6">Bank Pass Book<sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup></label><br />
                                    <input id="file" ref={imageRef3} name="passbook" type="file" accept="image/png,image/jpeg,image/jpg" onChange={(e)=>uploadFile(e)}/>
                                </div>
                            </div>
                            <div>
                                <input type="submit" className="btn btn-dark ml-lg-3 ml-md-4 my-2" />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Addcustomer;
