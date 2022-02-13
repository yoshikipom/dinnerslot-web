import {List, ListItem, Typography } from '@mui/material';
import { TextField } from '@mui/material'
import { useState } from 'react';
import { Food } from '../model/Food';


const ListInput = (props: any) => {
    const [foodList, setFoodList] = [props.foodList, props.setFoodList]

    const inputChange = (foodListInputRaw: string) => {
        const strList = foodListInputRaw.split('\n').filter(val => val);
        let index = 1;
        const newFoodList: Food[] = strList.map(name => ({ id: index++, name }));
        setFoodList(newFoodList);
    };

    return (
        <div>
            <Typography sx={{ my: 2 }} variant="h6" component="div">
                Food List
            </Typography>
            <TextField
                id="input"
                label="Input"
                multiline
                fullWidth
                rows={5}
                onChange={(event) => inputChange(event.target.value)}
            />
            <p>Count: {foodList.length}</p>
            <List>
                {foodList.map((food: Food) => {
                    return <div key={food.id}>
                        <ListItem>
                            {food.id} {food.name}
                        </ListItem>
                    </div>
                })}
            </List>
        </div>

    )
}

export default ListInput
