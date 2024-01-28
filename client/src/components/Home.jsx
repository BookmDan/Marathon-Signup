import { useState, useEffect } from "react";
import RaceEventCard from "./cards-boxes-search/RaceEventCard"; // Import your RaceEventCard component
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  const [raceEvents, setRaceEvents] = useState([]);

  useEffect(() => {
    fetch("/raceEvents") // Update the endpoint as needed
      .then((response) => response.json())
      .then((data) => setRaceEvents(data))
      .catch((error) => console.error("Error fetching race events:", error));
  }, []);

  return (
    <Container>
      <h1>Welcome to the Home Page</h1>
      <img
        src={('../assets/photos/kristian-running.jpg').default}
        alt="Splash Banner"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="race-event-cards">
        <Row>
          {raceEvents.map((raceEvent) => (
            <Col key={raceEvent.id}>
              <RaceEventCard raceEvent={raceEvent} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Home;
