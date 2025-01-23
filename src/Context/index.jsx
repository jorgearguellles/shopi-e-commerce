import { createContext, useState } from "react";

export const ShoppingContext = createContext();

export const ShoppingContextProvider = ({ children }) => {
  const [cartCounter, setCartCounter] = useState(0);

  const addProductToCart = () => {
    setCartCounter(cartCounter + 1);
  };

  return (
    <ShoppingContext.Provider value={{ cartCounter, addProductToCart }}>
      {children}
    </ShoppingContext.Provider>
  );
};
