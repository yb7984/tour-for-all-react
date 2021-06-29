import { useSelector } from 'react-redux';

const HomePage = () => {
    const current_username = useSelector(st => st.auth.username);

    if (current_username) {
        return (<div>{current_username}</div>);
    }
    return (<div>
        Home Page!
    </div>);
}

export default HomePage;