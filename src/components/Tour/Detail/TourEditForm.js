import { Container, Typography, Grid, makeStyles, TextField, Button, MenuItem } from '@material-ui/core';
import { Loading, ImageUpload, Error, SnackAlert } from '../../common';
import { useDispatch, useSelector } from 'react-redux';
import { updateTour } from '../../../actions/tours';
import { useState } from 'react';
import { useFields, useFormError } from '../../../hooks';
import { ROLE_ADMIN } from "../../../models/role";
import { TourSetting } from '../Detail';
import moment from 'moment';
import { statusName, TOUR_STATUS_CANCELED, TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC } from '../../../models/tourStatus';
import defaultImage from "../../../images/pokertour1.jpeg";

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
}));
const TourEditForm = ({ tour, cancelEdit }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);

    const canEdit = username && user && (user.role === ROLE_ADMIN || username === tour.creator);

    const [formData, handleChange, setFormData] = useFields({
        title: tour.title,
        guaranteed: tour.guaranteed,
        description: tour.description,
        price: tour.price,
        entryFee: tour.entryFee,
        startDate: moment(tour.start.toISOString()).format("YYYY-MM-DD"),
        startTime: moment(tour.start.toISOString()).format("HH:mm"),
        setting: tour.setting ? JSON.parse(tour.setting) : {},
        clockSetting: tour.clockSetting,
        image: tour.image,
        status: tour.status
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

    const setSetting = (setting) => {
        setFormData(fData => ({
            ...fData,
            setting: setting
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { startDate, startTime, ...data } = formData;

        data.guaranteed = parseInt(data.guaranteed);
        data.price = parseInt(data.price);
        data.entryFee = parseInt(data.entryFee);
        data.setting = JSON.stringify(data.setting);
        data.start = moment(`${startDate} ${startTime}`, "YYYY-MM-DD HH:mm").format();

        dispatch(updateTour(tour.id, data, setLoading, setErrorMsg));
        setUpdating(true);
    }

    const handleAlertClose = (event, reason) => {
        setUpdating(false);
    };

    const handleAlertCloseSuccess = (event, reason) => {
        setUpdating(false);
        cancelEdit();
    }

    if (!canEdit) {
        return (<Container>
            <Error />
        </Container>)
    }

    if (tour) {
        return (
            <Container>
                <SnackAlert open={updating && !loading && !isError}
                    message="Successfully updated this tournament!"
                    handleClose={handleAlertCloseSuccess} />
                <SnackAlert open={updating && !loading && errorMsg.formErrors.length > 0}
                    message={errorMsg.formErrors}
                    serverity="error"
                    handleClose={handleAlertClose} />
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h3">Edit Tournament</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TourSetting setting={formData.setting} setSetting={setSetting} />
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit} className={classes.root}>
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

                                <Grid item xs={4}>
                                    <TextField id="status" name="status"
                                        label="Status" variant="outlined" fullWidth
                                        select
                                        required
                                        value={formData.status}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            {
                                                placeholder: "Select status"
                                            }
                                        } >
                                        <MenuItem key={TOUR_STATUS_PRIVATE} value={TOUR_STATUS_PRIVATE}>{statusName(TOUR_STATUS_PRIVATE)}</MenuItem>
                                        <MenuItem key={TOUR_STATUS_PUBLIC} value={TOUR_STATUS_PUBLIC}>{statusName(TOUR_STATUS_PUBLIC)}</MenuItem>
                                        <MenuItem key={TOUR_STATUS_CANCELED} value={TOUR_STATUS_CANCELED}>{statusName(TOUR_STATUS_CANCELED)}</MenuItem>
                                    </TextField>

                                </Grid>
                                <Grid item xs={12}>
                                    <ImageUpload
                                        uploading={uploading} setUploading={setUploading}
                                        image={formData.image} setImage={setImage}
                                        defaultImage={defaultImage}
                                        label="Upload tournament image!" />
                                </Grid>
                                <Grid item xs={12}>
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
                                <Grid item>

                                    <Button variant="contained" color="primary" type="submit" disabled={uploading}>
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Loading open={loading} />
            </Container>
        );
    }
    return <Error />
}
export default TourEditForm;