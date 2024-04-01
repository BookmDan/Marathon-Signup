import { useState, useContext } from 'react';
import RaceEventCard from '../cards-boxes-search/RaceEventCard';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useCost} from '../../context/CostContext';
import { useDispatch } from 'react-redux';
import { fetchFollowedEvents} from '../../redux/eventSlice';
import {UserContext} from '../../context/UserContext'

const SelectRace = ({ raceEvents, onUnFollow }) => {
  // const { userId } = useParams();
  // console.log('User Id:', user)
  const dispatch = useDispatch();

  if (!raceEvents) {
    return  <div>Loading...</div>; 
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  const [selectedRaceId, setSelectedRaceId] = useState(null);
  const { setSelectedRaceCost } = useCost();
  const { currentUser } = useContext(UserContext)

  const handleRaceClick = (selectedRaceId, raceEvent) => {
    setSelectedRaceId(selectedRaceId);
    setSelectedRaceCost(raceEvent.race_cost);
  };

  const handleSelectButtonClick = () => {
    if (!selectedRaceId) {
      return
    } else {
      console.log("User ID:", currentUser.id)
      navigate(`/agreement/${selectedRaceId}/${currentUser.id}`);
    }
  };

  const handleUnfollow = () => {
    // Fetch followed events again to update the list after unfollowing
    dispatch(fetchFollowedEvents(currentUser.id));
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
              onClick={() => handleRaceClick(event.id, event)}
              isSelected={selectedRaceId === event.id}
              onUnfollow={handleUnfollow}
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
