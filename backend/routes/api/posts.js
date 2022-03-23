const express = require('express');
const verify = require('../../middleware/verify');
const router = express.Router();
const Products = require('../../models/Products');

//@route       GET api/posts
//@desc        Get Posted Products By Certain User
//@access      Private
router.get('/', verify, async (req, res) => {
  try {
    const allProducts = await Products.find().all();
    const products = allProducts.filter(
      (product) => product.userInfo.user.toString() === req.user.id
    );
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//@route       POST api/posts/:id
//@desc        Edit Posted Products By Certain User
//@access      Private
router.post('/edit/:id', verify, async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  try {
    const allProducts = await Products.find().all();
    const product = allProducts
      .filter((product) => product.userInfo.user.toString() === req.user.id)
      .filter((post) => post._id.toString() === id)[0];

    product.name = name;
    product.price = price;
    product.category = category;

    await product.save();
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
