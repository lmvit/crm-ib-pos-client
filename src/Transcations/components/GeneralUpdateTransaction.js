import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import CrmforInsuranceService  from '../../config/index'
import axios from 'axios';


export default function AlertDialog({ dailogProps : { open, message }, close}) {
    const [dailogOpen, setDailogOpen] = useState(false);
    const [policyNumber, setPolicyNumber] = useState('');
    const [stage, setStage] = useState('');
    const [files, setFiles] = useState({});
    const [ isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setDailogOpen(open)
    }, [open])

    const handleClose = () => {
        setDailogOpen(false);
    };

    const uploadFile = (e) => {
        const { name } = e.target;
        const selected = e.target.files[0].size
        if (e.target.files[0].type !== "application/pdf") {
            e.target.value = null
            alert("Please upload only pdf files");
            return;
        }
        if (selected >= 10000000) {
            window.alert(`${name} File too big max 100KB`);
            e.target.value = null
            return;
        }

        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            setFiles(preValue => ({
                ...preValue,
                [name]: window.btoa(e.target.result)
            }))
        }
    }

    const check = () => {
        const error = [];

        if(!policyNumber){
            error.push("Policy Number");
        }
        if(!stage){
            error.push("Stage");
        }
        if( !files.policy_form){
            error.push("Policy Form")
        }

        if(error.length === 0) {
            return true;
        } else {
            alert(error.join(", ") + " fields are not added please add them to complete transaction");
            return false; 
        }
    }

    const onSubmit = async () => {

        if(!check()) {
            return;
        }

        const values = {
            id: message,
            policy_number : policyNumber,
            stage : stage,
            ...files
        }   

        setIsUpdating(true)
        axios.post(CrmforInsuranceService.CrmforInsuranceService.baseURL + '/api/general-transactions/update', values).then((response) => {
            setIsUpdating(false);
            close();
        }).catch((error) => {
            setIsUpdating(false)
        })
    }   

    return (
        <div>
            <Dialog
                open={dailogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold", color: "red" }}>Update Transaction {message}</DialogTitle>
                <DialogContent className="d-flex justify-content-center flex-column text-center" >
                    {/* <DialogContentText id="alert-dialog-description" className="py-3"style={{ fontWeight: "700" }}>
                           Update Transaction
                    </DialogContentText> */}
                    <div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="form-group col-12">
                                <label className="h6">Policy Number</label><br />
                                <input className="form-control" id="text" name="policy_number" type="text" onChange={(e) =>setPolicyNumber(e.target.value)} value={policyNumber} />
                            </div>
                            <div className="form-group col-12">
                                <label className="h6">Stage</label><br />
                                <select className="form-control"id="text" name="stage" type="text" onChange={(e) =>setStage(e.target.value)} value={stage}>
                                    <option value=""></option>
                                    <option value="Login">Login</option>
                                    <option value="Issued">Issued</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="form-group col-12 m-auto py-2">
                                <label className="h6">Policy Form</label><br />
                                <input id="file" name="policy_form" type="file" accept="pdf" onChange={(e) => uploadFile(e)} />
                            </div>
                        </div>
                    </div>
                    <DialogActions className="py-3">
                        <Button onClick={() => { handleClose(); close() }} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => { onSubmit() }} variant="contained" color="primary" disabled={isUpdating || !policyNumber || !stage}>    
                            { isUpdating ? <CircularProgress size={25} thickness={5}/>  : "Update"}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

{/* <CircularProgress /> */}