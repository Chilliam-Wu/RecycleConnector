const express = require('express');
// npm i gravatar bcryptjs jsonwebtoken
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../../models/User');
const verify = require('../../middleware/verify');

//@route       POST api/users/register
//@desc        Register User
//@access      Public
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // get user gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'rg',
      d: 'robohash',
    });

    user = new User({
      avatar,
      username,
      email,
      password,
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // generate a token
    const { _id: id } = user;
    const payload = {
      user: {
        id: id,
      },
    };
    jwt.sign(
      payload,
      config.get('secretKey'),
      { expiresIn: '30 days' },
      (error, token) => {
        if (error) throw error;
        user.token = token;
        return res.json({ user: { id, avatar, username, email, token } });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//@route       POST api/users/login
//@desc        Log in
//@access      Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Not authorized user
    if (!user) {
      return res.status(401).json({ msg: 'User does not exist' });
    }

    // check if password is matched
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ msg: 'Wrong password' });
    }

    // generate a token
    const { _id: id, avatar, username } = user;
    const payload = {
      user: {
        id: id,
      },
    };
    jwt.sign(
      payload,
      config.get('secretKey'),
      { expiresIn: '30 days' },
      (error, token) => {
        if (error) throw error;
        user.token = token;
        return res.json({ user: { id, avatar, username, email, token } });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

//@route       GET api/users/:id
//@desc        Get Certain User
//@access      Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { username, avatar } = user;

    return res.json({ user: { id, username, avatar } });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

//@route       PUT api/users/:id
//@desc        Edit Certain User
//@access      Private
router.put('/:id', verify, async (req, res) => {
  const { id: user_id } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findById(user_id);
    user.username = username;
    await user.save();

    // generate a token
    const { _id: id, avatar, email } = user;
    const payload = {
      user: {
        id: id,
      },
    };
    jwt.sign(
      payload,
      config.get('secretKey'),
      { expiresIn: '30 days' },
      (error, token) => {
        if (error) throw error;
        user.token = token;
        return res.json({ user: { id, avatar, username, email, token } });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});
