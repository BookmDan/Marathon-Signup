import { useState, useNavigate } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, Col, Row } from "react-bootstrap";

const Agreement = ({ raceEvent }) => {
  const navigate = useNavigate()
  const [estimatedFinishTime, setEstimatedFinishTime] = useState("");
  const [understandEventDetails, setUnderstandEventDetails] = useState(false);
  const [packetPickup, setPacketPickup] = useState(false);

  const handleContinue = () => {
    navigate("/the-why");
  };

  return (
    <Container>
      <h2>T-Shirt Options</h2>
      <Form>
        <Form.Group as={Row} controlId="estimatedFinishTime">
          <Form.Label column sm={2}>
            Estimated Finish Time:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={estimatedFinishTime}
              onChange={(e) => setEstimatedFinishTime(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Event Details:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label={`I understand that this event occurs on ${raceEvent.start_day} at ${raceEvent.start_time}`}
              checked={understandEventDetails}
              onChange={() => setUnderstandEventDetails(!understandEventDetails)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Packet Pickup:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label={`I will pick up my packet on ${raceEvent.packetpickup_day}`}
              checked={packetPickup}
              onChange={() => setPacketPickup(!packetPickup)}
            />
          </Col>
        </Form.Group>
        <div id="button-container">
          <Button id="" variant="primary" onClick={handleContinue}>Continue</Button>
        </div>
      </Form>
    </Container>
  );
};

export default Agreement;
