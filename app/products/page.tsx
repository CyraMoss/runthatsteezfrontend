'use client';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/product';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const products = await getAllProducts();
            setProducts(products);
        }
        loadProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    product._id && (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        mainImage={product.mainImage}
                    />
                    )
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
