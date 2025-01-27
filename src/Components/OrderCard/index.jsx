import { useContext } from "react";
import { ShopContext } from "../../Context";

export const OrderCard = (props) => {
  const { title, price, image, id } = props;
  const { removeProductFromCart } = useContext(ShopContext);

  return (
    <div className="flex justify-between item-center mb-4">
      <div className="flex item-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={image}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex item-center gap-2">
        <p className="text-lg font-semibold ">{price}</p>
        <div
          className="cursor-pointer flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 hover:bg-blue-100"
          onClick={() => removeProductFromCart(id)}
        >
          X
        </div>
      </div>
    </div>
  );
};
