import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FilterContext } from '@/contexts/FilterContext';
import { AuthContext } from '@/contexts/AuthContext';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';

function Header({ isScrolled = true, setIsMenuOpen, isMenuOpen }) {
  const router = useRouter();
  const { setSelectedFilters } = useContext(FilterContext);
  const { user, logout } = useContext(AuthContext);

  const handleNavigation = async (category) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      categories: [category],
    }));

    await router.push({
      pathname: '/product',
      query: {
        category,
        page: 1,
        search: '',
        minPrice: 0,
        maxPrice: 2000,
      },
    }, undefined, { shallow: true });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md text-black hover:text-grey-900' : 'bg-transparent text-white'}`}>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">

          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LUXE
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="text-sm lg:text-base text-gray-500 hover:text-purple-600 font-medium transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link href="/product/admin" className="text-sm lg:text-base text-gray-500 hover:text-purple-600 font-medium transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <span className="text-gray-500">{user.username}</span>
                <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </>

            ) : (
              <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 lg:w-6 lg:h-6" />
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
