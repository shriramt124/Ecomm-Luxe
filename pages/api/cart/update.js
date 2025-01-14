import connectDb from '../../../lib/dbConnect';
import Cart from '../../../model/cart.model';
import Product from '../../../model/product.model';

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const existingProduct = cart.products.find(item => item.productId.toString() === productId);

    if (existingProduct) {
      // Update the quantity
      existingProduct.quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Fetch all products in the cart to get their prices
    const productIds = cart.products.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a map of product prices for quick lookup
    const productPriceMap = products.reduce((map, product) => {
      map[product._id.toString()] = product.price;
      return map;
    }, {});

    // Recalculate total price using the product price map
    cart.totalPrice = cart.products.reduce((total, item) => {
      const price = productPriceMap[item.productId.toString()];
      return total + (item.quantity * price);
    }, 0);

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
