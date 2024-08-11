import React, { useState } from 'react';
import { batches } from '../data/batchData';

const Settings = () => {
  const [newBatch, setNewBatch] = useState({
    strain: '',
    room: '',
    vegStartDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBatch(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend or state management
    console.log('New batch:', newBatch);
    // Reset form
    setNewBatch({ strain: '', room: '', vegStartDate: '' });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="strain">Strain Name:</label>
          <input
            type="text"
            id="strain"
            name="strain"
            value={newBatch.strain}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="room">Room Number:</label>
          <input
            type="number"
            id="room"
            name="room"
            value={newBatch.room}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="vegStartDate">Veg Start Date:</label>
          <input
            type="date"
            id="vegStartDate"
            name="vegStartDate"
            value={newBatch.vegStartDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add New Batch</button>
      </form>
      <h3>Current Batches</h3>
      <ul>
        {batches.map(batch => (
          <li key={batch.id}>
            Room {batch.room} - {batch.strain} (Veg Start: {batch.vegStartDate.toDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;