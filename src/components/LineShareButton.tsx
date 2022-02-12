import { Button } from "@mui/material";
import React from "react";

const LineShareButton = (props: any) => {
    return (
        <Button variant="outlined" sx={{ mx: 2, my: 2 }} href={`https://line.me/R/share?text=${encodeURI(props.message)}`}>
            Share by LINE
        </Button>
    );
};

export default LineShareButton;
