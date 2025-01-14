import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active',
  },
}, { timestamps: true });

const Cart = mongoose.models.Cart||mongoose.model('Cart', cartSchema);

export default Cart;
