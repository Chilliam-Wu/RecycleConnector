const express = require('express');
const verify = require('../../middleware/verify');
const router = express.Router();
const Products = require('../../models/Products');
const User = require('../../models/User');

//@route       GET api/posts/:id
//@desc        Get Posted Products By Certain User
//@access      Private
router.get('/', verify, async (req, res) => {
  try {
    let allProducts = await Products.find().all();
    let products = allProducts.filter(
      (product) => product.userInfo.user.toString() === req.user.id
    );
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
