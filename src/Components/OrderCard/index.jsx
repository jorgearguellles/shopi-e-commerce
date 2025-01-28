export const OrderCard = (props) => {
  const { title, price, image } = props;

  return (
    <div className="flex justify-between item-center mb-4 border-black">
      <div className="flex item-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={image}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light mx-10">{title}</p>
      </div>
      <div className="flex item-center gap-2">
        <p className="text-lg font-semibold ">$ {price}</p>
      </div>
    </div>
  );
};
