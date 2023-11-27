import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function LogIn() {
    const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      // Make API call for login
      await axios.post('https://test-api.day2communications.com/company-mgmt/login', credentials, {
        headers: {
          'x-api-key': 'gS39AKNYfj371zGKH5MQK72X4WIALIa36IXwDTKI',
        },
      });

      // Assuming the response contains user data or a token
      // You can handle the login success here, e.g., set user data in local storage
      // Redirect to another page (e.g., /home) after successful login
      navigate('/');
      // Set Snackbar state for success
      setOpenSnackbar(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('Login successful!');
    } catch (error) {
      // Set Snackbar state for error
      setOpenSnackbar(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '150px', marginBottom: '200px' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1171B9', marginBottom: '25px' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h5" variant="h5" sx={{ 
            fontSize: '30px',
            fontWeight: 'bold' 
          }}>
            Login your Account
          </Typography>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              marginTop: '20px',
              fontSize: '15px', // Adjust the font size as needed
              color: 'grey',
              textAlign:'center',   // Set the desired color
            }}
          >
            Please enter the register email address & password associated with your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
