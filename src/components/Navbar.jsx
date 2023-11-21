import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link from React Router
import respond from "../assest/respond.png";

export default function ButtonAppBar() {
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
              {/* Logo on the left */}
              <img src={respond} alt="logo" style={{ marginRight: '10px', maxHeight: '50px' }} />
            </Link>

            {/* Spacer to push the "Create New Post" button to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Button to create a new post */}
            <Link to="/posts" style={{ textDecoration: 'none' }}>
              <Button color="inherit" style={{ color: 'White', backgroundColor: '#3486eb' }}>
                Create New Post
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
