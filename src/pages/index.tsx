import type { NextPage } from 'next'
import { Box, Button, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { TextField } from '@mui/material'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import LineShareButton from '../components/LineShareButton';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


interface Food {
  id: number
  name: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const Home: NextPage = () => {
  const [foodList, setFoodList]: [Food[], any] = useState([]);
  const [count, setCount] = useState("5");
  const [results, setResults]: [Food[], any] = useState([]);
  const [lineMessage, setLineMessage] = useState("");

  const [value, setValue] = useState('1');

  const inputChange = (foodListInputRaw: string) => {
    const strList = foodListInputRaw.split('\n').filter(val => val);
    let index = 1;
    const newFoodList: Food[] = strList.map(name => ({ id: index++, name }));
    setFoodList(newFoodList);
  };

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
    <Paper variant="outlined" sx={{ p: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, value) => setValue(value)}>
            <Tab label="LIST" value="1" />
            <Tab label="SLOT" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
        <TabPanel value="2">
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
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
                      <StyledTableCell component="th" scope="row">{index+1}
                      </StyledTableCell>
                      <StyledTableCell>{food.id} {food.name}</StyledTableCell>
                      <StyledTableCell>
                        <Button variant="outlined" sx={{ mx: 2 }} onClick={slotOneItem.bind(this, index)}>Change</Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <LineShareButton message={lineMessage} />
            </TableContainer>
          }
        </TabPanel>
      </TabContext>
    </Paper>
  )
}

export default Home
