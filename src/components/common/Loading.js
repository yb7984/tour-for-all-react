import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Loading = ({ open = true }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading;