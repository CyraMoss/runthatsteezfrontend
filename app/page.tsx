"use client"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Products from '../components/Products';
import ProductInfo from '../components/ProductInfo';
import Cart from '../components/Cart';
import Navbar from '../components/NavBar';
import { CartProvider } from '../context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
