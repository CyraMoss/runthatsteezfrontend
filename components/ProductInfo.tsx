"use client";
import React, { useState } from "react";
import { createProduct } from "../services/productService";
import { Product } from "../types/product";

const ProductInfo: React.FC = () => {
  const [product, setProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    description: "",
    mainImage: "",
    additionalImages: [],
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    material: "",
    stock: 0,
    ratings: [],
    numReviews: 0,
    averageRating: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const createdProduct = await createProduct(product);
      console.log("Product created:", createdProduct);
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        placeholder="Price"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleInputChange}
        placeholder="Description"
      ></textarea>
      <input
        type="text"
        name="mainImage"
        value={product.mainImage}
        onChange={handleInputChange}
        placeholder="Main Image URL"
      />
      {/* Additional inputs for additionalImages, category, brand, sizes, colors, material, stock */}
      <button onClick={handleCreateProduct}>Create Product</button>
    </div>
  );
};

export default ProductInfo;
