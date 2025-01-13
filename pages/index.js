// pages/index.jsx
import { useState } from 'react';
import Link from 'next/link';
import { Heart, ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { featuredProducts } from '@/utils/constants';

export default function HomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);





  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900">
        <div className="absolute inset-0 bg-black/30" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-cover bg-center animate-pulse"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e')"
            }}
          />
        </div>

        <div className="relative h-screen flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl mx-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Elevate Your Style
              <span className="block text-purple-300">Define Your Luxury</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-200">
              Discover our exclusive collection of premium fashion and accessories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-900 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-100 transition-colors">

                <Link href="/product">  Shop New Arrivals</Link>
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-purple-900 transition-all">
                View Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Discover our most exclusive and trending items
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-64 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                          {product.tag}
                        </span>
                        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                          <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                            <span className="ml-2 text-sm sm:text-base text-gray-600">{product.rating}</span>
                          </div>
                          <div className="ml-4 flex items-center text-gray-500">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="ml-1 text-sm sm:text-base">{product.sales} sold</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl sm:text-2xl font-bold text-purple-600">
                            {product.price}
                          </span>
                          <button className="px-4 sm:px-6 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-full hover:bg-purple-700 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </section>


      {/* Categories Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: 'Women\'s Fashion',
                count: '1.2k+ Products',
                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f'
              },
              {
                name: 'Men\'s Collection',
                count: '850+ Products',
                image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2'
              },
              {
                name: 'Accessories',
                count: '650+ Products',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
              },
              {
                name: 'Footwear',
                count: '450+ Products',
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772'
              },
              {
                name: 'Watches',
                count: '320+ Products',
                image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314'
              },
              {
                name: 'Jewelry',
                count: '280+ Products',
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
              },
            ].map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl h-64 sm:h-72 lg:h-80"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{category.name}</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{category.count}</p>
                  <button className="px-4 sm:px-6 py-2 bg-white text-gray-900 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-colors">
                    Explore Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="text-white lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Special Offer
                <span className="block text-purple-300">Save Up To 50%</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                Don't miss out on our biggest sale of the season. Limited time offer on selected items.
              </p>

              {/* Countdown timer with responsive sizing */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                {['12', '10', '45', '18'].map((num, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-2 sm:p-4 text-center backdrop-blur-sm">
                    <span className="block text-lg sm:text-2xl font-bold">{num}</span>
                    <span className="text-xs sm:text-sm">{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</span>
                  </div>
                ))}
              </div>

              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-900 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-100 transition-colors">
                Shop Now
              </button>
            </div>

            <div className="relative lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1549439602-43ebca2327af"
                alt="Special offer product"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-yellow-400 text-purple-900 rounded-full w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center text-center font-bold">
                <div>
                  <div className="text-xl sm:text-2xl">50%</div>
                  <div className="text-xs sm:text-sm">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 sm:p-12 lg:p-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Join Our Newsletter
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  Subscribe to get special offers, free giveaways, and exclusive deals.
                </p>
                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-purple-600"
                    />
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                  </p>
                </form>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                  alt="Newsletter"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      {/* Features Section */}
      {/* Responsive grid for feature cards */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: "Truck",
                title: "Free Shipping",
                description: "On orders over $100"
              },
              {
                icon: "Shield",
                title: "Secure Payment",
                description: "100% secure payment"
              },
              {
                icon: "RefreshCcw",
                title: "Easy Returns",
                description: "30 days return policy"
              },
              {
                icon: "Headphones",
                title: "24/7 Support",
                description: "Dedicated support"
              }
            ].map((feature) => (
              <div key={feature.title} className="text-center p-4 sm:p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-100 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600">
                    {/* Icon placeholder */}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      {/* Responsive grid for Instagram posts */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              @LUXE on Instagram
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Follow us for the latest trends and behind-the-scenes content
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {[
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
              'https://images.unsplash.com/photo-1483985988355-763728e1935b',
              'https://images.unsplash.com/photo-1485968579580-b6d095142e6e',
              'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2',
              'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
              'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe'
            ].map((url, i) => (
              <div key={i} className="relative group overflow-hidden">
                <img
                  src={url}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <a
              href="#"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-sm sm:text-base"
            >
              Follow Us on Instagram
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}

    </div>
  )
}