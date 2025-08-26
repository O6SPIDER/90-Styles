import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoreLayout from "../../components/StoreLayout";
import ProductDetails from "../../components/store/ProductDetails";
import { productsData } from "../../data/products";


const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const product = useMemo(
    () => productsData.find((p) => p.id === productId),
    [productId]
  );

  const handleCartToggle = () => {
    // Optional: actual cart toggle logic
    console.log("Cart toggled");
  };

  const handleSearch = (term: string) => {
    // Optional: implement search logic
    console.log("Search term:", term);
  };

  // Props for StoreLayout
  const layoutProps = {
    onSearch: handleSearch,
    onCartToggle: handleCartToggle,
  };

  if (!product) {
    return (
      <StoreLayout {...layoutProps}>
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout {...layoutProps}>
      <ProductDetails product={product} />
    </StoreLayout>
  );
};

export default ProductPage;
