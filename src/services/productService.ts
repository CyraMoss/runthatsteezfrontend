// src/services/productService.ts

export async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    return products;
}

export async function fetchProductById(id: string) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const product = await response.json();
    return product;
}

export async function createProduct(product: { name: string; price: number; description: string; mainImage: string; additionalImages: string[]; category: string; brand: string; sizes: string[]; colors: string[]; material: string; stock: number; }) {
    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    return await response.json();
}
