import { Container } from "@material-ui/core";
import { TourList, TourSearchForm } from "../Tour/List";

const Tours = () => {
    return (
        <Container maxWidth="lg">
            <TourSearchForm />
            <TourList />
        </Container>
    );
}

export default Tours;