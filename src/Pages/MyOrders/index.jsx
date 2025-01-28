import { useContext } from "react";
import { ShopContext } from "../../Context";
import { Layout } from "../../Components/Layout";
import { OrdersCard } from "../../Components/OrdersCard";
import { Link } from "react-router-dom";

export const MyOrders = () => {
  const { order } = useContext(ShopContext);

  return (
    <Layout>
      <div className="flex justify-center w-80 items-center relative mb-4">
        <h1>My Orders</h1>
      </div>
      {order.map((order, index) => {
        return (
          <Link to={`/my-orders/${index}`} key={index}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        );
      })}
    </Layout>
  );
};
