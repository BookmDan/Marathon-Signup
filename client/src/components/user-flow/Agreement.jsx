import { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext  } from '../../context/UserContext';

const Agreement = () => {
  const navigate = useNavigate()
  const { currentUser, loggedIn, login, logout  } = useContext(UserContext);
  const { selectedRaceId} = useParams();
  const [packetPickup, setPacketPickup] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [shirtSize, setShirtSize] = useState("");
  const [waiverAccept, setWaiverAccept] = useState(false);
  const [raceEventData, setRaceEventData] = useState(null);

  // console.log(selectedRaceId)
  useEffect(() => {
    fetch(`/api/race-event/${selectedRaceId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch race event data');
      })
      .then(data => {
        setRaceEventData(data);
      })
      .catch(error => {
        console.error('Error fetching race event data:', error);
      });
  }, [selectedRaceId]);

  const handleContinue = () => {
    const currentUserId = currentUser;
  if (currentUserId) {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    const raceSignupData = {
      user_id: currentUserId,
      race_event_id: selectedRaceId,
      waiver_accept: waiverAccept,
      tshirt_size: shirtSize,
      coupon_code: "SPECIALOFFER",
    };

    const finishTimeData = {
      estimated_finish_time_hours: parseInt(hours),
      estimated_finish_time_minutes: parseInt(minutes),
      estimated_finish_time_seconds: parseInt(seconds),
      estimated_finish_time: totalSeconds,
    };

    fetch("/api/race-signups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raceSignupData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post race signup");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Race signup successful", data);
        // Make the POST request to update user with estimated finish time
        return fetch(`/api/user/${currentUserId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finishTimeData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user with estimated finish time");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Estimated finish time data sent successfully:", data);
        navigate("/the-why");
      })
      .catch((error) => {
        console.error("Error during POST requests:", error);
      });
  } else {
    console.error("User id not found in route parameters");
  }
};

  const handleHoursChange = (e) => {
    setHours(Math.max(Number(e.target.value), 0));
  };

  const handleMinutesChange = (e) => {
    setMinutes(Math.max(Number(e.target.value), 0));
  };

  const handleSecondsChange = (e) => {
    setSeconds(Math.max(Number(e.target.value), 0));
  };

  const handleShirtSizeChange = (e) => {
    setShirtSize(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/select-race')
  };

  const handleWaiverAcceptance = () => {
    setWaiverAccept(!waiverAccept);
  };

  const raceEventLabel = raceEventData ? `I agree to the waiver. I understand that this event occurs on ${raceEventData.start_day} at ${raceEventData.start_time}` : '';
  const packetPickupLabel = raceEventData ? `I will pick up my packet on ${raceEventData.packetpickup_day} at ${raceEventData.packetpickup_location}` : '';

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
              label= {raceEventLabel}
              checked={waiverAccept}
              onChange = {handleWaiverAcceptance}
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
              label={packetPickupLabel}
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
      </Form>
    </Container>
  );
};

export default Agreement;
