import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import respond from "../assest/respond.png";


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar>
          <img src={respond} alt="logo" style={{ marginRight: '10px', maxHeight: '50px' }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}