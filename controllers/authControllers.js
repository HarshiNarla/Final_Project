const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  console.log('Login attempt:', req.body);
  const { signupEmail, signupPassword } = req.body;

  try {
    const user = await User.findOne({ signupEmail });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found');
      return res.status(401).render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(signupPassword, user.signupPassword);
    console.log('Password match:', isMatch ? 'Yes' : 'No');
    
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).render('login', { error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token created');
    
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Set maxAge to 1 hour
    console.log('Cookie set, redirecting to dashboard');
    
    return res.redirect('/user/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('login', { error: 'Server error' });
  }
};

exports.getDashboard = async (req, res) => {
  console.log('GetDashboard called, user:', req.user);
  try {
    const user = await User.findById(req.user.id);
    console.log('User found for dashboard:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found for dashboard');
      return res.status(404).send('User not found');
    }
    
    console.log('Rendering dashboard');
    res.render('user/dashboard', {
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.signupEmail,
      userPhone: user.phone,
      userLocation: user.location || 'Not provided',
      userFavoriteDestination: user.favoriteDestination || 'Unknown',
      userTrips: user.trips && user.trips.length > 0 ? user.trips.join(', ') : 'None',
      userMemberSince: user.createdAt
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).send('Server error');
  }
};