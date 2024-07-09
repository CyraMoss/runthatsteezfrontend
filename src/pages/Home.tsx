import React from 'react';
import ProductCard from '../components/ProductCard';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
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
              <ProductCard
                id={1}
                image="https://via.placeholder.com/150"
                name="Product 1"
                price={19.99}
              />
              <ProductCard
                id={2}
                image="https://via.placeholder.com/150"
                name="Product 2"
                price={29.99}
              />
              <ProductCard
                id={3}
                image="https://via.placeholder.com/150"
                name="Product 3"
                price={39.99}
              />
              <ProductCard
                id={4}
                image="https://via.placeholder.com/150"
                name="Product 4"
                price={49.99}
              />
              <ProductCard
                id={5}
                image="https://via.placeholder.com/150"
                name="Product 5"
                price={59.99}
              />
            </div>
          </div>
            <ProductList/>
        </section>
      </main>
      <footer className="bg-white w-full py-6 shadow-md text-center">
        <p>&copy; 2024 RunThatSteez. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
