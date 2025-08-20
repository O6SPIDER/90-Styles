import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoreLayout from "../../components/StoreLayout";
import ProductDetails from "../../components/store/ProductDetails";
import { productsData } from "../../data/products";
import { useCart } from "../../hooks/useCart";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const productId = Number(id);

  const product = useMemo(
    () => productsData.find((p) => p.id === productId),
    [productId]
  );

  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1);
    setCartCount((c) => c + 1);
  };

  const handleCartToggle = () => {
    // You can implement actual cart toggle logic here
    console.log("Cart toggled");
  };

  const handleSearch = (term: string) => {
    // You can implement actual search logic here
    console.log("Search term:", term);
  };

  const layoutProps = {
    cartCount,
    onCartToggle: handleCartToggle,
    onSearch: handleSearch,
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
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </StoreLayout>
  );
};

export default ProductPage;