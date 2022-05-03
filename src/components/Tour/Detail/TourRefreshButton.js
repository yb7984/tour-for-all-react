import { IconButton, makeStyles, CircularProgress, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { useState } from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import { getTour } from '../../../actions/tours';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "white"
    }
}));

const TourRefreshButton = (props) => {
    const classes = useStyles();

    const { getTour } = props;

    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        getTour(setLoading);
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


const mapStateToProps = (state) => ({
    username: state.auth.username
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTour: (setLoading) => dispatch(getTour(ownProps.tour.id, setLoading)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourRefreshButton);
