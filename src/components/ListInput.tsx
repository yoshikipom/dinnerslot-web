import { List, ListItem, Typography } from '@mui/material';
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { Food } from '../model/Food';

const STORAGE_KEY = "foodListInputRaw";

const ListInput = (props: any) => {
    const [foodList, setFoodList] = [props.foodList, props.setFoodList]
    const [foodListInputRaw, setFoodListInputRaw] = useState("");

    useEffect(() => {
        const foodListInputRaw = window.localStorage.getItem(STORAGE_KEY);
        if (foodListInputRaw !== null) {
            setFoodListInputRaw(foodListInputRaw);
        }
    }, []);

    useEffect(() => {
        const strList = foodListInputRaw.split('\n').filter(val => val);
        let index = 1;
        const newFoodList: Food[] = strList.map(name => ({ id: index++, name }));
        setFoodList(newFoodList);
        window.localStorage.setItem(STORAGE_KEY, foodListInputRaw);
    }, [foodListInputRaw, setFoodList]);

    return (
        <div>
            <Typography sx={{ my: 2 }} variant="h6" component="div">
                Food List
            </Typography>
            <TextField
                id="input"
                label="Please input food names separated by line breaks"
                multiline
                fullWidth
                rows={5}
                value={foodListInputRaw}
                onChange={event => setFoodListInputRaw(event.target.value)}
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
