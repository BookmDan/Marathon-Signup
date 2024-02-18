import { useRace } from '../../context/RaceContext'; // Import the RaceContext

const Thankyou = () => {
  const { selectedRace } = useRace(); // Get the selected race data from the RaceContext

  return (
    <div>
      <h1>Congrats on registering!</h1>
      <p>Don't forget to visit the RunYourSocksOff website and home page menu for more information about the race.</p>
      <p>Packet Pick Up Location: {selectedRace?.packetpickup_location}</p>
      <p>Race Date: {selectedRace?.start_day}</p>
      <p>Registered: {new Date().toLocaleString()}</p>
      <h2>Registrant:</h2>
      <p>Bring back user name and raceEventData:</p>
      <pre>{JSON.stringify(selectedRace, null, 2)}</pre>
    </div>
  );
};

export default Thankyou;
