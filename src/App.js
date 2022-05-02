import './App.css';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import { Container } from '@material-ui/core';
import Footer from './components/Footer';

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
