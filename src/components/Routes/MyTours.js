import { Container } from "@material-ui/core";
import { TourList, TourSearchForm } from "../Tour/List";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const MyTours = (props) => {
    const { username } = props;

    if (!username) {
        return <Redirect to="/login" />;
    }
    return (
        <Container maxWidth="lg">
            <TourSearchForm type="mine" />
            <TourList type="mine" />
        </Container>
    );
}

const mapStateToProps = (state) => ({
    username: state.auth.username
});


export default connect(mapStateToProps)(MyTours);
