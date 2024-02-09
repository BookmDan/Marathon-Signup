import { useState, useEffect } from "react";
import "../../styles/index.css";
import RaceEventCard from "../cards-boxes-search/RaceEventCard";
import { Container } from "react-bootstrap";
import kristianImage from "../../photos/kristian-running.jpg";

function Home() {
  const [raceEvents, setRaceEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchRaceEvents();
  }, []);

  const fetchRaceEvents = () => {
    fetch("/api/race-events")
      .then((res) => res.json())
      .then((data) => {
        setRaceEvents(data);
        setFilteredEvents(data); // Initially, set filtered events to all race events
      })
      .catch((err) => {
        console.error("Error fetching race events:", err);
      });
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    filterEvents(value);
  };

  const filterEvents = (filterValue) => {
    const filtered = raceEvents.filter((event) =>
      event.race_name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <Container>
      <h1>Sign up for your next Marathon!</h1>
      <img src={kristianImage} alt="Splash Banner" style={{ width: "100%", height: "auto" }} />

      <div>
        <h2>Race Events</h2>
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={handleFilterChange}
        />
        <div className="race-event-cards">
          {filteredEvents.map((event) => (
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
