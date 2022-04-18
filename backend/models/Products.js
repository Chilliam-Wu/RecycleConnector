const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // who posts this product
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

  image: {
    type: String,
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
});

module.exports = Products = mongoose.model('Products', productSchema);
