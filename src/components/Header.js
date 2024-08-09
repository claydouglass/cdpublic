// src/components/Header.js
import React from 'react';

const Header = ({ dayOfFlowering }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold text-teal-600 font-poppins">Vervana Multi-room Cultivation Dashboard</h1>
        <p className="text-lg font-medium text-teal-400">Day {dayOfFlowering} of Flowering</p>
      </div>
      <div className="flex items-center">
        <img src="/vervana-logo.png" alt="Vervana logo" className="h-12 mr-4" />
      </div>
    </header>
  );
};

export default Header;
