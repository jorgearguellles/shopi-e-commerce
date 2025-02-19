import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeftCircle } from "lucide-react";

export function NotFound() {
  // return <p>Not found</p>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-md"
      >
        <ShoppingBag size={64} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 mt-2">
          It looks like you are lost in fashion space.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          <ArrowLeftCircle size={20} /> Back to Shop
        </Link>
      </motion.div>
    </div>
  );
}
