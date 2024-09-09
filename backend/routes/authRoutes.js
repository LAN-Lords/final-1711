const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require('dotenv').config();  

// Set up Nodemailer transport using environment variables
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Helper function to generate OTP
const generateOtp = () => otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { name, mobileNumber, email, password } = req.body;

  try {
    // Generate OTP
    const otp = generateOtp();
    const otpExpires = Date.now() + 300000; // OTP valid for 5 minutes

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobileNumber, email, password: hashedPassword, otp, otpExpires });
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Sign-up successful. Please verify your OTP.' });
  } catch (error) {
    res.status(500).json({ message: 'Error during sign-up', error });
  }
});

// Sign In Route
router.post('/signin', async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Sign-in successful. Please verify your OTP.', success:true,token });
  } catch (error) {
    res.status(500).json({ message: 'Error during sign-in', error });
  }
});

// Verify OTP Route
router.post('/verify-otp', async (req, res) => {
  const { mobileNumber, otp } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    // Validate OTP
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified!', success:true,token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }) });
  } catch (error) {
    res.status(500).json({ message: 'Error during OTP verification', error });
  }
});

module.exports = router;
