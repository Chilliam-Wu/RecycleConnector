const express = require('express');
const verify = require('../../middleware/verify');
const router = express.Router();
const Cart = require('../../models/Cart');
const Products = require('../../models/Products');
const User = require('../../models/User');

//@route       POST api/carts/:id
//@desc        Add To Cart
//@access      Private
router.post('/:id', verify, async (req, res) => {
  const { id: product_id } = req.params;
  try {
    const carts = await Cart.find().all();
    const product = await Products.findById(product_id);
    const { id, image, name, category, price, description } = product;
    const co_product = {
      product: id,
      image,
      name,
      category,
      price,
      description,
    };

    // first time add to cart
    if (
      carts.length == 0 ||
      !carts.some((item) => item.userInfo.user.toString() === req.user.id)
    ) {
      const user = await User.findById(req.user.id).select('-password');
      const { id: user_id, username: user_name, avatar: user_avatar } = user;

      const co_user = {
        user: user_id,
        username: user_name,
        avatar: user_avatar,
      };

      const newCart = new Cart();
      newCart.userInfo = co_user;
      newCart.cartItems.push(co_product);
      await newCart.save();

      // return res.json(newCart);
    }
    // not the first time
    else {
      const cart = carts.filter(
        (item) => item.userInfo.user.toString() === req.user.id
      )[0];

      if (
        cart.cartItems.filter((item) => item.product.toString() === product_id)
          .length !== 0
      ) {
        return res
          .status(400)
          .json({ msg: 'Product has already been in the cart' });
      }

      cart.cartItems.push(co_product);
      await cart.save();

      // return res.json(cart);
    }

    return res.status(200).json({ msg: 'Add to cart successfully!' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//@route       Get api/carts
//@desc        Get User Cart
//@access      Private
router.get('/', verify, async (req, res) => {
  try {
    const carts = await Cart.find().all();
    const user_cart = carts.filter(
      (item) => item.userInfo.user.toString() === req.user.id
    )[0];

    return res.json(user_cart);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
