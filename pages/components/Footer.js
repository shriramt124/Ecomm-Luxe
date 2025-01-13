import React from 'react'
import Link from 'next/link';

function Footer() {
  return (
      <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <div>
                      <Link href="/" className="flex items-center mb-6">
                          <span className="text-2xl font-bold text-white">
                              LUXE
                          </span>
                      </Link>
                      <p className="mb-6">
                          Your destination for luxury fashion and accessories. Discover the latest trends and timeless classics.
                      </p>
                      <div className="flex space-x-4">
                          {['Facebook', 'Twitter', 'Instagram', 'Pinterest'].map((social) => (
                              <a
                                  key={social}
                                  href="#"
                                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                              >
                                  {/* Social icons can be added here */}
                              </a>
                          ))}
                      </div>
                  </div>

                  <div>
                      <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                      <ul className="space-y-4">
                          {['About Us', 'Contact Us', 'FAQs', 'Shipping Info', 'Returns', 'Track Order'].map((link) => (
                              <li key={link}>
                                  <a href="#" className="hover:text-white transition-colors">
                                      {link}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div>
                      <h3 className="text-white font-semibold text-lg mb-6">Categories</h3>
                      <ul className="space-y-4">
                          {['Women\'s Fashion', 'Men\'s Collection', 'Accessories', 'Footwear', 'Watches', 'Jewelry'].map((category) => (
                              <li key={category}>
                                  <a href="#" className="hover:text-white transition-colors">
                                      {category}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div>
                      <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
                      <ul className="space-y-4">
                          <li className="flex items-start">
                              <span className="mr-3">📍</span>
                              123 Luxury Avenue, Fashion District, NY 10001
                          </li>
                          <li className="flex items-start">
                              <span className="mr-3">📞</span>
                              +1 (234) 567-8900
                          </li>
                          <li className="flex items-start">
                              <span className="mr-3">✉️</span>
                              contact@luxe.com
                          </li>
                      </ul>
                  </div>
              </div>

              <div className="border-t border-gray-800 mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                      <p>&copy; 2025 LUXE. All rights reserved.</p>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                          <span>•</span>
                          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  )
}

export default Footer