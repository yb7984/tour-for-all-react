import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
            blue: "#0000ff",
            red: "#ff0000",
        },
        grey: {
            main: "lightgrey"
        }
    },
    form: {
        width: '100%'
    },
    overrides: {
        MuiContainer: {
            root: {
                paddingLeft: '0px',
                paddingRight: '0px'
            }
        },
    }
});

export default theme;