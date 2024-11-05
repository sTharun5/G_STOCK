import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import './notifications.css';

const notifications = [
    { id: 1, message: "Low stock on bananas", time: "2m ago", urgent: true, category: "Girls Hostel" },
    { id: 2, message: "Low stock on apples", time: "30m ago", urgent: true, category: "Boys Hostel" },
    { id: 3, message: "Low stock on oranges", time: "1h ago", urgent: false, category: "Day-Scholar" }
];

const Notifications = () => {
    const categories = ["Girls Hostel", "Boys Hostel", "Day-Scholar"];

    return (
        <div className="notifications-page">
            <h2>Notifications</h2>
            {categories.map((category) => (
                <div key={category} className="notification-category">
                    <h3>{category}</h3>
                    <div className="notifications-list">
                        {notifications
                            .filter(notification => notification.category === category)
                            .map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`notification-box ${notification.urgent ? 'urgent' : 'non-urgent'}`}
                                >
                                    <div className="notification-content">
                                        <span className="notification-icon">
                                            {notification.urgent ? <FaExclamationCircle /> : <FaCheckCircle />}
                                        </span>
                                        <div className="notification-details">
                                            <span className="notification-message">{notification.message}</span>
                                            <span className="notification-time">{notification.time}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="notification-button"
                                        onClick={() => window.location.href = '/requestStocks'}
                                    >
                                        View
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notifications;
