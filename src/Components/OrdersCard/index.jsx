import { getTodayDate } from "../../utils/getTodayDate";

export const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between item-center border border-black p-4 w-80 rounded-lg mb-4 relative">
      <p className="flex flex-col w-full">
        <span className="font-light">Date of purchase: {getTodayDate()}</span>
        <span className="font-light">Items: # {totalProducts}</span>
        <span className="font-medium text-l">Total Price: $ {totalPrice}</span>
      </p>
      <p className="flex justify-center items-center bg-white w-7 h-7 rounded-full m-2 p-1 hover:bg-blue-100">
        {">>"}
      </p>
    </div>
  );
};
