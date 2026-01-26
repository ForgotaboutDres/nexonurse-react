import React, { useState, useEffect } from 'react';
import { fetchExecutiveDashboard } from '../../utils/api';

function ExecutiveDashboard({ serviceLineId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      const dashboardData = await fetchExecutiveDashboard(serviceLineId);
      setData(dashboardData);
      setLoading(false);
    };
    
    loadDashboard();
  }, [serviceLineId]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading executive dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xl text-gray-900">Executive Performance Dashboard</h3>
            <p className="text-sm text-gray-600 mt-1">Service Line Director View - Primary Care</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>January 2026</option>
              <option>Q4 2025</option>
              <option>Last 6 Months</option>
              <option>2025 YTD</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Service Line Average</h4>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.serviceLineAverage}%</div>
          <div className="text-sm text-green-600 mt-1">↑ {data.serviceLineTrend}% vs last month</div>
          <div className="text-xs text-gray-500 mt-2">Task completion across {data.totalUnits} units</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Units On Track</h4>
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.unitsOnTrack}/{data.totalUnits}</div>
          <div className="text-sm text-blue-600 mt-1">{Math.round((data.unitsOnTrack / data.totalUnits) * 100)}% of units</div>
          <div className="text-xs text-gray-500 mt-2">Meeting or exceeding targets</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Needs Attention</h4>
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.needsAttention}</div>
          <div className="text-sm text-yellow-600 mt-1">Units below 75%</div>
          <div className="text-xs text-gray-500 mt-2">Requires intervention</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Upcoming Milestones</h4>
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.upcomingMilestones}</div>
          <div className="text-sm text-purple-600 mt-1">Next 30 days</div>
          <div className="text-xs text-gray-500 mt-2">Critical deadlines approaching</div>
        </div>
      </div>

      {/* Areas of Concern */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Areas of Concern - Requires Leadership Attention</span>
        </h3>
        
        <div className="space-y-4">
          {data.areasOfConcern.map(unit => (
            <div key={unit.id} className={`border-l-4 ${unit.severity === 'critical' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'} pl-4 py-3 rounded-r-lg`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{unit.name} - {unit.status}</h4>
                  <div className="text-sm text-gray-600 mt-1">Manager: {unit.manager} • {unit.staffCount} Staff Members</div>
                </div>
                <span className={`px-3 py-1 ${unit.severity === 'critical' ? 'bg-red-600' : 'bg-yellow-600'} text-white text-sm font-bold rounded-full`}>
                  {unit.performance}%
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>Issue:</strong> {unit.issue}
              </div>
              <div className="text-sm text-gray-700 mb-3">
                <strong>Contributing Factors:</strong> {unit.factors}
              </div>
              <div className="flex gap-2">
                <button className={`px-3 py-1 ${unit.severity === 'critical' ? 'bg-red-600' : 'bg-yellow-600'} text-white text-sm rounded-lg hover:opacity-90`}>
                  {unit.primaryAction}
                </button>
                <button className={`px-3 py-1 bg-white border ${unit.severity === 'critical' ? 'border-red-600 text-red-600' : 'border-yellow-600 text-yellow-600'} text-sm rounded-lg hover:bg-gray-50`}>
                  {unit.secondaryAction}
                </button>
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Success Stories - Best Practices to Share</span>
        </h3>
        
        <div className="space-y-4">
          {data.successStories.map(unit => (
            <div key={unit.id} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{unit.name} - {unit.status}</h4>
                  <div className="text-sm text-gray-600 mt-1">Manager: {unit.manager} • {unit.staffCount} Staff Members</div>
                </div>
                <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                  {unit.performance}%
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>Achievement:</strong> {unit.achievement}
              </div>
              <div className="text-sm text-gray-700 mb-3">
                <strong>Key Practices:</strong> {unit.practices}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                  Schedule Best Practice Share
                </button>
                <button className="px-3 py-1 bg-white border border-green-600 text-green-600 text-sm rounded-lg hover:bg-green-50">
                  Recognition Email
                </button>
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveDashboard;
