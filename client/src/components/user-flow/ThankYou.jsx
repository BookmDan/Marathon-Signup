import { useLocation } from 'react-router-dom';

const ThankYou = () => {
  // Get race information from location state
  const location = useLocation();
  const { raceName, organization, raceType, startTime, startDay, packetPickupDay, packetPickupLocation } = location.state;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Format time
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <div className="container mt-5">
      <h2>Congrats on registering!</h2>
      <p>Don't forget to visit the RunYourSocksOff website and home page menu for more information about the race.</p>
      <h3>Race Details:</h3>
      <p><strong>Race Name:</strong> {raceName}</p>
      <p><strong>Organization:</strong> {organization}</p>
      <p><strong>Race Type:</strong> {raceType}</p>
      <p><strong>Race Start Time:</strong> {formatTime(startTime)}</p>
      <p><strong>Race Date:</strong> {formatDate(startDay)}</p>
      <p><strong>Packet Pickup Date:</strong> {formatDate(packetPickupDay)}</p>
      <p><strong>Packet Pickup Location:</strong> {packetPickupLocation}</p>
      <p><strong>Registered:</strong> {new Date().toLocaleString()}</p>
      <p><strong>Registrant:</strong> {location.state.userName}</p>
    </div>
  );
};

export default ThankYou;
