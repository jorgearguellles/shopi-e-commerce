import { useContext } from "react";
import { ShopContext } from "../../Context";

export const Card = ({ productInfo }) => {
  const { id, category, title, price, image } = productInfo;
  const {
    openProductDetail,
    closeProductDetail,
    collectProductInfo,
    addProductToCart,
    openMyOrder,
    cartProducts,
  } = useContext(ShopContext);

  // Show product details
  const showProduct = () => {
    openProductDetail();
    collectProductInfo(productInfo);
  };

  // Add product to cart and update UI
  const handleAddToCart = (event) => {
    event.stopPropagation();
    openMyOrder();
    addProductToCart(productInfo);
    closeProductDetail();
  };

  // Render the cart icon based on whether the product is in the cart
  const renderCartIcon = () => {
    const isInCart = cartProducts.some((product) => product.id === id);

    return isInCart ? (
      <div className="absolute top-0 right-0 flex justify-center items-center bg-emerald-400 text-white w-6 h-6 rounded-full m-2 p-1 z-1">
        ✓
      </div>
    ) : (
      <div
        className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 hover:bg-blue-100 z-1"
        onClick={handleAddToCart}
      >
        +
      </div>
    );
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg hover:shadow-xl shadow-blue-500/50"
      key={id}
      onClick={showProduct}
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
        {renderCartIcon()}
      </figure>
      <p className="flex justify-between items-center">
        <span className="text-sm font-light truncate">{title}</span>
        <span className="text-lg font-medium">${price}</span>
      </p>
    </div>
  );
};
