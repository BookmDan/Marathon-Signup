import { useState, useEffect } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Agreement = () => {
  const navigate = useNavigate()
  const [understandEventDetails, setUnderstandEventDetails] = useState(false);
  const [packetPickup, setPacketPickup] = useState(false);
  const [loadedRaceEvent, setLoadedRaceEvent] = useState(null);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [shirtSize, setShirtSize] = useState("");

  const handleContinue = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

      const raceSignupData = {
        user_id: 123, // Replace with actual user ID
        race_event_id: 456, // Replace with actual race event ID
        waiver_accept: true, // Example value, replace accordingly
        coupon_code: "SPECIALOFFER", // Example value, replace accordingly
        tshirt_size: shirtSize, // Send selected T-shirt size to backend
    };
    // Prepare the data object to send to the backend API
    const finishTimeData = {
      estimated_finish_time_hours: parseInt(hours),
      estimated_finish_time_minutes: parseInt(minutes),
      estimated_finish_time_seconds: parseInt(seconds),
      estimated_finish_time: totalSeconds,
    };

    fetch("/api/race-signups/<int:id>", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(raceSignupData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Race signup data sent successfully:", data);
        // After successful race signup, send estimated finish time data
    fetch("/api/user/:id", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(finishTimeData),
    })
      .then((response) => response.json())
      .then((data) => {
          console.log("Estimated finish time data sent successfully:", data);
          navigate("/the-why");
      })
      .catch((error) => {
          console.error("Error sending estimated finish time data:", error);
      });
    })
    .catch((error) => {
        console.error("Error sending race signup data:", error);
    });
    navigate("/the-why");
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

  const handleShirtSizeChange = (e) => {
    setShirtSize(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/select-race')
  };

  return (
    <Container>
      <h2>T-Shirt Options</h2>
      <div>
        <label>T-shirt Size:</label>
        <select value={shirtSize} onChange={handleShirtSizeChange}>
          <option value="">Select size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
      </div>
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div id="button-container">
            <Button variant="secondary" onClick={handleContinue}>Continue</Button>
          </div>
            <Button variant="secondary" onClick={handleBackClick}>Back</Button>
        </div>
        {/* <div id="button-container">
          <Button id="" variant="primary" onClick={handleContinue}>Continue</Button>
        </div> */}
      </Form>
    </Container>
  );
};

export default Agreement;
