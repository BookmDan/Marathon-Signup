import React from 'react';

const ThankYou = ({ selectedRace }) => {
  return (
    <div>
      <h1>Congrats on registering!</h1>
      <p>Don't forget to visit the RunYourSocksOff website and home page menu for more information about the race.</p>
      <p>Packet Pick Up Location: {selectedRace?.packetpickup_location}</p>
      <p>Race Date: {selectedRace?.start_day}</p>
      <p>Registered: {new Date().toLocaleString()}</p>
      <h2>Registrant:</h2>
      {/* Add registrant information here */}
    </div>
  );
};

export default ThankYou;
