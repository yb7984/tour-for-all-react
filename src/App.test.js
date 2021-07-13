import App from './App';
import { render, u1Token, t1, u1 } from "./_testCommon";
import axiosMock from 'axios';
import { MemoryRouter } from 'react-router';
import TourForAllAPI from "./api";
import { fireEvent, queryByText } from '@testing-library/dom';
import { store } from './store';
import { resetAll } from './actions/auth';

const originConsoleError = console.error;

beforeEach(() => {
    console.error = jest.fn();
    store.dispatch(resetAll());     //clear everything in redux store
});

afterEach(() => {
    console.error = originConsoleError;
});

describe("App can render", function () {
    it('renders without login', () => {
        Object.defineProperty(TourForAllAPI, 'token', {
            get: jest.fn(() => '')
        });

        const data = {
            tours: [],
            page: 1,
            total: 0,
            perPage: 3
        }
        axiosMock.mockResolvedValue(data);

        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        render(<MemoryRouter initialEntries={['/tours']}><App /></MemoryRouter>);
        render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
        render(<MemoryRouter initialEntries={['/signup']}><App /></MemoryRouter>);
    });


    it('test login', async () => {
        Object.defineProperty(TourForAllAPI, 'token', {
            get: jest.fn(() => '')
        });

        axiosMock.mockImplementation(({ url }) => {

            if (url.indexOf("/token") !== -1) {
                return {
                    status: 200,
                    data: {
                        token: u1Token
                    }
                };
            }

            if (url.indexOf("/users") !== -1) {
                return {
                    status: 200,
                    data: {
                        user: { ...u1 }
                    }
                };
            }


            if (url.indexOf("/tours") !== -1) {
                return {
                    status: 200,
                    data: {
                        tours: [{ ...t1 }],
                        total: 1,
                        perPage: 3,
                        page: 1
                    }
                };
            }

        });

        const { asFragment, findByText, queryAllByText, queryByText, getByTestId, getByPlaceholderText } = render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);

        // expect(asFragment()).toMatchSnapshot();

        expect(getByPlaceholderText("Enter username")).toBeInTheDocument();
        let logins = queryAllByText("Login");
        logins.forEach(login => {
            expect(login).toBeInTheDocument();
        });

        let signups = queryAllByText("Sign up");
        signups.forEach(signup => {
            expect(signup).toBeInTheDocument();
        });
        expect(queryByText("Logout")).not.toBeInTheDocument();
        expect(queryByText("Profile")).not.toBeInTheDocument();
        expect(queryByText("My Tours")).not.toBeInTheDocument();
        expect(queryByText("Joined")).not.toBeInTheDocument();
        expect(queryByText("Favorites")).not.toBeInTheDocument();

        fireEvent.change(getByPlaceholderText("Enter username"), { target: { value: "u1" } });
        fireEvent.change(getByPlaceholderText("Enter password"), { target: { value: "password" } });

        //login
        fireEvent.click(getByTestId("login-button"));

        await findByText("Joined Tournaments");
        expect(queryByText("U1F U1L", { exact: false })).toBeInTheDocument();     //show the name of the use 
        expect(queryByText("Logout")).toBeInTheDocument();
        expect(queryByText("Login")).not.toBeInTheDocument();
        expect(queryByText("Sign up")).not.toBeInTheDocument();
        expect(queryByText("Profile")).toBeInTheDocument();
        expect(queryByText("My Tours")).toBeInTheDocument();
        expect(queryByText("Joined")).toBeInTheDocument();
        expect(queryByText("Favorites")).toBeInTheDocument();
    });



    it('test signup', async () => {
        Object.defineProperty(TourForAllAPI, 'token', {
            get: jest.fn(() => '')
        });

        axiosMock.mockImplementation(({ url }) => {

            if (url.indexOf("/register") !== -1) {
                return {
                    status: 201,
                    data: {
                        token: u1Token
                    }
                };
            }

            if (url.indexOf("/users") !== -1) {
                return {
                    status: 200,
                    data: {
                        user: { ...u1 }
                    }
                };
            }


            if (url.indexOf("/tours") !== -1) {
                return {
                    status: 200,
                    data: {
                        tours: [{ ...t1 }],
                        total: 1,
                        perPage: 3,
                        page: 1
                    }
                };
            }

        });

        const { asFragment, findByText, queryByText, getByTestId, getByPlaceholderText } =
            render(<MemoryRouter initialEntries={['/signup']}><App /></MemoryRouter>);

        // expect(asFragment()).toMatchSnapshot();


        expect(queryByText("User Sign Up", { exact: false })).toBeInTheDocument();

        fireEvent.change(getByPlaceholderText("Enter username"), { target: { value: "u1" } });
        fireEvent.change(getByPlaceholderText("Enter password"), { target: { value: "password" } });
        fireEvent.change(getByPlaceholderText("Enter first name"), { target: { value: u1.firstName } });
        fireEvent.change(getByPlaceholderText("Enter last name"), { target: { value: u1.lastName } });
        fireEvent.change(getByPlaceholderText("Enter email"), { target: { value: u1.email } });

        //login
        fireEvent.click(getByTestId("signup-button"));

        await findByText("Joined Tournaments");
        expect(queryByText("U1F U1L", { exact: false })).toBeInTheDocument();     //show the name of the use 
    });
});