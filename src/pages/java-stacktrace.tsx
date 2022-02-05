import { Grid, TextField } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react';

const addNewLines = (input: string) => {
    return input.replaceAll(" at ", "\n at ");
}

const JavaStacktrace: NextPage = () => {
    const [output, setOutput] = useState("");

    const inputChange = (event: any) => {
        event.preventDefault();
        const output = addNewLines(event.target.value);
        setOutput(output);
    };

    return (
        <div>
            <h2>Java Stacktrace</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="input"
                        label="Input"
                        multiline
                        fullWidth
                        rows={20}
                        onChange={inputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="output"
                        label="Output"
                        multiline
                        fullWidth
                        rows={20}
                        value={output}
                        inputProps={{wrap: "off"}}
                    />
                </Grid>
            </Grid>
        </div >
    )
}

export default JavaStacktrace
