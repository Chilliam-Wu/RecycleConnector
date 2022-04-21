const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const verify = require('../../middleware/verify');
const User = require('../../models/User');
const Products = require('../../models/Products');
const Cart = require('../../models/Cart');

// SET STORAGE
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'upload/avatars');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname + '-' + Date.now());
//   },
// });
// const upload = multer({ storage: storage });
// const upload = multer({ dest: 'upload/avatars' });
const upload = multer({ dest: 'upload/avatars' });

router.post('/', verify, upload.single('avatar'), async (req, res) => {
  // console.log(req.file, req.body);

  try {
    const user = await User.findById(req.user.id);
    const allProducts = await Products.find().all();
    const carts = await Cart.find().all();
    const products = allProducts.filter(
      (product) => product.userInfo.user.toString() === req.user.id
    );
    const cart = carts.filter(
      (item) => item.userInfo.user.toString() === req.user.id
    )[0];

    // get encoded avatar
    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64');
    const final_img = {
      contentType: req.file.mimetype,
      data: Buffer.from(encode_img, 'base64'),
    };

    // update
    if (products.length !== 0) {
      products.map((product) => (product.userInfo.avatar = final_img));
      products.forEach((product) => product.save());
    }
    user.avatar = final_img;
    cart.userInfo.avatar = final_img;

    // save
    await cart.save();
    await user.save();

    return res.status(200).json({ msg: 'Update successfully!' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
