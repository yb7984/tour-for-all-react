import { Dialog, AppBar, Toolbar, Container, Typography, IconButton, Grid, makeStyles, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useFields from './hooks/useFields';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { insertTour } from './actions/tours';
import { useState } from 'react';
import useFormError from './hooks/useFormError';
import ImageUpload from './ImageUpload';
import Error from './Error';
import SnackAlert from './SnackAlert';
import moment from 'moment';
import Tour from './models/tour';
import { useHistory } from 'react-router-dom';
import useQueryParams from './hooks/useQueryParams';

const useStyles = makeStyles((theme) => ({
    root: {
        '& h3,h6': {
            margin: theme.spacing(2)
        },
        '& .MuiGrid-item': {
            paddingLeft: "10px",
            paddingRight: "10px"
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(2)
        },
        '& .MuiButton-root': {
            margin: theme.spacing(2)
        }
    },
    appBar: {
        position: 'relative',
    },
}));
const TourAddForm = ({ handleClose = null }) => {
    const classes = useStyles();
    const { search } = useQueryParams();
    const dispatch = useDispatch();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);
    const [slug, setSlug] = useState('');
    const history = useHistory();

    const canEdit = username && user;

    const [formData, handleChange, setFormData] = useFields({
        title: "",
        guaranteed: 0,
        description: "",
        price: 0,
        entryFee: 0,
        startDate: moment().format("YYYY-MM-DD"),
        startTime: moment().format("HH:mm")
    });
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg, isError] = useFormError();

    const setImage = (image) => {
        setFormData(fData => ({
            ...fData,
            image: image
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newSlug = Tour.generateSlug({
            ...formData,
            start: new Date(formData.startDate)
        });
        setSlug(newSlug);

        const { startDate, startTime, ...data } = formData;

        data.slug = newSlug;
        data.guaranteed = parseInt(data.guaranteed);
        data.price = parseInt(data.price);
        data.entryFee = parseInt(data.entryFee);
        data.setting = JSON.stringify(data.setting);
        data.start = moment(`${startDate} ${startTime}`, "YYYY-MM-DD HH:mm").format();

        dispatch(insertTour(data, setLoading, setErrorMsg));
        setUpdating(true);
    }

    const handleAlertClose = (event, reason) => {
        setUpdating(false);
    };

    const handleAlertCloseSuccess = (event, reason) => {
        setUpdating(false);

        // redirect to detail page
        history.push(`${search}#${slug}`);
    }

    if (!canEdit) {
        return (<Container>
            <Error />
        </Container>)
    }

    return (
        <Dialog fullScreen open={true} onClose={handleClose} className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container>
                <form onSubmit={handleSubmit} className={classes.root}>
                    <SnackAlert open={updating && !loading && !isError}
                        message="Successfully updated this tournament!"
                        handleClose={handleAlertCloseSuccess} />
                    <SnackAlert open={updating && !loading && errorMsg.formErrors.length > 0}
                        message={errorMsg.formErrors}
                        serverity="error"
                        handleClose={handleAlertClose} />
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h3">New Tournament</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="title" name="title" type="text"
                                label="Title" variant="outlined" fullWidth
                                required
                                value={formData.title}
                                onChange={handleChange}
                                error={!!errorMsg.fieldErrors.title}
                                helperText={errorMsg.fieldErrors.title}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    {
                                        placeholder: "Enter title"
                                    }
                                } />
                            <Grid container>
                                <Grid item xs={4}>
                                    <TextField id="price" name="price" type="text"
                                        label="Price" variant="outlined" fullWidth
                                        required
                                        value={formData.price}
                                        onChange={handleChange}
                                        error={!!errorMsg.fieldErrors.price}
                                        helperText={errorMsg.fieldErrors.price}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            {
                                                placeholder: "Enter price"
                                            }
                                        } />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="entryFee" name="entryFee" type="text"
                                        label="Entry Fee" variant="outlined" fullWidth
                                        required
                                        value={formData.entryFee}
                                        onChange={handleChange}
                                        error={!!errorMsg.fieldErrors.entryFee}
                                        helperText={errorMsg.fieldErrors.entryFee}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            {
                                                placeholder: "Enter entry fee"
                                            }
                                        } />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="guaranteed" name="guaranteed" type="text"
                                        label="Guaranteed" variant="outlined" fullWidth
                                        required
                                        value={formData.guaranteed}
                                        error={!!errorMsg.fieldErrors.guaranteed}
                                        helperText={errorMsg.fieldErrors.guaranteed}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            {
                                                placeholder: "Enter guaranteed"
                                            }
                                        } />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="startDate" name="startDate" type="date"
                                        label="Start Date" variant="outlined" fullWidth
                                        required
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        error={!!errorMsg.fieldErrors.start}
                                        helperText={errorMsg.fieldErrors.start}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            {
                                                placeholder: "Enter start date"
                                            }
                                        } />

                                </Grid>

                                <Grid item xs={4}>
                                    <TextField id="startTime" name="startTime" type="time"
                                        label="Start Time" variant="outlined" fullWidth
                                        required
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            {
                                                placeholder: "Enter start time"
                                            }
                                        } />

                                </Grid>
                            </Grid>
                            <ImageUpload
                                uploading={uploading} setUploading={setUploading}
                                image={formData.image} setImage={setImage}
                                label="Upload tournament image!" />


                            <TextField id="description" name="description" type="text" multiline rows={4} rowsMax={30}
                                label="Description" variant="outlined" fullWidth
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errorMsg.fieldErrors.description}
                                helperText={errorMsg.fieldErrors.description}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    {
                                        placeholder: "Enter description"
                                    }
                                } />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" disabled={uploading}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                    <Loading open={loading} />
                </form>
            </Container>
        </Dialog>
    );
}
export default TourAddForm;