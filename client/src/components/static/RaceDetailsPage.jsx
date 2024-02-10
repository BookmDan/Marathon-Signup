function RaceDetailsPage({ raceInfo }) {
  return (
    <div>
      <h1>{raceInfo.race_name}</h1>
      <p><strong>Organization:</strong> {raceInfo.organization}</p>
      <p><strong>Race Type:</strong> {raceInfo.race_type}</p>
      <p><strong>Start Date:</strong> {raceInfo.start_date}</p>
      <p><strong>Start Time:</strong> {raceInfo.start_time}</p>
      <p><strong>Packet Pickup:</strong> {raceInfo.packet_pickup}</p>
      <p><strong>Location:</strong> {raceInfo.location}</p>
    </div>
  );
}

export default RaceDetailsPage;
