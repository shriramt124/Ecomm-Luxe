import React, { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ShoppingBag, Trash2, MinusCircle, PlusCircle, Loader2, ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const { cart, loading, fetchCart, clearCart,updateCart,removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [localQuantities, setLocalQuantities] = useState({});

 
  useEffect(() => {
    try {
        fetchCart();
    } catch (error) {
      console.log(error ,"from useEffect error")
      toast.error('Failed to fetch cart items');
    }
  }, []);

  useEffect(() => {
    if (cart?.products) {
      const quantities = {};
      cart.products.forEach(item => {
        quantities[item.productId._id] = item.quantity;
      });
      setLocalQuantities(quantities);
    }
  }, [cart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setIsUpdating(true);
      setLocalQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }));

      // Add your updateCart logic here
      await updateCart(productId, newQuantity);
      await fetchCart()

      toast.success('Cart updated successfully', {
        
        style:{width:"300px"}
      });
    } catch (error) {
      console.log(error)
      toast.error('Failed to update quantity');
      // Revert to previous quantity
      setLocalQuantities(prev => ({
        ...prev,
        [productId]: cart.products.find(p => p.productId._id === productId).quantity
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setIsUpdating(true);
      // Add your removeFromCart logic here
        await removeFromCart(productId);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.log(error,"froom remove item")
      toast.error('Failed to remove item', {
        className:"w-[200px] sm:w-[300px]"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        setIsUpdating(true);
        await clearCart();
        toast.success('Cart cleared successfully');
      } catch (error) {
        toast.error('Failed to clear cart');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen   flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-screen  flex flex-col bg-gray-50 items-center justify-center p-4">
        <div className="text-center space-y-6">
          <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
            Explore our products and find something you love!
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-[90px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <ShoppingBag className="w-8 h-8 mr-3 text-purple-600" />
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.products?.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex-1 min-w-0 mb-4 sm:mb-0">
                      <div className="flex items-center">
                        {item.productId?.images?.[0] && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <img
                              src={item.productId.images[0]}
                              alt={item.productId.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {item.productId.name}
                          </h2>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.productId.description}
                          </p>
                          <p className="text-purple-600 font-semibold mt-2">
                            ${(item.productId.price * localQuantities[item.productId._id]).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId._id, localQuantities[item.productId._id] - 1)}
                          disabled={isUpdating || localQuantities[item.productId._id] <= 1}
                          className="p-1 text-gray-500 hover:text-purple-600 disabled:opacity-50"
                        >
                          <MinusCircle className="w-6 h-6" />
                        </button>
                        <input
                          type="number"
                          value={localQuantities[item.productId._id] || 0}
                          onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.productId._id, localQuantities[item.productId._id] + 1)}
                          disabled={isUpdating}
                          className="p-1 text-gray-500 hover:text-purple-600 disabled:opacity-50"
                        >
                          <PlusCircle className="w-6 h-6" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId._id)}
                        disabled={isUpdating}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.products.length} items)</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleClearCart}
                    disabled={isUpdating}
                    className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Clear Cart
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    disabled={isUpdating}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CartPage;