import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    followedEvents: [],
  },
  reducers: {
    setFollowedEvents: (state, action) => {
      state.followedEvents = action.payload;
    },
  },
});

export const { setFollowedEvents } = eventSlice.actions;

export const fetchFollowedEvents = (userId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/user/${userId}/followed-events`);
      if (!response.ok) {
        throw new Error('Failed to fetch followed events');
      }
      const data = await response.json();
      dispatch(setFollowedEvents(data.followedEvents));
    } catch (error) {
      console.error('Error:', error);
    }
  };
export default eventSlice.reducer;
