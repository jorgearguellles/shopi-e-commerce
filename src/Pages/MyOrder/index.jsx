import { useContext } from "react";
import { ShopContext } from "../../Context";
import { Layout } from "../../Components/Layout";
import { OrderCard } from "../../Components/OrderCard";
import { Link } from "react-router-dom";

export const MyOrder = () => {
  const { order } = useContext(ShopContext);
  const currentPath = window.location.pathname;
  let orderIndex = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (orderIndex === "last") orderIndex = order?.length - 1;

  return (
    <Layout>
      <div className="flex justify-center w-80 items-center relative pb-6">
        <Link
          className="h-6 w-10 font-semibold absolute left-0 "
          to="/my-orders"
        >
          <span className="flex justify-center items-center bg-white w-7 h-7 rounded-full m-2 p-1 hover:bg-blue-100">
            {" "}
            {"<<"}{" "}
          </span>
        </Link>
        <h1>My Order</h1>
      </div>

      <div className="flex flex-col w-90">
        {order?.[orderIndex]?.products.map((product) => {
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
    </Layout>
  );
};
