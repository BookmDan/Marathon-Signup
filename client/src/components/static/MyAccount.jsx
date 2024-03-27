import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import {login} from '../../redux/userSlice'
import { setFollowedEvents} from '../../redux/eventSlice';

const MyAccount = ({user}) => {
//   const [followedEventIds, setFollowedEventIds] = useState([]);
//   const [followedEvents, setFollowedEvents] = useState([]);
  console.log("user id: ", user);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const followedEvents = useSelector((state) => state.event.followedEvents);

  // useEffect(() => {
  //   if (user) {
  //     console.log('User ID:', user.id); // Log the user ID
  //     const fetchFollowedEventIds = async () => {
  //       try {
  //         const response = await fetch(`/api/user/${user.id}/followed-events`);
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch followed event IDs');
  //         }
  //         const data = await response.json();
  //         setFollowedEventIds(data.followedEventIds);
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     };
  
  //     fetchFollowedEventIds();
  //   }
  // }, [user]);


  useEffect(() => {
    if (user && !loggedIn) {
      dispatch(login(user));
    }
  }, [user, loggedIn, dispatch])

  useEffect(() => {
    // Fetch the followed events for the logged-in user based on their user ID
    if (user) {
      const fetchFollowedEvents = async () => {
        try {
          const response = await fetch(`/api/user/${user.id}/followed-events`);
          if (!response.ok) {
            throw new Error('Failed to fetch followed events');
          }
          const data = await response.json();
          setFollowedEvents(data.followedEvents);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchFollowedEvents();
    }
  }, [user,dispatch]);

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
              userId = {user.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccount;
          // <RaceEventCard
          //   key={event.id}
          //   raceEvent={event}
          //   userId={user.id}
          // />
