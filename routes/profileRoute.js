const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to users.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

// POST route for updating profile
router.post('/api/updateProfile', ensureAuthenticated, (req, res) => {
    const email = req.session.userId;
    const { userName, userEmail, userPhone, userLocation, userTrips, userFavoriteDestination } = req.body;

    // Read the users.json file
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading user data' });
        }

        let users = JSON.parse(data);
        let user = users.find(u => u.email === email);

        if (user) {
            // Update user details
            user.name = userName;
            user.email = userEmail;
            user.phone = userPhone;
            user.location = userLocation;
            user.trips = userTrips;
            user.favoriteDestination = userFavoriteDestination;

            // Write updated data back to users.json
            fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ success: false, message: 'Error saving user data' });
                }

                res.json({ success: true, message: 'Profile updated successfully' });
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

module.exports = router;
