import { Card, CardHeader, Avatar, makeStyles, CardContent, Typography, Chip } from "@material-ui/core";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/users";
import { Link } from "react-router-dom";
import useQueryParams from "./hooks/useQueryParams";
import { formatDateTime } from "./helpers/date";
import TourFollowButton from "./TourFollowButton";
import UserChip from "./UserChip";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "400px"
    },
    title: {
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '& .MuiCardHeader-title': {
            fontSize: "1.3em"
        },
        "& a": {
            color: theme.palette.primary.contrastText,
        }
    },
    time: {
        padding: theme.spacing(1)
    },
    content: {
        textAlign: "center"
    },
    media: {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "180px",
        alignSelf: "center"
    },
    avatar: {
        width: '30px',
        height: '30px'
    },
}));


const TourListItem = memo(({ tour }) => {

    const classes = useStyles();
    const { search } = useQueryParams();
    const user = useSelector(st => st.users[tour.creator]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(getUser(tour.creator));
        }
    }, [tour, dispatch, user]);

    return (

        <Card className={classes.root}>
            <CardHeader
                avatar={<UserChip username={tour.creator} showName={false} />}
                title={<Link to={`${search}#${tour.slug}`}>{tour.title}</Link>} className={classes.title}
                action={<>
                    <TourFollowButton tour={tour} />
                </>}
            >
            </CardHeader>
            <CardContent className={classes.content}>
                <Link to={`${search}#${tour.slug}`}>
                    <img className={classes.media} alt={tour.title}
                        src={tour.imageUrl} />
                    <Typography className={classes.time}>{formatDateTime(tour.start)}</Typography>
                    <Chip variant="outlined" color="secondary" avatar={<Avatar>$</Avatar>}
                        label={`$${tour.price} + $${tour.entryFee}`} />
                    {
                        tour.guaranteed > 0 ?
                            <Chip variant="outlined" color="primary" avatar={<Avatar>$</Avatar>}
                                label={`$${tour.guaranteed} Guaranteed!!!`} /> :
                            <></>
                    }
                </Link>
            </CardContent>
        </Card>
    );
});

export default TourListItem;