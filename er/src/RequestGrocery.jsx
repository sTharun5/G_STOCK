import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './req.css';

function RequestGrocery() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [units, setUnits] = useState([]);
  const [newGroceryItem, setNewGroceryItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [receiveDate, setReceiveDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [requestType, setRequestType] = useState('regular');
  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('groceryItems'));
    const savedQuantities = JSON.parse(localStorage.getItem('quantities'));
    const savedUnits = JSON.parse(localStorage.getItem('units'));
    if (savedItems && savedQuantities && savedUnits) {
      setGroceryItems(savedItems);
      setQuantities(savedQuantities);
      setUnits(savedUnits);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newGroceryItem) newErrors.groceryItem = 'Grocery item is required.';
    if (!newQuantity || newQuantity <= 0) newErrors.quantity = 'Quantity must be greater than zero.';
    if (!newUnit) newErrors.unit = 'Unit is required.';
    if (requestType === 'regular' && !receiveDate) newErrors.receiveDate = 'Receive date is required.';
    if (requestType === 'emergency' && !document) newErrors.document = 'An image is required for emergency requests.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddItemClick = () => {
    if (validateForm()) {
      const updatedItems = [...groceryItems];
      const updatedQuantities = [...quantities];
      const updatedUnits = [...units];

      if (editingIndex !== null) {
        updatedItems[editingIndex] = newGroceryItem;
        updatedQuantities[editingIndex] = newQuantity;
        updatedUnits[editingIndex] = newUnit;
        setEditingIndex(null);
      } else {
        updatedItems.push(newGroceryItem);
        updatedQuantities.push(newQuantity);
        updatedUnits.push(newUnit);
      }

      setGroceryItems(updatedItems);
      setQuantities(updatedQuantities);
      setUnits(updatedUnits);
      setNewGroceryItem('');
      setNewQuantity('');
      setNewUnit('');
      setErrors({});
    }
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = groceryItems.filter((_, i) => i !== index);
    const updatedQuantities = quantities.filter((_, i) => i !== index);
    const updatedUnits = units.filter((_, i) => i !== index);

    setGroceryItems(updatedItems);
    setQuantities(updatedQuantities);
    setUnits(updatedUnits);
  };

  const handleSubmitRequest = async () => {
    if (groceryItems.length === 0) {
      setErrors({ groceryItem: 'At least one item is required to submit the request.' });
      return;
    }
  
    const formData = new FormData();
    groceryItems.forEach((item, index) => {
      formData.append('groceryItems[]', item);
      formData.append('quantities[]', quantities[index]);
      formData.append('units[]', units[index]);
    });
    formData.append('receiveDate', receiveDate);
    formData.append('requestType', requestType);
    if (requestType === 'emergency') {
      formData.append('document', document);
    }
  
    try {
      await axios.post('http://localhost:5001/api/groceryRequests', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage(true);
      setGroceryItems([]);
      setQuantities([]);
      setUnits([]);
      setDocument(null);
      localStorage.removeItem('groceryItems');
      localStorage.removeItem('quantities');
      localStorage.removeItem('units');
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrors({ submit: 'Failed to submit request.' });
    }
  };

  const getAvailableDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 3; i <= 9; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="request-grocery-container">
      <h2>Grocery Request Form</h2>
      <div className="form-group">
        <label htmlFor="requestType">Request Type:</label>
        <select
          id="requestType"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="regular">Regular</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>

      {requestType === 'regular' && (
        <div className="form-group">
          <label htmlFor="receiveDate">Receive Date:</label>
          <select
            id="receiveDate"
            value={receiveDate}
            onChange={(e) => setReceiveDate(e.target.value)}
          >
            <option value="">Select a date</option>
            {getAvailableDates().map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          {errors.receiveDate && <span className="error-message">{errors.receiveDate}</span>}
        </div>
      )}

      {requestType === 'emergency' && (
        <div className="form-group">
          <label htmlFor="document">Attach Image:</label>
          <input
            type="file"
            id="document"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {errors.document && <span className="error-message">{errors.document}</span>}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="groceryItem">Grocery Item:</label>
        <input
          type="text"
          id="groceryItem"
          value={newGroceryItem}
          onChange={(e) => setNewGroceryItem(e.target.value)}
          className={errors.groceryItem ? 'input-error' : ''}
        />
        {errors.groceryItem && <span className="error-message">{errors.groceryItem}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          className={errors.quantity ? 'input-error' : ''}
        />
        {errors.quantity && <span className="error-message">{errors.quantity}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="unit">Unit:</label>
        <select id="unit" value={newUnit} onChange={(e) => setNewUnit(e.target.value)}
          className={errors.unit ? 'input-error' : ''}
        >
          <option value="">Select unit</option>
          <option value="liters">Liters</option>
          <option value="kilograms">Kilograms</option>
        </select>
        {errors.unit && <span className="error-message">{errors.unit}</span>}
      </div>
      <button onClick={handleAddItemClick}>
        {editingIndex !== null ? 'Update Item' : 'Add Item'}
      </button>

      <ul className="grocery-items-list">
        {groceryItems.map((item, index) => (
          <li key={index} className="grocery-item">
            {item} - {quantities[index]} {units[index]} - {receiveDate}
            <button onClick={() => handleRemoveItem(index)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmitRequest} className="submit-button">Submit Request</button>

      {successMessage && (
        <div className="success-message">
          <h3>Grocery request submitted successfully!</h3>
        </div>
      )}

      {errors.submit && <span className="error-message">{errors.submit}</span>}
    </div>
  );
}

export default RequestGrocery;
