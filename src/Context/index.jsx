import { createContext, useState } from "react";

export const ShoppingCarContext = createContext();

export const ShoppingCarContextProvider = ({ children }) => {
  const [carCounter, setCarCounter] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [productToSHow, setProductToSHow] = useState({});

  const addProductToCar = () => setCarCounter(carCounter + 1);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  const collectProductInfo = (productInfo) => setProductToSHow(productInfo);

  return (
    <ShoppingCarContext.Provider
      value={{
        carCounter,
        addProductToCar,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        collectProductInfo,
        productToSHow,
      }}
    >
      {children}
    </ShoppingCarContext.Provider>
  );
};
