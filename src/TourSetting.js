import {
    Grid, Input, Button, makeStyles, Dialog, DialogActions,
    DialogContent, DialogTitle, Avatar, IconButton, TextField,
    Badge
} from "@material-ui/core";
import { useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2)
    },
    root: {
        'level': {
            borderStyle: "outset"
        }
    },
    titleRow: {
        fontSize: "1.2em"
    },
    level: {
        fontSize: "1.2em"
    },
    blue: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#0000ff",
        width: "25px",
        height: "25px"
    },
    red: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#ff0000",
        width: "25px",
        height: "25px"
    },
}));

const TourSetting = ({ setSetting, setting }) => {
    const classes = useStyles();

    const form = useRef(null);
    const [open, setOpen] = useState(false);
    const defaultSetting = Object.keys(setting).length > 0 ? setting : {
        defaultDuration: 20,
        defaultBreakDuration: 10,
        levels: [{
            id: uuid(),
            levelType: "play",
            bigBlind: 25,
            smallBlind: 25,
            ante: 0,
            bigBlindAnte: 0,
            duration: 20
        }]
    };
    const [formData, setFormData] = useState(defaultSetting);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value.length > 0 ? parseInt(e.target.value) : "";
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const handleChangeLevel = (e, index) => {
        const name = e.target.name;
        const value = e.target.value.length > 0 ? parseInt(e.target.value) : "";
        setFormData(fData => {
            const newData = {
                ...fData,
                levels: [
                    ...fData.levels
                ]
            };
            newData.levels[index] = {
                ...newData.levels[index],
                [name]: value
            };

            return newData;
        });
    }

    const newLevel = (index, levelType) => {
        setFormData(fData => {
            const newData = {
                ...fData,
                levels: [
                    ...fData.levels
                ]
            };

            newData.levels.splice(index + 1, 0, {
                id: uuid(),
                levelType,
                bigBlind: newData.levels[index].bigBlind,
                smallBlind: newData.levels[index].smallBlind,
                ante: newData.levels[index].ante,
                bigBlindAnte: newData.levels[index].bigBlindAnte,
                duration: levelType === "break" ? newData.defaultBreakDuration : newData.defaultDuration
            });

            return newData;
        });
    };

    const removeLevel = (index) => {
        setFormData(fData => {
            const newData = {
                ...fData,
                levels: [
                    ...fData.levels
                ]
            };

            newData.levels.splice(index, 1);

            return newData;
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setOpen(false);
        setSetting(formData);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };
    return (<>
        <Button variant="contained" color="secondary" onClick={handleClickOpen} className={classes.button}>
            Tournament Structure
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl" fullWidth={true}>
            <form onSubmit={handleSubmit} ref={form}>
                <DialogTitle id="form-dialog-title">Tournament Setting</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={6} md={4}>
                            <TextField id="defaultDuration" name="defaultDuration" type="text"
                                label="Default Level Duration" variant="outlined"
                                required
                                value={formData.defaultDuration}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    {
                                        placeholder: "Enter default level duration",
                                        min: 1,
                                        max: 1000
                                    }
                                } />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField id="defaultBreakDuration" name="defaultBreakDuration" type="text"
                                label="Default Break Duration" variant="outlined"
                                required
                                value={formData.defaultBreakDuration}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    {
                                        placeholder: "Enter default break duration",
                                        min: 1,
                                        max: 1000
                                    }
                                } />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.titleRow}>
                        <Grid item xs={9}>
                            <Grid container>
                                <Grid item xs={2}>
                                    Big Blind
                                </Grid>
                                <Grid item xs={3}>
                                    Small Blind
                                </Grid>
                                <Grid item xs={2}>
                                    Ante
                                </Grid>
                                <Grid item xs={3}>
                                    Big Blind Ante
                                </Grid>
                                <Grid item xs={2}>
                                    Level Duration
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        formData.levels.map((level, index) => {
                            return (
                                <Grid container key={`level${level.id}`} className={classes.level} >
                                    <Grid item xs={9}>
                                        <Grid container>
                                            {
                                                level.levelType === "break" ?
                                                    (<Grid item xs={10}>
                                                        <Avatar className={classes.blue}>B</Avatar>
                                                    </Grid>) : (
                                                        <>
                                                            <Grid item xs={2}>
                                                                <Input id="bigBlind" name="bigBlind" type="number" fullWidth
                                                                    required
                                                                    value={formData.levels[index].bigBlind}
                                                                    onChange={(e) => { handleChangeLevel(e, index); }}
                                                                    step={1}
                                                                    placeholder="Enter big blind"
                                                                    inputProps={
                                                                        {
                                                                            min: 1,
                                                                            max: 1000000000
                                                                        }
                                                                    }
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Input id="smallBlind" name="smallBlind" type="number" fullWidth
                                                                    required
                                                                    value={formData.levels[index].smallBlind}
                                                                    onChange={(e) => { handleChangeLevel(e, index); }}
                                                                    step={1}
                                                                    placeholder="Enter small blind"
                                                                    inputProps={
                                                                        {
                                                                            min: 1,
                                                                            max: 1000000000
                                                                        }
                                                                    } />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Input id="ante" name="ante" type="number"
                                                                    label="Ante" variant="outlined" fullWidth
                                                                    required
                                                                    value={formData.levels[index].ante}
                                                                    onChange={(e) => { handleChangeLevel(e, index); }}
                                                                    step={1}
                                                                    placeholder="Enter ante"
                                                                    inputProps={
                                                                        {
                                                                            min: 0,
                                                                            max: 1000000000
                                                                        }
                                                                    } />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Input id="bigBlindAnte" name="bigBlindAnte" type="number" fullWidth
                                                                    required
                                                                    value={formData.levels[index].bigBlindAnte}
                                                                    onChange={(e) => { handleChangeLevel(e, index); }}
                                                                    step={1}
                                                                    placeholder="Enter big blind ante"
                                                                    inputProps={
                                                                        {
                                                                            min: 0,
                                                                            max: 1000000000
                                                                        }
                                                                    } />
                                                            </Grid>
                                                        </>
                                                    )
                                            }

                                            <Grid item xs={2}>
                                                <Input id="duration" name="duration" type="number" fullWidth
                                                    required
                                                    value={formData.levels[index].duration}
                                                    step={1}
                                                    onChange={(e) => { handleChangeLevel(e, index); }}
                                                    placeholder="Enter level duration"
                                                    inputProps={
                                                        {
                                                            min: 1,
                                                            max: 1000000000
                                                        }
                                                    } />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IconButton variant="contained" color="primary" onClick={() => { newLevel(index, "play") }}>
                                            <Badge badgeContent="+" color="secondary">
                                                <Avatar className={classes.blue}>L</Avatar>
                                            </Badge>
                                        </IconButton>
                                        <IconButton variant="contained" color="primary" onClick={() => { newLevel(index, "break") }}>
                                            <Badge badgeContent="+" color="secondary">
                                                <Avatar className={classes.blue}>B</Avatar>
                                            </Badge>
                                        </IconButton>
                                        <IconButton variant="contained" color="primary" onClick={() => { removeLevel(index) }}>
                                            <Avatar className={classes.red}>X</Avatar>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                    <DialogActions>
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                        <Button color="primary" variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog>
    </>
    )
}

export default TourSetting;