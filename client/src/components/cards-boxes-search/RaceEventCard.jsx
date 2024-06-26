import "../../styles/index.css";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext,useEffect } from 'react';
import {UserContext} from '../../context/UserContext'
import { followRaceEvent } from "../../redux/eventSlice";
import { useDispatch } from "react-redux";

function RaceEventCard({ raceEvent, isFollowing, onUnfollow}) {
  const {race_name, organization, race_type, race_cost } = raceEvent;
  const navigate = useNavigate();
  const [following, setFollowing] = useState(isFollowing)
  const { currentUser } = useContext(UserContext)
  const dispatch = useDispatch();

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  const handleFollowClick = () => {
    setFollowing(prevState => !prevState);

    // console.log('User ID:', currentUser.id);
    // console.log('Race Event ID:', raceEvent.id);
    dispatch(followRaceEvent({ userId: currentUser.id, raceEventId: raceEvent.id, follow: !following }))
    .then(() => {
      onUnfollow(); // Call the callback to handle UI changes
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <Card style={{ width: '18rem' }} className="mx-2 my-3 race-card">
      <Card.Body>
        <Card.Title className="fs-5 text-info"><strong>Race Name:</strong> {race_name}</Card.Title>
        <Card.Text>
          <strong>Organization:</strong> {organization}
        </Card.Text>
        <Card.Text>
          <strong>Race Type:</strong> {race_type}
        </Card.Text>
        <Card.Text>
          <strong>Race Cost:</strong> ${race_cost.toFixed(2)}
        </Card.Text>
        <Button as={Link} to={{ pathname: `/race-details/${raceEvent.id}`, state: { raceInfo: raceEvent } }} variant="primary">
          Learn More
        </Button>
        <Button 
          variant={following ? "danger" : "success"}
          className={`ml-2 ${following ? 'following-button' : 'follow-button'}`}
          onClick={handleFollowClick}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RaceEventCard;