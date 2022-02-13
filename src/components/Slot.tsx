import { Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled, tableCellClasses, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Food } from "../model/Food";
import LineShareButton from "./LineShareButton";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}));


const Slot = (props: any) => {
    const foodList = props.foodList;
    const [count, setCount] = useState("5");
    const [results, setResults]: [Food[], any] = useState([]);
    const [lineMessage, setLineMessage] = useState("");

    const updateResult = (foodList: Food[]) => {
        setResults(foodList);
        let newLineMessage = "[Generated Dinner List]" + "\n";
        for (const food of foodList) {
            newLineMessage += food.name + "\n";
        }
        setLineMessage(newLineMessage);
    }

    const slot = () => {
        const copiedFoodList = foodList.concat();
        for (let i = copiedFoodList.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = copiedFoodList[i];
            copiedFoodList[i] = copiedFoodList[r];
            copiedFoodList[r] = tmp;
        }
        updateResult(copiedFoodList.slice(0, Number(count)));
    }

    const slotOneItem = (index: number) => {
        const copiedFoodList: Food[] = foodList.concat();
        const remainingList: Food[] = copiedFoodList.filter((food) => !results.includes(food))

        const r = Math.floor(Math.random() * (remainingList.length));
        results[index] = remainingList[r];
        updateResult(results.slice(0, Number(count)));
    }

    return (
        <div>
            <Typography sx={{ my: 2 }} variant="h6" component="div">
                Slot
            </Typography>
            <TextField
                id="count"
                label="count"
                type="number"
                value={count}
                inputProps={{ inputMode: 'numeric' }}
                onChange={event => setCount(event.target.value)}
            />
            <Button variant="contained" sx={{ mx: 2, my: 2 }} onClick={slot}>Slot</Button>

            {results.length > 0 &&
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <StyledTableCell>No.</StyledTableCell> */}
                                <StyledTableCell>food</StyledTableCell>
                                <StyledTableCell>action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((food: Food, index: number) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <StyledTableCell component="th" scope="row">{index + 1}
                                    </StyledTableCell> */}
                                    <StyledTableCell>{food.id} {food.name}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={slotOneItem.bind(this, index)}><ChangeCircleIcon /></IconButton>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <LineShareButton message={lineMessage} />
                </TableContainer>
            }
        </div>
    );
};

export default Slot;
