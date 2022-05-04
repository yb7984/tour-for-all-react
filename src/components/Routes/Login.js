import { Link, Redirect } from 'react-router-dom';
import { Container, Typography, Grid, TextField, makeStyles } from '@material-ui/core';
import { useFields, useFormError } from '../../hooks';
import { Loading } from '../common';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Button from '@material-ui/core/Button';
import { useState } from 'react';



const useStyles = makeStyles((theme) => ({
    root: {
        '& h3,h6': {
            margin: theme.spacing(2)
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(2)
        },
        '& .MuiButton-root': {
            margin: theme.spacing(2)
        },
    },
}));

/**
 * /login route , component to show a login form 
 * @returns 
 */
const Login = (props) => {
    const classes = useStyles();

    const [formData, handleChange] = useFields({
        username: "",
        password: ""
    });
    const { token, login } = props;
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useFormError();

    const handleSubmit = async (e) => {
        e.preventDefault();

        login(formData.username, formData.password, setLoading, setErrorMsg);
    }

    if (token && !loading) {
        return <Redirect to="/" />;
    }


    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit} className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h3">User Login</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="error">{errorMsg.formErrors.length > 0 && "Invalid username / password!"}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="username" name="username" type="text"
                            label="Username" variant="outlined" fullWidth
                            required
                            autoFocus
                            onChange={handleChange}
                            inputProps={
                                {
                                    placeholder: "Enter username",

                                }
                            } />
                        <TextField id="password" name="password" type="password"
                            label="Password" variant="outlined" fullWidth
                            required
                            onChange={handleChange}
                            inputProps={
                                {
                                    placeholder: "Enter password",

                                }
                            } />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" data-testid="login-button">
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            No account? just <Link to="/signup">Sign up</Link> here.
                        </Typography>
                    </Grid>
                </Grid>
            </form>
            <Loading open={loading} />
        </Container>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password, setLoading, setError) => dispatch(login(username, password, setLoading, setError))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
