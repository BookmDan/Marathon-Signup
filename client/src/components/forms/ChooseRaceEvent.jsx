import { useState, useEffect } from 'react';
import RaceEventCard from './RaceEventCard';  // Import your RaceEventCard component
import { Container, Form } from 'react-bootstrap';

const ChooseRaceEvent = () => {
  const [raceEvents, setRaceEvents] = useState([]);

  useEffect(() => {
    // Fetch race events when the component mounts
    fetch('/api/race-events')
      .then((res) => res.json())
      .then((data) => setRaceEvents(data))
      .catch((error) => console.error('Error fetching race events:', error));
  }, []);

  return (
    <Container>
      <div>ChooseRaceEvent</div>
      <Form>
        {raceEvents.map((event) => (
          <div key={event.id}>
            <RaceEventCard raceEvent={event} />
            <Form.Check
              type="radio"
              name="raceCategory"
              id={`radio-${event.id}-5k`}
              label={`5k - $${event.price_5k}`}
            />
            <Form.Check
              type="radio"
              name="raceCategory"
              id={`radio-${event.id}-10k`}
              label={`10k - $${event.price_10k}`}
            />
            <Form.Check
              type="radio"
              name="raceCategory"
              id={`radio-${event.id}-half`}
              label={`Half Marathon - $${event.price_half}`}
            />
            <Form.Check
              type="radio"
              name="raceCategory"
              id={`radio-${event.id}-full`}
              label={`Full Marathon - $${event.price_full}`}
            />
          </div>
        ))}
      </Form>
    </Container>
  );
};

export default ChooseRaceEvent;
