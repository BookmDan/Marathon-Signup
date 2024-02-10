import{ useState } from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';

const SelectRace = ({ raceEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedRace, setSelectedRace] = useState(null);

  const handleRaceClick = (id) => {
    setSelectedRace(id);
  };

  const filteredRaceEvents = raceEvents.filter((event) => {
    const typeMatch = filterType === 'all' || event.race_type === filterType;
    const nameMatch = event.race_name.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && nameMatch;
  });

  return (
    <div>
      <h2>Select Race</h2>
      <input
        type="text"
        placeholder="Search race..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="5k">5k</option>
        <option value="10k">10k</option>
        <option value="half">Half Marathon</option>
        <option value="full">Full Marathon</option>
      </select>
      <div className="race-event-list">
        {filteredRaceEvents.map((race) => (
          <RaceEventCard
            key={race.id}
            raceEvent={race}
            onClick={() => handleRaceClick(race.id)}
            isSelected={selectedRace === race.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectRace;
