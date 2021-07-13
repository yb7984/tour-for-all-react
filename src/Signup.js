import { Redirect } from 'react-router-dom';
import { Container, Typography, Grid, TextField, makeStyles } from '@material-ui/core';
import useFields from './hooks/useFields';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './actions/auth';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import useFormError from './hooks/useFormError';
import SnackAlert from './SnackAlert';


const useStyles = makeStyles((theme) => ({
    root: {
        '& h3,h6': {
            margin: theme.spacing(2)
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
        '& .MuiButton-root': {
            margin: theme.spacing(2)
        },
    },
}));

/**
 * /signup route , component to show a signup form 
 * @returns 
 */
const Signup = () => {
    const classes = useStyles();

    const [formData, handleChange] = useFields({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const dispatch = useDispatch();
    const token = useSelector(st => st.auth.token);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useFormError();
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(signup(formData, setLoading, setErrorMsg));
        setUpdating(true);
    }

    if (token && !loading) {
        return <Redirect to="/" />;
    }

    const handleAlertClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setUpdating(false);
    };

    return (
        <Container maxWidth="sm">
            <SnackAlert open={updating && !loading && errorMsg.formErrors.length > 0}
                message={errorMsg.formErrors}
                serverity="error"
                handleClose={handleAlertClose} />
            <form onSubmit={handleSubmit} className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h3">User Sign Up</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="username" name="username" type="text"
                            label="Username" variant="outlined" fullWidth
                            required
                            autoFocus
                            onChange={handleChange}
                            error={!!errorMsg.fieldErrors.username}
                            helperText={errorMsg.fieldErrors.username}
                            value={formData.username}
                            inputProps={
                                {
                                    placeholder: "Enter username",
                                    maxLength: 30
                                }
                            } />
                        <TextField id="password" name="password" type="password"
                            label="Password" variant="outlined" fullWidth
                            required
                            onChange={handleChange}
                            error={!!errorMsg.fieldErrors.password}
                            helperText={errorMsg.fieldErrors.password}
                            value={formData.password}
                            inputProps={
                                {
                                    placeholder: "Enter password",
                                    minLength: 5,
                                    maxLength: 30
                                }
                            } />
                        <TextField id="firstName" name="firstName" type="text"
                            label="First Name" variant="outlined" fullWidth
                            required
                            onChange={handleChange}
                            error={!!errorMsg.fieldErrors.firstName}
                            helperText={errorMsg.fieldErrors.firstName}
                            value={formData.firstName}
                            inputProps={
                                {
                                    placeholder: "Enter first name",
                                    maxLength: 30
                                }
                            } />
                        <TextField id="lastName" name="lastName" type="text"
                            label="Last Name" variant="outlined" fullWidth
                            required
                            onChange={handleChange}
                            error={!!errorMsg.fieldErrors.lastName}
                            helperText={errorMsg.fieldErrors.lastName}
                            value={formData.lastName}
                            inputProps={
                                {
                                    placeholder: "Enter last name",
                                    maxLength: 30
                                }
                            } />
                        <TextField id="email" name="email" type="email"
                            label="Email" variant="outlined" fullWidth
                            required
                            onChange={handleChange}
                            error={!!errorMsg.fieldErrors.email}
                            helperText={errorMsg.fieldErrors.email}
                            value={formData.email}
                            inputProps={
                                {
                                    placeholder: "Enter email",
                                    maxLength: 50
                                }
                            } />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" data-testid="signup-button">
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Loading open={loading} />
        </Container>);
}

export default Signup;