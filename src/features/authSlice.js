import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to login
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
    const response = await axios.post('https://test-api.day2communications.com/company-mgmt/login', credentials, {
      headers: {
        'x-api-key': 'gS39AKNYfj371zGKH5MQK72X4WIALIa36IXwDTKI',
      },
    });
    // Assuming the response contains user data or a token
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Other async thunks, reducers, and actions can be added here

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // You can modify this structure based on your user data
    loading: false,
    error: null,
  },
  reducers: {
    // Your other reducers here...
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Modify this based on your user data structure
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions


// Export the reducer
export default authSlice.reducer;
