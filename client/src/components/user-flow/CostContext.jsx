import { createContext, useContext, useState } from 'react';

const CostContext = createContext();

export const CostProvider = ({ children }) => {
  const [selectedRaceCost, setSelectedRaceCost] = useState(0);
  const [shipPacketCost, setShipPacketCost] = useState(0);
  const [cartItemsCost, setCartItemsCost] = useState(0);
  const [tshirtSize, setTshirtSize] = useState('');
  const [couponCode, setCouponCode] = useState('');

  return (
    <CostContext.Provider
      value={{
        selectedRaceCost,
        setSelectedRaceCost,
        shipPacketCost,
        setShipPacketCost,
        cartItemsCost,
        setCartItemsCost,
        tshirtSize,
        setTshirtSize,
        couponCode,
        setCouponCode,
      }}
    >
      {children}
    </CostContext.Provider>
  );
};

export const useCost = () => useContext(CostContext);
