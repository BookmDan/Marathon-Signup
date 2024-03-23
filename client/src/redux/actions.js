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
