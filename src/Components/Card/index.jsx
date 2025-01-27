import { useContext } from "react";
import { ShopContext } from "../../Context";

export const Card = (productInfo) => {
  const { id, category, title, price, image, description } =
    productInfo.productInfo;
  const {
    openProductDetail,
    closeProductDetail,
    collectProductInfo,
    addProductToCart,
    openMyOrder,
    cartProducts,
  } = useContext(ShopContext);

  const showProduct = (productInfo) => {
    openProductDetail();
    collectProductInfo(productInfo);
  };

  const updateCounterAndProductsCart = (event, productInfo) => {
    event.stopPropagation();
    openMyOrder();
    addProductToCart(productInfo);
    closeProductDetail();
  };

  const renderIcon = ({ id, category, title, price, image, description }) => {
    const isInCart =
      cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-emerald-400 text-white w-6 h-6 rounded-full m-2 p-1 z-1">
          ✓
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 hover:bg-blue-100 z-1"
          onClick={(event) => {
            updateCounterAndProductsCart(event, {
              id,
              category,
              title,
              price,
              image,
              description,
            });
          }}
        >
          +
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg hover:shadow-xl shadow-blue-500/50"
      key={id}
      onClick={() =>
        showProduct({ id, category, title, price, image, description })
      }
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 backdrop-blur-sm bg-opacity-50">
          {category}
        </span>
        <img
          className="w-full h-full object-contain rounded-lg"
          src={image}
          alt={title}
        />
        {renderIcon({
          id,
          category,
          title,
          price,
          image,
          description,
        })}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light truncate">{title}</span>
        <span className="text-lg font-medium">${price}</span>
      </p>
    </div>
  );
};
