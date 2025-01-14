import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import AddToCartButton from '@/components/AddToCartButton';

function ProductCard({ product }) {
    const { user } = useContext(AuthContext);

    return (
         
            <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
            <div className="relative">
                <Link href={`/product/${product._id}`} passHref> 
                    <img
                        src={product.images[0]} // Display the first image
                        alt={product.name}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                    <span className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {product.category}
                    </span>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                        ❤️
                    </button>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        {product.description.split(' ').slice(0, 10).join(' ')}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">
                            ${product.price.toLocaleString()}
                        </span>
                        {product.stock > 0 ? (
                            
                                <AddToCartButton productId={product._id} />
                            
                        ) : (
                            <span className="text-red-500 text-sm font-medium">
                                Out of Stock
                            </span>
                        )}
                    </div>
                </div>
            </div>
        
    );
}

export default ProductCard;
