import { combineReducers } from 'redux';
import { FOLLOW_EVENT, UNFOLLOW_EVENT } from './actions';

const initialState = {
  followedEvents: [],
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_EVENT:
      return {
        ...state,
        followedEvents: [...state.followedEvents, action.payload],
      };
    case UNFOLLOW_EVENT:
      return {
        ...state,
        followedEvents: state.followedEvents.filter(eventId => eventId !== action.payload),
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  follow: followReducer,
  // other reducers...
});

export default rootReducer;
