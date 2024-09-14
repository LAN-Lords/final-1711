const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Transfer complaint to another department
router.post('/:id/transfer', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const { department } = req.body;

        // Find and update the complaint
        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { department },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint transferred successfully', complaint });
    } catch (error) {
        console.error('Error transferring complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/:id/report', async (req, res) => {
    try {
        const complaintId = req.params.id;

        // Find and update the complaint
        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { isArchived: true }, // Mark as archived or you can use another flag
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint reported as irrelevant successfully', complaint });
    } catch (error) {
        console.error('Error reporting complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
