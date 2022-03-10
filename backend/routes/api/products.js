const express = require('express');
const verify = require('../../middleware/verify');
const router = express.Router();
const Products = require('../../models/Products');
const User = require('../../models/User');

//@route       POST api/products
//@desc        Add Products
//@access      Private
router.post('/', verify, async (req, res) => {
  const { image, name, category, price, description, views } = req.body;
  try {
    const user = await User.findById(req.user.id).select('-password');
    const { id: user_id, username: user_name, avatar: user_avatar } = user;

    const co_user = {
      user: user_id,
      username: user_name,
      avatar: user_avatar,
    };

    const newProduct = new Products({
      image,
      name,
      category,
      price,
      description,
      views,
    });

    newProduct.userInfo = co_user;
    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//@route       GET api/products
//@desc        Get All Products
//@access      Public
router.get('/', async (req, res) => {
  try {
    const products = await Products.find().all();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
