import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setLoading(true);
      const response = await dispatch(loginUser(credentials));

      // Extracting access token from the response
      const accessToken = response.payload.data.localData.accessToken;

      // Save x-api-key and accessToken to local storage
      const xApiKey = 'RvIJaVSY9x3a98KXnkIaO42Q6OoIZcSi1OKCrPii';
      localStorage.setItem('x-api-key', xApiKey);
      
      // Store the access token in local storage with the key "aceesstoken"
      localStorage.setItem('accesstoken', accessToken);

      navigate('/');
      setOpenSnackbar(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('Login successful!');
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
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
              fontSize: '15px',
              color: 'grey',
              textAlign: 'center',
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Login
            </LoadingButton>
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
