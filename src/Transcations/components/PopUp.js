import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';


export const PopFunction = ({message, open} )  => <PopUp message={message} open={open}/>


const PopUp = ({ popup : { message, open, color }}) => {
    const [openSnack, setOpenSnack] = useState(false);
    
    useEffect(() =>{
        setOpenSnack(open)
    }, [open])

    const handleClose = () => {
        setOpenSnack(false);
    }
    
    return (
        <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={color ? color : "info"}>
                    {message}
                </Alert>
            </Snackbar>
    )
}

export default PopUp;