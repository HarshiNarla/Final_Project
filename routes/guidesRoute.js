const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the user.json file
const usersFilePath = path.join(__dirname, '../data/guides.json');

// Middleware to handle registration form submission
router.post('/guides', (req, res, next) => {
    const { name, id, nativeplace, languages, places,age,rating,experience,imageSrc } = req.body;

    // Create a new user object
    const newUser = {
        name,
        id,
        nativeplace,  // Use "email" instead of "signupEmail" in the user object
        languages,  // "password" instead of "signupPassword" for clarity
        places,
        age,
        rating,
        experience,
        imageSrc
    };

    // Read the existing users from user.json
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            const error = new Error('Error reading user data');
            error.status = 500;
            return next(error); // Forward to error-handling middleware
        }

        let users = [];
        if (data) {
            users = JSON.parse(data); // Parse existing users
        }

        // Check if user already exists by email
        const existingUser = users.find(user => user.email === signupEmail); // Check against the correct email field
        if (existingUser) {
            const error = new Error('User with this email already exists');
            error.status = 400;
            return next(error); // Forward to error-handling middleware
        }

        // Add the new user to the array
        users.push(newUser);

        // Write the updated users array back to user.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                const error = new Error('Error saving user data');
                error.status = 500;
                return next(error); // Forward to error-handling middleware
            }
            // Render the success page with the user's first name
            res.render('registe_success', { name:name });
        });
    });
});

module.exports = router;