import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const initializeLocalStorage = () => {
  // Retrieve stored values from localStorage
  const accountInLocalStorage = localStorage.getItem("account");
  const signOutInLocalStorage = localStorage.getItem("sign-out");
  let parsedAccount;
  let parsedSignOut;

  // Check if "account" exists in localStorage
  if (!accountInLocalStorage) {
    // If not, initialize it with an empty object
    localStorage.setItem("account", JSON.stringify({}));
    parsedAccount = {};
  } else {
    // Parse the existing JSON string into a JavaScript object
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  // Check if "sign-out" exists in localStorage
  if (!signOutInLocalStorage) {
    // If not, initialize it with "false"
    localStorage.setItem("sign-out", JSON.stringify(false));
    parsedSignOut = false;
  } else {
    // Parse the existing JSON string into a JavaScript boolean
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
};

export const ShoppingContext = ({ children }) => {
  // My account and Sign Out
  const [account, setAccount] = useState({});
  const [signOut, setSignOut] = useState(false);

  /**
   * UI State Management
   * Controls visibility of product details and order summary
   */
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isMyOrderOpen, setIsMyOrderOpen] = useState(false);

  // Functions to toggle product detail view
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Functions to toggle order summary view
  const openMyOrder = () => setIsMyOrderOpen(true);
  const closeMyOrder = () => setIsMyOrderOpen(false);

  /**
   * Product Selection
   * Stores the product selected by the user
   */
  const [productToShow, setProductToShow] = useState({});
  const collectProductInfo = (productInfo) => setProductToShow(productInfo);

  /**
   * Shopping Cart State
   * Manages products in the cart and calculates total price
   */
  const [cartProducts, setCartProducts] = useState([]);

  // Adds a product to the cart
  const addProductToCart = (productInfo) => {
    setCartProducts([...cartProducts, productInfo]);
  };

  // Removes a product from the cart by its ID
  const removeProductFromCart = (productId) => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.filter((product) => product.id !== productId)
    );
  };

  // Calculates the total amount to be paid
  const totalToPay = (cartProducts) => {
    return cartProducts?.reduce((sum, product) => sum + product.price, 0);
  };

  /**
   * Order History
   * Stores the list of orders placed by the user
   */
  const [order, setOrder] = useState([]);

  /**
   * Product Fetching and Filtering
   * Retrieves products from API and manages search filters
   */
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  // Search filters
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");

  // Filters items by title
  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  // Filters items by category
  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(
      (item) =>
        item.category.toLowerCase().trim() ===
        searchByCategory.toLowerCase().trim()
    );
  };

  // Applies filtering based on search type
  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }
    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }
    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    return items;
  };

  // Updates the filtered items whenever search criteria change
  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    else if (searchByTitle)
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    else if (searchByCategory)
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    else setFilteredItems(items);
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShopContext.Provider
      value={{
        // UI state
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isMyOrderOpen,
        openMyOrder,
        closeMyOrder,

        // Product selection
        productToShow,
        collectProductInfo,

        // Shopping cart
        cartProducts,
        setCartProducts,
        addProductToCart,
        removeProductFromCart,
        totalToPay,

        // Order history
        order,
        setOrder,

        // Product fetching and filtering
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,
        filteredItems,
        account,
        setAccount,
        signOut,
        setSignOut,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
