 // VerifyOtp.jsx
 import React, { useState } from 'react';
 import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 const VerifyOtp = () => {
   const [mobileNumber, setMobileNumber] = useState('');
   const [otp, setOtp] = useState('');
const navigate = useNavigate(); 

   const handleSubmit = async (e) => {
     e.preventDefault();

     try {
       const response = await axios.post('http://localhost:8001/auth/verify-otp', {
         mobileNumber,
         otp,
       });
      if (response.data.success) { // Assuming the response contains a success field
alert(response.data.message);
navigate('/');
     } }catch (error) {
       console.error('Error during OTP verification', error);
       alert('OTP verification failed');
     }
   };

   return (
     <div className="container mt-5">
       <h2>Verify OTP</h2>
       <form onSubmit={handleSubmit}>
         <div className="mb-3">
           <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
           <input type="text" className="form-control" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
         </div>
         <div className="mb-3">
           <label htmlFor="otp" className="form-label">OTP</label>
           <input type="text" className="form-control" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
         </div>
         <button type="submit" className="btn btn-primary">Verify OTP</button>
       </form>
     </div>
   );
 };

 export default VerifyOtp;

