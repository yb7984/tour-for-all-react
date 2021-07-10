import { Container } from "@material-ui/core";
import TourSearchForm from "./TourSearchForm";
import TourList from "./TourList";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const MyTours = () => {
    const username = useSelector(st => st.auth.username);

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

export default MyTours;