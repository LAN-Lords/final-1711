const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); // Adjust path to your model

router.post('/submit-complaint', async (req, res) => {
    try {
        const {userId, trainNo, pnrNo, coachNo, seatNo } = req.body;

        if (!trainNo || !coachNo ) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Create a new complaint
        const newComplaint = new Complaint({
            userId,
            trainNo,
            pnrNo,
            coachNo,
            seatNo,

        });

        // Save to MongoDB
        const savedComplaint = await newComplaint.save();

        // Respond with success
        res.status(201).json({ message: 'Complaint submitted successfully', data: savedComplaint });
    } catch (error) {
        console.error('Error submitting complaint:', error);
        res.status(500).json({ message: 'Error submitting complaint', error });
    }
});

module.exports = router;
