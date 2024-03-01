import React, { createContext, useState, useContext, ReactNode } from 'react';

const NewOrderContext = createContext<{
    hasNewOrder: boolean;
    setHasNewOrder: React.Dispatch<React.SetStateAction<boolean>>;
  }>({
    hasNewOrder: false,
    setHasNewOrder: () => {}
  });
  

export const NewOrderProvider: React.FC<{ children: ReactNode }> = ({ children, }) => {
  const [hasNewOrder, setHasNewOrder] = useState(false);

  return (
    <NewOrderContext.Provider value={{ hasNewOrder, setHasNewOrder }}>
      {children}
    </NewOrderContext.Provider>
  );
};

export const useNewOrder = () => {
  return useContext(NewOrderContext);
};
