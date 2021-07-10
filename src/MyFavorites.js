import { Container } from "@material-ui/core";
import TourSearchForm from "./TourSearchForm";
import TourList from "./TourList";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const MyFavorites = () => {
    const username = useSelector(st => st.auth.username);

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

export default MyFavorites;