import React, { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { GrDocumentUpdate } from 'react-icons/gr';
import CircularProgress from '@material-ui/core/CircularProgress';



const PendingTransactionTable = ({ table, pendingTransactions, searchField, searchHandler, editHandler }) => {

    // useEffect(() => {
    //     console.log(pendingTransactions)
    // })

    return (
        <>
            {table ? (
                <>
                    <div className="col-12 py-1">
                        <h5 className="text-center">Pending Transactions Table</h5>
                    </div>
                    <div className="d-flex justify-content-center px-5 py-3 ">
                        <input type="search" className="form-control col-xl-4 col-md-12 col-sm-12" name="search" id="search" value={searchField} onChange={searchHandler} placeholder="Search by given field" />
                    </div>
                    <div className="table-responsive-lg col-12  p-3">
                        {pendingTransactions && pendingTransactions[0] ? (
                            <>
                                <table className="table table-hover table-striped" style={{ borderCollapse: 'initial' }}>
                                    <thead>
                                        <tr className="bg-dark text-white">
                                            <th>S.no</th>
                                            <th>Transaction&nbsp; Id</th>
                                            <th>Name</th>
                                            <th>Mobile&nbsp;Number</th>
                                            <th>Pan Number</th>
                                            <th>Aadhaar Number</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingTransactions?.map((customer, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{customer.id}</td>
                                                    <td className="text-uppercase">{customer.customer_name}</td>
                                                    <td>{customer.customer_mobile}</td>
                                                    <td className="text-uppercase">{customer.customer_pan}</td>
                                                    <td className="text-capitalize">{customer.customer_aadhar}</td>
                                                    <td className="text-center" onClick={() => editHandler(customer.id)}> <GrDocumentUpdate title="Add new transaction" size="1.3em" style={{ color: "black" }} /></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-center  py-5">
                                    <h5>No search customer found.....!</h5>
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className="d-flex justify-content-center px-5 py-3 ">
                    <h5 className="col-12 text-center text-danger">No Pending Transactions</h5>
                </div>
            )}
        </>
    )
}

export default PendingTransactionTable;