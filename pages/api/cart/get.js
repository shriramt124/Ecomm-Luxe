import Product from '@/model/product.model';
import Cart from '@/model/cart.model';
import connectDb from '@/lib/dbConnect';


export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.query;

  console.log('Fetching cart for user:', userId); // Debugging line

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    console.log('Retrieved cart:', cart); // Debugging line

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

