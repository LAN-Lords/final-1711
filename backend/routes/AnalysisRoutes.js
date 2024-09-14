const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/complaintController'); // Adjust path to your controller

router.get('/dashboard', getDashboardData);

module.exports = router;
