import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from "react-router";
import { Switch, Link, Redirect } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import "../App.css";
import { useSpring, animated } from "react-spring";
import { FaBars } from 'react-icons/fa';
import AddCustomer from '../provide-business/AddCustomer';
import parseJwt from '../jwtDecode';
import CustomerDetails from '../provide-business/CustomerDetails';
import EditCustomerDetails from '../provide-business/EditCustomerDetails';
import Routing from '../protectedRoute/Routing';
import axios from 'axios';
import CrmforPosService from '../../src/config/index';
// import GeneralInsuranceTransaction from '../Transcations/generalInsuranceSearch';
import GeneralInsuranceTransaction from '../Transcations/general-insurance-data-search';
import GeneralInsuranceData from '../Transcations/GeneralInsuranceForm';
import RenewalGeneralInsuranceData from '../Transcations/RenewalGeneralInsuranceTransaction';
import LifeInsuranceTransaction from '../Transcations/LifeInsuranceSearch';
import LifeInsuranceData from '../Transcations/LifeInsuranceForm';
// import RenewalLifeInsuranceData from '../Transcations/RenewalLifeInsuranceTransaction';
import LifeInsurancePosReports from '../posReports/Life-insurance-pos-reports';
import GeneralInsurancePosReports from '../posReports/Life-insurance-pos-reports';
import Home from './Home';
import LifeInsuranceRenewalReports from '../RenewalReports/LifeInsurance';
import GeneralInsuranceRenewalReports from '../RenewalReports/GeneralInsurance';
import PayoutDateSeach from '../payouts/PayoutDateSeach';
import GeneralPayoutDataSeach from '../payouts/GeneralPayoutDataSearch';
import RenewalLifeInsuranceTransaction from '../Transcations/RenewalLifeInsuranceTransaction';
import RenewalGeneralInsuranceTransaction from '../Transcations/RenewalGeneralInsuranceTransaction';

