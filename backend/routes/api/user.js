const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../../models/User');
const authenticateToken = require('../../middleware/authenticateToken');
const admins = require('../../constant/admins');

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a vaild email').isEmail(),
  check('password', 'please enter a password at least 6 characters').isLength({
    min: 6
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({ message: 'User registered successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Error registering user' });
    }
  }
);

// @route   POST api/user/login
// @desc    Autenticate user & get token
// @access  Public
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      let isAdmin = false;
      admins.forEach((admin) => {
        if (email === admin.email && password === admin.password) {
          user = admin;
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: isAdmin
        }
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET api/user/profile
// @desc    Get user profile
// @access  Public
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // The user info is attached to the request object by the middleware
    const user = req.user;
    console.log('User: ', user);
    res.json({
      user: user
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
