import { makeStyles, Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.error.main,
        fontSize: "3em"
    },
}));

const Error = () => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={true}>
            Something went wrong here!
        </Backdrop>
    );
}

export default Error;