export const UserContext = React.createContext();
const PosHome = (props) => {
  const [role, setRole] = useState('');
  const [sideBarToogle, setSideBarToogle] = useState(false);
  const history = useHistory();
  const [userName, setUserName] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const posId = sessionStorage.getItem('token');
    if (!posId) {
      history.push('/');
      return window.alert('Enter your login credentials')
    } else {
      await axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/login/loginId-username`,{headers:{Authorization:posId}})
        .then(res => setUserName(`${res.data[0].first_name} ${res.data[0].last_name}`))
      await axios.get(CrmforPosService.CrmforPosService.baseURL+'/api/pos/login/get-pos-role',{headers:{Authorization:posId}})
        .then(res=>setRole(res.data[0].pos_id))
        .catch(err => console.log(err))
    }
  }, [history, role,userName]);

  function logout() {
    if (window.confirm("Are you sure you want to Logout ?")) {
      sessionStorage.clear();
      props.history.push({
        pathname: `/`
      });
    }
  };

  const signOut = () => {
    return <Redirect to="/" />
  }


  const styleProps = useSpring({
    opacity: 1,
    marginLeft: 0,
    from: { opacity: 0, marginLeft: -500 }
  });

  var toggleSideBar = () => {
    setSideBarToogle(!sideBarToogle)
  }

  let closeBar = (e) => {
    if (e.target.tagName === 'A') {
      toggleSideBar();
      active(e.target.textContent)
    }
  }

  const active = async (e) => {
    const allLis = document.querySelectorAll(".pro-menu-item");


    for (const li of allLis) {
      if (!li.classList.contains("pro-sub-menu")) {
        if (li.classList.contains("activeClass")) {
          li.classList.remove("activeClass");
          li.querySelector('a').style.color = "inherit";
        }
      }
    }

    for (const li of allLis) {
      if (!li.classList.contains("pro-sub-menu")) {
        if (li.textContent === e) {
          li.classList.add('activeClass');
          li.querySelector('a').style.color = "black";
        }
      }
    }
  }


  return (
    <UserContext.Provider value={role}>
      <Fragment>
        <animated.div style={styleProps}>
          <div className="Home_main_div">
            <div className="Home_header_div">
              <div className="Home_sidebar_button" onClick={toggleSideBar}><FaBars size="1.5em" /></div>
              <h4 className="p-2 align-self-center" style={{ color: "white", marginTop: "9px" }}>LMVIB POS for Insurance Broking</h4>
              <h6 className="m-0 p-0 align-self-center text-white"><strong>{`Welcome,${userName}`}&nbsp; | {`POS ID: ${role.toLocaleUpperCase()}`}</strong></h6>
              <button className="btn p-1 align-self-center Home_logout btn-dark" onClick={() => logout()}>Logout</button>
            </div>

            <div className="Home_content">

              <div onClick={e => closeBar(e)} className={["Home_sidebar", sideBarToogle ? "pro-sidebar-open" : "pro-sidebar-close"].join(" ")}>
                <ProSidebar className='Home_proSideBar'>
                  <Menu iconShape="square">
                    <MenuItem>
                      <Link to="/home/reports-count">Home</Link>
                    </MenuItem>
                    <SubMenu title="Provide Business">
                      <MenuItem  >
                        <Link to='/home/add-customer'>Add New Customer</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/home/cutomer-details'>Customer Details</Link>
                      </MenuItem>
                    </SubMenu>
                    <SubMenu title="Business Transaction">
                      <MenuItem  >
                        <Link to='/home/business-transaction/life-insurance-transaction'>Life Insurance Transaction</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/home/business-transaction/general-insurance-transaction'>General Insurance Transaction</Link>
                      </MenuItem>
                    </SubMenu>
                    <SubMenu title="Renewal Reports">
                      <MenuItem  >
                        <Link to='/home/renewal-reports/life-insurance'>Life Insurance Reports</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/home/renewal-reports/general-insurance'>General Insurance Reports</Link>
                      </MenuItem>
                    </SubMenu>
                      <MenuItem>
                        <Link to='/home/life-transactions-pos-reports'>Life Insurance POS Report</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/home/general-transactions-pos-reports'>General Insurance POS Report</Link>
                      </MenuItem>
                    <SubMenu title="Status of business">
                      <MenuItem>
                        <Link to='/home/life-insurance-payouts'>Life Insurance</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/home/general-insurance-payouts'>General Insurance</Link>
                      </MenuItem>
                    </SubMenu>
                  </Menu>
                </ProSidebar>
              </div>

              <section className="Home_content_section">
                <Switch>
                  <Routing path="/home/reports-count" component={Home}/>
                  <Routing path="/home/add-customer" logout={signOut} component={AddCustomer} />
                  <Routing path="/home/cutomer-details" component={CustomerDetails} />
                  <Routing path="/home/edit-customer-details" component={EditCustomerDetails} />
                  <Routing path="/home/business-transaction/life-insurance-transaction" component={LifeInsuranceTransaction}/>
                  <Routing path ='/home/business-transaction/renewal-life-insurance-transaction' component={RenewalLifeInsuranceTransaction}/>
                  <Routing path="/home/business-transaction/general-insurance-transaction" component={GeneralInsuranceTransaction}/>
                  <Routing path="/home/business-transaction/renewal-general-insurance-transaction" component={RenewalGeneralInsuranceTransaction} />
                  <Routing path="/home/life-insurance-transactions-data" component={LifeInsuranceData}/>
                  <Routing path="/home/general-insurance-transactions-data" component={GeneralInsuranceData}/>
                  <Routing path="/home/life-transactions-pos-reports" component={LifeInsurancePosReports}/>
                  <Routing path="/home/general-transactions-pos-reports" component={GeneralInsurancePosReports}/>
                  <Routing path="/home/renewal-reports/life-insurance" component={LifeInsuranceRenewalReports}/>
                  <Routing path="/home/renewal-reports/general-insurance" component={GeneralInsuranceRenewalReports}/>
                  <Routing path="/home/life-insurance-payouts" component={PayoutDateSeach}/>
                  <Routing path="/home/general-insurance-payouts" component={GeneralPayoutDataSeach}/>
                </Switch>
              </section>
            </div>
          </div>
        </animated.div>
      </Fragment>
    </UserContext.Provider>
  );
};

export default PosHome;