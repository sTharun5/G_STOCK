// src/adminDashboard/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Optional CSS file for navbar styling

const Navbar = () => {
  // Temporary count for demonstration; this should ideally come from props or state
  const notificationCount = 2;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/admin/stock-overview">Stock Overview</Link>
        </li>
        <li>
          <Link to="/admin/request-management">Request Management</Link>
        </li>
        <li>
          <Link to="/admin/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/admin/reports">Reports</Link>
        </li>
        <li>
          <Link to="/admin/notifications" className="notification-link">
            Notifications
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
