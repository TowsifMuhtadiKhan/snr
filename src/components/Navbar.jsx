import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import respond from "../assest/respond.png";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    // Handle login logic
    setIsLoggedIn(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    // Handle logout logic
  
    setIsLoggedIn(false);
    handleMenuClose();
  };

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'black',
            '&:hover': {
              color: '#3486eb',
              backgroundColor: 'none',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', width: '100%' }}>
          <Toolbar sx={{ width: '70%', margin: '0 auto', textAlign: 'center' }}>
            <Link to="/">
              <img src={respond} alt="logo" style={{ marginRight: '10px', maxHeight: '50px' }} />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <div>
              <Link to="/posts" style={{ textDecoration: 'none' }}>
                <Button color="inherit" style={{ color: 'White', backgroundColor: '#1171B9' }}>
                  Create Post
                </Button>
              </Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
                style={{ color: '#1171B9', marginLeft: '10px' }}
              >
                <AccountCircleOutlinedIcon  />
                </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom', // Adjusted to 'bottom'
          horizontal: 'right',
    
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {isLoggedIn ? (
          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            <span style={{ marginLeft: '10px' }}>Logout</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>
            <Link to="/auth/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <LoginIcon />
              <span style={{ marginLeft: '10px' }}>Login</span>
            </Link>
          </MenuItem>
        )}
        {/* Add additional menu items as needed */}
      </Menu>
    </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
