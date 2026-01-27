import React, { useState } from 'react';
import ExecutiveDashboard from './ExecutiveDashboard';
import PerformanceHeatMap from './PerformanceHeatMap';
import TeamHierarchy from './TeamHierarchy';

function DirectorView({ user }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
      </svg>
    ) },
    { id: 'hierarchy', label: 'Team Hierarchy', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ) },
    { id: 'productivity', label: 'Productivity & Reports', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ) }
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <nav className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto bg-white rounded-t-lg px-2 pt-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 font-medium' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && <ExecutiveDashboard serviceLineId={user.serviceLineId} />}
        {activeTab === 'hierarchy' && <TeamHierarchy serviceLineId={user.serviceLineId} />}
        {activeTab === 'productivity' && (
          <div>
            <ExecutiveDashboard serviceLineId={user.serviceLineId} />
            <div className="mt-6">
              <PerformanceHeatMap serviceLineId={user.serviceLineId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DirectorView;
