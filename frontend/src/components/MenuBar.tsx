import React, {useState} from 'react';
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
import CreateProjectPopup from './CreateProjectPopup';

const MenuBar: React.FC = () => {
  const [createProjectPopupOpen, setCreateProjectPopupOpen] = useState(false);

  const handleOpenCreateProjectPopup = () => {
    setCreateProjectPopupOpen(true);
  };

  const handleCloseCreateProjectPopup = () => {
    setCreateProjectPopupOpen(false);
  };

  return (
    <>
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
          <IconButton
            color="inherit"
            aria-label="add"
            onClick={() => handleOpenCreateProjectPopup()}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CreateProjectPopup
        open={createProjectPopupOpen}
        handleClose={handleCloseCreateProjectPopup}
      />
    </>
  )
}

export default MenuBar;
