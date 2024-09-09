



import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import SignUp from './Components/Signup/SignUp.jsx';
import VerifyOtp from './Components/VerifyOTP/VerifyOTP.jsx';
import SignIn from './Components/siginin/Signin.jsx';
import ComplaintForm from './Components/ComplaintForm/ComplaintForm.jsx';
import ComplaintStatus from './Components/ComplaintStatus/ComplaintStatus.jsx';
import AdminDashboard from  "./Components/AdminDashboard/AdminDashboard.jsx"
function App() {
  return (
    <div className="App">
        <AuthProvider>

    <Router>
    <Navbar/>
    <Routes>
    
    <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/complain" element={<ComplaintForm />} />
        <Route path="/complainStatus" element={<ComplaintStatus />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    
    </AuthProvider>

      
    </div>
  );
}

export default App;

