import { Card, CardHeader, Avatar, makeStyles, CardContent, Typography, Chip, Tooltip } from "@material-ui/core";
import { memo, useEffect } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../actions/users";
import { Link } from "react-router-dom";
import { useQueryParams } from "../../../hooks";
import { formatDateTime } from "../../../helpers/date";
import { TourFollowButton } from "../Detail";
import { UserChip } from "../../common";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "400px",
        "& .MuiCardHeader-content": {
            whiteSpace: "nowrap",
            overflow: "hidden"
        }
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


const TourListItem = memo((props) => {

    const classes = useStyles();
    const { search } = useQueryParams();

    const { tour, creator, getUser } = props;

    useEffect(() => {
        if (!creator) {
            getUser(tour.creator);
        }
    }, [tour, creator, getUser]);

    return (

        <Card className={classes.root}>
            <CardHeader
                avatar={<UserChip username={tour.creator} showName={false} />}
                title={<>
                    <Tooltip title={tour.title}>
                        <div>
                            <Link to={`${search}#${tour.slug}`}>{tour.title}</Link>
                        </div>
                    </Tooltip>
                </>} className={classes.title}
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

const mapStateToProps = (state, ownProps) => ({
    creator: state.users[ownProps.tour.creator],
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (username) => dispatch(getUser(username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourListItem);