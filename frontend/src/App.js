



// import './App.css';
// import { useTranslation } from'react-i18next';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './AuthContext.js';
// import Navbar from "./Components/Navbar/Navbar.jsx";
// import Home from "./Components/Home/Home.jsx";
// import SignUp from './Components/Signup/SignUp.jsx';
// import VerifyOtp from './Components/VerifyOTP/VerifyOTP.jsx';
// import SignIn from './Components/siginin/Signin.jsx';
// import ComplaintForm from './Components/ComplaintForm/ComplaintForm.jsx';
// import ComplaintStatus from './Components/ComplaintStatus/ComplaintStatus.jsx';
// import AdminDashboard from  "./Components/AdminDashboard/AdminDashboard.jsx"
// import ComplaintLog from './Components/ComplaintLog/ComplaintLog.jsx';
// import DepartmentComplaint from './Components/DepartmentComplaints/DepartmetComplaint.jsx';
// function App() {
 
//   return (
//     <div className="App">
//         <AuthProvider>

//     <Router>
//     <Navbar/>
//     <Routes>
    
//     <Route path="/" element={<Home/>} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/complain" element={<ComplaintForm />} />
//         <Route path="/complainStatus" element={<ComplaintStatus />} />
//         <Route path="/admindashboard" element={<AdminDashboard />} />
//         <Route path="/complainlogs" element={<ComplaintLog />} />
//         <Route path="/department" element={<DepartmentComplaint/>}/>
        
//       </Routes>
//     </Router>
    
//     </AuthProvider>

      
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './App.css';
import ChatBot from "./screens/chatBot.jsx";
import { Toaster, toast } from 'sonner'
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import SignUp from './Components/Signup/SignUp.jsx';
import VerifyOtp from './Components/VerifyOTP/VerifyOTP.jsx';
import SignIn from './Components/siginin/Signin.jsx';
import ComplaintForm from './Components/ComplaintForm/ComplaintForm.jsx';
import ComplaintStatus from './Components/ComplaintStatus/ComplaintStatus.jsx';
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import ComplaintLog from './Components/ComplaintLog/ComplaintLog.jsx';
import DepartmentComplaint from './Components/DepartmentComplaints/DepartmetComplaint.jsx';
import LanguageSelector from './Components/languageSelector'; // Import LanguageSelector
import Prediction from './Components/Prediction/Prediction.jsx';


function App() {

  const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/complain" element={<ComplaintForm />} />
            <Route path="/complainStatus" element={<ComplaintStatus />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/complainlogs" element={<ComplaintLog />} />
            <Route path="/department" element={<DepartmentComplaint />} />
            <Route path="/prediction" element={<Prediction />} />
          </Routes>
          <ChatBot  handleSubmit={handleSubmit}
                   prompt={prompt}
                   setPrompt={setPrompt}
                   response={response}
                    />
<Toaster />

        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

