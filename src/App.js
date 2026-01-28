import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ManagerView from './components/manager/ManagerView';
import DirectorView from './components/director/DirectorView';
import { mockUser } from './utils/mockData';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('manager');

  useEffect(() => {
    // In production, this would fetch from authentication API
    setUser(mockUser);
    setCurrentView(mockUser.defaultView || 'manager');
  }, []);

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">Loading NexoNurse...</div>
          <div className="text-gray-600">Clinical Operations Command Center</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      
      <main className="max-w-7xl mx-auto p-6">
        {currentView === 'manager' ? (
          <ManagerView user={user} />
        ) : (
          <DirectorView user={user} />
        )}
      </main>
    </div>
  );
}

export default App;
// Force deployment 
