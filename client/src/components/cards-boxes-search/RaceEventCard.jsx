import "../../styles/index.css";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

function RaceEventCard({ raceEvent }) {
  const {race_name, organization, race_type } = raceEvent;
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
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
        {/* <Button as={Link} to={`/race-events/${id}`} variant="primary"> */}
        <Button as={Link} to={{ pathname: `/race-details/${raceEvent.id}`, state: { raceInfo: raceEvent } }} variant="primary">
          Learn More
        </Button>
        <Button variant="success" className="ml-2" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RaceEventCard;