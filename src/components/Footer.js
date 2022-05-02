import { makeStyles, Container, Grid } from "@material-ui/core";
import linkedinImg from "../images/linkedin.jpeg";
import githubImg from "../images/github.png"

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3)
    },
    title: {
        fontSize: "3em",
        color: theme.palette.primary.main
    },
    description: {
        fontSize: "1.5em",
        padding: theme.spacing(1),
        "& label": {
            color: theme.palette.primary.main,
            paddingRight: theme.spacing(1)
        },
        "& img": {
            height: "30px",
            paddingLeft: theme.spacing(2)
        }
    },
    author: {
        fontSize: "1.5em",
        padding: theme.spacing(1),
        "& label": {
            color: theme.palette.primary.main,
            paddingRight: theme.spacing(1)
        }
    }
}));


const Footer = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.title}>
                    About this project
                </Grid>
                <Grid item xs={12} className={classes.description}>
                    <div>This project is the capstone 2 project on Springboard Software Engineer Bootcamp.</div>
                    <div>
                        <label>Frontend:</label>
                        React.js +  Redux + Thunk + Material-ui
                        <a href="https://github.com/yb7984/tour-for-all-react" target="_blank" rel="noreferrer"><img alt="github" src={githubImg} /></a>
                    </div>
                    <div>
                        <label>Backend: </label>
                        express.js + express-ws
                        <a href="https://github.com/yb7984/tour-for-all-express" target="_blank" rel="noreferrer"><img alt="github" src={githubImg} /></a>
                    </div>
                    <div>
                        <label>Database:</label>
                        PostgreSQL
                    </div>

                    <div>
                        <label>Author:</label>
                        Sunbao Wu
                        <a href="https://www.linkedin.com/in/sunbao-wu/" target="_blank" rel="noreferrer"><img alt="linkedin" src={linkedinImg} /></a>
                        <a href="https://github.com/yb7984" target="_blank" rel="noreferrer"><img alt="github" src={githubImg} /></a>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;