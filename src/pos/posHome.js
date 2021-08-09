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
// import LifeInsuranceTransaction from '../BusinessTransaction/life-insurance-transaction';
// import GeneralInsuranceTransaction from '../BusinessTransaction/general-insurance-transaction';
import GeneralInsuranceTransaction from '../Transcations/GeneralInsurance';
// import GeneralInsuranceTransaction from './transcations/general-insurance-data1';
import LifeInsuranceTransaction from '../Transcations/LifeInsurance';
import LifeInsuranceData from '../Transcations/LifeInsuranceForm';

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
      const id = await parseJwt(posId);
      setRole(id.pos_id);
      axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/pos/login/loginId-username/loginId-username/${id.pos_id}`)
        .then(res => setUserName(res.data[0].first_name.toLocaleUpperCase()))
        .catch(err => console.log(err))
    }
  }, [history, role]);

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
                    <SubMenu title="Life Insurance POS Report">
            
                    </SubMenu>
                    <SubMenu title="General Insurance POS Report">
                    </SubMenu>
                    <SubMenu title="Status of business">

                    </SubMenu>
                  </Menu>
                </ProSidebar>
              </div>

              <section className="Home_content_section">
                <Switch>
                  <Routing path="/home/add-customer" logout={signOut} component={AddCustomer} />
                  <Routing path="/home/cutomer-details" component={CustomerDetails} />
                  <Routing path="/home/edit-customer-details" component={EditCustomerDetails} />
                  <Routing path="/home/business-transaction/life-insurance-transaction" component={LifeInsuranceTransaction}/>
                  <Routing path="/home/business-transaction/general-insurance-transaction" component={GeneralInsuranceTransaction}/>
                  <Routing path="/home/life-insurance-transactions-data" component={LifeInsuranceData}/>
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