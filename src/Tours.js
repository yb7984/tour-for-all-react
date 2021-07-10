import { Container } from "@material-ui/core";
import TourSearchForm from "./TourSearchForm";
import TourList from "./TourList";

const Tours = () => {
    return (
        <Container maxWidth="lg">
            <TourSearchForm />
            <TourList />
        </Container>
    );
}

export default Tours;