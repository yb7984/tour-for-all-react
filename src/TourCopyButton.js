import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import {
    IconButton, makeStyles, Dialog, DialogActions, DialogContent, Button,
    Grid, TextField, Typography, Tooltip
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SnackAlert from './SnackAlert';
import moment from 'moment';
import useFormError from './hooks/useFormError';
import useFields from './hooks/useFields';
import { insertTour } from './actions/tours';
import Tour from "./models/tour";
import { useHistory } from 'react-router';
import useQueryParams from "./hooks/useQueryParams";

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
    icon: {
        color: "white"
    }
}));

const TourCopyButton = ({ tour }) => {
    const classes = useStyles();
    const { search } = useQueryParams();
    const dispatch = useDispatch();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);
    const [slug, setSlug] = useState('');
    const history = useHistory();
    const canEdit = username && user;

    const [formData, handleChange] = useFields({
        title: tour.title,
        guaranteed: tour.guaranteed,
        description: tour.description,
        price: tour.price,
        entryFee: tour.entryFee,
        startDate: moment().format("YYYY-MM-DD"),
        startTime: moment().format("HH:mm"),
        setting: tour.setting && JSON.parse(tour.setting),
        image: tour.image
    });
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [errorMsg, setErrorMsg, isError] = useFormError();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

        setOpen(false);
        // redirect to detail page
        history.push(`${search}#${slug}`);
    }

    if (!canEdit) {
        return <></>;
    }
    return (<><Tooltip title="Copy this Tournament">
        <div>
            <IconButton onClick={handleClick} >
                <ControlPointDuplicateIcon className={classes.icon} />
            </IconButton>
        </div>
    </Tooltip>

        <Dialog
            open={open}
            aria-labelledby="dialog-title">
            <form onSubmit={handleSubmit} className={classes.root}>
                <DialogContent>
                    <SnackAlert open={updating && !loading && !isError}
                        message="Successfully copy this tournament!"
                        handleClose={handleAlertCloseSuccess} />
                    <SnackAlert open={updating && !loading && errorMsg.formErrors.length > 0}
                        message={errorMsg.formErrors}
                        serverity="error"
                        handleClose={handleAlertClose} />
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h3">Copy Tournament</Typography>
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
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
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

                        <Grid item xs={6}>
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
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                    <Button autoFocus onClick={() => handleClose(false)} variant="contained" color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </>);
}

export default TourCopyButton;