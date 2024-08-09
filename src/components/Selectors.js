// src/components/Selectors.js

import React from 'react';

const Selectors = ({ selectedRoom, setSelectedRoom }) => {
  return (
    <div className="flex space-x-4">
      <select
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
        className="p-2 border rounded text-teal-600 font-roboto"
        style={{ fontSize: '16px', fontWeight: '500' }}
      >
        <option value="Room 1">Room 1</option>
        <option value="Room 2">Room 2</option>
        <option value="Room 3">Room 3</option>
      </select>

      <select
        className="p-2 border rounded text-teal-600 font-roboto"
        style={{ fontSize: '16px', fontWeight: '500' }}
      >
        <option value="Papaya Terpz">Papaya Terpz</option>
        {/* Add more strain options here */}
      </select>
    </div>
  );
};

export default Selectors;
