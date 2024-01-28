import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function RaceEventCard({ raceEvent }) {
  const { id, race_name, organization, race_type } = raceEvent;

  return (
    <Card style={{ width: '18rem' }} className="mx-2 my-3 race-card">
      <Card.Body>
        <Card.Title className="fs-5 text-info">{race_name}</Card.Title>
        <Card.Text>
          <strong>Organization:</strong> {organization}
        </Card.Text>
        <Card.Text>
          <strong>Race Type:</strong> {race_type}
        </Card.Text>
        <Button as={Link} to={`/race-events/${id}`} variant="primary">
          Learn More
        </Button>
        <Button variant="success" className="ml-2">
          Sign Up
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RaceEventCard;
