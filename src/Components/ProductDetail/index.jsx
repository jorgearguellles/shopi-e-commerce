import { useContext } from "react";
import { ShopContext } from "../../Context";

export const ProductDetail = () => {
  const { closeProductDetail, isProductDetailOpen, productToShow } =
    useContext(ShopContext);

  const { title, price, image, description } = productToShow;

  const shouldShowAside = () => (isProductDetailOpen ? "flex" : "hidden");

  return (
    <aside
      className={`${shouldShowAside()} flex-col fixed right-0 top-[68px] w-[360px] h-[calc(100vh-68px)] bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Product Detail</h2>
        <div
          className="cursor-pointer flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 hover:bg-blue-100"
          onClick={() => closeProductDetail()}
        >
          X
        </div>
      </div>
      <figure className="px-6 flex flex-col overflow-y-auto">
        <img className="w-full h-full rounded-lg" src={image} alt={title} />
        <p className="flex flex-col p-6">
          <span className="font-medium text-2xl mb-4">${price}</span>
          <span className="font-medium text-md mb-2">{title}</span>
          <span className="font-light text-sm">{description}</span>
        </p>
      </figure>
    </aside>
  );
};
