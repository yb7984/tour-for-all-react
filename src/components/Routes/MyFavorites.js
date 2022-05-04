import { Container } from "@material-ui/core";
import { TourList, TourSearchForm } from "../Tour/List";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const MyFavorites = (props) => {
    const { username } = props;

    if (!username) {
        return <Redirect to="/login" />;
    }
    return (
        <Container maxWidth="lg">
            <TourSearchForm type="favorite" />
            <TourList type="favorite" />
        </Container>
    );
}


const mapStateToProps = (state) => ({
    username: state.auth.username
});


export default connect(mapStateToProps)(MyFavorites);
