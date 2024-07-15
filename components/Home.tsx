'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductList from '../components/ProductList';
import LoginButton from '../components/LoginButton';

interface Product {
  _id: string;
  name: string;
  price: number;
  mainImage: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://runthatsteez.vercel.app/product'); // Adjust the endpoint as needed
        console.log('Response from backend:', response); // Log the raw response
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data

        if (Array.isArray(data)) {
          setProducts(data);
          console.log('Products fetched');
        } else {
          setError('Fetched data is not an array');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Products state:', products); // Log the products state

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center pt-16">
      <header className="bg-white w-full py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">Welcome to RunThatSteez</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <section className="text-center my-12">
          <h2 className="text-2xl mb-4">Latest Collection</h2>
          <p className="mb-8">Check out our latest trendy clothes and accessories.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full">Shop Now</button>
        </section>
        <section className="my-12 w-full px-6">
          <h2 className="text-2xl mb-4">Featured Products</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 w-max">
              {Array.isArray(products) ? (
                products.map(product => (
                  <div key={product._id}>
                    <ProductCard
                      id={product._id}
                      mainImage={product.mainImage}
                      name={product.name}
                      price={product.price}
                    />
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
          <LoginButton/>
          <ProductList products={products} />
        </section>
      </main>
      <footer className="bg-white w-full py-6 shadow-md text-center">
        <p>&copy; 2024 RunThatSteez. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
