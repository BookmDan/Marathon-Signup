import { useState, useEffect } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Agreement = () => {
  const navigate = useNavigate()
  const [estimatedFinishTime, setEstimatedFinishTime] = useState("");
  const [understandEventDetails, setUnderstandEventDetails] = useState(false);
  const [packetPickup, setPacketPickup] = useState(false);
  const [loadedRaceEvent, setLoadedRaceEvent] = useState(null);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleContinue = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    // Prepare the data object to send to the backend API
    const data = {
      estimated_finish_time_hours: parseInt(hours),
      estimated_finish_time_minutes: parseInt(minutes),
      estimated_finish_time_seconds: parseInt(seconds),
      estimated_finish_time: totalSeconds,
    };

    // Send a POST request to your backend API
    fetch("/api/user/:id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response
        console.log("Estimated finish time data sent successfully:", data);
        navigate("/the-why"); // Navigate to the next page after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending estimated finish time data:", error);
      });
    // navigate("/the-why");
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  return (
    <Container>
      <h2>T-Shirt Options</h2>
      <Form>
        <Form.Group as={Row} controlId="estimatedFinishTime">
          <Form.Label column sm={2}>
            Estimated Finish Time:
          </Form.Label>
          <div>
            <Form.Control
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={handleHoursChange}
            />
            <Form.Control
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={handleMinutesChange}
            />
            <Form.Control
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={handleSecondsChange}
            />
          </div>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Event Details:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label={`I understand that this event occurs on ${loadedRaceEvent ? loadedRaceEvent.start_day : ''} at ${loadedRaceEvent ? loadedRaceEvent.start_time : ''}`}
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
              label={`I will pick up my packet on ${loadedRaceEvent ? loadedRaceEvent.packetpickup_day : ''}`}
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
