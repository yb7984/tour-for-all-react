import './App.css';
import Navbar from './Navbar';
import Routes from './Routes';
import { Container } from '@material-ui/core';
import Footer from './Footer';

function App() {
    return (
        <Container>
            <Navbar />
            <Routes />
            <Footer />
        </Container>
    );
}

export default App;
