import { createContext, useContext, useState } from 'react';

const CreditCardContext = createContext();

export const useCreditCard = () => useContext(CreditCardContext);

export const CreditCardProvider = ({ children }) => {
  const [creditCardInfo, setCreditCardInfo] = useState(null);

  const storeCreditCardInfo = (info) => {
    setCreditCardInfo(info);
  };

  return (
    <CreditCardContext.Provider value={{ creditCardInfo, storeCreditCardInfo }}>
      {children}
    </CreditCardContext.Provider>
  );
};
