const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Define the dashboard route, assuming it will redirect to the main app's '/dashboard' route
router.get('/dashboard', (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;