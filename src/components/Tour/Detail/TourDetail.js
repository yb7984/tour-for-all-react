import { makeStyles, Grid, Container, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { formatDateTime } from "../../../helpers/date";
import { TOUR_STATUS_PRIVATE } from "../../../models/tourStatus";
import { TourPlayerList, TourStructure } from "../Detail";
import { UserChip } from "../../common";

const useStyles = makeStyles((theme) => ({
    root: {
        "& img": {
            maxHeight: "350px",
            maxWidth: "35vw"
        }
    },
    avatar: {
        width: '30px',
        height: "30px",
        marginRight: theme.spacing(1)
    },
    imgContainer: {
        textAlign: "center",
        padding: "20px"
    },
    detail: {
        padding: "10px",
        fontSize: "1.3em",
        "& .MuiGrid-item": {
            padding: "10px",
            display: "flex"
        }
    },
    description: {
        padding: "10px",
        fontSize: "1.3em"
    }
}));

const TourDetail = (props) => {
    const classes = useStyles();


    const {
        tour, user
    } = props;

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={6} className={classes.imgContainer}>
                    <img src={tour.imageUrl} alt={tour.title} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container className={classes.detail}>
                        <Grid item xs={4}>
                            Host By:
                        </Grid>
                        <Grid item xs={8}><UserChip username={tour.creator} /></Grid>
                        <Grid item xs={4}>
                            Date & Time:
                        </Grid>
                        <Grid item xs={8}>
                            {formatDateTime(tour.start)}
                        </Grid>
                        <Grid item xs={4}>
                            Price:
                        </Grid>
                        <Grid item xs={8}>
                            ${tour.price}
                        </Grid>
                        <Grid item xs={4}>
                            Entry Fee:
                        </Grid>
                        <Grid item xs={8}>
                            ${tour.entryFee}
                        </Grid>
                        <Grid item xs={4}>
                            Guaranteed:
                        </Grid>
                        <Grid item xs={8}>
                            ${tour.guaranteed}
                        </Grid>
                        <Grid item xs={4}>
                            Level:
                        </Grid>
                        <Grid item xs={8}>
                            {tour.getSetting("defaultDuration")} Minutes
                        </Grid>
                        <Grid item xs={4}>
                            Status:
                        </Grid>
                        <Grid item xs={8}>
                            {tour.statusName}
                        </Grid>
                        <Grid item xs={4}>
                            Entries:
                        </Grid>
                        <Grid item xs={8}>
                            {Object.keys(tour.players).length}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={tour.description} readOnly multiline fullWidth label="Description" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={tour.status === TOUR_STATUS_PRIVATE ? 12 : 6}>
                    <TourStructure levels={tour.getSetting("levels")} />
                </Grid>
                {
                    tour.status === TOUR_STATUS_PRIVATE ? null :
                        (<Grid item xs={12} md={6}>
                            <TourPlayerList tour={tour} user={user} />
                        </Grid>)
                }
            </Grid>
        </Container>
    );
};


const mapStateToProps = (state) => ({
    user: state.users[state.auth.username]
});

export default connect(mapStateToProps)(TourDetail);