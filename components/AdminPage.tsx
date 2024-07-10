'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createProduct } from '../services/productService';

const AdminPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    mainImage: '',
    additionalImages: [],
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    material: '',
    stock: 0,
    ratings: [],
    numReviews: 0,
    averageRating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product);
      alert('Product created successfully!');
      router.push('/products');
    } catch (error) {
      alert('Failed to create product.');
    }
  };

  if (!session || session.user?.role !== 'ADMIN') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="mainImage" value={product.mainImage} onChange={handleChange} placeholder="Main Image URL" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" required />
        <input type="text" name="sizes" value={product.sizes} onChange={handleChange} placeholder="Sizes" required />
        <input type="text" name="colors" value={product.colors} onChange={handleChange} placeholder="Colors" required />
        <input type="text" name="material" value={product.material} onChange={handleChange} placeholder="Material" required />
        <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminPage;
