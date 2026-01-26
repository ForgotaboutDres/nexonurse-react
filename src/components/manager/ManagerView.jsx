import React, { useState } from 'react';
import Dashboard from './Dashboard';
import PriorityQueue from './PriorityQueue';
import QualityMetrics from '../shared/QualityMetrics';
import Staffing from '../shared/Staffing';
import ConsumerInsights from '../shared/ConsumerInsights';

function ManagerView({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'priority', label: 'Priority Queue', icon: '✓' },
    { id: 'quality', label: 'Quality Metrics', icon: '📈' },
    { id: 'staffing', label: 'Staffing', icon: '👥' },
    { id: 'consumer', label: 'Consumer Insights', icon: '⭐' },
    { id: 'initiatives', label: 'Initiatives', icon: '🏢' }
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
        {activeTab === 'dashboard' && <Dashboard unitId={user.unitId} />}
        {activeTab === 'priority' && <PriorityQueue unitId={user.unitId} />}
        {activeTab === 'quality' && <QualityMetrics unitId={user.unitId} level="unit" />}
        {activeTab === 'staffing' && <Staffing unitId={user.unitId} level="unit" />}
        {activeTab === 'consumer' && <ConsumerInsights unitId={user.unitId} level="unit" />}
        {activeTab === 'initiatives' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Initiatives</h3>
            <p className="text-gray-600">Strategic initiatives content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerView;
