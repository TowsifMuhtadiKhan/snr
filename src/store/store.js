// store.js
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer, { fetchCards, deleteCard } from '../features/cardSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

// Fetch initial data when the app starts
store.dispatch(fetchCards());

export { fetchCards, deleteCard };
