import React from 'react';
import {
  AppBar,
  Stack,
  Toolbar,
  IconButton,
  Typography
} from '@mui/material';
import {
  AddCircleOutlineOutlined as AddIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const MenuBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense" style={{justifyContent:"space-between", alignItems: "center"}}>
        <Stack direction="row">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{paddingTop: 0.45}}>
            Projects
          </Typography>
        </Stack>
        <IconButton color="inherit" aria-label="add">
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar;
