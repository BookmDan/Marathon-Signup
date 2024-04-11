import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventSliceReducer from './eventSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventSliceReducer,
  },
});
