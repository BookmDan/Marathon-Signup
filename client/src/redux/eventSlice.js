import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFollowedEvents = createAsyncThunk(
  'event/fetchFollowedEvents',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`/api/user/${userId}/followed-events`);
      if (!response.ok) {
        throw new Error('Failed to fetch followed events');
      }
      const data = await response.json();
      return data.followedEvents;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const followRaceEvent = createAsyncThunk(
  'event/followRaceEvent',
  async ({ userId, raceEventId, follow }, thunkAPI) => {
    const method = follow ? 'POST' : 'DELETE';
    try {
      const response = await fetch('/api/follows', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          race_event_id: raceEventId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to follow/unfollow race event');
      }
      return follow ? raceEventId : null; // If following, return raceEventId, otherwise null
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    followedEvents: [],
    loading: 'idle',
    error:null
  },
  reducers: {
    setFollowedEvents: (state, action) => {
      state.followedEvents = action.payload;
      state.error = null
    },
    setError:(state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedEvents.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchFollowedEvents.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.followedEvents = action.payload;
      })
      .addCase(fetchFollowedEvents.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(followRaceEvent.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(followRaceEvent.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const raceEventId = action.payload;
        if (raceEventId) {
          // If raceEventId is not null, add or remove it from followedEvents based on follow action
          const index = state.followedEvents.indexOf(raceEventId);
          if (index === -1) {
            state.followedEvents.push(raceEventId);
          } else {
            state.followedEvents.splice(index, 1);
          }
        }
      })
      .addCase(followRaceEvent.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
  },
});


export const { setFollowedEvents } = eventSlice.actions;

export default eventSlice.reducer;
