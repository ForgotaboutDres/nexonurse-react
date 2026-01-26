import React, { useState } from 'react';
import ExecutiveDashboard from './ExecutiveDashboard';
import PerformanceHeatMap from './PerformanceHeatMap';
import TeamHierarchy from './TeamHierarchy';

function DirectorView({ user }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'hierarchy', label: 'Team Hierarchy', icon: '🏢' },
    { id: 'productivity', label: 'Productivity & Reports', icon: '📈' }
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <nav className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto bg-white rounded-t-lg px-2 pt-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 font-medium' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </span>
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
