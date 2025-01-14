import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Star } from 'lucide-react';

const ProductDetail = ({ product }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <Head>
        <title>{`${product.name} | Your Store Name`}</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen mt-[100px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex mb-8 text-gray-500 text-sm">
            <button
              onClick={() => router.push('/product')}
              className="hover:text-purple-600 transition-colors"
            >
              Products
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-600 p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-purple-500' : ''}`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.totalReviews} reviews</span>
                </div>

                <div className="text-3xl font-bold text-purple-600">${product.price.toFixed(2)}</div>
                <div className="prose prose-sm text-gray-500"><p>{product.description}</p></div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange('decrease')}
                        className="p-2 rounded-full hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange('increase')}
                        className="p-2 rounded-full hover:bg-gray-100"
                        disabled={quantity >= product.stock}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">{product.stock} items available</span>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                      <Heart className="w-6 h-6 text-gray-600" />
                    </button>
                    <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                      <Share2 className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">SKU</span>
                    <span className="font-medium text-gray-900">{product._id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600">Based on {product.totalReviews} reviews</span>
                    </div>
                    <div className="space-y-2">
                      {product?.reviews?.map((item) => (
                        <div key={item.stars} className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 w-20">
                            <span>{item.stars}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

export async function getStaticPaths() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; 
    const response = await fetch(`${baseUrl}/api/product`); // Updated endpoint
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const products = data.products;

    const paths = products.map(product => ({
      params: { id: product._id },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/product/${params.id}`); // Updated endpoint
    const data = await response.json();
    const product = data.product;

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
      revalidate: 60, // Add revalidation with a 60-second interval
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}
