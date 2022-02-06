import type { NextPage } from 'next'
import { Button, List, ListItem, ListItemIcon, Paper, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { TextField } from '@mui/material'
import { useState } from 'react';

interface Food {
  id: number
  name: string
}

const defaultFoodList: Food[] = [
  {
    id: 1,
    name: "おにぎり"
  },
  {
    id: 2,
    name: "オムライス"
  },
  {
    id: 3,
    name: "すき焼き"
  }
]

const Home: NextPage = () => {
  const [foodList, setFoodList] = useState(defaultFoodList);
  const [additionalFood, setAdditionalFood] = useState("");
  const [count, setCount] = useState(5);
  const [results, setResults]: [Food[], any] = useState([]);

  const addFood = (event: any) => {
    foodList.push({ id: 0, name: String(additionalFood) });
    setFoodList(foodList);
    setAdditionalFood("");
    event.preventDefault();
  };

  const slot = () => {
    const copiedFoodList = foodList.concat();
    for (let i = copiedFoodList.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = copiedFoodList[i];
      copiedFoodList[i] = copiedFoodList[r];
      copiedFoodList[r] = tmp;
    }
    setResults(copiedFoodList.slice(0, count));
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" component="div">
        Food List
      </Typography>
      <TextField
        id="name"
        label="name"
        value={additionalFood}
        onChange={event => setAdditionalFood(event.target.value)}
      />
      <Button variant="contained" sx={{ mx: 2, my: 2 }} onClick={addFood}>Add</Button>
      <List>
        {foodList.map((food: Food) => {
          return <div key={food.id}>
            <ListItem>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              {food.id} {food.name}
            </ListItem>
          </div>
        })}
      </List>

      <Typography variant="h6" component="div">
        Slot
      </Typography>
      <TextField
        id="count"
        label="count"
        type="number"
        value={count}
        onChange={event => setCount(Number(event.target.value))}
      />
      <Button variant="contained" sx={{ mx: 2, my: 2 }} onClick={slot}>Slot</Button>
      <List>
        {results.map((food: Food) => {
          return <div key={food.id}>
            <ListItem>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              {food.id} {food.name}
            </ListItem>
          </div>
        })}
      </List>
    </Paper>
  )
}

export default Home
