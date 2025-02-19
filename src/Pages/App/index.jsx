import { useContext } from "react";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import {
  ShoppingContext,
  initializeLocalStorage,
  ShopContext,
} from "../../Context";
import { Home } from "../Home";
import { MyAccount } from "../MyAccount";
import { MyOrders } from "../MyOrders";
import { MyOrder } from "../MyOrder";
import { NotFound } from "../NotFound";
import { SignIn } from "../SignIn";
import { Navbar } from "../../components/Navbar";
import { CheckoutSideMenu } from "../../Components/CheckoutSideMenu";

import "./App.css";

const AppRoutes = () => {
  const { signOut, account } = useContext(ShopContext);
  // Account
  const accountLocalStorage = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountLocalStorage);
  // Sign Out
  const signOutLocalStorage = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOutLocalStorage);
  // Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = Object.keys(account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = signOut || parsedSignOut;

  let routes = useRoutes([
    {
      path: "/",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/shopi-e-commerce/",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/men-clothes",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/women-clothes",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/electronics",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/jewelery",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  initializeLocalStorage();
  return (
    <ShoppingContext>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingContext>
  );
};

export default App;
