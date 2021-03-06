const express = require('express');
const multer = require('multer');
const verify = require('../../middleware/verify');
const router = express.Router();
const Products = require('../../models/Products');
const fs = require('fs');
const User = require('../../models/User');

//@route       POST api/products
//@desc        Add Product or Post
//@access      Private
router.post('/', verify, async (req, res) => {
  const { name, category, price, description } = req.body;
  try {
    const user = await User.findById(req.user.id).select('-password');
    const { id: user_id, username: user_name, avatar: user_avatar } = user;

    const co_user = {
      user: user_id,
      username: user_name,
      avatar: user_avatar,
    };

    const newProduct = new Products({
      name,
      category,
      price,
      description,
    });

    newProduct.image = '';
    newProduct.views = 0;
    newProduct.userInfo = co_user;
    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//@route       POST api/products/:product_id
//@desc        Add Product or Post Image
//@access      Private
const upload = multer({ dest: 'upload/product_images' });

router.post(
  '/:id',
  verify,
  upload.single('product_image'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Products.findById(id);

      // get encoded image
      const img = fs.readFileSync(req.file.path);
      const encode_img = img.toString('base64');
      const final_img = {
        contentType: req.file.mimetype,
        data: Buffer.from(encode_img, 'base64'),
      };

      // update
      product.image = final_img;
      await product.save();

      return res.status(200).json({ msg: 'Upload image successfully!' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

//@route       DELETE api/products/:id
//@desc        Remove Certain Product or Post
//@access      Private
router.delete('/:id', verify, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    await product.delete();

    return res.status(200).json({ msg: 'Delete post successfully!' });
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

//@route       GET api/products/product/:id
//@desc        Get Certain Product
//@access      Public
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    product.views = product.views + 1;
    await product.save();
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

// //@route       POST api/products
// //@desc        Add Products
// //@access      Private
// router.post('/', verify, async (req, res) => {
//   const { image, name, category, price, description, views } = req.body;
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     const { id: user_id, username: user_name, avatar: user_avatar } = user;

//     const co_user = {
//       user: user_id,
//       username: user_name,
//       avatar: user_avatar,
//     };

//     const newProduct = new Products({
//       image,
//       name,
//       category,
//       price,
//       description,
//       views,
//     });

//     newProduct.userInfo = co_user;
//     await newProduct.save();
//     return res.json(newProduct);
//   } catch (error) {
//     return res.status(500).json({ msg: 'Server error' });
//   }
// });
