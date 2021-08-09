import React, { Fragment, useState, useEffect, useContext } from 'react';
import { NewSearchHandler, PendingSearchHandler } from '../helper/helper';
import axios from 'axios';
import CrmforPosService from '../../src/config/index';
import { AiOutlineWarning } from 'react-icons/ai';
import { VscNewFile } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import NewTransactionsTable from './components/NewTransactionsTable';
import PendingTransactionTable from './components/PendingTransactionsTable';
import {UserContext} from '../pos/posHome';
import AlertDialog from './components/GeneralUpdateTransaction';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectDates from '../helper/SelectDates';

const GeneralInsurance = (props) => {
    // Dates
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [staticDatesBoolean, setStaticDatesBoolean] = useState(true);

    // New Transactions
    const [newTransactionSearch, setNewTransactionSearch] = useState("")
    const [newTransactionsTable, setNewTransactionsTable] = useState(false);
    const [newTransactions, setNewTransactions] = useState([]);
    const [newTransactionsFetched, setNewTransactionsFetched] = useState([]);

    // Pending Transactions
    const [pendingTransactionSearch, setPendingTransactionSearch] = useState('');
    const [pendingTransactionsTable, setPendingTransactionsTable] = useState(false);
    const [pendingTransactions, setPendingTransactions] = useState([]);
    const [pendingTransactionsFetched, setPendingTransactionsFetched] = useState([]);

    // Loading
    const [tableLoading, setTableLoading] = useState(true);

    ////Dailog and Table
    const [showPendingTransactions, setShowPendingTransactions] = useState(true);
    const [dailog, setDailog] = useState({ open: false, message: "" });

    const employeeId = useContext(UserContext);
    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (employeeId) {
            axios.get(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/pending-transactions/${employeeId}`).then(response => {
                setPendingTransactionsFetched(response.data.customerArray);
                setPendingTransactions(response.data.customerArray);
                setPendingTransactionsTable(true);
                setTableLoading(false)
            }).catch((error) => {
                setTableLoading(false);
            })
            // const fetchedEmployees = await axios.get(CrmforInsuranceService.CrmforInsuranceService.baseURL + `/api/general-transactions/dependent-transactions/${employeeId}`);
            // console.log(fetchedEmployees)
        }
    }, [employeeId, dailog.open])


    const newSearchHandler = (event) => {
        setNewTransactionSearch(event.target.value)
        event.target.value ? setNewTransactions(NewSearchHandler(event.target.value, newTransactionsFetched)) : setNewTransactions(newTransactionsFetched)
    }

    const pendingSearchHandler = (event) => {
        setPendingTransactionSearch(event.target.value)
        event.target.value ? setPendingTransactions(PendingSearchHandler(event.target.value, pendingTransactionsFetched)) : setPendingTransactions(pendingTransactionsFetched)
    }

    const radioButtonHandler = (startDate, endDate) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }


    const editHandler = (id) => setDailog({ open: true, message: id });
    const closeDailog = () => setDailog({ open: false });

    const addHandler = (pan_number) => {
        history.push({
            pathname: '/home/general-insurance-transactions-data',
            state: { pan_number }
        })
    }

    const onSubmit = async () => {
        let datesData = { start_date: startDate, end_date: endDate }

        setTableLoading(true)
        axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/general-transactions/transactions-between-dates/${employeeId}`, datesData).then(response => {
            setNewTransactions(response.data.data)
            setShowPendingTransactions(false)
            setNewTransactionsFetched(response.data.data)
            setNewTransactionsTable(true)
            setTableLoading(false)
        }).catch((err) => {
            alert("No customer information found in given dates");
            setNewTransactions([])
            setNewTransactionsFetched([])
            setNewTransactionsTable(false)
            setTableLoading(false)
        })
    }


    return (
        <Fragment>
            <div className="col-12 pt-3">
                <h5 className="text-center">General Insurance Transaction</h5>
            </div>
            <div className='d-flex flex-wrap justify-content-center text-center'>
                <div className="form-group col-12 col-md-6 col-xl-3">
                    <label className="h6 " htmlFor="start_date">Start Date</label>
                    <input type="date" className='form-control' name="start_date" id='start_date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group col-12 col-md-6 col-xl-3 text-center">
                    <label className="h6" htmlFor="end_date">End Date</label>
                    <input type="date" className='form-control' name="end_date" id="end_date" value={endDate} min={startDate && startDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <SelectDates  radioButtonHandler={radioButtonHandler}/>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-secondary" onClick={onSubmit} >Submit</button>
            </div>
            <div className="d-flex flex-wrap justify-content-center ">
                <div className="col-12 col-md-6 col-xl-4 d-flex  justify-content-center py-1">
                    <Badge badgeContent={newTransactionsFetched ? newTransactionsFetched.length : 0} showZero color="error" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                        <Button variant="contained" color="primary" onClick={() => setShowPendingTransactions(false)}><span className="h5"><VscNewFile /></span>  &nbsp; New Transactions  </Button>
                    </Badge>
                </div>
                <div className="col-12 col-md-6 col-xl-4 d-flex  justify-content-center py-1">
                    <Badge badgeContent={pendingTransactionsFetched ? pendingTransactionsFetched?.length : 0} showZero color="error" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                        <Button variant="contained" color="secondary" onClick={() => setShowPendingTransactions(true)}><span className="h5"><AiOutlineWarning /></span> &nbsp; Pending Transactions  </Button>
                    </Badge>
                </div>
            </div>
            <div>
                {
                    tableLoading ? (
                        <div className='d-flex justify-content-center mt-5 py-5'>
                            <CircularProgress />
                        </div>
                    ) : (
                        <>
                            {
                                showPendingTransactions ?
                                    <PendingTransactionTable table={pendingTransactionsTable} pendingTransactions={pendingTransactions && pendingTransactions} searchField={pendingTransactionSearch} editHandler={editHandler} searchHandler={pendingSearchHandler} /> :
                                    <NewTransactionsTable table={newTransactionsTable} newTransactions={newTransactions && newTransactions} searchField={newTransactionSearch} editHandler={addHandler} searchHandler={newSearchHandler} />
                            }
                        </>
                    )}
            </div>
            {
                dailog.open === true ? <AlertDialog dailogProps={dailog} close={closeDailog} /> : null
            }
        </Fragment>
    )
}

export default GeneralInsurance;
