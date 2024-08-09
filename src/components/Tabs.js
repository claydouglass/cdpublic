import React from 'react';

const Tabs = ({ currentTab, setCurrentTab }) => {
  const tabs = ['Overview', 'Environmental', 'Nutrients', 'Analysis'];

  return (
    <div className="flex space-x-6 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`p-4 text-xl font-semibold ${
            currentTab === tab
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } rounded transition-colors duration-200`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;