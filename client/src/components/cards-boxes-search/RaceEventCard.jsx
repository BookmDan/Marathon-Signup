import "../../styles/index.css";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RaceEventCard({ raceEvent, userId }) {
  const {race_name, organization, race_type, race_cost } = raceEvent;
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleFollowClick = () => {
    // Toggle the follow state
    setIsFollowing(prevState => !prevState);
    console.log('User ID:', userId);
    console.log('Race Event ID:', raceEvent.id);
    
    const postData = {
      user_id: userId, // Replace userId with the actual user ID
      race_event_id: raceEvent.id // Assuming raceEvent object has an 'id' property
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
      // Race event added/removed successfully
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
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
        <Button variant="success" className="ml-2" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RaceEventCard;