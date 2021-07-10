import { Redirect } from 'react-router-dom';
import { Container, Typography, Grid, makeStyles, TextField, } from '@material-ui/core';
import useFields from './hooks/useFields';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './actions/users';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import useFormError from './hooks/useFormError';
import ImageUpload from './ImageUpload';
import Error from './Error';
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
        }
    },
}));


/**
 * /profile route , component to show a profile update form 
 * @returns 
 */
const Profile = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);

    const [formData, handleChange, setFormData] = useFields({
        password: '',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        image: user.image,
    });
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg, isError] = useFormError();

    if (!username) {
        return (<Redirect to="/login" />);
    }

    const setImage = (image) => {
        setFormData(fData => ({
            ...fData,
            image: image
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(updateUser(username, { ...formData }, setLoading, setErrorMsg));
        setUpdating(true);
    }

    const handleAlertClose = (event, reason) => {
        setUpdating(false);
    };

    if (user) {
        return (
            <Container maxWidth="sm">
                <SnackAlert open={updating && !loading && !isError}
                    message="Successfully updated profile!"
                    handleClose={handleAlertClose} />
                <SnackAlert open={updating && !loading && errorMsg.formErrors.length > 0}
                    message={errorMsg.formErrors}
                    serverity="error"
                    handleClose={handleAlertClose} />
                <form onSubmit={handleSubmit} className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h3">User Profile</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="error">{errorMsg.formErrors}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="username" name="username" type="text"
                                label="Username" variant="outlined" fullWidth
                                required
                                value={username}
                                inputProps={
                                    {
                                        placeholder: "Enter username",
                                        maxLength: 30,
                                        readOnly: true
                                    }
                                } />
                            <TextField id="password" name="password" type="password"
                                label="Password" variant="outlined" fullWidth
                                onChange={handleChange}
                                error={!!errorMsg.fieldErrors.password}
                                helperText={errorMsg.fieldErrors.password}
                                value={formData.password}
                                inputProps={
                                    {
                                        placeholder: "Enter password",
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
                            <TextField id="phone" name="phone" type="tel"
                                label="Phone" variant="outlined" fullWidth
                                onChange={handleChange}
                                error={!!errorMsg.fieldErrors.phone}
                                helperText={!!errorMsg.fieldErrors.phone && "Phone number must be 10 digits"}
                                value={formData.phone}
                                inputProps={
                                    {
                                        placeholder: "Enter phone",
                                        maxLength: 20
                                    }
                                } />

                            <ImageUpload
                                uploading={uploading} setUploading={setUploading}
                                image={formData.image} setImage={setImage}
                                label="Upload your avatar!" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" disabled={uploading}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Loading open={loading} />
            </Container>);
    }
    return <Error />;

}

export default Profile;