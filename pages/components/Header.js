import React from 'react'
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X, Heart, ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react';
function Header({isScrolled=true, setIsMenuOpen, isMenuOpen}) {
  return (
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                  {/* Logo */}
                  <Link href="/" className="flex items-center">
                      <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          LUXE
                      </span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
                      {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
                          <Link
                              key={item}
                              href="#"
                              className="text-sm text-blue-400 lg:text-base text-gray-800 hover:text-purple-600 font-medium transition-colors"
                          >
                              {item}
                          </Link>
                      ))}
                  </nav>

                  {/* Desktop Right Section */}
                  <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <Search className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <User className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                          <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              3
                          </span>
                      </button>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                      className="md:hidden p-2"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
              </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden bg-white border-t">
                  <div className="container mx-auto px-4 py-4">
                      <div className="flex flex-col space-y-3">
                          {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
                              <Link
                                  key={item}
                                  href="#"
                                  className="text-gray-800 hover:text-purple-600 font-medium py-2"
                              >
                                  {item}
                              </Link>
                          ))}
                      </div>
                      <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                              <Search className="w-6 h-6" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                              <User className="w-6 h-6" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                              <ShoppingCart className="w-6 h-6" />
                              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  3
                              </span>
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </header>
  )
}

export default Header