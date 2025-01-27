export const Layout = ({ children }) => {
  // return <div className="flex flex-col mt-20 items-center">{children}</div>;
  return (
    <div
      className="flex
        flex-col
        mt-20
        items-center
        sm:mt-10     /* Reduce el margen en pantallas pequeñas */
        md:mt-16     /* Ajusta el margen para pantallas medianas */
        lg:mt-20     /* Márgenes estándar para pantallas grandes */
        xl:mt-24     /* Incrementa el margen para pantallas extra grandes */
        sm:flex-row  /* Cambia a un diseño en fila en pantallas pequeñas */
        sm:justify-center
        sm:gap-4     /* Espacio entre elementos en pantallas pequeñas */"
    >
      {children}
    </div>
  );
};
