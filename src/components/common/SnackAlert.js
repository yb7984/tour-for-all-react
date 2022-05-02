import { Snackbar, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';

const SnackAlert = ({ message, open, handleClose = null, serverity = "success" }) => {

    return (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{
            vertical:'top',
            horizontal:'center'
        }}
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        }>
        <Alert elevation={6} variant="filled" severity={serverity} onClose={handleClose}>
            {message}
        </Alert>
    </Snackbar>);
}

export default SnackAlert;