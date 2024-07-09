import { NextRequest, NextResponse } from 'next/server';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../../../services/productService';

export async function GET(req: NextRequest) {
    try {
        const products = await getAllProducts();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get products', error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const product = await createProduct(await req.json());
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create product', error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
        }
        const product = await updateProduct(id, await req.json());
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update product', error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
        }
        const success = await deleteProduct(id);
        if (!success) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete product', error }, { status: 500 });
    }
}
