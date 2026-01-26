import React from 'react';

function Header({ user, currentView, onViewChange }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NexoNurse</h1>
              <p className="text-sm text-gray-600">Clinical Operations Command Center</p>
            </div>
            
            {/* Role View Selector */}
            <div className="ml-6 border-l border-gray-300 pl-6">
              <label className="text-xs text-gray-500 block mb-1">Role View:</label>
              <select 
                value={currentView}
                onChange={(e) => onViewChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="manager">Unit Manager</option>
                <option value="director">Director/VP Dashboard</option>
              </select>
            </div>

            {/* Org Level Selector (for Director view) */}
            {currentView === 'director' && (
              <div className="ml-4 border-l border-gray-300 pl-4">
                <label className="text-xs text-gray-500 block mb-1">Org Level:</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="service">Service Line Director - Primary Care</option>
                  <option value="geography">Regional Director - Columbia Medical Center</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="text-right text-sm">
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-gray-600">{user.title}</div>
            <div className="text-xs text-gray-500 mt-1">Last login: {user.lastLogin}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
