import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { fetchFollowedEvents} from '../../redux/eventSlice';
import {UserContext} from '../../context/UserContext'

const MyAccount = () => {
  // console.log("user id: ", user);
  const dispatch = useDispatch();
  const followedEvents = useSelector((state) => state.event.followedEvents);
  const { currentUser } = useContext(UserContext)

  console.log("user id", currentUser.id)
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFollowedEvents(currentUser.id));
    }
  }, [currentUser, dispatch])

  // const handleToggleFollow = (eventId, isFollowed) => {
  //   // Dispatch your follow/unfollow action here or any other logic you want to execute
  //   console.log('Toggling follow for event ID:', eventId);
  //   console.log('Is Followed:', isFollowed);
  // };
  const handleUnfollow = () => {
    // Fetch followed events again to update the list after unfollowing
    dispatch(fetchFollowedEvents(currentUser.id));
  };


  
  return (
    <div>
      <h2>My Account</h2>
      <h3>Followed Events</h3>
      <div className="race-event-cards">
        {followedEvents.map(event => (
          <div key={event.id} className="mb-3">
            <RaceEventCard 
              key={event.id}
              raceEvent={event} 
              isFollowing={true}
              onUnfollow={handleUnfollow}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccount;
