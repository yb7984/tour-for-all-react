import { Grid, TextField, makeStyles, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getSearchString } from "../../../helpers/form";
import { useSearchFields, useQueryParams } from "../../../hooks";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        '& .MuiGrid-item': {
            padding: theme.spacing(1)
        }
    },
}));



const TourSearchForm = ({ type = "public" }) => {
    const classes = useStyles();
    const history = useHistory();
    const { searchParams } = useQueryParams();
    const setSearchParams = (params) => {
        const searchString = getSearchString(params);

        history.push(`?${searchString}`);
    };

    const [formData, handleChange, handleSubmit] = useSearchFields({
        term: "",
        minPrice: "",
        maxPrice: "",
        minGuaranteed: "",
        listType: "upcoming",
        ...searchParams
    }, setSearchParams, 2000);

    return (
        <form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
                <Grid item xs={["favorite", "joined"].includes(type) ? 12 : 8} sm={["favorite", "joined"].includes(type) ? 6 : 4}>
                    <TextField id="term" name="term" type="text"
                        label="Search Term" variant="outlined"
                        value={formData.term}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={
                            {
                                placeholder: "Search tournaments here."
                            }
                        } />
                </Grid>
                {
                    ["favorite", "joined"].includes(type) ? <></> : (
                        <Grid item xs={4} sm={2}>
                            <TextField id="listType" name="listType" select
                                label="List Type" variant="outlined"
                                value={formData.listType}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                min={0}
                                step={1}
                                inputProps={
                                    {
                                        placeholder: "List Type"
                                    }
                                } >
                                {type === "mine" ? <MenuItem key="private" value="private" >Private</MenuItem> : ""}
                                <MenuItem key="upcoming" value="upcoming" >Upcoming</MenuItem>
                                <MenuItem key="running" value="running" >Running</MenuItem>
                                <MenuItem key="past" value="past" >Past</MenuItem>
                            </TextField>
                        </Grid>)
                }
                <Grid item xs={4} sm={2}>
                    <TextField id="minPrice" name="minPrice" type="number"
                        label="Min Price" variant="outlined"
                        value={formData.minPrice}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        min={0}
                        step={1}
                        inputProps={
                            {
                                placeholder: "Min price"
                            }
                        } />
                </Grid>
                <Grid item xs={4} sm={2}>
                    <TextField id="maxPrice" name="maxPrice" type="number"
                        label="Max Price" variant="outlined"
                        value={formData.maxPrice}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        min={0}
                        step={1}
                        inputProps={
                            {
                                placeholder: "Max price"
                            }
                        } />
                </Grid>
                <Grid item xs={4} sm={2}>
                    <TextField id="minGuaranteed" name="minGuaranteed" type="number"
                        label="Min Guaranteed" variant="outlined"
                        value={formData.minGuaranteed}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        min={0}
                        step={1}
                        inputProps={
                            {
                                placeholder: "Min Guaranteed"
                            }
                        } />
                </Grid>
            </Grid>
        </form >
    );
}

export default TourSearchForm;