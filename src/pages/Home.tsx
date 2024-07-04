import React from 'react';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <header className="bg-white w-full py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">Welcome to RunThatSteez</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="text-center my-12">
          <h2 className="text-2xl mb-4">Latest Collection</h2>
          <p className="mb-8">Check out our latest trendy clothes and accessories.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full">Shop Now</button>
        </section>
        <section className="my-12">
          <h2 className="text-2xl mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              image="https://via.placeholder.com/150"
              name="Product 1"
              price="$19.99"
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              name="Product 2"
              price="$29.99"
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              name="Product 3"
              price="$39.99"
            />
          </div>
        </section>
      </main>
      <footer className="bg-white w-full py-6 shadow-md text-center">
        <p>&copy; 2024 RunThatSteez. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
