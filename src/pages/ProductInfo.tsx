import React from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Dummy data for demonstration
  const products = [
    { id: '1', name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150', description: 'Description for Product 1' },
    { id: '2', name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150', description: 'Description for Product 2' },
    { id: '3', name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150', description: 'Description for Product 3' },
    { id: '4', name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150', description: 'Description for Product 4' },
    { id: '5', name: 'Product 5', price: 59.99, image: 'https://via.placeholder.com/150', description: 'Description for Product 5' },
  ];

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto object-cover" />
        <div className="md:ml-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
