import { createContext, useContext, useState } from 'react';

const RaceContext = createContext();

export const RaceProvider = ({ children }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedRaceCost, setSelectedRaceCost] = useState(0);

  return (
    <RaceContext.Provider
      value={{
        selectedRace,
        setSelectedRace,
        selectedRaceCost,
        setSelectedRaceCost,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export const useRace = () => useContext(RaceContext);
