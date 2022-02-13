import type { NextPage } from 'next'
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Food } from '../model/Food';
import Slot from '../components/Slot';
import dynamic from "next/dynamic";
const ListInput = dynamic(() => import("../components/ListInput"), {
  ssr: false,
});


const Home: NextPage = () => {
  const [foodList, setFoodList]: [Food[], any] = useState([]);
  const [tabValue, setTabValue] = useState('1');

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, value) => setTabValue(value)}>
            <Tab label="LIST" value="1" />
            <Tab label="SLOT" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ListInput foodList={foodList} setFoodList={setFoodList}/>
        </TabPanel>
        <TabPanel value="2">
          <Slot foodList={foodList} />
        </TabPanel>
      </TabContext>
    </Paper>
  )
}

export default Home
