export const Layout = ({ children }) => {
  // return <div className="flex flex-col mt-20 items-center">{children}</div>;
  return (
    <div
      className="flex
        flex-col
        mt-20
        items-center"
    >
      {children}
    </div>
  );
};
