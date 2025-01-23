import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingContextProvider } from "../../Context";
import { Home } from "../Home";
import { MyAccount } from "../MyAccount";
import { MyOrders } from "../MyOrders";
import { NotFound } from "../NotFound";
import { SignIn } from "../SignIn";
import { Navbar } from "../../components/Navbar";

import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingContextProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingContextProvider>
  );
};

export default App;
