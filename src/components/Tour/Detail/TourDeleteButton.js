import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { TOUR_STATUS_CANCELED, TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC } from '../../../models/tourStatus';
import { deleteTour } from "../../../actions/tours";
import { useQueryParams } from "../../../hooks";
import { ROLE_ADMIN } from "../../../models/role";
import { useHistory } from "react-router-dom";
import { ConfirmDialog } from '../../common';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.primary.contrastText
    }
}));

/** Button for deleting a tournament */

const TourDeleteButton = ({ tour }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const { pathname, search } = useQueryParams();

    // only creator and admin can edit
    const canEdit = user &&
        (user.role === ROLE_ADMIN || username === tour.creator) &&
        [TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC, TOUR_STATUS_CANCELED].includes(tour.status);

    // confirm for delete tour
    const handleDelete = () => {
        setDeleteConfirm(true);
    }

    // if confirmed, delete the tournament
    const handleDeleteConfirm = (confirm) => {
        setDeleteConfirm(false);
        if (confirm === true) {
            dispatch(deleteTour(tour.slug));
        }
    }

    if (!tour) {
        history.push(`${pathname}${search && search}`);
    }

    if (!canEdit) {
        return null;
    }
    return (
        <>
            <Tooltip title="Delete this Tournament">
                <div>
                    <IconButton color="inherit" onClick={handleDelete}>
                        <DeleteIcon className={classes.icon} />
                    </IconButton>
                </div>
            </Tooltip>
            <ConfirmDialog open={deleteConfirm} message="Are you sure you are deleting this tournament?" handleClose={handleDeleteConfirm} />
        </>
    );
}

export default TourDeleteButton;