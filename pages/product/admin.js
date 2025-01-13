import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      await fetchUsers();
    }
    const fetchProductssData = async () => {
      await fetchProducts();
    }
    if (activeTab === 'users') {
      fetchUsersData();
    } else if (activeTab === 'products') {
      fetchProductssData();
    }

  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError('Failed to fetch products');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      setError('Failed to delete product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Admin Panel</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Product Management
        </button>
      </div>
      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">User List</h2>
          <ul className="bg-white shadow-md rounded-lg p-4 mt-4">
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center mb-2">
                <span className="text-gray-800">{user.username} ({user.email})</span>
                <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:underline">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === 'products' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <ul className="bg-white shadow-md rounded-lg p-4 mt-4">
            {products.length > 0 && products.map((product) => (
              <li key={product._id} className="flex justify-between items-center mb-2">
                <span className="text-gray-800">{product.name} - ${product.price}</span>
                <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:underline">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
