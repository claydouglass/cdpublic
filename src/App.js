import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="App">
      <nav>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('settings')}>Settings</button>
      </nav>
      {currentView === 'dashboard' ? <Dashboard /> : <Settings />}
    </div>
  );
}

export default App;