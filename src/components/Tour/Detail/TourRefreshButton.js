import { IconButton, makeStyles, CircularProgress, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import { getTour } from '../../../actions/tours';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "white"
    }
}));

const TourRefreshButton = ({ tour }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        dispatch(getTour(tour.id, setLoading));
    };

    return (<Tooltip title="Refresh">
        <div>
            <IconButton onClick={handleClick} >
                {
                    loading ?
                        <CircularProgress /> : <SyncIcon className={classes.icon} />
                }
            </IconButton>
        </div>
    </Tooltip>);
}

export default TourRefreshButton;