import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShoppingContext = ({ children }) => {
  // State to control whether the product detail view is open or closed.
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  // Function to open the product detail view.
  const openProductDetail = () => setIsProductDetailOpen(true);
  // Function to close the product detail view.
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // State to control whether checkout view is open or closed.
  const [isMyOrderOpen, setIsMyOrderOpen] = useState(false);
  // Function to open checkout view.
  const openMyOrder = () => setIsMyOrderOpen(true);
  // Function to close checkout view.
  const closeMyOrder = () => setIsMyOrderOpen(false);

  // State to store information about the selected product.
  const [productToShow, setProductToShow] = useState({});
  // Function to update the state with the selected product's information.
  const collectProductInfo = (productInfo) => setProductToShow(productInfo);

  // State to store product into Cart
  const [cartProducts, setCartProducts] = useState([]);
  // Function to add product into Cart
  const addProductToCart = (productInfo) => {
    setCartProducts([...cartProducts, productInfo]);
  };
  // Function to remove product into Cart
  const removeProductFromCart = (productId) => {
    let filteredProduct = (prevCartProducts) =>
      prevCartProducts.filter((product) => product.id !== productId);
    setCartProducts(filteredProduct);
  };
  // Function to know Total price to pay into Cart (Side Section)
  const totalToPay = (cartProducts) => {
    return cartProducts?.reduce((sum, product) => sum + product.price, 0);
  };

  // ShoppingCart Order
  const [order, setOrder] = useState([]);

  return (
    <ShopContext.Provider
      value={{
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        collectProductInfo,
        productToShow,
        addProductToCart,
        removeProductFromCart,
        isMyOrderOpen,
        openMyOrder,
        closeMyOrder,
        cartProducts,
        setCartProducts,
        totalToPay,
        order,
        setOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
