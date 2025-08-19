import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div
      className="
        w-full max-w-6xl mx-auto
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        auto-rows-fr
        gap-4 sm:gap-6
        px-2 sm:px-4
      "
    >
      {products.map((product) => (
        <div key={product.id} className="w-full aspect-[3/4]">
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
