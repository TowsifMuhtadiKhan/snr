import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import respond from "../assest/respond.png";


  const NavLink = ({ label }) => {
    const theme = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              color: 'black',
              '&:hover': {
                color: '#3486eb', // Change the hover color here
                backgroundColor: 'none',
                textDecoration: 'underline', // You can add underline on hover if needed
              },
            },
          },
        },
      },
    });
  
    return (
      <ThemeProvider theme={theme}>
        <Button color="inherit" style={{ textDecoration: 'none', margin: '0 15px' }}>
          {label}
        </Button>
      </ThemeProvider>
    );
  };

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar>
          {/* Logo on the left */}
          <img src={respond} alt="logo" style={{ marginRight: '10px', maxHeight: '50px' }} />

          {/* Centered navigation links */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <NavLink label="Home" />
            <NavLink label="About Us" />
            <NavLink label="Services" />
            <NavLink label="Products" />
            <NavLink label="Contact Us" />
          </Box>
          <Button color="inherit" style={{ color: 'White' , backgroundColor: '#3486eb'}}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
