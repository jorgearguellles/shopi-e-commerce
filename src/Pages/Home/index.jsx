// Importing necessary modules and components
import { useContext } from "react";
import { ShopContext } from "../../Context"; // Context to manage the shop state (e.g., search, filtered items)
import { Card } from "../../Components/Card"; // Card component to display individual products
import { Layout } from "../../Components/Layout"; // Layout component for consistent page structure
import { ProductDetail } from "../../Components/ProductDetail"; // ProductDetail component for showing more info about a product

// Home component to render the main page of the shop
export const Home = () => {
  // Extracting values from the ShopContext using useContext hook
  const { searchByTitle, setSearchByTitle, filteredItems } =
    useContext(ShopContext);

  // Handles changes in the search input field
  const handleChange = (event) => {
    setSearchByTitle(event.target.value); // Update the search query as the user types
  };

  // Handles form submission (search)
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the page from refreshing on form submission
    setSearchByTitle(""); // Reset the search input field when the search button is clicked
  };

  // Function to render the filtered items or a message if no items are found
  const renderView = () => {
    // Check if there are any filtered items to display
    if (filteredItems?.length > 0) {
      // Map through filtered items and render a Card for each
      return filteredItems?.map((item) => {
        return <Card key={item.id} productInfo={item} />;
      });
    } else {
      // If no items found, display a message
      return <div>We do not find any product</div>;
    }
  };

  return (
    <Layout>
      {" "}
      {/* Wrapper component for consistent page layout */}
      <div className="flex justify-center items-center w-650">
        {/* Search form */}
        <form
          onSubmit={handleSearch} // Trigger the search handler on form submission
          className="flex px-4 py-2 bg-white rounded-full shadow-md w-650"
        >
          {/* Input field for search query */}
          <input
            type="text"
            value={searchByTitle} // Bind input value to the state
            onChange={handleChange} // Update the state when input changes
            placeholder="Find your product"
            className="w-full p-2 text-lg text-gray-700 bg-transparent focus:outline-none rounded-full"
          />
          {/* Submit button (magnifying glass) */}
          <button
            type="submit"
            className="ml-4 p-2 text-lg text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            🔍
          </button>
        </form>
      </div>
      {/* Grid layout for displaying filtered items */}
      <div className="grid gap-10 grid-cols-4 w-full max-w-screen-lg mt-10">
        {renderView()} {/* Render the filtered items or a message */}
      </div>
      {/* Product details component (could show details of selected item) */}
      <ProductDetail />
    </Layout>
  );
};

// import { useContext } from "react";
// import { ShopContext } from "../../Context"; // Adjust the path as necessary
// import { Card } from "../../Components/Card";
// import { Layout } from "../../Components/Layout";
// import { ProductDetail } from "../../Components/ProductDetail";

// export const Home = () => {
//   const { searchByTitle, setSearchByTitle, filteredItems } =
//     useContext(ShopContext);

//   const handleChange = (event) => {
//     setSearchByTitle(event.target.value);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     setSearchByTitle("");
//   };

//   const renderView = () => {
//     if (filteredItems?.length > 0) {
//       return filteredItems?.map((item) => {
//         return <Card key={item.id} productInfo={item} />;
//       });
//     } else {
//       return <div>We do not find any product</div>;
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex justify-center items-center w-650">
//         <form
//           onSubmit={handleSearch}
//           className="flex px-4 py-2 bg-white rounded-full shadow-md w-650"
//         >
//           <input
//             type="text"
//             value={searchByTitle}
//             onChange={handleChange}
//             placeholder="Find your product"
//             className="w-full p-2 text-lg text-gray-700 bg-transparent focus:outline-none rounded-full"
//           />
//           <button
//             type="submit"
//             className="ml-4 p-2 text-lg text-blue-600 hover:text-blue-800 focus:outline-none"
//           >
//             🔍
//           </button>
//         </form>
//       </div>
//       <div className="grid gap-10 grid-cols-4 w-full max-w-screen-lg mt-10">
//         {renderView()}
//       </div>
//       <ProductDetail />
//     </Layout>
//   );
// };
