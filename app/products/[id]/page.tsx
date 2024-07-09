'use client';
import React, { useState } from 'react';
import { createProduct } from '../../../services/productService';
import FileUpload from '../../../components/FileUpload';
import { Product } from '../../../types/product';

const ProductInfo: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [additionalImages, setAdditionalImages] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [material, setMaterial] = useState('');
    const [stock, setStock] = useState(0);

    const handleMainImageUpload = (url: string) => {
        setMainImage(url);
    };

    const handleAdditionalImageUpload = (url: string) => {
        setAdditionalImages([...additionalImages, url]);
    };

    const handleSubmit = async () => {
        const product: Product = {
            name,
            price,
            description,
            mainImage,
            additionalImages,
            category,
            brand,
            sizes,
            colors,
            material,
            stock,
            ratings: [],
            numReviews: 0,
            averageRating: 0,
        };

        try {
            const createdProduct = await createProduct(product);
            console.log('Product created:', createdProduct);
        } catch (error) {
            console.error('Failed to create product', error);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Main Image:</label>
                <FileUpload onUpload={handleMainImageUpload} />
            </div>
            <div>
                <label>Additional Images:</label>
                <FileUpload onUpload={handleAdditionalImageUpload} />
                {additionalImages.map((url, index) => (
                    <img key={index} src={url} alt={`Additional ${index + 1}`} />
                ))}
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <label>Brand:</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div>
                <label>Sizes:</label>
                <input type="text" value={sizes.join(', ')} onChange={(e) => setSizes(e.target.value.split(', '))} />
            </div>
            <div>
                <label>Colors:</label>
                <input type="text" value={colors.join(', ')} onChange={(e) => setColors(e.target.value.split(', '))} />
            </div>
            <div>
                <label>Material:</label>
                <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
            </div>
            <button onClick={handleSubmit}>Create Product</button>
        </div>
    );
};

export default ProductInfo;