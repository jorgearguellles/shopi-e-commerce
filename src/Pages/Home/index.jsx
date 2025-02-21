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
          data-testid="search-form"
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
      <div className="flex justify-center">
        <div
          className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                  w-full max-w-screen-lg mx-auto mt-8 sm:mt-10 px-4 sm:px-0"
        >
          {renderView()}
        </div>
      </div>
      {/* Product details component (could show details of selected item) */}
      <ProductDetail />
    </Layout>
  );
};
