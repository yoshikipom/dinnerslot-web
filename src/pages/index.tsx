import type { NextPage } from 'next'
import Link from 'next/link';
import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const Home: NextPage = () => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" component="div">
        Tool List
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <Link href="/java-stacktrace" passHref>
            <ListItemText>Java Stacktrace
            </ListItemText>
          </Link>
        </ListItem>
      </List>
    </Paper>
  )
}

export default Home
