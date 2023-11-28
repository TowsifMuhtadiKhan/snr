// store.js
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer, { fetchCards, deleteCard } from '../features/cardSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
  },
});

// Fetch initial data when the app starts
store.dispatch(fetchCards());

export { fetchCards, deleteCard };
