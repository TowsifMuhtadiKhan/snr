// cardsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/apiConstants';

// Async thunk to fetch cards
export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.POSTS}`);
    return response.data.slice(0, 100);
  } catch (error) {
    throw error;
  }
});

// Async thunk to delete a card
export const deleteCard = createAsyncThunk('cards/deleteCard', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.POSTS}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
});

// Async thunk to update a post
export const updatePost = createAsyncThunk('cards/updatePost', async (postData) => {
  try {
    const { id, title, description } = postData;
    const response = await axios.put(`${API_BASE_URL}${API_ENDPOINTS.POSTS}/${id}`, { title, body: description });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Slice for cards

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    visibleCards: 5,
    snackbarOpen: false,
    snackbarSeverity: 'success',
  },
  reducers: {
    // Set the number of visible cards
    setVisibleCards: (state, action) => {
      state.visibleCards = action.payload;
    },
    // Set the snackbar state
    setSnackbar: (state, action) => {
      state.snackbarOpen = action.payload.open;
      state.snackbarSeverity = action.payload.severity;
    },
    // Set the snackbar open state
    setSnackbarOpen: (state, action) => {
      state.snackbarOpen = action.payload;
    },
    // Set the snackbar severity state
    setSnackbarSeverity: (state, action) => {
      state.snackbarSeverity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card.id !== action.payload);
        state.snackbarOpen = true;
        state.snackbarSeverity = 'success';
      })
      
      .addCase(fetchCards.rejected, (state) => {
        state.snackbarOpen = true;
        state.snackbarSeverity = 'error';
      })
      .addCase(deleteCard.rejected, (state) => {
        state.snackbarOpen = true;
        state.snackbarSeverity = 'error';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // Update the state or perform other actions
        console.log('Post updated successfully:', action.payload);
        state.snackbarOpen = true;
        state.snackbarSeverity = 'success';
      })
      .addCase(updatePost.rejected, (state) => {
        // Handle the case where updating the post fails
        console.error('Error updating post');
        state.snackbarOpen = true;
        state.snackbarSeverity = 'error';
      });
  },
});

// Export actions
export const { setVisibleCards, setSnackbar, setSnackbarOpen, setSnackbarSeverity } = cardsSlice.actions;

// Export the reducer
export default cardsSlice.reducer;
