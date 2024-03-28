import { useState } from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { useCost } from '../../context/CostContext';

const SelectRace = ({ raceEvents, user }) => {
  const { userId } = useParams();
  // console.log('User Id:', user)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  const [selectedRaceId, setSelectedRaceId] = useState(null);
  const { setSelectedRaceCost } = useCost();

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
              userId = {userId}
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
