import React from 'react';

const RequestManagement = () => {
  const requests = [
    { id: 1, item: 'Apples', status: 'Pending' },
    { id: 2, item: 'Oranges', status: 'Approved' },
  ];

  return (
    <div className="request-management">
      <h2>Request Management</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.item}</td>
              <td>{request.status}</td>
              <td>
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestManagement;
