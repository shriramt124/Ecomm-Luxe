import Product from '@/model/product.model';
import connectDb from '@/lib/dbConnect';
import Cart from '@/model/cart.model';
 

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, productId, quantity } = req.body;

  console.log('Adding to cart:', { userId, productId, quantity }); // Debugging line

  try {
    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find(item => item.productId.toString() === productId);

    if (existingProduct) {
      // Update quantity if the product already exists
      existingProduct.quantity += quantity;
    } else {
      // Add new product to the cart
      cart.products.push({ productId, quantity });
    }

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
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
