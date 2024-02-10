import { useState } from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { useNavigate } from 'react-router-dom';

const SelectRace = ({ raceEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedRace, setSelectedRace] = useState(null);
  const navigate = useNavigate();

  const handleRaceClick = (id) => {
    setSelectedRace(id);
  };

  const handleSelectButtonClick = () => {
    // Navigate to "TheWhy" page upon selecting a race
    navigate('/the-why');
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
      <div className="race-event-cards">
        {filteredRaceEvents.map((race) => (
          <div className="race-event-card" key={race.id}>
            <RaceEventCard
              key={race.id}
              raceEvent={race}
              onClick={() => handleRaceClick(race.id)}
              isSelected={selectedRace === race.id}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSelectButtonClick}>Select</button>
    </div>
  );
};

export default SelectRace;
