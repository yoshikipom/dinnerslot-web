import type { NextPage } from 'next'
import { Button, List, ListItem, ListItemIcon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { TextField } from '@mui/material'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

interface Food {
  id: number
  name: string
}

const foodNames = [
  "ささみチーズかつ",
  "からあげ",
  "油淋鶏",
  "メンチカツ",
  "にくじゃが",
  "きんぴらごぼう",
  "切り干し大根",
  "シチュー",
  "カレーライス",
  "ハヤシライス",
  "ルーロー飯",
  "そばめし",
  "グラタン",
  "角煮",
  "ハンバーグ",
  "鶏手羽煮",
  "ネギ塩豚",
  "鶏大根",
  "鮭のホイル焼き",
  "おでん",
]

let index = 1;
const defaultFoodList: Food[] = foodNames.map(name => { return { id: index++, name } });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const Home: NextPage = () => {
  const [foodList, setFoodList] = useState(defaultFoodList);
  const [additionalFood, setAdditionalFood] = useState("");
  const [count, setCount] = useState("5");
  const [results, setResults]: [Food[], any] = useState([]);

  const addFood = (event: any) => {
    foodList.push({ id: index++, name: String(additionalFood) });
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
    setResults(copiedFoodList.slice(0, Number(count)));
  }

  const slotOneItem = (index: number) => {
    const copiedFoodList: Food[] = foodList.concat();
    const remainingList: Food[] = copiedFoodList.filter((food) => !results.includes(food))

    const r = Math.floor(Math.random() * (remainingList.length));
    results[index] = remainingList[r];
    setResults(results.slice(0, Number(count)));
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
        inputProps={{ inputMode: 'numeric' }}
        onChange={event => setCount(event.target.value)}
      />
      <Button variant="contained" sx={{ mx: 2, my: 2 }} onClick={slot}>Slot</Button>

      {results.length > 0 &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell>action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((food: Food, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">{index}
                  </StyledTableCell>
                  <StyledTableCell>{food.id} </StyledTableCell>
                  <StyledTableCell>{food.name}</StyledTableCell>
                  <StyledTableCell>
                    <Button variant="outlined" sx={{ mx: 2 }} onClick={slotOneItem.bind(this, index)}>Change</Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

    </Paper>
  )
}

export default Home
