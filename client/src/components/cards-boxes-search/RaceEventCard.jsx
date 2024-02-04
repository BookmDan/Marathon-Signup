// import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/index.css";


function RaceEventCard({ raceEvent }) {
  const { id, race_name, organization, race_types } = raceEvent;
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // style={{ width: '18rem' }}
  // className="mx-2 my-3 race-card">
  return (
    <>
      {race_types.map((raceType) => (
        <Card
          key={raceType.id}
          className={`race-event-card ${raceType.race_type.toLowerCase()}`}
        >
          <Card.Body>
            <Card.Title className="fs-5 text-info">{race_name}</Card.Title>
            <Card.Text>
              <strong>Organization:</strong> {organization}
            </Card.Text>
            <Card.Text>
              <strong>Race Type:</strong> {raceType.race_type}
            </Card.Text>
            <Button as={Link} to={`/race-events/${id}`} variant="primary">
              Learn More
            </Button>
            <Button
              variant="success"
              className="ml-2"
              onClick={() => handleSignUpClick(raceType.id)}
            >
              Sign Up
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default RaceEventCard;
