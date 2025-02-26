import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';
import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import Work from '@mui/icons-material/WorkOutlineOutlined';
import StorageIcon from '@mui/icons-material/GridViewOutlined';

const drawerWidth = 250;

const icons = {
  'Solicitudes': <AssignmentIcon />,
  'Tecnicos': <Work />,
  'Almacen': <StorageIcon />
};

const routes = {
  'Solicitudes': '/',
  'Tecnicos': '/techs',
  'Almacen': '/products'
};

export default function ClippedDrawer() {
  const [activeItem, setActiveItem] = useState('');
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'white' }}
      >
        <Toolbar sx={{ height: '70px' }}>
          <Typography variant="h5" noWrap component="div" color='black' >
            Header
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#1B1A1D',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>EPCO</Toolbar>
        <Divider />
        <List>
        {['Solicitudes', 'Tecnicos', 'Almacen'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={routes[text]}
              onClick={() => setActiveItem(text)}
              sx={{
                backgroundColor: activeItem === text ? '#333' : 'inherit',
                '&:hover': {
                  backgroundColor: '#444',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 'auto', ml: '1rem', mr: '1.5rem' }}>
                {icons[text]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ textAlign: 'left' }} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      </Drawer>
    </Box>
  );
}
