// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
