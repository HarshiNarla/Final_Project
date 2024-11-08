const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Render login page
router.get('/', (req, res) => {
  res.render('login'); // Ensure you have a login.pug file
});

// Handle login
router.post('/', async (req, res) => {
  const { signupEmail, signupPassword } = req.body;

  try {
    const user = await User.findOne({ signupEmail });
    if (!user) {
      return res.status(401).render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(signupPassword, user.signupPassword);
    if (!isMatch) {
      return res.status(401).render('login', { error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/user/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('login', { error: 'Server error' });
  }
});

module.exports = router;