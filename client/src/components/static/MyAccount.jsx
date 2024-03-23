import { useEffect, useState, useContext} from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

const MyAccount = () => {
  // const {userId} = useUser()
  const [followedEvents, setFollowedEvents] = useState([]);
  const { user } = useContext(UserContext);
  console.log("user id: ", user)
  // if (!user) {
  //   // Redirect user to login page or display an error message
  //   return <p>Please log in to view this page</p>;
  // }

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
  }, [user]);

  return (
    <Container>
      <h2>My Account</h2>
      <h3>Followed Events</h3>
      <div className="race-event-cards">
        {followedEvents.map(event => (
          <RaceEventCard key={event.id} raceEvent={event} userId={userId} />
        ))}
      </div>
    </Container>
  );
};

export default MyAccount;