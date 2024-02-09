import { useState } from "react";

const RaceInfo = ({ raceEvents }) => {
  const [filteredEvents, setFilteredEvents] = useState(raceEvents);
  const [filter, setFilter] = useState("");

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
    <div>
      <h2>Race Events</h2>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            {event.race_name} - {event.organization} - {event.race_type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaceInfo;
