import "../../styles/index.css";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import {UserContext} from '../../context/UserContext'


// import { useDispatch } from 'react-redux';
// import { followEvent, unfollowEvent } from '../../redux/actions';
// isFollowing, onFollowToggle
function RaceEventCard({ raceEvent}) {
  const {race_name, organization, race_type, race_cost } = raceEvent;
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const { currentUser } = useContext(UserContext)



  const handleFollowClick = () => {
    // Toggle the follow state
    setIsFollowing(prevState => !prevState);
  
    console.log('User ID:', currentUser.id);
    console.log('Race Event ID:', raceEvent.id);
    
    const postData = {
      user_id: currentUser.id, 
      race_event_id: raceEvent.id 
    };

    fetch('/api/follows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add/remove race event from follow list');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

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
          variant={isFollowing ? "danger" : "success"}
          className={`ml-2 ${isFollowing ? 'following-button' : 'follow-button'}`}
          onClick={handleFollowClick}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RaceEventCard;