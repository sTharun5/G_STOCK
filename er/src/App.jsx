import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './sing';
import RequestGrocery from './RequestGrocery'
import Master from '/Users/tharun/Desktop/error/er/src/master.jsx';
import Dash from './dash';
import AdminDashboard from '/Users/tharun/Desktop/error/er/src/adminDashboard/AdminDashboard.jsx'; // Admin Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/RequestGrocery" element = {<RequestGrocery/>}/>
        <Route path="/master" element = {<Master/>}/>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
