import { getTodayDate } from "../../utils/getTodayDate";

export const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;
  let textToRender =
    totalProducts > 1 ? `${totalProducts} Items` : `${totalProducts} Item`;

  return (
    <div className="flex justify-between item-center">
      <p className="flex flex-col">
        <span>{getTodayDate()}</span>
        <span>{textToRender}</span>
        <span>Total Price: $ {totalPrice}</span>
      </p>
    </div>
  );
};
