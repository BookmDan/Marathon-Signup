import { useState, useEffect } from "react";
import "../../styles/index.css"
import RaceEventCard from "../cards-boxes-search/RaceEventCard"; // Import your RaceEventCard component
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  const [raceEvents, setRaceEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(raceEvents);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch("/raceEvents") // Update the endpoint as needed
      .then((response) => response.json())
      .then((data) => setRaceEvents(data))
      .catch((error) => console.error("Error fetching race events:", error));
    filterEvents(filter); 
  }, [raceEvents]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    filterEvents(value);
  };

  const filterEvents = (filterValue) => {
    const filtered = raceEvents.filter(event =>
      event.organization.toLowerCase().includes(filterValue.toLowerCase()) ||
      event.race_name.toLowerCase().includes(filterValue.toLowerCase()) ||
      event.race_type.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <Container>
      <h1>Welcome to the Home Page</h1>

      <img
        src={('../../photos/kristian-running.jpg').default}
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
      <div>
      <h2>Race Events</h2>
      <input
        type="text"
        placeholder="Filter by name, organization, race type"
        value={filter}
        onChange={handleFilterChange}
      />
      <div className="race-event-cards">
        {filteredEvents.map(event => (
          <div key={event.id} className="race-event-card">
            <h3>{event.race_name}</h3>
              <p>Organization: {event.organization}</p>
              <p>Race Type: {event.race_type}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
