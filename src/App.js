import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Routes from './Routes';
import { Container } from '@material-ui/core';

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes></Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
