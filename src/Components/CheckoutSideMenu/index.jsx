import { useContext } from "react";
import { ShopContext } from "../../Context";
import { OrderCard } from "../../Components/OrderCard";

export const CheckoutSideMenu = () => {
  const { cartProducts, isMyOrderOpen, closeMyOrder, totalToPay } =
    useContext(ShopContext);

  const shouldShowMyOrder = () => (isMyOrderOpen ? "flex" : "hidden");

  return (
    <aside
      className={`${shouldShowMyOrder()} flex-col fixed right-0 top-[68px] w-[360px] h-[calc(100vh-68px)] bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">
          My Order: ${" "}
          <span className="underline"> {totalToPay(cartProducts)} </span>
        </h2>
        <div
          className="cursor-pointer flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 hover:bg-blue-100"
          onClick={() => closeMyOrder()}
        >
          X
        </div>
      </div>
      <div className="p-6 overflow-y-scroll">
        {cartProducts.map((product) => {
          return (
            <OrderCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              id={product.id}
            />
          );
        })}
      </div>
    </aside>
  );
};
