import { useState, useEffect } from "react";
import "../../styles/index.css";
import RaceEventCard from "../cards-boxes-search/RaceEventCard";
import { Container } from "react-bootstrap";
import kristianImage from "../../photos/kristian-running.jpg";

function Home() {
  const [raceEvents, setRaceEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("");
  // const [byOrg, setByOrg] = useState("");

  useEffect(() => {
    fetchRaceEvents();
    // fetchRaceEventsByOrg()
  }, []);

  const handlesMostPopular = () => {
    fetch('/api/most-popular?ratings=5', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(r => {
      if (r.ok) {
        r.json().then(data => console.log(data))
      } else {
        r.json().then(err => console.error('Error fetching five-star race events: ',err))
      }
    })
  }

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


  // const fetchRaceEventsByOrg = () => {
  //   fetch('/api/by-org')
  //     .then(res => res.json())
  //     .then(data => {
  //       setRaceEvents(data)
  //       setFilteredEvents(data)
  //     }).catch(err => {
  //     console.error('Error fetching race events by org,',err)
  //   })
  // }

  // const filteredEventsByOrg = (filterValue) => {
  //   const filtered = raceEvents.filter((e) =>
  //     e.organization.toLowerCase().includes(filterValue.toLowerCase())
  //   )
  //   setFilteredEvents(filtered)
  // }

  // const handleFilterChangeByOrg = (e) => {
  //   const value = e.target.value()
  //   setByOrg(value)
  //   filteredEventsByOrg(value)
  // }

        // <div>
        //   <input
        //     type="text"
        //     placeholder="Filter by Organization Name"
        //     value={byOrg}
        //     onChange={handleFilterChangeByOrg}
        //   />
        // </div>
  return (
    <Container>
      <h1>Sign up for your next Marathon!</h1>
      <img src={kristianImage} alt="Splash Banner" style={{ width: "100%", height: "auto" }} />
      <button onClick={handlesMostPopular}>Most popular events</button>
      <div>
        <h2>Race Events</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Filter by Event Name"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
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