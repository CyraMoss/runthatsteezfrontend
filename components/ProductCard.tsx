"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  mainImage: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  mainImage,
}) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    addToCart({ _id: id, mainImage, name, price });
  };

  console.log("Rendering ProductCard:", { id, name, price, mainImage }); // Log product details

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
      <Link href={`/product/${id}`} className="block">
        <Image
          src={mainImage}
          alt={name}
          className="w-full h-48 object-cover"
          width={64}
          height={64}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4">
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
