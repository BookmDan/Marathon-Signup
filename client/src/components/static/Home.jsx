import { useState, useEffect } from "react";
import "../../styles/index.css"
import RaceEventCard from "../cards-boxes-search/RaceEventCard"; // Import your RaceEventCard component
import { Container, Row, Col, Button } from "react-bootstrap";
import kristianImage from "../../photos/kristian-running.jpg";
import { Link } from 'react-router-dom';

function Home() {
  const [raceEvents, setRaceEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(raceEvents);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchRaceEvents();
    filterEvents(filter); 
  }, [raceEvents]);

  const fetchRaceEvents = () => {
    fetch('/api/race-events')
      .then((res) => res.json())
      .then(data => {
      setRaceEvents(data)
      })
      .catch(err => {
      console.error("Error fetching race events:", err)
    })
  }
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

  {raceEvents.map((event) => (
    <Col key={event.id} xs={12} sm={6} md={4}>
      <RaceEventCard raceEvent={event} />
    </Col>
  ))}
  
  return (
    <Container>
      <h1>Sign up for your next Marathon!</h1>
      <img
        src={kristianImage}
        alt="Splash Banner"
        style={{ width: '100%', height: 'auto' }}
      />

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
              <RaceEventCard raceEvent={event} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
