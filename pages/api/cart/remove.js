// /api/cart/remove.js
import connectDb from '../../../lib/dbConnect';
import Cart from '../../../model/cart.model';

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    // Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.quantity * 10, // Replace with dynamic price retrieval logic
      0
    );

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
