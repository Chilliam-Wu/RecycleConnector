const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // who posts this product
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
