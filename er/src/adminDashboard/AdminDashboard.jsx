import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StockOverview from './components/ StockOverview.jsx';
import RequestManagement from './components/RequestManagement.jsx';
import UserManagement from './components/UserManagement.jsx';
import Reports from '/Users/tharun/Desktop/error/er/src/adminDashboard/components/ Reports.jsx';
import Notifications from '/Users/tharun/Desktop/error/er/src/adminDashboard/components/ Notifications.jsx';
import '/Users/tharun/Desktop/error/er/src/adminDashboard/  adminDashboard.css'; 
import Navbar from './components/Navbar.jsx';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Routes>
          
          <Route path="stock-overview" element={<StockOverview />} />
          <Route path="request-management" element={<RequestManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};
export default AdminDashboard;