import { makeStyles, Button, Typography } from "@material-ui/core";
import { useState } from "react";
import TourForAllAPI from "./api";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2)
    },
    image: {
        maxWidth: "50%",
        maxHeight: "200px"
    }
}));

const ImageUpload = ({ uploading, setUploading, image, setImage, label, defaultImage }) => {
    const classes = useStyles();
    const [error, setError] = useState("");

    const handleImageChange = async (e) => {
        setError("");
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            try {
                const file = fileInput.files[0];

                if (!file.name.match(/.*\.(gif|jpe?g|bmp|png)$/igm)) {
                    setError("Only gif,jpg,jpeg,bmp,png allowed!");
                    return;
                }

                setUploading(true);
                const data = new FormData();
                data.append("image", file);

                const result = await TourForAllAPI.upload(data);

                setImage(result.image.url);
            } catch (error) {
                setError(error);
            }
        }

        setUploading(false);
    }

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                component="label"
                disabled={uploading}
                className={classes.button}>
                {uploading ? "Uploading, please wait!" : label}
                <input
                    type="file"
                    hidden
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/jpg, image/bmp, image/gif"
                />
            </Button>
            <img alt={image} src={image ? TourForAllAPI.getImageUrl(image) : defaultImage}
                className={classes.image} />
            <Typography color="error">{error ? "Error when uploading" : null}</Typography>
        </>
    )
}

export default ImageUpload;