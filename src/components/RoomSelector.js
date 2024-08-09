import React from 'react';

const RoomSelector = ({ selectedRoom, setSelectedRoom }) => {
  return (
    <select 
      value={selectedRoom} 
      onChange={(e) => setSelectedRoom(e.target.value)} 
      className="p-2 border rounded"
    >
      <option value="Room 101">Room 101</option>
      <option value="Room 102">Room 102</option>
      {/* Add more rooms as needed */}
    </select>
  );
};

export default RoomSelector;
