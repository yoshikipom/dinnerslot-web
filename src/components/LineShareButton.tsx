import { Button } from "@mui/material";
import React from "react";

const LineShareButton = (props: any) => {
    return (
        <Button sx={{ mx: 2, my: 2 }} variant="outlined" href={`https://line.me/R/share?text=${encodeURI(props.message)}`}>
            Share by LINE
        </Button>
    );
};

export default LineShareButton;
