const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  // Destructure the incoming request body
  const { firstName, lastName, signupEmail, signupPassword, phone, location, favoriteDestination } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !signupEmail || !signupPassword || !phone || !location || !favoriteDestination) {
    return res.status(400).render('error', { message: 'All fields are required' });
  }

  try {
    // Check if a user with the same email already exists
    let user = await User.findOne({ signupEmail });
    if (user) {
      return res.status(400).render('error', { message: 'User with this email already exists' });
    }

    // Create a new user
    user = new User({
      firstName,
      lastName,
      signupEmail,
      signupPassword,
      phone,
      location,
      favoriteDestination
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    // Render the registration success template and pass the email
    res.status(201).render('reg_success', { 
      username: `${user.firstName} ${user.lastName}`,
      signupEmail: user.signupEmail  // Ensure this matches the Pug variable name
    });

  } catch (err) {
    console.error('Signup error:', err);

    // Handle specific errors like duplicate email
    if (err.code === 11000) {
      return res.status(400).render('error', { message: 'Email already exists. Please use a different email.' });
    }

    // Catch-all error handling for other server issues
    res.status(500).render('error', { message: 'Server error' });
  }
});

module.exports = router;