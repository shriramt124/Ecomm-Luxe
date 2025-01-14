import React, { useContext, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddToCartButton = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("please login to add product to cart")
       
      return;
    }
    await addToCart(productId, quantity);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="w-10 px-2 py-1 border border-gray-300 rounded "
        min="1"
      />
      <button
        onClick={handleAddToCart}
        className="px-2 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
