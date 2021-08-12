import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import CircularProgress from '@material-ui/core/CircularProgress';



const NewTransactionsTable = ({ table, newTransactions, searchField, searchHandler, editHandler }) => {

    return (
        <>
            {table ? (
                <>
                    <div className="col-12 py-1">
                        <h5 className="text-center">Customers Table</h5>
                    </div>
                    <div className="d-flex justify-content-center px-5 py-3 ">
                        <input type="search" className="form-control col-xl-4 col-md-12 col-sm-12" name="search" id="search" value={searchField} onChange={searchHandler} placeholder="Search by given field" />
                    </div>
                    <>
                        {newTransactions && newTransactions[0] ? (
                            <>
                                <div className="table-responsive col-12">
                                    <table className="table table-hover table-striped" style={{ borderCollapse: 'initial' }}>
                                        <thead>
                                            <tr className="bg-dark text-white">
                                                <th>S.no</th>
                                                <th>Customer&nbsp;ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile&nbsp;Number</th>
                                                <th>Pan Number</th>
                                                <th>Aadhaar&nbsp;Number</th>
                                                <th>Add</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                newTransactions?.map((customer, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td className="text-uppercase">{customer.customer_id}</td>
                                                            <td className="text-uppercase">{customer.first_name + " " + customer.last_name}</td>
                                                            <td>{customer.email}</td>
                                                            <td>{customer.mobile_number}</td>
                                                            <td className="text-uppercase">{customer.pancard}</td>
                                                            <td className="text-capitalize">{customer.aadhar_number}</td>
                                                            <td className="text-center" onClick={() => editHandler(customer.pancard,customer.customer_id)}> <MdAddCircle title="Add new transaction" size="1.3em" style={{ color: "black" }} /></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-center  py-5">
                                    <h5>No search customer found.....!</h5>
                                </div>
                            </>
                        )}

                    </>
                </>
            ) : (
                <div className="d-flex justify-content-center px-5 py-3 ">
                    <h5 className="col-12 text-center text-danger">Please select dates to get customer details</h5>
                </div>
            )}
        </>
    )
}

export default NewTransactionsTable;