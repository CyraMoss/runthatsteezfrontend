'use client';
import { CartContext } from '../context/CartContext';
import React, { useContext } from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  mainImage: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="flex space-x-4 w-max">
      {products.map(product => (
        <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden w-64">
          <Image 
          src={product.mainImage} 
            width={24}
            height={24} 
            alt={product.name} 
            className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
          <div className="p-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
