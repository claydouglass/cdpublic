import React from 'react';

const RoomSelector = ({ selectedRoom, setSelectedRoom }) => {
  return (
    <select 
      value={selectedRoom} 
      onChange={(e) => setSelectedRoom(e.target.value)} 
      className="p-2 border rounded"
    >
      <option value="Room 1">Room 1</option>
      <option value="Room 2">Room 2</option>
      <option value="Room 3">Room 3</option>
      {/* Add more rooms as needed */}
    </select>
  );
};

export default RoomSelector;
