import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('stock');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const generateReport = () => {
    // Logic to generate report
    console.log('Generating report', reportType, dateRange);
  };

  return (
    <div className="reports-section">
      <h2>Reports</h2>
      <select onChange={(e) => setReportType(e.target.value)}>
        <option value="stock">Stock Usage</option>
        <option value="requests">Pending Requests</option>
      </select>
      <input
        type="date"
        placeholder="From"
        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
      />
      <input
        type="date"
        placeholder="To"
        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
      />
      <button onClick={generateReport}>Generate Report</button>
    </div>
  );
};

export default Reports;
