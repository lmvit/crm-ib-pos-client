import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';

export default function AlertDialog({ dailog: { message, open, id, pending }, close }) {
    const [dailogOpen, setDailogOpen] = useState(false);
    const history = useHistory();
    const dailogMessage = (id, pending) => {
        const pendingString = `Transaction is saved with transaction id: ${id} but poilcy number or stage or files are not given. Please inserted them later to complete transaction. Until then the transaction will be saved in pending transactions `
        const completeString = `Transaction details are saved successfully and sent to the operation team with transaction-id: ${id}`
        let returnString;

        if(pending){
            returnString = pendingString;
        } else {
            returnString = completeString;
        }

        return returnString;
    }


    useEffect(() => {
        setDailogOpen(open)
    }, [open])

    const handleClose = () => {
        setDailogOpen(false);
        history.push('/home/business-transaction/life-insurance-transaction')
    };

    return (
        <div>
            <Dialog
                open={dailogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold", color: "red"}}>Alert</DialogTitle>
                <DialogContent className="d-flex justify-content-center flex-column">
                    <DialogContentText id="alert-dialog-description" style={{ fontWeight: "700" }}>
                        {dailogMessage(id, pending)}
                    </DialogContentText>

                    <DialogActions>
                        <Button onClick={() => { handleClose(); close() }} variant="contained" color="primary">
                            Ok....!
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
