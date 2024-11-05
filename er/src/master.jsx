import React, { useEffect, useState } from 'react';
import './master.css'; // Ensure you have a corresponding CSS file for styling

const Master = () => {
  const [items, setItems] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', expiryDate: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the items from the subStore API
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/subStore'); // Adjust this URL as needed
        const data = await response.json();
        setItems(data); // Assuming the data is an array of items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    setShowAddItemModal(true);
  };

  const handleCloseAddItemModal = () => {
    setShowAddItemModal(false);
    setNewItem({ name: '', quantity: '', expiryDate: '' });
  };

  const handleSaveNewItem = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/subStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setItems([...items, addedItem]); // Add the newly added item to the list
        setMessage('Item added successfully!'); // Set the success message
      } else {
        setMessage('Failed to add item.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage('Failed to add item.');
    } finally {
      handleCloseAddItemModal(); // Close modal regardless of success/failure
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  return (
    <div className="container">
      {message && <p>{message}</p>} {/* Display message if exists */}
      <div className="table-container">
        <h2>SUB - STORE MANAGER LIST</h2>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>ITEM</th>
              <th onClick={() => requestSort('quantity')}>QUANTITY</th>
              <th onClick={() => requestSort('expiryDate')}>EXPIRY DATE</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button onClick={handleAddItem}>ADD ITEMS</button>
        </div>
      </div>

      {showAddItemModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Item</h3>
            <div className="modal-form">
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Item Name"
              />
              <input
                type="text"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                placeholder="Quantity"
              />
              <input
                type="text"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                placeholder="Expiry Date"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveNewItem}>Add</button>
              <button onClick={handleCloseAddItemModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Master;
