// import React, { useState } from 'react';
// import axios from 'axios';

// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log('Submitting sign-up form');
//       const response = await axios.post('http://localhost:8000/auth/signup', {
//         name,
//         mobileNumber,
//         email,
//         password,
//       });
//       console.log('Sign-up response:', response.data);
//       alert(response.data.message);
//     } catch (error) {
//       console.error('Error during sign-up', error);
//       alert(`Sign-up failed: ${error.response ? error.response.data.message : error.message}`);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
//           <input type="text" className="form-control" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit" className="btn btn-primary">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting sign-up form');
      const response = await axios.post('http://localhost:8001/auth/signup', {
        name,
        mobileNumber,
        email,
        password,
      });
      console.log('Sign-up response:', response.data);
      alert(response.data.message);
      
      // Navigate to the VerifyOTP page
      navigate('/verify-otp');
    } catch (error) {
      console.error('Error during sign-up', error);
      alert(`Sign-up failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <input type="text" className="form-control" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
