const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: { type: String, required: true, unique: true },  // E.g., 'Sanitation', 'Security'
    headName: { type: String, required: true },  // Head of the department
    headEmail: { type: String, required: true, unique: true },  // Department email for notifications
    assignedComplaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }], // All complaints assigned
    resolvedComplaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }], // Resolved complaints
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true // Each department must have one admin
      }
});

module.exports = mongoose.model('Department', departmentSchema);



