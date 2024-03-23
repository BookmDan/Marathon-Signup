import "../../styles/index.css";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RaceEventCard({ raceEvent }) {
  const {race_name, organization, race_type, race_cost } = raceEvent;
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleFollowClick = () => {
    // Toggle the follow state
    setIsFollowing(prevState => !prevState);

    // Here you can implement logic to follow/unfollow the race event
    // For example, you can send a request to your backend API to update the user's follow list
    // This implementation assumes that you have such backend functionality in place
    // should go either to a certain 
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
        {/* <Button variant={isFollowing ? "danger" : "success"} className="ml-2" onClick={isFollowing ? handleUnfollowClick : handleFollowClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button> */}
        <Button variant="success" className="ml-2" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RaceEventCard;