import React, { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router-dom';
import { request, dateFormat, net, Customer } from '../helper';
import "react-datepicker/dist/react-datepicker.css";

const Example = (props) => {
  const [policyDate, setPolicyDate] = useState(new Date());
  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [chequeDate, setChequeDate] = useState(new Date());
  const [data, setData] = useState({});
  const [type, setType] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [companies, setCompany] = useState([]);
  const [mode, setMode] = useState([]);
  const [products, setProduct] = useState([]);
  const [selected, setSelected] = useState({});
  const [modes, setModes] = useState('');
  const [revenuePerc, setRevenuePerc] = useState('');
  const [gross, setGross] = useState('');
  const [state, setState] = useState({});
  const [agent, setAgents] = useState([]);
  const [rmid, setRMID] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedTypeOfInsurance, setTypeOfInsurance] = useState('');
  const [planName, setPlanName] = useState([]);
  const [employees, setEmployee] = useState([]);

  const Mobile    = React.useRef(null);
  const Aadhaar   = React.useRef(null);
  const ManagerID = React.useRef(0);
  const TsoID     = React.useRef(0);
  const Branch    = React.useRef(null);
  const Adhaar    = React.useRef(null);
  
  // useEffect(() => {
  //   if (props.location.state === undefined) {
  //     props.history.push('/Home/generalinsurancetransaction');
  //     return;
  //   }

  //   setData(props.location.state);

  //   (async () => {


  //     let res = await request('generalinsurancerevenue/columns').get();
  //     setCompany(await res.json());

  //     let resAgent = await request('agent/select').get();
  //     let json = await resAgent.json();
  //     setAgents(json.message); 

  //     let resEmp    = await request('employee/select').get();
  //     let data      = await resEmp.json(); 

  //     //tsoid
  //     let len = data.message.length;
  //     let rmidArray = [];
  //     let tsoidArray = [];

  //     for(let i = 0; i <= len-1; i++){
  //       let rmDesig = data.message[i].role;
  //       let rmEmpId = data.message[i].employee_id;
  //       let rmFirstName = data.message[i].firstname;
  //       let array = [rmFirstName,rmEmpId]
      
  //       if(!(rmDesig.includes("RelationshipManager" || "Relationship Manager" || "Admin" || "Reconsultor" ))){
  //       tsoidArray.push(array);
  //       console.log(tsoidArray);
  //       }
  //     }
    
  //     setEmployee(tsoidArray);

  //     //rm_id
  //     for(let i = 0; i <= len-1; i++){
  //       let rmDesig = data.message[i].role;
  //       let rmEmpId = data.message[i].employee_id;
  //       let rmFirstName = data.message[i].firstname;
  //       let array = [rmFirstName,rmEmpId]
      
  //       if(rmDesig.includes("RelationshipManager" || "Relationship Manager")){
  //       rmidArray.push(array);
  //       }
  //     }
  //     setRMID(rmidArray);

  //   })();
  // }, []);

  let _branchfromsession = sessionStorage.getItem("_branch");
  let _locationfromsession = sessionStorage.getItem("_location");
  let _idfromsession = sessionStorage.getItem("_id");

  let fetchProduct = async ({ target: { value } }) => {
    let res = await request(`generalinsurancerevenue/product/${value}`).get();
    setProduct(await res.json());
    setSelected({ company: value });
    console.log(value);
  }

  let fetchType = async ({ target: { value } }) => {
    let res = await request(`generalinsurancerevenue/type/${selected["company"]}/${value}`).get();
    let json = await res.json();
    console.log(value);
    setType(json);
    setSelected({ product: value, ...selected });
  }

  let fetchAgent = async ({ target: { value } }) => {
    setSelectedAgent({ agent: value });
    }

    let fetchMode = async ({ target: { value } }) => {
      let res = await request(`generalinsurancerevenue/plan/${selected["company"]}/${selected["product"]}/${value}`).get();
      let json = await res.json();
      console.log(json);
      setPlanName(json);
     // setType(json);
      setSelected({ typeIns: value, planName: json[0], ...selected });
    }

  let fetchRevenue = async ({ target: { value } }) => {
  }

  let setDate = (date, func) => func(date);

  let check = () => {
    if (products.length === 0) {
      alert("Please select a Company");
      return false;
    } else if (type.length === 0) {
      alert("Please select a Type");
      return false;
    } else if ((modes === "DD" || modes === "Online") && isNaN(Number(state["account_number"]))) {
      alert("Please enter valid Account Number");
      return false;
    } else if (isNaN(Number(Mobile.current.value))) {
      alert("Please enter valid Mobile Number");
      return false;
    }
    //  else if (isNaN(Number(Aadhaar.current.value))) {
    //   alert("Please enter valid Aadhaar Number");
    //   return false;

    // }
    else if (planName.length === 0) {
      alert("Please select a Plan Name");
      return false;
    }
    return true;
  }

  let fetchNetAmount = async(amount) => {

    if (!check()) return;

    setGross(amount);

    setNetAmount(
      // Number(
      //   // (Number(amount) / 100 * 18).toFixed(0)
      //   ((Number(amount) * (18 / 100)))
      //     .toFixed(0)
      // )
      net(amount, 18)
    );

    console.log(Number(revenuePerc));

    const AGENTID = selectedAgent["agent"];
      console.log(AGENTID);
      let json = '';
  
      if(AGENTID === undefined || '' || null){
        let res = await request(`generalinsurancerevenue/type/${selected["company"]}/${selected["product"]}/${selected["planName"]}/${selected["typeIns"]}`).get();
        json = await res.json();
        console.log(json);
      }
      
     else{
      let res = await request(`generalinsurancerevenue/type/A${selectedAgent["agent"]}/${selected["company"]}/${selected["product"]}/${selected["planName"]}/${selected["typeIns"]}`).get();
      json = await res.json();
      console.log(json);
      }

     
      if(json.length > 0)
      {
        console.log(json[0].revenue)
      setRevenuePerc(json[0].revenue);
      }
      else{
        alert('Revenue not found');
        return;
      }

    setRevenue(
      Number(
        // ((Number(amount) / 100 * 18) / 100 * Number(revenuePerc)).toFixed(0)
        ((Number(net(amount, 18)) * (Number(revenuePerc) / 100)))
          .toFixed(0)
      )
    );
  }

  let func = () => {
    switch (modes) {
      case "Cheque":
        return (
          <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Cheque Number</label>
                  <input type="text" className="form-control" name="cheque_number" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Cheque Number" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Cheque Account</label>
                  <input type="text" className="form-control" name="cheque_account" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Cheque Account" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputEmail1" className="mb-0">Cheque Date</label>
                  <DatePicker className="form-control" selected={chequeDate} maxDate={new Date()} onChange={date => setDate(date, setChequeDate)} onKeyDown={(e)=>e.preventDefault()} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Bank Name</label>
                  <input type="text" className="form-control" name="bank_name" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Bank Name" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                </div>

              </div>
            </div>
          </Fragment>
        );
      case "DD":
        return (
          <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputEmail1" className="mb-0">Account Number</label>
                  <input type="text" className="form-control" name="account_number" onChange={(e) => changeHandle(e)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Account Number" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Cheque Number</label>
                  <input type="text" className="form-control" name="cheque_number" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Cheque Number" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Cheque Account</label>
                  <input type="text" className="form-control" name="cheque_account" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Cheque Account" />
                </div>
              </div>

              <div className="row">
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputEmail1" className="mb-0">Cheque Date</label>
                  <DatePicker className="form-control"  maxDate={new Date()} selected={chequeDate} onChange={date => setDate(date, setChequeDate)} onKeyDown={(e)=>e.preventDefault()} />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Bank Name</label>
                  <input type="text" className="form-control" name="bank_name" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Bank Name" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3"></div>
              </div>
            </div>
          </Fragment>
        );
      case "Online":
        return (
          <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputEmail1" className="mb-0">Account Number</label>
                  <input type="text" className="form-control" name="account_number" onChange={(e) => changeHandle(e)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Account Number" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Reference Number</label>
                  <input type="text" className="form-control" name="reference" onChange={(e) => changeHandle(e)} id="exampleInputPassword1" placeholder="Reference Name" />
                </div>
                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3"></div>
              </div>
            </div>

          </Fragment>
        );
      default:
        return (null);
    }
  }

  let changeHandle = ({ target: { value, name } }) => {
    let obj = state;
    obj[name] = value;
    setState(obj);
  }

  let submit = async () => {

    if (!check()) return;

    var req = {
      ...state,
      branch_name     : _branchfromsession,
      location        : _locationfromsession,
      manager         : _idfromsession,
      customer_id     : "CUS" + data.id,
      agent_id        : (selectedAgent["agent"] !== undefined || null || '') ? "A" + selectedAgent["agent"] : '',
      gross_premium   : Number(gross),
      net_premium     : parseInt(String(netAmount)),
      revenue         : parseInt(String(revenue)),
      insurance_type  : selected["typeIns"],
      company         : selected["company"],
      product         : selected["product"],
      mobile          : Number(Mobile.current.value),
      aadhaar         : Number(Aadhaar.current.value),
      policy_login_date: dateFormat(new Date(policyDate).toLocaleDateString()),
      entry_date      : dateFormat(new Date(dateOfEntry).toLocaleDateString()),
      cheque_date     : dateFormat(new Date(chequeDate).toLocaleDateString()),
      payment_mode    : modes,
      manager_id      : (Number(ManagerID.current.value)) ? (Number(ManagerID.current.value)) : 0,
      tso_id          : (Number(TsoID.current.value)) ? (Number(TsoID.current.value)) : 0
    }
    console.log(req);
    console.log(state);
    let res = await request("generalinsurancetransactions/add").post(req);
    let json = await res.json();

    if (json.status === 200) {
      alert("Transaction Added Successfully");
      props.history.push({ pathname: `/Home` });
    } else if (json.status === 302) {
      alert();
      props.history.push({ pathname: `/Home` });
    }
  }

  return (
    <Fragment>
      <section className="mx-auto col-sm-12 p-3 m-0 rounded">
        <h4 className="text-center mx-auto col-sm-6 mb-3 heading p-2">Add General Insurance Transaction</h4>
        <div className="headTwo pt-4">

          <Customer data={data} Aadhaar={Adhaar} Mobile={Mobile} Branch={Branch} />
          <div className="d-flex justify-content-center">
            <h5>Business Entry Details</h5>
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
          <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                <label htmlFor="exampleInputPassword1" className="mb-0">RelationShip Manger ID</label>
                <select className="form-control" name="manager_id" ref = {ManagerID}>
                  <option value="">select RMID</option>
                  
                  {
                    rmid.map((dataa, i) => {
                      return(<option key={i + dataa} value={dataa[1]}>{dataa[1]} ({dataa[0]}) </option>)
                    })
                  }
                 
                </select>
              </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">TSO ID</label>
              <select className="form-control" name="tso_id" ref = {TsoID}>
                <option value="">select TSOID</option>
                {
                    employees.map((dataa, i) => {
                      return(<option key={i + dataa} value={dataa[1]}>{dataa[0]} ({dataa[1]})</option>) 
                    })
                  }
              </select>    
            </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                <label htmlFor="exampleInputPassword1" className="mb-0">Agent ID</label>
                <select className="form-control" name="agent_id" onChange={(e) => fetchAgent(e)}>
                  <option value=" ">select Agent ID</option>
                   {
                    agent.map((dataa, i) => {
                      return <option key={i + dataa} value={dataa.id}>A{dataa.id} ({dataa.first_name} {dataa.last_name})</option>
                    })
                  }
                </select>
              </div>
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Company Name</label>
              <select className="form-control" name="company" id="empProductName" style={{ width: "100%" }} onChange={(e) => fetchProduct(e)}>
                <option value="">Select Company</option>
                {
                  companies.map((company, index) => {
                    return <option key={index + company} value={company}>{company}</option>
                  })
                }
              </select>
            </div>
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Product Name</label>
              <select className="form-control" name="product" id="empProductName" style={{ width: "100%" }} onChange={(e) => fetchType(e)}>
                <option value="">Select Product</option>
                {
                  products.map((company, index) => {
                    return <option key={index + company} value={company}>{company}</option>
                  })
                }
              </select>
            </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Type of Insurance</label>
              <select className="form-control" name="insurance_type" onChange={(e) => fetchMode(e)}>
                <option value="">Select TOI</option>
                {
                  type.map((item, index) => {
                    return <option key={index + item} value={item}>{item} Insurance</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            {/* <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Mode of Insurance</label>
              <select className="form-control" name="insurance_mode" onChange={e => setRevenuePerc(e.target.value)}>
                <option value="">Select MOI</option>
                {
                  mode.map((item, index) => {
                    console.log(item);
                    return <option key={index + item.revenue} value={item.revenue}>{item.mode}</option>
                  })
                }
              </select>
            </div> */}
            {/* <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Sub Type</label>
              <select className="form-control" name="insurance_mode" onChange={e => setRevenuePerc(e.target.value)}>
                <option value="">Select MOI</option>
                    {
                   mode.map((item, index) => {
                     console.log(item);
                     return <option key={index + item.revenue} value={item.revenue}>{item.mode}</option>
                  })
                 } 
              </select>
            </div> */}

                <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
                  <label htmlFor="exampleInputPassword1" className="mb-0">Sub Type</label>
                  {
                    (selectedTypeOfInsurance === "Health")
                      ? (
                        <select className="form-control" id="empProductName" required name="insurance_mode" >
                          <option value="">Select Mode of Insurance</option>
                          <option value="Premium">Premium</option>
                        </select>
                      )
                      : (
                        <select className="form-control" id="empProductName" required name="insurance_mode" >
                          <option value="">Select Mode of Insurance</option>
                          <option value="TP with OD">TP with OD</option>
                          <option value="TP without OD">TP without OD</option>
                          <option value="OD">OD</option>
                          <option value="Comprehensive">Comprehensive</option>
                        </select>
                      )
                  }
                </div>



            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Plan Name</label>
              <select className="form-control" name="plan_name"  onChange={(e) => fetchRevenue(e)}>
                <option value="">Select Plan Name</option>
                {
                  planName.map((item, index) => {
                    console.log(item);
                    return <option key={index + item} value={item}>{item}</option>
                  })
                }
              </select>
              {/* <input
                type="text"
                name="plan_name"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Plan Name"
                onChange={(e) => changeHandle(e)}
              /> */}
            </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Select Mode</label>
              <select className="form-control" name="insurance_mode" onChange={(e) => changeHandle(e)}>
                <option value="">Select Mode</option>
                <option value="Fresh">Fresh</option>
                <option value="Renewel">Renewel</option>
                <option value="Portablity">Portablity</option>
              </select>
            </div>
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Gross Premium</label>
              <input
                type="text"
                className="form-control"
                name="gross_premium"
                id="exampleInputPassword1"
                value={gross}
                placeholder="Gross Premium"
                onChange={(e) => fetchNetAmount(e.target.value)}
              />
            </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Net Premium</label>
              <input
                type="text"
                className="form-control"
                name="net_premium"
                id="exampleInputPassword1"
                value={netAmount}
                readOnly
                placeholder="Net Premium"
              />
            </div>
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Policy Number</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => changeHandle(e)}
                name="policy_number"
                id="exampleInputPassword1"
                placeholder="Policy Number"
              />
            </div>
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Policy Type</label>
              <input type="text" className="form-control" onChange={(e) => changeHandle(e)} name="policy_type" id="exampleInputPassword1" placeholder="Policy Type" />
            </div>
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Policy Tenour</label>
              <input type="email" className="form-control" onChange={(e) => changeHandle(e)} name="policy_tenour" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Policy Tenour" />
            </div>
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Date Of Policy Login</label>
              <DatePicker className="form-control" selected={policyDate}  maxDate={new Date()} onChange={date => setDate(date, setPolicyDate)} onKeyDown={(e)=>e.preventDefault()} />
            </div>
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Type Of Business</label>
              <select className="form-control" name="business_type" id="empProductName" onChange={(e) => changeHandle(e)}>
                <option value="">Select Business</option>
                <option value="Fresh">New business</option>
                <option value="Renewal">Renewel</option>
              </select>
            </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Mode Of Payment</label>
              <select className="form-control" name="payment_mode" id="mop" onChange={(e) => setModes(e.target.value)} >
                <option value="">Select MOP</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">DD</option>
                <option value="Online">Online</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            {func()}
          </div>

          <div className="row p-0 m-0 d-flex justify-content-between">
            
          <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Stage</label>
              <select className="form-control" name="stage" onChange={(e) => changeHandle(e)}>
                  <option value="">Select Stage</option>
                  <option value="login">login</option>
                  <option value="Issued">Issued</option>
                  <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputEmail1" className="mb-0">Date of Entry</label>
              <DatePicker className="form-control" selected={dateOfEntry}  maxDate={new Date()} onChange={date => setDate(date, setDateOfEntry)} onKeyDown={(e)=>e.preventDefault()} />
            </div>

            <div className="col-sm form-group pt-0 pb-0 pr-3 pl-3">
              <label htmlFor="exampleInputPassword1" className="mb-0">Revenue</label>
              <input type="text" className="form-control" name="revenue" id="exampleInputPassword1" placeholder="Revenue" readOnly value={revenue} />
            </div>
          </div>
                   

          <div className="d-flex" style={{ width: "100%" }}>
            <button
              type="submit"
              onClick={() => submit()}
              className="btn btn-primary d-block btn-sm mx-auto"
              style={{ borderRadius: "15px", backgroundColor: "rgb(219, 144, 31)", color: "white", border: "none" }}
            >
              Submit
            </button>
          </div>

        </div>
      </section>
    </Fragment>
  );
}

export default withRouter(Example)
