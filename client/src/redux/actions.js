// export const UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD';

// export const updatePaymentMethod = (paymentMethod) => ({
//   type: UPDATE_PAYMENT_METHOD,
//   payload: paymentMethod,
// });

export const FOLLOW_EVENT = 'FOLLOW_EVENT';
export const UNFOLLOW_EVENT = 'UNFOLLOW_EVENT';

export const followEvent = eventId => ({
  type: FOLLOW_EVENT,
  payload: eventId,
});

export const unfollowEvent = eventId => ({
  type: UNFOLLOW_EVENT,
  payload: eventId,
});

export const FOLLOW_EVENT_REQUEST = 'FOLLOW_EVENT_REQUEST';
export const FOLLOW_EVENT_SUCCESS = 'FOLLOW_EVENT_SUCCESS';
export const FOLLOW_EVENT_FAILURE = 'FOLLOW_EVENT_FAILURE';

export const UNFOLLOW_EVENT_REQUEST = 'UNFOLLOW_EVENT_REQUEST';
export const UNFOLLOW_EVENT_SUCCESS = 'UNFOLLOW_EVENT_SUCCESS';
export const UNFOLLOW_EVENT_FAILURE = 'UNFOLLOW_EVENT_FAILURE';

export const followEventRequest = () => ({
  type: FOLLOW_EVENT_REQUEST,
});

export const followEventSuccess = () => ({
  type: FOLLOW_EVENT_SUCCESS,
});

export const followEventFailure = error => ({
  type: FOLLOW_EVENT_FAILURE,
  payload: error,
});

export const unfollowEventRequest = () => ({
  type: UNFOLLOW_EVENT_REQUEST,
});

export const unfollowEventSuccess = () => ({
  type: UNFOLLOW_EVENT_SUCCESS,
});

export const unfollowEventFailure = error => ({
  type: UNFOLLOW_EVENT_FAILURE,
  payload: error,
});

export const followEventAsync = (eventId) => async (dispatch) => {
  dispatch(followEventRequest());
  try {
    // Make API call to follow the event
    const response = await fetch(`/api/follow/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to follow event');
    }
    dispatch(followEventSuccess());
  } catch (error) {
    dispatch(followEventFailure(error.toString()));
  }
};

export const unfollowEventAsync = (eventId) => async (dispatch) => {
  dispatch(unfollowEventRequest());
  try {
    // Make API call to unfollow the event
    const response = await fetch(`/api/unfollow/${eventId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to unfollow event');
    }
    dispatch(unfollowEventSuccess());
  } catch (error) {
    dispatch(unfollowEventFailure(error.toString()));
  }
};