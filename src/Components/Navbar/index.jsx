import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context";

export const Navbar = () => {
  const activeStyle = "underline underline-offset-4";
  const { cartProducts, setSearchByCategory } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detecta el scroll para cambiar el fondo de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full py-5 px-8 text-sm font-light z-10 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Sección izquierda */}
      <ul className="flex items-center gap-3">
        <li className="font-bold text-lg leading-none">
          <NavLink to="/" onClick={() => setSearchByCategory()}>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/men-clothes"
            onClick={() => setSearchByCategory("men's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Man Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/women-clothes"
            onClick={() => setSearchByCategory("women's clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Women Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelery"
            onClick={() => setSearchByCategory("jewelery")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelery
          </NavLink>
        </li>
      </ul>

      {/* Sección derecha */}
      <ul className="flex items-center gap-3">
        <li className="text-black/40">jorge@email.com</li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sign In
          </NavLink>
        </li>
        <li>🛒 {cartProducts?.length}</li>
      </ul>
    </nav>
  );
};
