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
        <option value="Room 101">Room 101</option>
        <option value="Room 102">Room 102</option>
      </select>

      <select
        className="p-2 border rounded text-teal-600 font-roboto"
        style={{ fontSize: '16px', fontWeight: '500' }}
      >
        <option value="Papaya Terpz">Papaya Terpz</option>
        <option value="Kandy Terpz">Kandy Terpz</option>
      </select>
    </div>
  );
};

export default Selectors;
