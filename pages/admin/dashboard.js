import React, { useState, useEffect, useCallback } from 'react';
import { Users, Package, Plus, Trash2, Edit, Search } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductModal from '@/components/ProductModal';
import debounce from 'lodash/debounce';
 
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load more state
  const [productsPerPage] = useState(6);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Search state with controlled input
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 2000),
    []
  );

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  // Separate effect for products to handle search
  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    setDisplayedProducts(products.slice(0, productsPerPage));
    setHasMore(products.length > productsPerPage);
  }, [products, productsPerPage]);

  const loadMoreProducts = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = products.slice(
      currentLength,
      currentLength + productsPerPage
    );
    setDisplayedProducts([...displayedProducts, ...nextProducts]);
    setHasMore(currentLength + productsPerPage < products.length);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        limit: 1000000
      });

      const response = await fetch(`/api/product?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch('/api/admin/users', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) throw new Error('Failed to delete user');
        setUsers(users.filter((user) => user._id !== userId));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/product/${productId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        setProducts(products.filter((product) => product._id !== productId));
        setDisplayedProducts(displayedProducts.filter((product) => product._id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleProductSubmit = async (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        productData[key].forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, productData[key]);
      }
    });

    try {
      const url = editingProduct
        ? `/api/product/${editingProduct._id}`
        : '/api/product';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error(`Failed to ${editingProduct ? 'update' : 'create'} product`);

      const result = await response.json();

      if (editingProduct) {
        setProducts(products.map(p =>
          p._id === editingProduct._id ? result : p
        ));
        setDisplayedProducts(displayedProducts.map(p =>
          p._id === editingProduct._id ? result : p
        ));
        toast.success('Product updated successfully');
      } else {
        setProducts([...products, result]);
        setDisplayedProducts([...displayedProducts, result]);
        toast.success('Product created successfully');
      }

      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const SearchBar = () => (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchInput}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        placeholder="Search products..."
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
          debouncedSearch(value);
        }}
      />
    </div>
  );

  const ProductManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Package className="mr-3 text-purple-600" />
          Product Management
        </h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsProductModalOpen(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      <SearchBar />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-center p-4">
                  {/* Product image */}
                  <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Product details */}
                  <div className="flex-grow sm:ml-4 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-purple-600 font-semibold">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More button */}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMoreProducts}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 mt-[100px] bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <nav className="flex space-x-4 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${activeTab === 'users'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            <Users className="inline w-5 h-5 mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${activeTab === 'products'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            <Package className="inline w-5 h-5 mr-2" />
            Products
          </button>
        </nav>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Users className="mr-3 text-purple-600" />
            User Management
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'products' && <ProductManagement />}

      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onSubmit={handleProductSubmit}
          editingProduct={editingProduct}
          fetchProducts={fetchProducts}
        />
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdminPage;