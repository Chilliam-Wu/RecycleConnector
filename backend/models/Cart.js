const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // whose cart
  userInfo: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: {
      type: String,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
  },

  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      // image: {
      //   type: String,
      // },
      image: {
        data: Buffer,
        contentType: String,
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
      views: {
        type: Number,
      },
    },
  ],
});

module.exports = Cart = mongoose.model('Cart', cartSchema);
