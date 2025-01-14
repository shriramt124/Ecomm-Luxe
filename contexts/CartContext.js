import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log('Fetching cart for user:', user._id); // Debugging line

    try {
      const response = await fetch(`/api/cart/get?userId=${user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch('/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, productId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Cart after removal:', data); // Debugging
      setCart(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };


  const updateCart = async (productId, quantity) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
