import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'Urgent: Stock level for Apples is low.' },
    { id: 2, message: 'Request #002 for Bananas has been approved.' }
  ];

  return (
    <div className="dashboard-section">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
