import { useState } from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useCost } from '../../context/CostContext';

const SelectRace = ({ raceEvents, user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  const [selectedRaceId, setSelectedRaceId] = useState(null);
  // const [userId, setUserId] = useState(null);

  const { setSelectedRaceCost } = useCost();
  const [raceName, setRaceName] = useState('');
  const [organization, setOrganization] = useState('');
  const [raceType, setRaceType] = useState('');
  const [raceCost, setRaceCost] = useState('');

  setRaceName('');
  setOrganization('');
  setRaceType('');
  setRaceCost('');
  
  const handleRaceClick = (selectedRaceId, raceEvent) => {
    setSelectedRaceId(selectedRaceId);
    setSelectedRaceCost(raceEvent.race_cost);
  };

  const handleSelectButtonClick = () => {
    if (!selectedRaceId) {
      return
    } else {
      console.log("User ID:", user.id)
      navigate(`/agreement/${selectedRaceId}/${user.id}`);
    }
  };

  const handleAddRaceEvent = () => {
    const requestBody = {
      race_name: raceName,
      organization: organization,
      race_type: raceType,
      race_cost: raceCost
    }

    fetch('/api/race-events', {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body:JSON.stringify(requestBody),
    }).then(res => {
      if (res.ok) {
        console.log("Race event added successfully.");
      } else {
        throw new Error("Failed to add new race event.");
      }
    }).catch(err => {
      console.error("Error adding new race event:", err)
    })
  }

  const filteredRaceEvents = raceEvents.filter((event) => {
    const typeMatch = filterType === 'all' || event.race_type === filterType;
    const nameMatch = event.race_name.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && nameMatch;
  });

  return (
    <div>
      <h2>Select Race</h2>
      <input className="input-container"
        type="text"
        placeholder="Search race..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="5k">5k</option>
        <option value="10k">10k</option>
        <option value="Half Marathon">Half Marathon</option>
        <option value="Full Marathon">Full Marathon</option>
      </select>
      <div>
        <h2>Add New Race Event</h2>
        <form>
          <div>
            <label>Race Name:</label>
            <input type="text" value={raceName} onChange={(e) => setRaceName(e.target.value)} />
          </div>
          <div>
            <label>Organization:</label>
            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />
          </div>
          <div>
            <label>Race Type:</label>
            <input type="text" value={raceType} onChange={(e) => setRaceType(e.target.value)} />
          </div>
          <div>
            <label>Race Cost:</label>
            <input type="text" value={raceCost} onChange={(e) => setRaceCost(e.target.value)} />
          </div>
          <button type="button" onClick={handleAddRaceEvent}>+ Add Race Event</button>
        </form>
      </div>
      <div className="race-event-cards">
        {filteredRaceEvents.map((event) => (
          <div
            key={event.id} 
            className={`race-event-card ${selectedRaceId === event.id ? 'selected' : ''}`}
            onClick={() => handleRaceClick(event.id,event)}
          >
            <RaceEventCard
              key={event.id}
              raceEvent={event}
              onClick={() => handleRaceClick(event.id, event)}
              isSelected={selectedRaceId === event.id}
            />
             <Button variant="primary" onClick={handleSelectButtonClick}>Select</Button>
          </div>
        ))}
      </div>
      <div id="button-container">
        <button onClick={handleSelectButtonClick}>Select</button>
      </div>
    </div>
  );
};
// (event.id)

export default SelectRace;
