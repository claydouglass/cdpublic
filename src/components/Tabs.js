import React from 'react';

const Tabs = ({ currentTab, setCurrentTab }) => {
  const tabs = ['Overview', 'Environmental', 'Nutrients', 'Analysis'];

  return (
    <div className="mb-4 flex space-x-4">
      {tabs.map((tab) => (
        <button 
          key={tab} 
          className={`px-4 py-2 ${currentTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
