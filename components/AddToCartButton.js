import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

const AddToCartButton = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = async() => {
    await addToCart(productId, quantity);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="w-16 px-2 py-1 border border-gray-300 rounded"
        min="1"
      />
      <button
        onClick={handleAddToCart}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
