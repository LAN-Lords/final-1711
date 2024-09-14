const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password for security
  role: { 
    type: String, 
    enum: ['superadmin', 'departmentadmin'], // Define roles
    required: true 
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: function() { return this.role === 'departmentadmin'; } // Required only for department admins
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
