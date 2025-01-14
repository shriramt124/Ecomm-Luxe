import connectDb from '../../../lib/dbConnect';
import Cart from '../../../model/cart.model';

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear all products from the cart
    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
