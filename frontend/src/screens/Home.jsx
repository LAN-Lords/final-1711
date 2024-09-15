import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chatbot from './chatBot';




const Home = () => {

  

  return (
    <div>
       <Router>
      <Navbar />
      <Routes>
        
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
      
     
      
    </div>
  );
};

export default Home;