const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('user/dashboard', {
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.signupEmail,
      userPhone: user.phone,
      userLocation: user.location || 'Not provided',
      userFavoriteDestination: user.favoriteDestination || 'Unknown',
      userTrips: user.trips && user.trips.length > 0 ? user.trips.join(', ') : 'None',
      userMemberSince: user.memberSince
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;