import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    addToCart({ id, image, name, price });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
