import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from "@material-ui/core";


const ConfirmDialog = ({ open, message, handleClose }) => {
    return (<>
        <Dialog
            open={open}
            aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">
                Confirmation
            </DialogTitle>
            <DialogContent>
                <DialogContentText color="textPrimary">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(true)} variant="contained" color="primary">
                    Confirm
                </Button>
                <Button autoFocus onClick={() => handleClose(false)} variant="contained" color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default ConfirmDialog;