import React, { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:3000/products');
      const products = await response.json();
      setProducts(products);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
