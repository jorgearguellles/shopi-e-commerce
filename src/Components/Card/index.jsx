import { useContext } from "react";
import { ShoppingCarContext } from "../../Context";

export const Card = (productInfo) => {
  const { id, category, title, price, images } = productInfo.productInfo;
  const { addProductToCar, openProductDetail, collectProductInfo } =
    useContext(ShoppingCarContext);

  const showProduct = (productInfo) => {
    openProductDetail();
    collectProductInfo(productInfo);
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      key={id}
      onClick={() => showProduct({ id, category, title, price, images })}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={images[0]}
          alt={title}
        />
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 hover:bg-blue-100"
          onClick={() => {
            addProductToCar();
          }}
        >
          +
        </div>
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{title}</span>
        <span className="text-lg font-medium">${price}</span>
      </p>
    </div>
  );
};
