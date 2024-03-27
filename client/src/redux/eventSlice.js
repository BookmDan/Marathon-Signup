// src/store/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    followedEventIds: [],
    followedEvents: [],
  },
  reducers: {
    setFollowedEvents: (state, action) => {
      state.followedEvents = action.payload;
    },
    setFollowedEventIds: (state, action) => {
      state.followedEventIds = action.payload;
    },
  },
});

export const { setFollowedEvents, setFollowedEventIds } = eventSlice.actions;

export default eventSlice.reducer;
